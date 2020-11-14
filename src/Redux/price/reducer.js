import {SET_PRICE_VALUE} from "./actionTypes";

const initialState = {
    // data
    data: [
        {
            id: 1,
            name: "supplier_price",
            label: "Մատակարար",
            placeholder: "Գին",
        },
        {
            id: 2,
            name: "buy_price",
            label: "Առք",
            placeholder: "Գին",
        },
        {
            id: 3,
            name: "sell_price",
            label: "Վաճառք",
            placeholder: "Գին",
        },
        {
            id: 4,
            name: "wholesale_price",
            label: "Մեծածախ",
            placeholder: "Գին",
        }
    ],
    // data values
    supplier_price: "",
    buy_price: "",
    sell_price: "",
    wholesale_price: "",
};

export default function priceReducer(state = initialState, action) {

    switch (action.type) {
        case SET_PRICE_VALUE:
            return {
                ...state, [action.name]: action.value
            };
        default:
            return {...state}
    }
}