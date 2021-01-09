import { Component } from 'react'
import { connect } from 'react-redux'



export class _ToyFilter extends Component {

    state = {
        filterBy: {
            name: '',
            inStock: true,
            type: 'All'
        }
    }

    handleChange = ({ target }) => {
        const field = target.name

        const value = (field === 'inStock') ? target.checked : target.value

        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }

    render() {
        const { name, type, inStock } = this.state.filterBy
        return (
            <section className="toy-filter">
                <form className="filter-form" onSubmit={this.onFilter}>
                    <span style={{fontWeight: "bold"}}>Filter:</span> <label htmlFor="">Name</label>
                    <input type="text" name='name' value={name} onChange={this.handleChange} />
                    <label htmlFor="">Type</label>
                    <select onChange={this.handleChange} name="type" value={type}>
                        <option value="All">All</option>
                        <option value="Educational">Educational</option>
                        <option value="Funny">Funny</option>
                        <option value="Adult">Adult</option>
                    </select>
                    <input type="checkbox" checked={inStock} onChange={this.handleChange} name="inStock" />
                    <label>In Stock</label>
                    {/* <button>Filter</button> */}
                </form>
            </section>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        // toys: state.toyModule.toys,
        filterBy: state.toyModule.filterBy
    }
}

const mapDispatchToProps = {
}

export const ToyFilter = connect(mapStateToProps, mapDispatchToProps)(_ToyFilter)