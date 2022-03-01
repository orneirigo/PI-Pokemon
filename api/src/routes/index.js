const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', (req, res) =>{
    res.send('HOLA!!! soy orne en get')
})

router.post('/', (req, res) =>{
    res.send('HOLA!!! soy orne en post')
})


module.exports = router;
