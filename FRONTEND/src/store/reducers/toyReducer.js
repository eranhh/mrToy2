const initialState = {
    toys: [],
    // filterBy: { type: 'All', name: '' , inStock: true }
}

export function toyReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TOYS':
            return { ...state, toys: action.toys }
        case 'SAVE_TOY':
            return {
                ...state,
                toys: state.toys.map(toy => (toy._id === action.toy._id) ? action.toy : toy)
            }
        case 'ADD_TOY':
            return {
                ...state,
                toys: [...state.toys, action.toy]
            }
        case 'REMOVE_TOY':
            return { ...state, toys: state.toys.filter(toy => toy._id !== action.toyId) }
        // case 'FILTER_TOYS':
        //     return { ...state, filterBy: action.filterBy }
        default:
            return state
    }
}