import * as ActionType from "../constant/constant"
const GenderAndTypeProduct = JSON.parse(localStorage.getItem("GenderAndTypeProduct"))
const search = JSON.parse(localStorage.getItem("search"))

let initialState = {
    typeProduct: GenderAndTypeProduct?.typeProduct,
    gender: GenderAndTypeProduct?.gender,
    data: [],
    isLoading: false,
    filterColor: [],
    filterSize: [],
    dataSort: [],
    dataFilter: [],
    sortByTitle: "",
    dataSearchList: [],
    dataSearchInput: search === null ? [] : search
}
const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionType.FETCH_API_LIST_PRODUCT:
            state.data = payload
            state.dataSort = payload
            state.dataFilter = payload
            break;
        case ActionType.IS_LOADING_LIST_PRODUCT:
            state.isLoading = payload
            break;
        case ActionType.SORT_DATA:
            state.dataSort = payload
            break;
        case ActionType.FILTER_COLOR_DATA:
            state.dataFilter = payload
            break;
        case ActionType.FILTER_SIZE:
            state.filterSize = payload.filterSize
            break;
        case ActionType.FILTER_COLOR:
            state.filterColor = payload.filterColor
            break;
        case ActionType.DATA_SEARCH:
            state.dataSearchList = payload
            break;
        case ActionType.DATA_SEARCH_INPUT:
            state.dataSearchInput = payload
            break;
        case ActionType.CHANGE_GENDER_TYPEPRODUCT:
            state.typeProduct = payload.typeProduct
            state.gender = payload.gender
            localStorage.setItem("GenderAndTypeProduct", JSON.stringify({ gender: state.gender, typeProduct: state.typeProduct }))
            break
        case ActionType.SORT_BY_TITLE:
            state.sortByTitle = payload
            break
        default:
            break;
    }
    return { ...state }
}
export default reducer