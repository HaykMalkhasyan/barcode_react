const initialState = {
    size: localStorage.getItem('size') || 'sidebar-md',
    backgroundColor: sessionStorage.getItem('backgroundColor'),
    customBackgroundColor: sessionStorage.getItem('customBackgroundColor'),
    headerBackgroundColor: sessionStorage.getItem('headerBackgroundColor'),
    headerIconColor: sessionStorage.getItem('headerIconColor'),
    headerFontColor: sessionStorage.getItem('headerFontColor'),
    sectionBackgroundColor: sessionStorage.getItem('sectionBackgroundColor'),
    sectionIconColor: sessionStorage.getItem('sectionIconColor'),
    sectionFontColor: sessionStorage.getItem('sectionFontColor'),
    customIconColor: sessionStorage.getItem('customIconColor'),
    colorData: [
        {id: 1, forItem: 'red', color: '#ff1744', name: 'red'},
        {id: 2, forItem: 'pink', color: '#f50057', name: 'pink'},
        {id: 3, forItem: 'purple', color: '#d500f9', name: 'purple'},
        {id: 4, forItem: 'deepPurple', color: '#651fff', name: 'deep purple'},
        {id: 5, forItem: 'indigo', color: '#3d5afe', name: 'indigo'},
        {id: 6, forItem: 'blue', color: '#2979ff', name: 'blue'},
        {id: 7, forItem: 'lightBlue', color: '#00b0ff', name: 'light blue'},
        {id: 8, forItem: 'cyan', color: '#00e5ff', name: 'cyan'},
        {id: 9, forItem: 'teal', color: '#1de9b6', name: 'teal'},
        {id: 10, forItem: 'green', color: '#00e676', name: 'green'},
        {id: 11, forItem: 'lighGreen', color: '#76ff03', name: 'ligh green'},
        {id: 12, forItem: 'lime', color: '#c6ff00', name: 'lime'},
        {id: 13, forItem: 'yellow', color: '#ffea00', name: 'yellow'},
        {id: 14, forItem: 'amber', color: '#ffc400', name: 'amber'},
        {id: 15, forItem: 'orange', color: '#ff9100', name: 'orange'},
        {id: 16, forItem: 'deepOrange', color: '#ff3d00', name: 'deep orange'},
    ],
    customColorData: [
        {id: 1, forItem: 'red', color: '#ff1744', name: 'red'},
        {id: 2, forItem: 'pink', color: '#f50057', name: 'pink'},
        {id: 3, forItem: 'purple', color: '#d500f9', name: 'purple'},
        {id: 4, forItem: 'deepPurple', color: '#651fff', name: 'deep purple'},
        {id: 5, forItem: 'indigo', color: '#3d5afe', name: 'indigo'},
        {id: 6, forItem: 'blue', color: '#2979ff', name: 'blue'},
        {id: 7, forItem: 'lightBlue', color: '#00b0ff', name: 'light blue'},
        {id: 8, forItem: 'cyan', color: '#00e5ff', name: 'cyan'},
        {id: 9, forItem: 'teal', color: '#1de9b6', name: 'teal'},
        {id: 10, forItem: 'green', color: '#00e676', name: 'green'},
        {id: 11, forItem: 'lighGreen', color: '#76ff03', name: 'ligh green'},
        {id: 12, forItem: 'lime', color: '#c6ff00', name: 'lime'},
        {id: 13, forItem: 'yellow', color: '#ffea00', name: 'yellow'},
        {id: 14, forItem: 'amber', color: '#ffc400', name: 'amber'},
        {id: 15, forItem: 'orange', color: '#ff9100', name: 'orange'},
        {id: 16, forItem: 'deepOrange', color: '#ff3d00', name: 'deep orange'},
    ],
    customIconColorData: [
        {id: 1, forItem: 'red', color: '#ff1744', name: 'red'},
        {id: 2, forItem: 'pink', color: '#f50057', name: 'pink'},
        {id: 3, forItem: 'purple', color: '#d500f9', name: 'purple'},
        {id: 4, forItem: 'deepPurple', color: '#651fff', name: 'deep purple'},
        {id: 5, forItem: 'indigo', color: '#3d5afe', name: 'indigo'},
        {id: 6, forItem: 'blue', color: '#2979ff', name: 'blue'},
        {id: 7, forItem: 'lightBlue', color: '#00b0ff', name: 'light blue'},
        {id: 8, forItem: 'cyan', color: '#00e5ff', name: 'cyan'},
        {id: 9, forItem: 'teal', color: '#1de9b6', name: 'teal'},
        {id: 10, forItem: 'green', color: '#00e676', name: 'green'},
        {id: 11, forItem: 'lighGreen', color: '#76ff03', name: 'ligh green'},
        {id: 12, forItem: 'lime', color: '#c6ff00', name: 'lime'},
        {id: 13, forItem: 'yellow', color: '#ffea00', name: 'yellow'},
        {id: 14, forItem: 'amber', color: '#ffc400', name: 'amber'},
        {id: 15, forItem: 'orange', color: '#ff9100', name: 'orange'},
        {id: 16, forItem: 'deepOrange', color: '#ff3d00', name: 'deep orange'},
    ],
    headerColorData: [
        {id: 1, forItem: 'red', color: '#ff1744', name: 'red'},
        {id: 2, forItem: 'pink', color: '#f50057', name: 'pink'},
        {id: 3, forItem: 'purple', color: '#d500f9', name: 'purple'},
        {id: 4, forItem: 'deepPurple', color: '#651fff', name: 'deep purple'},
        {id: 5, forItem: 'indigo', color: '#3d5afe', name: 'indigo'},
        {id: 6, forItem: 'blue', color: '#2979ff', name: 'blue'},
        {id: 7, forItem: 'lightBlue', color: '#00b0ff', name: 'light blue'},
        {id: 8, forItem: 'cyan', color: '#00e5ff', name: 'cyan'},
        {id: 9, forItem: 'teal', color: '#1de9b6', name: 'teal'},
        {id: 10, forItem: 'green', color: '#00e676', name: 'green'},
        {id: 11, forItem: 'lighGreen', color: '#76ff03', name: 'ligh green'},
        {id: 12, forItem: 'lime', color: '#c6ff00', name: 'lime'},
        {id: 13, forItem: 'yellow', color: '#ffea00', name: 'yellow'},
        {id: 14, forItem: 'amber', color: '#ffc400', name: 'amber'},
        {id: 15, forItem: 'orange', color: '#ff9100', name: 'orange'},
        {id: 16, forItem: 'deepOrange', color: '#ff3d00', name: 'deep orange'},
    ],
    sectionColorData: [
        {id: 1, forItem: 'red', color: '#ff1744', name: 'red'},
        {id: 2, forItem: 'pink', color: '#f50057', name: 'pink'},
        {id: 3, forItem: 'purple', color: '#d500f9', name: 'purple'},
        {id: 4, forItem: 'deepPurple', color: '#651fff', name: 'deep purple'},
        {id: 5, forItem: 'indigo', color: '#3d5afe', name: 'indigo'},
        {id: 6, forItem: 'blue', color: '#2979ff', name: 'blue'},
        {id: 7, forItem: 'lightBlue', color: '#00b0ff', name: 'light blue'},
        {id: 8, forItem: 'cyan', color: '#00e5ff', name: 'cyan'},
        {id: 9, forItem: 'teal', color: '#1de9b6', name: 'teal'},
        {id: 10, forItem: 'green', color: '#00e676', name: 'green'},
        {id: 11, forItem: 'lighGreen', color: '#76ff03', name: 'ligh green'},
        {id: 12, forItem: 'lime', color: '#c6ff00', name: 'lime'},
        {id: 13, forItem: 'yellow', color: '#ffea00', name: 'yellow'},
        {id: 14, forItem: 'amber', color: '#ffc400', name: 'amber'},
        {id: 15, forItem: 'orange', color: '#ff9100', name: 'orange'},
        {id: 16, forItem: 'deepOrange', color: '#ff3d00', name: 'deep orange'},
    ],
}

export default function sidebarSize(state = initialState, action) {

    switch (action.type) {

        case 'set__color':
            sessionStorage.setItem(action.name, action.color)
            return {
                ...state,
                [action.name]: action.color
            }
        case 'reset__color':
            sessionStorage.removeItem(action.name)
            return {
                ...state,
                [action.name]: action.color
            }
        case 'SIDEBAR_SIZE':
            localStorage.setItem('size', action.size)
            return {}
        default:
            return state;
    }
}