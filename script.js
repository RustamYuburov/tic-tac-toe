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
    const _board = ['', '', '',
                    '', '', '',
                    '', '', ''];
    
    const getBoard = () => {
        return _board;
    }

    return {getBoard}
})();

const displayController = (() => {

    const _arrayGrids = Array.from(document.querySelectorAll('.grid'));

    const getGrids = () => {
        return _arrayGrids;
    }
    
    const displayBoard = (arr) => {
        arr.forEach((item, index) => {
            _arrayGrids[index].textContent = item;
        });
    };

    return {getGrids, displayBoard}
    
})();

const gameController = (() => {  
    const _gameboard = gameBoard.getBoard();
    const _grids = displayController.getGrids();

    const player1 = Player();
    player1.setMarker('X')
    const player2 =  Player();
    player2.setMarker('O');

    let win = false;
    let isTie = false;
    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    function putSign(sign, index) {
        if (_gameboard[index] !== '') return;
        return _gameboard[index] = sign;
    }
    
    _grids.forEach(grid => { grid.addEventListener('click', getSign)})

    function getSign(e) {
        e.preventDefault();
        const index = e.target.getAttribute('data-index');
        putSign(player1.getMarker(), index);
        displayController.displayBoard(gameBoard.getBoard())
    }

})();
