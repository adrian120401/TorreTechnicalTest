import { useState,useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"

const Home = () => {
    const[searchTerm, setSearchTerm] = useState(null)

    useEffect(() => {
        console.log(searchTerm)
    }, [searchTerm])

    const handleInputSearch = (text) =>{
        setSearchTerm(text.target.value)
    }

    return(
        <div className="row g-3">
            <div className="field-search">
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
                <input type="text" className="form-control" placeholder="Search people by name"
                 onChange={handleInputSearch}/>
            </div>
                
        </div>
    )
}


export {Home}