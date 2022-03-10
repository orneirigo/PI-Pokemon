const { Router } = require('express');
const { getPokemonAPI, getPokemonDB, getNameFromAPI, getNameFromDB, 
        createPokemon, getIdFromAPI, getIdFromDB } = require('../controllers/utilPokemon')
const router = Router();

router.get("/", async (req, res) => {
    const { name } = req.query
    try {
      if (name) {
            const namePokemon = name.toLowerCase()
            const nameAPI = await getNameFromAPI(namePokemon)
            if (!nameAPI) {
                    const nameDB = await getNameFromDB(namePokemon)
                    nameDB? res.status(200).json(nameDB) : res.status(404)
                } else res.status(200).json(nameAPI)
      } else {
            const pokesAPI = await getPokemonAPI()
            const pokesDB = await getPokemonDB()
            const pokemons = [...pokesAPI, ...pokesDB]
            res.status(200).json(pokemons)
        } 
      
    } catch (error) {
        res.status(400).send(`Get Pokemon by Name not found: ${error}`)
    }
})

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

router.get('/:idPokemon', async (req, res) => {
    const { idPokemon } = req.params
    try {
        if((!idPokemon.includes('-'))){
            const idAPI = await getIdFromAPI(idPokemon)
            res.status(200).json(idAPI)
        } else { 
            const idDB = await getIdFromDB(idPokemon)
            res.status(200).json(idDB)
        }

    } catch (error) {
        res.status(404).send(`Detail Pokemon by Id not found: ${error}`)
    }
})

module.exports = router;