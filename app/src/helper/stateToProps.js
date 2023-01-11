export function stateToProps(...modes){
    return state => {
        const dataFormat = {};
        
        modes.forEach(mode => {
            dataFormat[mode] = state[mode];
        });

        return dataFormat;
    }
}