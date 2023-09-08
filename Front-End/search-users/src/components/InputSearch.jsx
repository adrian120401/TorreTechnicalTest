import { useEffect, useCallback } from "react";
import { getPreviewUsersRequest } from "../api/userApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const InputSearch = ({handleInputSearch,listRef, isResultVisible, previewUsers,
                         searchTerm, setPreviewUsers, setResultVisible, getUsers}) => {

      const debouncedGetPreviewUsers = useCallback(
        async (term) => {
          const response = await getPreviewUsersRequest(term)
          if (response.status === "OK") {
            setPreviewUsers(response.data)
            setResultVisible(response.data.length > 0)
          }
        },
        [setPreviewUsers, setResultVisible]
      )
    
      useEffect(() => {
        if (searchTerm) {
          const timer = setTimeout(() => {
            debouncedGetPreviewUsers(searchTerm)
          }, 300);
          return () => {
            clearTimeout(timer)
          };
        } else {
          setResultVisible(false)
        }
      }, [debouncedGetPreviewUsers, searchTerm, setResultVisible])

      const handleOnSumbit = (e) => {
        e.preventDefault()
        setResultVisible(false)
        getUsers()
      }

  return (
    <div className="position-relative">
      <form
        className="field-search input-group flex-nowrap"
        onSubmit={handleOnSumbit}
      >
        <div className="input-group-prepend bg-dark d-flex align-items-center p-2">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Search people by name"
          onChange={handleInputSearch}
        />
      </form>
      <div ref={listRef} className="position-absolute" style={{zIndex: 2 , width: "100%"}}>
        {isResultVisible && (
          <ul className="list-group results-list custom-scrollbar">
            {previewUsers.map((user, index) => (
              <li
                className="list-group-item text-light bg-dark d-flex"
                key={index}
              >
                {user.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt={user.name}
                    className="mr-3"
                    style={{ maxWidth: "80px", maxHeight:"80px" }}
                  />
                ) : (
                  <div
                    className="mr-3 d-grid text-center align-items-center"
                    style={{
                      width: "80px",
                      height: "80px",
                      backgroundColor: "#666",
                      borderRadius: "50%",
                    }}
                  >
                    <h3
                      style={{
                        fontWeight: "bold",
                        color: "#fff",
                      }}
                      className="m-0"
                    >
                      {user.name[0].toUpperCase()}
                    </h3>
                  </div>
                )}
                <div style={{ marginLeft: "1.0em", textAlign: "left" }}>
                  <h5>{user.name}</h5>
                  <p>{user.professionalHeadline}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export {InputSearch}