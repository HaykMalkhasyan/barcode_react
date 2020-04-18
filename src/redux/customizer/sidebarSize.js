const initialState = {
    size: localStorage.getItem('size') || 'sidebar-md'
}

export default function sidebarSize(state = initialState, action) {

    switch (action.type) {

        case 'SIDEBAR_SIZE':
            localStorage.setItem('size', action.size)
            return {

            }
        default: return state;
    }
}