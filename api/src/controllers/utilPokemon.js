const axios = require('axios')
const { Pokemon, Type } = require('../db.js')

const getPokemonDB = async () => {
    try {
        const pokes = await Pokemon.findAll({
            include: {
                model: Type, 
                through:{attributes: []}
        }})
        return pokes.map(p => ({
            id: p.id,
            name: p.name.toLowerCase(),
            types: p.types.map(e => e.name),
            image: p.image,
            createdIdDB: p.createdIdDB
        }))

    } catch (error) {
        console.log(`Pokemon not found from DataBase: ${error}`)
    }
}

const getPokemonAPI = async() => {
    try {
       const pokemonsURL = (id) => (`https://pokeapi.co/api/v2/pokemon/${id}`)
       const pokeArray = []
       const numPokemon = 40
       for (let i = 1; i <= numPokemon; i++) {
          pokeArray.push(await axios.get(pokemonsURL(i)))
       }
       const pokemonsData = await Promise.all(pokeArray)
           const pokemon = pokemonsData.map(p => {
               return ({
                   id: p.data.id,
                   name: p.data.name.toLowerCase(),
                   types: p.data.types.map(e => e.type.name),
                   image: p.data.sprites.other.home.front_default,
               })
           }) 
           return pokemon

    } catch (error) {
        console.log('Pokemon not found from pokeAPI: ' + error)
    }
}

const getNameFromDB = async (name) => {
    try {
        const pokeNameDB = await Pokemon.findAll({
            where: {name},
            include: {
                model: Type, 
                through:{attributes: []}
        }})
        return pokeNameDB.map(p => ({
            id: p.id,
            name: p.name.toLowerCase(),
            types: p.types.map(e => e.name),
            image: p.image,
            createdIdDB: p.createdIdDB
        }))
        
    } catch (error) {
        console.log(`Pokemon not found from DataBase by Name: ${error}`)
    }
}

const getNameFromAPI = async (name) => {
    try {
        const pokeName = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const pokeNameAPI = [{
            id: pokeName.data.id,
            name: pokeName.data.name.toLowerCase(),
            types: pokeName.data.types.map(t => t.type.name),
            image: pokeName.data.sprites.other.home.front_default,
        }]
        console.log(pokeNameAPI)
        return pokeNameAPI

    } catch (error) {
        console.log(`Pokemon not found from API by Name: ${error}`)
    }
}

const createPokemon = async (name, hp, attack, defense, speed, height, weight, image, types) => {
    try {
        const pokeCreated = await Pokemon.create({
            name: name.toLowerCase(),
            hp: hp,
            attack: attack,
            defense: defense,
            speed: speed,
            height: height,
            weight: weight,
            image: image
        })
        const typeDB = await Type.findAll({
            where: {name: types}
        })
        pokeCreated.addType(typeDB)
        return pokeCreated

    } catch (error) {
        console.log(`Could not create the pokemon: ${error}`)
    }
}

const getIdFromDB = async (id) => {
    try {
        const pokeId = await Pokemon.findByPk(id, {
            include: {
                model: Type,
                through: {attributes: []}
            }})
        const pokeFoundDB = {
            id: pokeId.id,
            name: pokeId.name, 
            hp: pokeId.hp,
            attack: pokeId.attack,
            defense: pokeId.defense,
            speed: pokeId.speed,
            height: pokeId.height,
            weight: pokeId.weight,
            image: pokeId.image,
            types: pokeId.types.map(t => t.name),
            createdIdDB: pokeId.createdIdDB
        }
        return pokeFoundDB

    } catch (error) {
        console.log(`Pokemon not found from DataBase by Id: ${error}`)
    }
}

const getIdFromAPI = async (id) => {
    try {
        const pokeId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokefoundAPI = {
            id: pokeId.data.id,
            name: pokeId.data.name,
            hp: pokeId.data.stats[0].base_stat,
            attack: pokeId.data.stats[1].base_stat, 
            defense: pokeId.data.stats[2].base_stat, 
            speed: pokeId.data.stats[5].base_stat, 
            height: pokeId.data.height, 
            weight: pokeId.data.weight,
            image: pokeId.data.sprites.other.home.front_default,
            types: pokeId.data.types.map(t => t.type.name)
        }
        return pokefoundAPI

    } catch (error) {
        console.log(`Pokemon not found from API by Id: ${error}`)
    }
}

module.exports = {
    getPokemonAPI,
    getPokemonDB, 
    getNameFromAPI,
    getNameFromDB,
    createPokemon,
    getIdFromAPI,
    getIdFromDB,
}