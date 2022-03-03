const axios = require('axios')
const { Pokemon, Type } = require('../db.js')

// Obtengo los pokemons de la DataBase
const getPokemonDB = async () => {
    try {
        const pokes = await Pokemon.findAll({
            include: {
                model: Type, 
                through:{attributes: []}
        }})
        return pokes.map(p => ({
            id: p.id,
            name: p.name,
            types: p.types.map(e => e.name),
            image: p.image,
            attack: p.attack,
            createdIdDB: p.createdIdDB
        }))
    }
    catch (error) {
        console.log(`Pokemon not found from DataBase: ${error}`)
    }
}

// Obtengo los pokemons de la pokeAPI
const getPokemonAPI = async() => {
    try {
       const pokeArray = []
       for (let i = 1; i <= 40; i++) {
          pokeArray.push(await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`))
       }
       const pokemonsData =  await Promise.all(pokeArray)
           const pokemon = pokemonsData.map(p => {
               return ({
                   id: p.data.id,
                   name: p.data.name,
                   types: p.data.types.map(e => e.type.name),
                   image: p.data.sprites.other.dream_world.front_default,
                   attack: p.data.stats[1].base_stat,
               })
           }) 
           return pokemon
    } catch (error) {
        console.log(`Pokemon not found from pokeAPI: ${error}`)
    }
}

// Obtengo los pokemons de la pokeAPI y de la DataBase
const getTotalPokemon = async () => {
    try {
        const [pokeAPI, pokeDB] = await Promise.all([getPokemonAPI(), getPokemonDB()])
        const allPokes = [...pokeDB, ...pokeAPI]
        return allPokes
    } catch (error) {
        console.log(`Pokemon not found from pokeAPI and DataBase: ${error}`)
    }
}

// Creo un nuevo pokemon y lo guardo en mi DataBase
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
            image: image,
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

// Obtengo el detalle de un pokemon en particular buscandolo por Id en la API y en la DB
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
        console.log(`Pokemon not found by DataBase Id: ${error}`)
    }
}

const getIdFromAPI = async (id) => {
    try {
        const pokeId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokeFoundAPI = {
            id: pokeId.data.id,
            name: pokeId.data.name,
            hp: pokeId.data.stats[0].base_stat,
            attack: pokeId.data.stats[1].base_stat, 
            defense: pokeId.data.stats[2].base_stat, 
            speed: pokeId.data.stats[5].base_stat, 
            height: pokeId.data.height, 
            weight: pokeId.data.weight,
            image: pokeId.data.sprites.other.dream_world.front_default,
            types: pokeId.data.types.map(t => t.type.name),
        }
        return pokeFoundAPI

    } catch (error) {
        console.log(`Pokemon not found by API Id: ${error}`)
    }
}

module.exports = {
    getPokemonAPI,
    getPokemonDB, 
    getTotalPokemon,
    createPokemon,
    getIdFromAPI,
    getIdFromDB
}