import API from "../../../../Axios/API";
import * as ActionType from "../constant/constant"

export const createAction = ({ type, payload }) => {
    return {
        type,
        payload
    }
}


export const actGetProductAPI = (gender, typeProduct) => {
    return async (dispatch) => {
        try {
            dispatch(createAction({ type: ActionType.IS_LOADING_LIST_PRODUCT, payload: true }))
            const res = await API(
                `product/?gender=${gender}&typeProduct=${typeProduct}`,
                "GET"
            );
            dispatch(
                createAction({
                    type: ActionType.FETCH_API_LIST_PRODUCT,
                    payload: res.data
                })
            );
            // console.log(res.data);
            dispatch(createAction({ type: ActionType.IS_LOADING_LIST_PRODUCT, payload: false }))
            localStorage.setItem("GenderAndTypeProduct", JSON.stringify({gender: gender, typeProduct: typeProduct}))
            // console.log(res.data);

        } catch (error) {
            console.log({ ...error });
        }
    }
}


