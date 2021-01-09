import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

export function ToyPreview({ toy, onRemove }) {

    return <article className="toy-preview flex col">
        <div className="title-container flex j-between a-center">
            <h2>{toy.name}</h2>
            <Button color='secondary' onClick={() => onRemove(toy._id)}>X</Button>
        </div>
        <h4>${toy.price}</h4>
        <p>Category: {toy.type}</p>
        <img src={`https://robohash.org/${toy.name}?set=set4`} alt="" />
        <Button color='secondary' className="details-btn">
            <Link to={`/toy/${toy._id}`}>Details</Link>
        </Button>
    </article>
}