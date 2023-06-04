import { useEffect, useRef, useState } from "react"
import { useQueryParams } from "../../utils/useQueryParams"
import { isInSSR } from "../../utils/isInSSR"
import { SnippetPreviewState } from "./defs"
import { DEFAULT_STATE } from "./consts"
import { useGetSnippet } from "../../shared/useGetSnippet"

const useSnippetPreviewState = () => {
    const params = useQueryParams()
    const { call } = useGetSnippet()

    const [_, setCounter] = useState(0)
    const state = useRef(DEFAULT_STATE)

    const update = (newState: SnippetPreviewState): void => {
        state.current = newState
        setCounter(prev => prev + 1)
    }

    const asBetween = () => {
        const s = state.current;

        if (s.key === 'loaded') {
            update({ key: 'between', snippet: s.snippet })
        }
    }

    const asLoaded = () => {
        const s = state.current;

        if (s.key === 'between') {
            update({ key: 'loaded', snippet: s.snippet })
        }
    }

    useEffect(() => {
        if (isInSSR()) return

        const id = params.get("id")

        if (!id) return

        let innerTimeout: NodeJS.Timeout;
        const timeout = setTimeout(() => {
            call({
                id,
                onStart: () => update({ key: "loading" }),
                onOk: (snippet) => {
                    update({ key: 'opening' })

                    innerTimeout = setTimeout(() => {
                        update({ key: 'loaded', snippet })
                    }, 1500)
                },
                onFail: () => update({ key: "load-fail", error: 'Something went wrong' }),
            })
        }, 2000)

        return () => {
            innerTimeout && clearTimeout(innerTimeout)
            clearTimeout(timeout)
        }
    }, [])

    return {
        state: state.current,
        asBetween,
        asLoaded
    }
}

export { useSnippetPreviewState }
