import React, { createContext, ReactNode, useContext } from 'react'
import { useAddToFavourite } from '../../utils/useAddToFavourite'

const Context = createContext<ReturnType<typeof useAddToFavourite>>({
    articles: [],
    add: () => { },
    remove: () => { },
    isAdded: () => false
})

const FavouriteArticlesProvider = ({ children }: { children: ReactNode }) => {
    const ctx = useAddToFavourite()

    return (
        <Context.Provider value={ctx}>
            {children}
        </Context.Provider>
    )
}

const useFavouriteArticlesProvider = () => {
    const ctx = useContext(Context)

    return ctx;
}


export { FavouriteArticlesProvider, useFavouriteArticlesProvider }