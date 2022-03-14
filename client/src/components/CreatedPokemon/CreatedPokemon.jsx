import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemons, getTypes, createdPokemon } from "../../actions";
import styles from './CreatedPokemon.module.css';
import Logo from '../../images/Pokelogo.png';

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
            [e.target.name]: e.target.value
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
            types: input.types.filter(f => f !== type)
        })
    }

    return (
        <div className={styles.backgroundForm}>
            <div>
                <Link to='/home'> 
                    <img className={styles.logo} src={Logo} alt='Logo not found' width='400px'/>
                </Link>
            </div>
            <br/>
            <div className={styles.form}>
                <form onSubmit={handleSubmit}>
                    <h1 className={styles.title}>Create your own Pokemon!</h1>
                    <div className={styles.group}>
                        <input 
                        className={styles.inputDetail} 
                        type='text' 
                        value={input.name} 
                        name='name' 
                        placeholder='Name' 
                        onChange={handleChangeInput}/>
                        {errors.name && (<p className={styles.errors}>{errors.name}</p>)}
                    </div>
                    <div className={styles.group}>
                        <input 
                        className={styles.inputDetail} 
                        type='number' 
                        value={input.hp} 
                        name='hp'  
                        placeholder='HP' 
                        onChange={handleChangeInput}/>
                        {errors.hp && (<p className={styles.errors}>{errors.hp}</p>)}
                    </div>
                    <div className={styles.group}>
                        <input 
                        className={styles.inputDetail} 
                        type='number' 
                        value={input.attack} 
                        name='attack' 
                        placeholder='Attack' 
                        onChange={handleChangeInput}/>
                        {errors.attack && (<p className={styles.errors}>{errors.attack}</p>)}
                    </div>
                    <div className={styles.group}>
                        <input 
                        className={styles.inputDetail} 
                        type='number' 
                        value={input.defense} 
                        name='defense' 
                        placeholder='Defense' 
                        onChange={handleChangeInput}/>
                        {errors.defense && (<p className={styles.errors}>{errors.defense}</p>)}
                    </div>
                    <div className={styles.group}>
                        <input 
                        className={styles.inputDetail} 
                        type='number' 
                        value={input.speed} 
                        name='speed' 
                        placeholder='Speed' 
                        onChange={handleChangeInput}/>
                        {errors.speed && (<p className={styles.errors}>{errors.speed}</p>)}
                    </div>
                    <div className={styles.group}>
                        <input 
                        className={styles.inputDetail} 
                        type='number' 
                        value={input.height} 
                        name='height' 
                        placeholder='Height' 
                        onChange={handleChangeInput}/>
                        {errors.height && (<p className={styles.errors}>{errors.height}</p>)}
                    </div>
                    <div className={styles.group}>
                        <input 
                        className={styles.inputDetail} 
                        type='number' 
                        value={input.weight} 
                        name='weight' 
                        placeholder='Weight' 
                        onChange={handleChangeInput}/>
                        {errors.weight && (<p className={styles.errors}>{errors.weight}</p>)}
                    </div>
                    <div className={styles.group}>
                        <input 
                        className={styles.inputDetail}  
                        type='text' 
                        value={input.image} 
                        name='image' 
                        placeholder='URL Image' 
                        onChange={handleChangeInput}/>
                        {errors.image && (<p className={styles.errors}>{errors.image}</p>)}
                    </div>
                    <div className={styles.group}>
                        <div>
                            <label>Select a Type: </label>
                            <select 
                            className={styles.select} 
                            name='types' 
                            disabled={input.types.length >=2} 
                            onChange={handleOptionInput}>
                                {pokesTypes.map((t,i) => (
                                    <option value={t.name} key={i}>{t.name[0].toUpperCase() + t.name.slice(1)}</option>))}
                            </select>
                        </div>
                        <div className={styles.inputType}>
                            {input.types?.map((t,i) => (
                                <div key={(i*100)}>
                                    <span> {t} </span>
                                    <button onClick={() => handleDelete(t)}>X</button>
                                </div>
                                ))}
                        </div>
                        {errors.types && (<p className={styles.errors}>{errors.types}</p>)}
                    </div>
                        <button type='submit' className={styles.button}>Create Pokemon</button>
                </form>
            </div>
        </div>
    )
}

export default CreatedPokemon;