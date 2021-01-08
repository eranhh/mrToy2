import { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

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
        if (!toy) return <div className="loader"></div>
        return (
            <div className="toy-details flex col j-center">
                <h1>{toy.name}</h1>
                <h2>${toy.price}</h2>
                <h3>Toy type: {toy.type}</h3>
                <h4>{toy.inStock}</h4>
                <p className="muted">Created at {new Date(toy.createdAt).toLocaleTimeString("en-US")}
                    &nbsp;{new Date(toy.createdAt).toLocaleDateString("en-US")}</p>
                <Link to={`/toy/update/${toy._id}`}>Edit</Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        toys: state.toyModule.toys
    }
}

export const ToyDetails = connect(mapStateToProps)(_ToyDetails)