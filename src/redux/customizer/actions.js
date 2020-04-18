export const sidebarImage = img => ({
    type: 'BG_IMAGE',
    img
})

export const setImage = () => ({
    type: 'BG_IMAGE_URL',
})

export function sidebarImageUrl(image) {

    return dispatch => {
        localStorage.setItem('image', image);
        dispatch(setImage())
    }
}

export function sidebarBgColor(color) {
    return {
        type: 'BG_COLOR',
        color
    }
}

export function sidebarCollapsed(collapsed) {
    return {
        type: 'SIDEBAR_COLLAPSED',
        collapsed
    }
}

export const sidebarSize = size => ({
    type: 'SIDEBAR_SIZE',
    size
})

