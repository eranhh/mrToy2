import { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { ToyReviews } from '../cmps/ToyReviews.jsx'

class _ToyDetails extends Component {

    state = {
        toy: ''
    }

    componentDidMount() {
        const { toyId } = this.props.match.params
        if (toyId) {
            // console.log(this.props.toys)
            const toy = this.props.toys.find(_toy => {
                return _toy._id === toyId
            })
            console.log(toy)
            this.setState({ toy })
        }
    }

    render() {
        const { toy } = this.state
        const { loggedInUser } = this.props
        if (!toy) return <div className="loader"></div>
        return (
            <Fragment>
                <article className="toy-details flex col j-between">
                    <h1>{toy.name}</h1>
                    <h2>${toy.price}</h2>
                    <h3>Category: {toy.type}</h3>
                    <h4 className={toy.inStock ? 'green' : 'red'}>{toy.inStock ? 'In Stock' : 'Out of Stock'}</h4>
                    <img src={toy.inStock ? "../assets/img/inStock.png" : ''} alt="" />
                    <img src={`https://robohash.org/${toy.name}?set=set4`} alt="" />
                    <p className="muted">Created at {new Date(toy.createdAt).toLocaleTimeString("en-US")}
                    &nbsp;{new Date(toy.createdAt).toLocaleDateString("en-US")}</p>
                    {(loggedInUser && loggedInUser.isAdmin) && <Button color='secondary' className="edit-btn">
                        <Link to={`/toy/update/${toy._id}`}>Edit</Link>
                    </Button>}
                </article>
                <ToyReviews toy={this.state.toy} />
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        toys: state.toyModule.toys,
        loggedInUser: state.userModule.loggedInUser
    }
}

export const ToyDetails = connect(mapStateToProps)(_ToyDetails)