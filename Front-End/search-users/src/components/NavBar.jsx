import { Link } from "react-router-dom"

const NavBar = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-center  nav-text">
             <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link nav-text" to={"/"}>Search</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link nav-text" to={"/favorites"}>Favorites</Link>
                </li>
            </ul>
        </nav>
    )
}

export {NavBar}