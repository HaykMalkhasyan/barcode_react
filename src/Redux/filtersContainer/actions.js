import {BACK_FILTERS, CLOSE_CLASSIFIERS_WINDOW, SET_FILTERS_VALUE} from "./actionTypes";
import {getOnlySubgroupWithGroupId} from "../characteristics/actions";

export function sortTableTabs(in_index, out_index) {

    return (dispatch, getState) => {
        if (in_index !== out_index) {
            const tabs = [...getState().filters.tabs];
            let item = tabs[out_index];
            tabs.splice(in_index + 1, 0, item);

            if (in_index > out_index) {
                tabs.splice(out_index, 1)
            } else  {
                tabs.splice(out_index + 1, 1)
            }
            localStorage.setItem('table_place', JSON.stringify(tabs));
            dispatch(setFiltersValue('tabs', tabs))
        }
    }
}

/*-------------------------------------------------------------------------*/

export function closeClassifierWindow(index, id) {


    return dispatch => {
        dispatch(getOnlySubgroupWithGroupId(id));
        dispatch(setClassifiersWindowValue(index))
    }
}

export function backFiltersPage() {

    return {
        type: BACK_FILTERS
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