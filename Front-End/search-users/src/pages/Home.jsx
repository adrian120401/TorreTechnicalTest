import { useState, useEffect, useCallback, useRef } from "react"
import { getUsersByQueryRequest } from "../api/userApi"
import { InputSearch } from "../components/InputSearch"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Home = ({getUsersElement}) => {
  const [searchTerm, setSearchTerm] = useState(null)
  const [page, setPage] = useState(null)
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const [users, setUsers] = useState([])
  const [previewUsers, setPreviewUsers] = useState([])
  const [isResultVisible, setResultVisible] = useState(false)

  const listRef = useRef(null)
  
  const getUsers = useCallback(async() => {
    const response = await getUsersByQueryRequest(searchTerm, page)
    if (response.status === "OK") {
        setTotal(response.data.total)
        setOffset(response.data.offset)
        setUsers(response.data.results)
    }
  }, [page, searchTerm])

  useEffect(()=> {
    if(page){
      getUsers()  
    }
  }, [getUsers, page])

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (listRef.current && !listRef.current.contains(e.target)) {
        setResultVisible(false)
      }
    }
    if (isResultVisible) {
      document.addEventListener('click', handleDocumentClick)
    } else {
      document.removeEventListener('click', handleDocumentClick)
    }
    return () => {
      document.removeEventListener('click', handleDocumentClick)
    };
  }, [isResultVisible])

  const handleInputSearch = (text) => {
    setSearchTerm(text.target.value)
  }

  const handlePrevPage = () => {
    const newPage = page - 1
    setPage(newPage)
  }

  const handleNextPage = () => {
    const newPage = page ? page + 1 : 2
    setPage(newPage)
  }

  return (
    <div className="container mt-4">
      <InputSearch handleInputSearch={handleInputSearch} getUsers={getUsers}
       listRef={listRef} isResultVisible={isResultVisible} previewUsers={previewUsers} searchTerm={searchTerm}
       setPreviewUsers={setPreviewUsers} setResultVisible={setResultVisible}/>
      {users.length !== 0 && (
        <div className="d-flex flex-column mt-4">
            <p>Showing results {offset} - {offset + users.length} of around {total}</p>
            {getUsersElement(users, false)}
            <div>
                {offset !== 0 &&
                    <button type="button" className="btn btn-outline-dark" onClick={handlePrevPage}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                }
                {offset + users.length < total &&
                    <button type="button" className="btn btn-outline-dark" onClick={handleNextPage}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                }
            </div>
        </div>
      )}
    </div>
  );
};

export { Home };
