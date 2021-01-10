import { addToy, updateToy } from '../store/actions/toyActions.js'
import { Component } from 'react'
import { connect } from 'react-redux'
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'

class _ToyUpdate extends Component {

    state = {
        toy: {
            name: '',
            price: 0,
            inStock: true,
            type: 'Educational',
            addedBy: this.props.loggedInUser.username
        }
    }

    componentDidMount() {
        const { toyId } = this.props.match.params
        if (toyId) {
            const toy = this.props.toys.find(toy => {
                return toy._id === toyId
            })
            this.setState({ toy })
        }
    }

    handleInput = ({ target }) => {
        const field = target.name
        let value
        value = (field === 'inStock') ? target.checked : target.value
        value = (field === 'price') ? +value : value

        this.setState(prevState => {
            return {
                toy: {
                    ...prevState.toy,
                    [field]: value
                }
            }
        })
    }

    onSaveToy = (ev) => {
        ev.preventDefault()
        const { toy } = this.state
        // if (!toy.name) return
        if (toy._id) {
            this.props.updateToy(toy).then(() => this.props.history.push('/toy'))
        } else {
            this.props.addToy(toy).then(() => this.props.history.push('/toy'))
        }
        this.setState({ toy: { name: '', price: 0, inStock: true } })
    }

    render() {
        console.log(this.props.loggedInUser)

        const { toy } = this.state
        if (!toy) return <div className="loader"></div>
        return (
            <div className="toy-update">
                <h3>{toy._id ? 'Update' : 'Add'} Toy</h3>
                <form className="flex col j-between" onSubmit={this.onSaveToy}>
                    <TextField id="standard-secondary" label="Name" type="text" name="name" value={toy.name} placeholder="Name" color="secondary" onChange={this.handleInput} />
                    <TextField label="Price" type="number" value={toy.price} onChange={this.handleInput} name="price" />
                    <select onChange={this.handleInput} name="type" value={toy.type}>
                        <option value="educational">Educational</option>
                        <option value="funny">Funny</option>
                        <option value="adult">Adult</option>
                    </select>
                    <div className="flex a-center">
                        <input type="checkbox" checked={toy.inStock} onChange={this.handleInput} name="inStock" />
                        <label>in Stock</label>
                    </div>
                    <Button type="submit" color='secondary'>Save</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        toys: state.toyModule.toys,
        loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    addToy,
    updateToy
}

export const ToyUpdate = connect(mapStateToProps, mapDispatchToProps)(_ToyUpdate)