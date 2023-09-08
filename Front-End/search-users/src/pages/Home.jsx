import { useState, useEffect, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getUsers } from "../api/userApi";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState(null);
  const [users, setUsers] = useState([]);
  const [previewUsers, setPreviewUsers] = useState([]);
  const [isResultVisible, setResultVisible] = useState(false);

  const listRef = useRef(null)

  const getPreviewUsers = useCallback(async () => {
    const response = await getUsers(searchTerm);
    if (response.status === "OK") {
      setPreviewUsers(response.data);
      setResultVisible(response.data.length > 0);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      getPreviewUsers();
    } else {
      setResultVisible(false);
    }
  }, [getPreviewUsers, searchTerm]);

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

  const handleOnSumbit = (e) => {
    e.preventDefault();
    //getData()
  };

  const getUsersElement = () => {
    return users.map((user) => {
      return (
        <div class="card text-white bg-dark mb-3">
          <div class="card-header">Header</div>
          <div class="card-body">
            <h5 class="card-title">Dark card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      );
    });
  };

  const handleInputSearch = (text) => {
    setSearchTerm(text.target.value);
  };

  return (
    <div className="container mt-4">
      <form
        className="field-search input-group flex-nowrap"
        onSubmit={handleOnSumbit}
      >
        <div className="input-group-prepend">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Search people by name"
          onChange={handleInputSearch}
        />
      </form>
      <div ref={listRef}>
        {isResultVisible && (
            <ul
                className="list-group results-list custom-scrollbar"
            >
                {previewUsers.map((user, index) => (
                <li className="list-group-item text-light bg-dark d-flex" key={index}>
                    {user.imageUrl ? (
                        <img
                        src={user.imageUrl}
                        alt={user.name}
                        className="mr-3"
                        style={{ maxWidth: "80px" }}
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
                    <div style={{marginLeft:"1.0em", textAlign: "left"}}>
                    <h5>{user.name}</h5>
                    <p>{user.professionalHeadline}</p>
                    </div>
                </li>
                ))}
            </ul>
        )}
      </div>
      {users.length !== 0 && (
        <div className="d-flex flex-column mt-4">{getUsersElement()}</div>
      )}
    </div>
  );
};

export { Home };
