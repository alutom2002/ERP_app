export const type = {
    CHANGE_TAB: 'CHANGE_TAB'
};

export const changeTab = (index) => {
    return {
        type: type.CHANGE_TAB,
        payload: index
    };
};