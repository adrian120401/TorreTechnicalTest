const axios = require('axios');

const getPreviewUsers = async(searchTerm) => {
    try {
        const body = {
            "query": searchTerm,
            "identityType": "person", 
            "meta": false, 
            "limit": 10
            }
        const response = await axios.post('https://torre.ai/api/entities/_searchStream' , body)
        if(typeof(response.data) === "object"){
            return [response.data]
        }else{
            const usersArray = response.data.split('\n').filter(line => line.trim() !== '')
            const users = usersArray.map(jsonString => JSON.parse(jsonString))
            return users
        }

    } catch (error) {
        throw{
            status: 500,
            message: `Error ${error}`
        }
    }
}

const getUsers = async(query, offset, limit) =>{
    try {
        const body = {
            "query": query
        }
        const response = await axios.post(`https://arda.torre.co/entities/_search?offset=${offset}&limit=${50}`,
                                        body)
        return response.data
    } catch (error) {
        throw{
            status: 500,
            message: `Error ${error}`
        }
    }
}

module.exports = {getPreviewUsers, getUsers}