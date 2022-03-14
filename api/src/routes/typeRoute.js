const { Router } = require('express');
const { getPekemonTypes } = require('../controllers/utilType')
const router = Router();

router.get('/', async (req,res) => {
    try {
        const pokemonTypes = await getPekemonTypes()
        res.json(pokemonTypes)

    } catch (error) {
        res.status(400).send(`Type Pokemon Error: ${error}`)
    }
})

module.exports = router;