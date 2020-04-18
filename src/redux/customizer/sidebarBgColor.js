const initialState = {
    sidebarBgColor: localStorage.getItem('bgColor') || 'man-of-steel'
}

export default function sidebarBgColor(state = initialState, action) {

    switch (action.type) {

        case 'BG_COLOR':
            localStorage.setItem('bgColor', action.color)
            return {
                ...state, sidebarBgColor: action.color
            };
        default: return state;
    }
}