import './App.css';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { NavBar } from './components/NavBar';
import {Routes, Route} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Toaster, toast } from 'sonner'
import { useState, useEffect } from 'react';

function App() {
  const[favoriteUsers, setFavoriteUsers] = useState([])

  useEffect(() => {
      setFavoriteUsers(JSON.parse(localStorage.getItem('favorites')) || [])
  }, [])

  const saveUser = (e, user) => {
    e.stopPropagation()
    try {
      window.localStorage.setItem('favorites', JSON.stringify([...favoriteUsers, user]));
      setFavoriteUsers([...favoriteUsers, user])
      toast.success("User saved in favorites")
    } catch (error) {
      console.log(error)
      toast.error(`User not saved`)
    }
  }

  const deleteUser = (e, user) => {
    e.stopPropagation()
    try {
      const newUsers = favoriteUsers.filter(element => element.ardaId !== user.ardaId)
      window.localStorage.setItem('favorites', JSON.stringify(newUsers));
      setFavoriteUsers(newUsers)
      toast.success("User deleted favorites")
    } catch (error) {
      console.log(error)
      toast.error(`User not deleted`)
    }
  }

  const handleOpenUserProfile = (username) => {
    const urlExterna = `https://torre.ai/${username}`
    window.open(urlExterna, '_blank')
  }

  const getUsersElement = (list, isFavorite) => {
    return list.map((user) => {
      return (
        <div className="card text-white bg-dark mb-3" key={user.ardaId}>
          <div className="card-body d-flex align-items-center" style={{cursor: "pointer"}}
           onClick={() => handleOpenUserProfile(user.username)}>
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
                    <p>
                    {user.professionalHeadline}
                    </p>   
                </div>
                {!isFavorite ?
                  <FontAwesomeIcon icon={faHeartSolid} className='icon-heart position-absolute' style={{right:"20px"}}
                  onClick={(e) => saveUser(e, user)}/>
                  :
                  <FontAwesomeIcon icon={faTrash} className='icon-trash position-absolute' style={{right:"20px"}}
                  onClick={(e) => deleteUser(e, user)} />
                } 
          </div>
        </div>
      )
    })
  }

  return (
    <div className="App bg-black">
      <NavBar />
      <Routes>
        <Route path='/' element={<Home getUsersElement={getUsersElement}/>}></Route>
        <Route path='/favorites' element={<Favorites getUsersElement={getUsersElement} favoriteUsers={favoriteUsers}/>}></Route>
        <Route element={<Home />} />
      </Routes>
      <Toaster richColors />
    </div>
  );
}

export default App;
