const { Router } = require('express');
const { getTotalPokemon, createPokemon, getIdFromAPI, getIdFromDB } = require('../controllers/utilPokemon')
const { Pokemon, Type } = require('../db.js')
const router = Router();

// GET a /pokemons y /pokemons?name="..."
router.get('/', async (req, res) => {
    const { name } = req.query
    try {
        const pokemonData = await getTotalPokemon()
        if(name) {
            const pokemonName = pokemonData.filter(p => p.name.toLowerCase() === name.toLocaleLowerCase())
            pokemonName.length 
            ? res.status(200).json(pokemonName) 
            : res.status(404).send(`Pokemon not found: ${name}`)
        } else {
            res.status(200).json(pokemonData)
        }
    } catch(error) {
        res.status(400).send(`Get Pokemon Error: ${error}`)
    }
})

// POST /pokemons
router.post('/', async (req, res, next) => {
    const { name, hp, attack, defense, speed, height, weight, image, types } = req.body
    try { 
        await createPokemon(name, hp, attack, defense, speed, height, weight, image, types )
        res.status(200).send('Pokemon created successfully')

    } catch (error) {
        next(error)
        // res.status(404).send(`Could not create the pokemon: ${error}`)
    }
})

// GET /pokemons/{idPokemon}
router.get('/:idPokemon', async (req, res) => {
    const { idPokemon } = req.params
    if ((!idPokemon.includes('-'))) {
        try {
            const idAPI = await getIdFromAPI(idPokemon)
            res.status(200).json(idAPI)
        } catch(error) {
            res.status(404).send(`Detail Pokemon by IdAPI not found: ${error}`)
        }}
    else {
        try {
            const idDB = await getIdFromDB(idPokemon)
            res.status(200).json(idDB)
        } catch(error) {
            res.status(404).send(`Detail Pokemon by IdDB not found: ${error}`)
    }}
})

module.exports = router;