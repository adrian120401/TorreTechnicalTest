
const Favorites = ({getUsersElement, favoriteUsers}) => {

    return(
        <div className="container">
            <h1 className="text-light">Favorites</h1>
            {getUsersElement(favoriteUsers, true)}
        </div>
    )
}

export {Favorites}