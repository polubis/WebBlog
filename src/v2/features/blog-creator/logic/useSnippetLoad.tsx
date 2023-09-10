import { useEffect, useMemo, useState } from "react"
import {
    EMPTY,
    Subject,
    catchError,
    debounceTime,
    from,
    switchMap,
    tap,
} from "rxjs"

const getCodeFromUrl = async (url: string): Promise<string> => {
    try {
        const result = await fetch(url)

        if (!result.ok) {
            throw Error('Failed')
        }

        const text = await result.text()

        return text;
    } catch (error) {
        throw error;
    }
}

interface Idle {
    is: "idle"
}

interface Busy {
    is: "busy"
}

interface Ok {
    is: "ok"
    code: string
}

interface Fail {
    is: "fail"
    error: unknown
}

type SnippetState = Idle | Busy | Ok | Fail

interface Setup {
    onLoad(code: string): void;
}

const useSnippetLoad = ({ onLoad }: Setup) => {
    const loadSnippet = useMemo(() => new Subject<string>(), [])
    const loadSnippet$ = useMemo(() => loadSnippet.asObservable(), [])
    const [state, setState] = useState<SnippetState>({ is: "idle" })

    useEffect(() => {
        const sub = loadSnippet$
            .pipe(
                tap(() => {
                    setState({ is: "busy" })
                }),
                debounceTime(350),
                switchMap(url =>
                    from(getCodeFromUrl(url)).pipe(
                        tap(code => {
                            setState({ is: "ok", code })
                            onLoad(code)
                        }),
                        catchError(error => {
                            setState({ is: "fail", error })
                            return EMPTY
                        })
                    )
                )
            )
            .subscribe()

        return () => {
            sub.unsubscribe()
        }
    }, [])

    const load = (url: string): void => {
        loadSnippet.next(url)
    }

    const reset = (): void => {
        setState({ is: 'idle' })
    }

    return {
        ...state,
        load,
        reset
    }
}

export type { SnippetState }

export { useSnippetLoad }
