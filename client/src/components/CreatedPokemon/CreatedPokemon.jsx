import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { getPokemons, getTypes, createdPokemon } from "../../actions";

function validation (input) {
    let msgError = {}
    let expString = /^[a-zA-Z]+$/;
    let expNumber =/^[1-9][0-9]*$/;
    let expUrlImage = /\.(jpg|png|gif)$/; 
    
    if (input.name === '') {
        msgError.name = 'Name is required'
    } else if (!expString.test(input.name)) {
        msgError.name = 'Name can only contain lettes'
    } else if (input.name.length < 4 || input.name.length > 10) {
        msgError.name = 'Name must have between 4-10 letters'
    }
    else if (input.hp === '' ) {
        msgError.hp = 'HP is required and must be a number'
    } else if (!expNumber.test(input.hp) || parseInt(input.hp) > 150) {
        msgError.hp = 'HP must be a positive number and <150'
    }
    else if (input.attack === '') {
        msgError.attack = 'Attack is required and must be a number'
    } else if (!expNumber.test(input.attack) || parseInt(input.attack) > 200) {
        msgError.attack = 'Attack must be a positive number and <200'
    }
    else if (input.defense === '') {
        msgError.defense = 'Defense is required and must be a number'
    } else if (!expNumber.test(input.defense) || parseInt(input.defense) > 200) {
        msgError.defense = 'Defense must be a positive number and <200'
    }
    else if (input.speed === '') {
        msgError.speed = 'Speed is required and must be a number'
    } else if (!expNumber.test(input.speed) || parseInt(input.speed) > 300) {
        msgError.speed = 'Speed must be a positive number and <300'
    }
    else if (!input.height === '') {
        msgError.height = 'Height is required and must be a number'
    } else if (!expNumber.test(input.height) || parseInt(input.height) > 350) {
        msgError.height = 'Height must be a positive number and <350'
    }
    else if (!input.weight === '') {
        msgError.weight = 'Weight is required and must be a number'
    } else if (!expNumber.test(input.weight) || parseInt(input.weight) > 400) {
        msgError.weight = 'Weight must be a positive number and <400'
    }
    else if (!input.image === '') {
        msgError.image = 'Image is required'
    } else if (!expUrlImage.test(input.image)) {
        msgError.image = 'Image must have a valid URL'
    }
    else if (input.types.length === 0) {
        msgError.types = 'Types are required'
    } else if (input.types.length > 2)  {
        msgError.types = 'A pokemon can only have 1 or 2 types'
    };
        return msgError
}

function CreatedPokemon () {
    const dispatch = useDispatch()
    const pokes = useSelector(state => state.pokemonsBackUp)
    const pokesTypes = useSelector(state => state.pokemonTypes)
    const [input, setInput] = useState({
        name: '', 
        hp: '', 
        attack: '', 
        defense: '', 
        speed: '', 
        height: '', 
        weight: '', 
        image: '', 
        types: []})
    
    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getTypes())
    }, [dispatch])

    const handleChangeInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        setErrors(validation({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleOptionInput = (e) => {
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
        setErrors(validation({
            ...input,
            types: [...input.types, e.target.value]
        }))
    }

    const handleSubmit = (e) => {
        const isAllowed = Object.keys(errors).length === 0 && input.name.length
        const existPokemon = pokes.find(p => p.name === input.name.toLowerCase())
        e.preventDefault()
        if (existPokemon) {
            alert ('The pokemon already exists! Try another name')
        } else if (isAllowed) {
            dispatch(createdPokemon(input))
            setInput({name: '', hp: '', attack: '', defense: '', speed: '', height: '', weight: '', image: '', types: []})
            alert('Pokemon created successfully!')
        } else {
            alert ('Incomplete form')
        }
    }

    const handleDelete = (type) => {
        setInput({
            ...input,
            types: input.types.filter(f => f !== type)
        })
        setErrors({
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
                    <input type='text' value={input.name} name='name' placeholder='Insert name' onChange={handleChangeInput}/>
                    {errors.name && (<p>{errors.name}</p>)}
                </div>
                <div>
                    <label>HP: </label>
                    <input type='number' value={input.hp} name='hp'  placeholder='Insert HP' onChange={handleChangeInput}/>
                    {errors.hp && (<p>{errors.hp}</p>)}
                </div>
                <div>
                    <label>Attack: </label>
                    <input type='number' value={input.attack} name='attack' placeholder='Insert attack' onChange={handleChangeInput}/>
                    {errors.attack && (<p>{errors.attack}</p>)}
                </div>
                <div>
                    <label>Defense: </label>
                    <input type='number' value={input.defense} name='defense' placeholder='Insert defense' onChange={handleChangeInput}/>
                    {errors.defense && (<p>{errors.defense}</p>)}
                </div>
                <div>
                    <label>Speed: </label>
                    <input type='number' value={input.speed} name='speed' placeholder='Insert speed' onChange={handleChangeInput}/>
                    {errors.speed && (<p>{errors.speed}</p>)}
                </div>
                <div>
                    <label>Height: </label>
                    <input type='number' value={input.height} name='height' placeholder='Insert height' onChange={handleChangeInput}/>
                    {errors.height && (<p>{errors.height}</p>)}
                </div>
                <div>
                    <label>Weight: </label>
                    <input type='number' value={input.weight} name='weight' placeholder='Insert weight' onChange={handleChangeInput}/>
                    {errors.weight && (<p>{errors.weight}</p>)}
                </div>
                <div>
                    <label>Image: </label>
                    <input type='text' value={input.image} name='image' placeholder='Insert image URL' onChange={handleChangeInput}/>
                    {errors.image && (<p>{errors.image}</p>)}
                </div>
                <div>
                    <div>
                        <label>Select a type: </label>
                        <select name='types' disabled={input.types.length >=2} onChange={handleOptionInput}>
                            {pokesTypes.map((t,i) => (
                                <option value={t.name} key={i}>{t.name[0].toUpperCase() + t.name.slice(1)}</option>))}
                        </select>
                    </div>
                    <div>
                        {input.types?.map((t,i) => (
                            <div key={(i*10)}>
                                <span> {t} </span>
                                <button onClick={() => handleDelete(t)}>X</button>
                            </div>
                            ))}
                    </div>
                    {errors.types && (<p>{errors.types}</p>)}
                </div>
                <button type='submit'>Create Pokemon</button>
            </form>
        </div>
    )
}

export default CreatedPokemon;