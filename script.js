'use strict';

const Player = () => {

    let _marker;

    const getMarker = () => {
        return _marker;
    };

    const setMarker = (sign) => {
        _marker = sign;
    };

    return {setMarker, getMarker};
    
};

const gameBoard = (() => {

    const board = ['1', '2', '3',
                   '4', '5', '6',
                   '7', '8', '9'];

    function (params) {
        
    }
})();

const gameController = (() => {
    
})();

const displayController = (() => {

})();
