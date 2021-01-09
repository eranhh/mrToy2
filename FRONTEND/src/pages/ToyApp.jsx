import { Component } from 'react'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { loadToys, addToy, removeToy } from '../store/actions/toyActions.js'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class _ToyApp extends Component {

    // state = {
    //     filterBy: 
    // }
    
    componentDidMount() {
        this.props.loadToys()
    }

    onSetFilter = (filterBy) => {
        this.props.loadToys(filterBy)
    }

    // onSetFilter = (filterBy) => {
    //     this.props.setFilter(filterBy)
    //     this.setState({ filterBy })
    // }

    // get toysForDisplay() {
    //     let { toys } = this.props
    //     console.log(this.props)
        // switch (this.props.filterBy.type) {
        //     case 'done':
        //         toys = toys.filter(toy => toy.isDone)
        //         break;
        //     case 'active':
        //         toys = toys.filter(toy => !toy.isDone)
        //         break;
        // }

        // const regex = new RegExp(this.props.filterBy.text, 'i')
        // toys = toys.filter(toy => regex.test(toy.text))
        // return toys

    //     const { filterBy } = this.props;
    //     return toys.filter(toy => {
    //         return toy.name.includes(filterBy.name)
    //     });
    // }

    render() {
        const { toys, removeToy } = this.props
        // const toys = this.toysForDisplay
        return <section className="toy-app">
            <section>
                <ToyFilter onSetFilter={this.onSetFilter} />
                <Link className="add-btn" to="/toy/update">Add Toy</Link>
                <ToyList toys={toys} onRemove={removeToy} />
            </section>
        </section>
    }
}

const mapStateToProps = (state) => {
    return {
        toys: state.toyModule.toys,
        filterBy: state.toyModule.filterBy
    }
}

const mapDispatchToProps = {
    loadToys,
    addToy,
    removeToy,
}

export const ToyApp = connect(mapStateToProps, mapDispatchToProps)(_ToyApp)