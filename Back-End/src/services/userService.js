const User = require("../database/userRepository")

const getPreviewUsers = async(searchTerm) =>{
    return await User.getPreviewUsers(searchTerm)
}

const getUsers = async(query, page) => {
    let offset = (page - 1) * 50    
    return await User.getUsers(query,offset)
}

module.exports = {getPreviewUsers, getUsers}