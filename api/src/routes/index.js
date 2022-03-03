const { Router } = require('express');
const pokemon  = require('./pokemonRoute.js')
const axios = require('axios')
const { Pokemon, Type } = require('../db.js')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('/pokemons', pokemon)

const router = Router();
//--------------------------------------------------------------------------------------------------------------------//
// Traigo los pokemons de la pokeAPI
const getPokemonAPI = async() => {
    try {
       const pokeArray = []
       for (let i = 1; i <= 40; i++) {
          pokeArray.push(await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`))
       }
       return await Promise.all(pokeArray)
       .then(res => {
           const pokes = res.map(p => {
               return ({
                   id: p.data.id,
                   name: p.data.name,
                   types: p.data.types.map(e => e.type.name),
                   image: p.data.sprites.other.dream_world.front_default,
                   attack: p.data.stats[1].base_stat,
               })
           }) 
           return pokes
       })
    } catch (error) {
        console.log('Pokemon not found from pokeAPI: ' + error)
    }
}

// Traigo los pokemons de la DataBase
const getPokemonDB = async () => {
    try {
        const pokes = await Pokemon.findAll({
            attributes: ['id', 'name', 'image', 'attack', 'createdIdDB'],
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
        console.log('Pokemon not found from DataBase: ' + error)
    }
}

// Traigo los pokemons de la pokeAPI y de la DataBase
const getTotalPokemon = async () => {
    try {
        const [pokeAPI, pokeDB] = await Promise.all([getPokemonAPI(), getPokemonDB()])
        const allPokes = [...pokeDB, ...pokeAPI]
        return allPokes
    } catch (error) {
        console.log('Pokemon not found from pokeAPI and DataBase: ' + error)
    }
}

// GET a /pokemons y /pokemons?name="..."
router.get('/', async (req, res) => {
    const { name } = req.query
    try {
        const pokemonData = await getTotalPokemon()
        // GET /pokemons?name="..."
        if(name) {
            const pokemonName = pokemonData.filter(p => p.name.toLowerCase() === name.toLowerCase())
            pokemonName.length ? res.status(200).send(pokemonName) : res.status(404).send(`Pokemon not found: ${name}`)
        // GET /pokemons
        } else {
            res.status(200).json(pokemonData)
        }
    } catch(error) {
        res.status(400).send('Pokemon Error: ' + error)
    }
})

//--------------------------------------------------------------------------------------------------------------------//
// Traigo los tipos de pokemons de la pokeAPI y los almaceno en la DataBase
async function getPekemonTypes () {
    try {
        const pokeTypesAPI = await axios.get('https://pokeapi.co/api/v2/type')
        const info = [...pokeTypesAPI.data.results]
        // console.log(info)
        info.forEach(t => {
            Type.findOrCreate({
                where: {
                    name: t.name
                }})
            })
        
        const pokeTypesDB = await Type.findAll()
        return pokeTypesDB

    } catch (error) {
        console.log('PokemonType not found: ' + error)
    }
}

// GET a /types
router.get('/types', async (req,res) => {
    try {
        const types = await getPekemonTypes()
        res.json(types)

    } catch(error) {
        res.status(400).send('PokemonType Error: ' + error)
    }
})

//--------------------------------------------------------------------------------------------------------------------//
// Creo un nuevo pokemon y lo guardo en mi DataBase
const createPokemon = async (name, hp, attack, defense, speed, height, weight, image, types, createdIdDB) => {
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
            createdIdDB: createdIdDB
        })
        const typeDB = await Type.findAll({
            where: {name: types}
        })
        pokeCreated.addType(typeDB)
        return pokeCreated

    } catch (error) {
        console.log('Could not create the pokemon: ' + error)
    }
}

// POST /pokemons
router.post('/', async (req, res, next) => {
    const { name, hp, attack, defense, speed, height, weight, image, types } = req.body
    try { 
        const pokeExist = await Pokemon.findOne({
            where: {
                name: name.toLowerCase()}
            })
        if(pokeExist) res.status(200).send('Pokemon already exists')

        await createPokemon(name, hp, attack, defense, speed, height, weight, image, types )
        res.status(200).send('Pokemon created successfully')

    } catch(error) {
        next(error)
        // res.status(404).send('Could not create the pokemon: ' + error)
    }
})

//--------------------------------------------------------------------------------------------------------------------//
// Obtengo el detalle de un pokemon en particular
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
        console.log('Pokemon not found by API Id: ' + error)
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
            types: pokeId.types.map(t => t.name)
        }
        return pokeFoundDB

    } catch (error) {
        console.log('Pokemon not found by DataBase Id: ' + error)
    }
}

// GET /pokemons/{idPokemon}
router.get('/:idPokemon', async (req, res) => {
    const { idPokemon } = req.params
    if ((!idPokemon.includes('-'))) {
        try {
            const idAPI = await getIdFromAPI(idPokemon)
            res.status(200).json(idAPI)
        } catch(error) {
            res.status(404).send('Detail Pokemon by IdAPI not found: ' + error)
        }}
    else {
        try {
            const idDB = await getIdFromDB(idPokemon)
            res.status(200).json(idDB)
        } catch(error) {
            res.status(404).send('Detail Pokemon by Id not found: ' + error)
    }}
})

module.exports = router;
