import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

function _ToyPreview({ loggedInUser, toy, onRemove }) {
    return <article className="toy-preview flex col">
        <div className="title-container flex j-between a-center">
            <h2>{toy.name}</h2>
            {(loggedInUser && loggedInUser.isAdmin) && <Button color='secondary' onClick={() => onRemove(toy._id)}>X</Button>}
            {/* <Button color='secondary' onClick={() => onRemove(toy._id)}>X</Button> */}
        </div>
        <h3>${toy.price}</h3>
        <p>Category: {toy.type}</p>
        <img src={`https://robohash.org/${toy.name}?set=set4`} alt="" />
        <Button className="details-btn">
            <Link to={`/toy/${toy._id}`} style={{color:'#CC0000'}}>Details</Link>
        </Button>
    </article>
}

const mapStateToProps = (state) => {
    return { loggedInUser: state.userModule.loggedInUser }
}

export const ToyPreview = connect(mapStateToProps)(_ToyPreview)