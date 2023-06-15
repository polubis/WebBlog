import React from "react"

import { FavouritesIcon, IconButton, Modal, XL, useModal } from "../../ui"
import { SmallTile } from "./Tile"
import { useFavouriteArticlesProvider } from "./FavouriteArticlesProvider"

const FavouritesModal = () => {
    const modal = useModal()
    const { articles } = useFavouriteArticlesProvider()

    return (
        <>
            {articles.length > 0 &&
                <IconButton className='open-favourites-btn' onClick={modal.open}>
                    <FavouritesIcon />
                </IconButton>
            }
            {modal.isOpen &&
                <Modal onClose={modal.close}>
                    <XL>Your favourites</XL>
                    {articles.map(article => (
                        <SmallTile key={article.title} article={article} />
                    ))}
                </Modal>
            }
        </>
    )
}

export { FavouritesModal }
