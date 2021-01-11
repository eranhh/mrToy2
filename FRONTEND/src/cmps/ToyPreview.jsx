import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { removeToy } from '../store/actions/toyActions.js'
import { loadReviews } from '../store/actions/reviewActions.js'

function _ToyPreview({ loggedInUser, toy, removeToy }) {
    return <article className="toy-preview flex col">
        <div className="title-container flex j-between a-center">
            <h2>{toy.name}</h2>
            {(loggedInUser && loggedInUser.isAdmin) && <Button color='secondary' onClick={() => removeToy(toy._id)}>X</Button>}
            {/* <Button color='secondary' onClick={() => removeToy(toy._id)}>X</Button> */}
        </div>
        <h3>${toy.price}</h3>
        <p>Category: {toy.type}</p>
        <img src={`https://robohash.org/${toy.name}?set=set4`} alt="" />
        <Button className="details-btn">
            <Link to={`/toy/${toy._id}`} style={{ color: '#CC0000' }}>Details</Link>
        </Button>
    </article>
}

const mapStateToProps = (state) => {
    return {
        reviews: state.reviewModule.reviews,
        loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    removeToy,
    loadReviews
}

export const ToyPreview = connect(mapStateToProps, mapDispatchToProps)(_ToyPreview)