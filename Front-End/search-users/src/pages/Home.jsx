import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { getUsers } from "../api/userApi";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      console.log(searchTerm);
      const getData = async (searchTerm) => {
        const response = await getUsers(searchTerm);
        if (response.status === "OK") {
          setUsers(response.data);
        }
      };
      getData(searchTerm);
    }
  }, [searchTerm]);

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
    <div className="container">
      <div className="field-search input-group flex-nowrap">
      <div class="input-group-prepend">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Search people by name"
          onChange={handleInputSearch}
        />
      </div>
        {users.length !== 0 ?
        <div className="d-flex flex-column">
            {getUsersElement()}
        </div>
        :
        null
        }
    </div>
  );
};

export { Home };
