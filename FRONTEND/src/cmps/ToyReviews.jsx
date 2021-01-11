import { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { loadReviews, addReview, removeReview } from '../store/actions/reviewActions.js'
import { Button } from '@material-ui/core'

class _ToyReviews extends Component {

    render() {
        console.log(this.props)
        const { toy } = this.props

        return <section className="toy-reviews main-layout">
            <form onSubmit={this.props.addReview}>
                <div className="flex j-between a-center">
                    <h4>Add a review</h4>
                    <Button>POST</Button>
                </div>
                <textarea></textarea>
            </form>

            {console.log(toy.reviews)}
            {(toy.reviews && toy.reviews.length) && <table cellpadding="0" cellspacing="0">
                <thead>
                    <th>By</th>
                    <th>Review</th>
                    <th>Posted At</th>
                </thead>
                <tbody>
                    {toy.reviews.map(review => {
                        <Fragment>
                            <tr>{review.by}</tr>
                            <tr>{review.txt}</tr>
                            <tr>{review.createdAt}</tr>
                        </Fragment>
                    })}
                </tbody>
            </table>}
        </section>
    }
}

const mapStateToProps = (state) => {
    return {
        reviews: state.reviewModule.reviews
    }
}

const mapDispatchToProps = {
    loadReviews,
    addReview,
    removeReview,
}

export const ToyReviews = connect(mapStateToProps, mapDispatchToProps)(_ToyReviews)