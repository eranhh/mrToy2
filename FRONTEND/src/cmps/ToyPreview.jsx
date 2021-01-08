import { Link } from 'react-router-dom'
// import React from 'react'
import { Button } from '@material-ui/core'

export function ToyPreview({ toy, onRemove }) {

    return <div className="toy-preview flex ">
        <div className="flex col">
        <h2>{toy.name}</h2>
        <h4>${toy.price}</h4>
        <p>Category: {toy.type}</p>
        <Link to={`/toy/${toy._id}`}>Details</Link>
        <Link to={`/toy/update/${toy._id}`}>Edit</Link>
        <Button color='secondary' onClick={() => onRemove(toy._id)}>X</Button>
        </div>
        <div>
            <img src={`https://robohash.org/${toy.name}`} alt=""/>
        </div>
        
    </div>
}