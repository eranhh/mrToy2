import { toyService } from "../../services/toyService"

export function loadToys(filterBy) {
    return (dispatch) => {
        return toyService.query(filterBy)
            .then(toys => {
                const action = {
                    type: 'SET_TOYS',
                    toys
                }
                dispatch(action)
            })
    }
}

export function addToy(toy) {
    return (dispatch) => {
        return toyService.saveToy(toy)
            .then((savedToy) => {
                const action = {
                    type: 'ADD_TOY',
                    toy: savedToy
                }
                dispatch(action)
            })
    }
}

export function updateToy(toy) {
    return (dispatch) => {
        return toyService.saveToy(toy)
            .then((toy) => {
                const action = {
                    type: 'SAVE_TOY',
                    toy
                }
                dispatch(action)
            })
    }
}

// export function setFilter(filterBy) {
//     return (dispatch) => {
//         const action = {
//             type: 'FILTER_TODOS',
//             filterBy
//         }
//         dispatch(action)
//     }
// }

export function removeToy(toyId) {
    return (dispatch) => {
        return toyService.removeToy(toyId)
            .then(() => {
                const action = {
                    type: 'REMOVE_TOY',
                    toyId
                }
                dispatch(action)
            })
    }
}