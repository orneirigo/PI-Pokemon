const axios = require('axios')
const { Type } = require('../db.js')

async function getPekemonTypes () {
    try {
        const pokeTypesAPI = await axios.get('https://pokeapi.co/api/v2/type')
        const infoAPI = [...pokeTypesAPI.data.results]
        // console.log(infoAPI)
        infoAPI.forEach(t => {
            Type.findOrCreate({
                where: {
                    name: t.name
                }})
            })
        
        const pokeTypesDB = await Type.findAll()
        return pokeTypesDB

    } catch (error) {
        console.log('Pokemon type not found: ' + error)
    }
}

module.exports = { 
    getPekemonTypes
}