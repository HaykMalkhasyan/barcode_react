const initialState = {
    sidebarImageUrl: localStorage.getItem('image') || '/static/media/01.b4490f4d.jpg'
}

export default function sidebarImageUrl(state = initialState, action) {

    switch (action.type) {

        case 'BG_IMAGE_URL':
            return {
                ...state, sidebarImageUrl: localStorage.getItem('image')
            }
        default: return state;
    }
}