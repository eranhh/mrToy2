import {createRef} from 'react'
import { connect } from 'react-redux'
import { addReview, removeReview } from '../store/actions/reviewActions.js'
import { Button } from '@material-ui/core'

const textareaRef = createRef()

function getToyReviews(toy, reviews) {

    return reviews.filter(review => {
        return review.aboutToy === toy._id
    })
}

function onAddReview(ev, addReview) {
    ev.preventDefault()
    addReview(textareaRef.current.value)
}

function _ToyReviews({ toy, reviews, addReview, removeReview }) {
    const toyReviews = getToyReviews(toy, reviews)

    return <section className="toy-reviews main-layout">
        <form onSubmit={(ev) => onAddReview(ev, addReview)}>
            <div className="flex j-between a-center">
                <h4>Add a review</h4>
                <Button type="submit">POST</Button>
            </div>
            <textarea ref={textareaRef}></textarea>
        </form>

        {(toyReviews && toyReviews.length) && <table cellPadding="0" cellSpacing="0">
            <thead>
                <tr>
                    <th>By</th>
                    <th>Review</th>
                    <th>Posted At</th>
                </tr>
            </thead>
            <tbody>
                {toyReviews.map(review => {
                    return <tr>
                        <td><h4>{review.by}</h4></td>
                        <td><h4>{review.txt}</h4></td>
                        <td><h4>{review.createdAt}</h4></td>
                    </tr>
                })}
            </tbody>
        </table>}
    </section>
}

const mapStateToProps = (state) => {
    return {
        reviews: state.reviewModule.reviews
    }
}

const mapDispatchToProps = {
    addReview,
    removeReview
}

export const ToyReviews = connect(mapStateToProps, mapDispatchToProps)(_ToyReviews)