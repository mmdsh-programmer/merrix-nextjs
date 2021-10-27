export const ProductReducer = (state, action) => {
    switch (action.type) {
        case "SET_PRODUCTS":
            state.allProducts = action.payload.products
            return {
                ...state,
            }
        case "FILTER_PRODUCTS":
            state.filteredProducts = action.payload.filtered
            return {
                ...state,
            }
        default:
            return state
    }
}