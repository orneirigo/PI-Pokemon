import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { getPokemons, getTypes, createdPokemon } from "../../actions";

function validate (input) {
    const errors = {}
    // VER PAGINA GUARDADA PARA VALIDACIONES!! BUSCAR EN YOUTUBE!
    if (input.name === '') {errors.name = 'Name is required'}
    if (input.hp < 0) {errors.hp = 'HP must be a number > 0'}
    // HACER LOS DEMAS! LOS QUE MAS PUEDA!!
}

function CreatedPokemon () {
    const dispatch = useDispatch()
    const history = useNavigate() // VER!!!
    const pokeTypes = useSelector(state => state.pokemonTypes)
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({name: '', hp: '', attack: '', defense: '', speed: '', height: '', weight: '', image: '', types: []})
    

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    const handleChangeInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        // TERMINAR ESTO!
        // setErrors(validate({
        //     ...input,
        //     [e.target.name]: e.target.value
        // }))
        //setInput('')
        console.log(input)
    }

    const handleOptionInput = (e) => {
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(input)
        dispatch(createdPokemon(input))
        alert('Pokemon created successfully!')
        setInput({name: '', hp: '', attack: '', defense: '', speed: '', height: '', weight: '', image: '', types: []})
    }

    const handleDelete = (type) => {
        setInput({
            ...input,
            types: input.types.filter(f => f !== type)
        })
    }

    return (
        <div>
            <Link to='/home'> 
                 {/* PONER UN LOGO! VER */}
                <button>Back Home</button>
            </Link>
            <h1>Create your own Pokemon!</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input type='text' value={input.name} name='name' onChange={handleChangeInput}/>
                    {errors.name && (<p>{errors.name}</p>)}
                </div>
                <div>
                    <label>HP: </label>
                    <input type='text' value={input.hp} name='hp' onChange={handleChangeInput}/>
                </div>
                <div>
                    <label>Attack: </label>
                    <input type='text' value={input.attack} name='attack' onChange={handleChangeInput}/>
                </div>
                <div>
                    <label>Defense: </label>
                    <input type='text' value={input.defense} name='defense' onChange={handleChangeInput}/>
                </div>
                <div>
                    <label>Speed: </label>
                    <input type='text' value={input.speed} name='speed' onChange={handleChangeInput}/>
                </div>
                <div>
                    <label>Height: </label>
                    <input type='text' value={input.height} name='height' onChange={handleChangeInput}/>
                </div>
                <div>
                    <label>Weight: </label>
                    <input type='text' value={input.weight} name='weight' onChange={handleChangeInput}/>
                </div>
                <div>
                    <label>Image: </label>
                    <input type='text' value={input.image} name='image' onChange={handleChangeInput}/>
                </div>
                <div>
                    <label>Select a type: </label>
                    <select onChange={handleOptionInput} name='types'>
                        {pokeTypes.map((t,i) => (
                            <option value={t.name} key={i}>{t.name[0].toUpperCase() + t.name.slice(1)}</option>))}
                    </select>
                </div>
                <div>
                    {input.types?.map((t,i) => (
                        <div key={(i)}>
                            <span> {t} </span>
                            <button onClick={() => handleDelete(t)}>X</button>
                        </div>
                        ))}
                    </div>
                <button type='submit'>Create Pokemon</button>
            </form>
        </div>
    )

}

export default CreatedPokemon;