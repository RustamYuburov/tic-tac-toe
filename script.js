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

    const _board = ['1', '2', '3',
                   '4', '5', '6',
                   '7', '8', '9'];
    
    const getBoard = () => {
        return _board;
    }

    return {getBoard}
})();

const gameController = (() => {
    
})();

const displayController = (() => {

    const arrayGrids = Array.from(document.querySelectorAll('.grid'));
    console.log(arrayGrids[0].textContent = 'x');
    
    const displayBoard = (arr) => {
        arr.forEach((item, index) => {
            arrayGrids[index].textContent = item;
        });
    };

    
})();
console.log(gameBoard.getBoard())
