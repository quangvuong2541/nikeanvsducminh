import * as ActionType from "../contants/constant"
const cartLocal = JSON.parse(localStorage.getItem("cart"))
const userFavor = JSON.parse(localStorage.getItem("userFavor"))
const initialState = {
    products: cartLocal || [],
    productFavor: userFavor || []
}
const checkDuplicate = (payload, arr) => {
    for (const item of arr) {
        if (item.id === payload.id &&
            item.color === payload.color &&
            item.size === payload.size) {
            return item
        }
    }
    return null
}
const checkDuplicateFavor = (payload) => {
    const userFavor = JSON.parse(localStorage.getItem("userFavor"))
    // console.log(userFavor);
    for (const item of userFavor) {
        if (item?.name === payload.name &&
            item?.color === payload.color &&
            item?.size === payload.size) {
            return item
        }
    }
    return null
}
const reducerCart = (state = initialState, { type, payload }) => {
    let productCopy = [...state.products]
    let productFavorCopy = [...state.productFavor]
    // console.log(payload);
    switch (type) {
        case ActionType.ADD_TO_CARD:
            // console.log(productCopy);
            //  nếu add thêm sản phẩm thì check duplicate 
            const itemAdd = checkDuplicate(payload, productCopy)
            // console.log(payload);
            if (itemAdd) {

                itemAdd.quantity += 1
            } else {
                productCopy = [...productCopy, payload]
            }
            state.products = productCopy
            // console.log(state.products);
            localStorage.setItem("cart", JSON.stringify(state.products))
            break;
        case ActionType.UPDATE_SIZE_COLOR:
            const { quantity, item, size } = payload
            const itemUpdate = checkDuplicate(item, productCopy)
            if (quantity) {
                itemUpdate.quantity = parseInt(quantity)
            } else if (size) {
                itemUpdate.size = size
            }
            state.products = productCopy
            localStorage.setItem("cart", JSON.stringify(productCopy))
            break;
        case ActionType.REMOVE_TO_CARD:
            const itemRemove = checkDuplicate(payload, productCopy)
            const index = productCopy.findIndex((item) => {
                return item.id === itemRemove.id
            })
            if (itemRemove.quantity > 1) {
                itemRemove.quantity -= 1
            } else {
                productCopy.splice(index, 1)
            }
            state.products = productCopy
            localStorage.setItem("cart", JSON.stringify(state.products))
            break;
        case ActionType.RESET_CART:
            state.products = payload
            break;
        case ActionType.ADD_TO_CARDFAVOR:
            const itemCheckFavor = checkDuplicateFavor(payload)
            if (itemCheckFavor) {
                console.log(("shoes alredy exist in the hobby (USERFAVOR VS CLICK"));
            } else {
                console.log("success");
                productFavorCopy = [...productFavorCopy, payload]
            }
            state.productFavor = productFavorCopy
            localStorage.setItem("userFavor", JSON.stringify(state.productFavor))
            break;
        case ActionType.REMOVECARDFAVOR:
            const checkUseLocal = checkDuplicateFavor(payload)
            if (checkUseLocal) {
                alert("shoes already exits in the hobby")
            } else {
                alert("success")
                productFavorCopy = [...productFavorCopy, payload]
                // ======
                const itemRemove = checkDuplicate(payload, productCopy)
                const index = productCopy.findIndex((item) => {
                    return item.id === itemRemove.id
                })
                if (itemRemove.quantity > 1) {
                    itemRemove.quantity -= 1
                } else {
                    productCopy.splice(index, 1)
                }
                state.products = productCopy
                localStorage.setItem("cart", JSON.stringify(state.products))
            }
            state.products = productCopy;
            localStorage.setItem("userFavor", JSON.stringify(state.products))
            break
        case ActionType.DELETE_FAVOR:
            const userFavor = JSON.parse(localStorage.getItem("userFavor"))
            const favorRemove = checkDuplicateFavor(payload)
            const index1 = userFavor.findIndex((item) => {
                return item._id === favorRemove._id
            })
            if (favorRemove.quantity === 1) {
                userFavor.splice(index1, 1)
            }
            state.productFavor = userFavor
            localStorage.setItem("userFavor", JSON.stringify(state.productFavor))
            break
        default:
            break;
    }
    return { ...state }

}
export default reducerCart