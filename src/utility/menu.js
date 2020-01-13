const menuData = [
    {
        name: 'File',
        icon: 'Favorite',
        subMenu: ['New File', 'Open', 'Open Recent', 'ReOpen with Encoding', 'New View into File', 'Save', 'Save with Encoding', 'Sava As', 'Save All']
    }, {
        name: 'Edit',
        icon: 'PersonPin',
        subMenu: ['Undo Insert Characters', 'Repeat Insert Characters', 'Undo Selection', 'Copy', 'Cut', 'Paste', 'Paste and Indent', 'Paste from History']
    }, {
        name: 'Selection',
        icon: 'Help',
        subMenu: ['Split into Lines', 'Add Previous Line', 'Add Next Line', 'Single Selection', 'Invert Selection']
    }, {
        name: 'Find',
        icon: 'ShoppingBasket',
        subMenu: ['Find', 'Find Next', 'Find Previous', 'Increment Find']
    }, {
        name: 'View',
        icon: 'ThumbDown',
        subMenu: ['Show minimap', 'Hide Tabs', 'Hide Status Bar', 'Show Console', 'Enter Full Screen', 'Enter Distraction Free Mode', 'Layout', 'Groups']
    }, {
        name: 'Goto',
        icon: 'ThumbUp',
        subMenu: ['Goto Anything', 'Goto Symbol', 'Goto Symbol in Project', 'Goto Definition', 'Goto Line', 'Jump Back', 'Jump Forward']
    }
];
export const menuAPI = {
    get: () =>
        new Promise(resolve => {
            setTimeout(() => resolve(menuData), 500);
        }),
};
export default menuData;