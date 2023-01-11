export const type = {
    SET_ACCOUNT: 'SET_ACCOUNT',
    CLEAR_ACCOUNT: 'CLEAR_ACCOUNT'
};

export const setAccount = (name, role, address) => {
    return {
        type: type.SET_ACCOUNT,
        payload: {
            name: name,
            role: role,
            address: address
        }
    }
}

export const clearAccount = () => {
    return {
        type: type.CLEAR_ACCOUNT
    }
}