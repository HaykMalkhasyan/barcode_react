import {CLOSE_CLASSIFIERS_WINDOW, SET_FILTERS_VALUE} from "./actionTypes";
import {getOnlySubgroupWithGroupId} from "../characteristics/actions";

/*-------------------------------------------------------------------------*/

export function closeClassifierWindow(index, id) {


    return dispatch => {
        dispatch(getOnlySubgroupWithGroupId(id));
        dispatch(setClassifiersWindowValue(index))
    }
}

export function setClassifiersWindowValue(index) {

    return {
        type: CLOSE_CLASSIFIERS_WINDOW,
        index
    }
}

export function setFiltersValue(name, value) {

    return {
        type: SET_FILTERS_VALUE,
        name,
        value
    }
}