// const sidebarCollapsed = (state = false, action) => {
//     switch (action.type) {
//         case 'SIDEBAR_COLLAPSED':
//             return action.collapsed
//         default:
//             return state
//     }
// }
//
// export default sidebarCollapsed

const initialState = {
    collapsed: JSON.parse(localStorage.getItem('type'))
};

export default function sidebarCollapsed(state = initialState, action) {

    switch (action.type) {

        case 'SIDEBAR_COLLAPSED':
            localStorage.setItem('type', action.collapsed)
            return {
                ...state, collapsed: action.collapsed
            };
        default: return state;
    }
}