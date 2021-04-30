'use strict';

const Player = () => {

    let _marker;
    let _status = true;

    const getMarker = () => {
        return _marker;
    };
    const setMarker = (sign) => {
        _marker = sign;
    };
    
    const getStatus = () => {
        return _status;
    }
    
    const setStatus = (stat) => {
        _status = stat;
    };


    return { setMarker, getMarker, getStatus, setStatus };

};

const gameBoard = (() => {

    let _board = ['', '', '',
                    '', '', '',
                    '', '', ''];
    
    const getBoard = () => {
        return _board;
    }

    const clearBoard = () => {
        for (let i = 0; i < _board.length; i++) {
            _board[i] = '';
        }
    }

    return {getBoard, clearBoard}

})();

const displayController = (() => {
    
    const _arrayGrids = Array.from(document.querySelectorAll('.grid'));
    const _alertModule = document.querySelector('.alert-module');
    const _alertModuleText = document.querySelector('.alert-text');
    const _overlay = document.querySelector('.overlay')
    const restartButton = document.querySelector('#restart-btn');

    const getGrids = () => {
        return _arrayGrids;
    }

    const getAlertModule = () =>{
        return _alertModule;
    }
    
    const displayBoard = (arr) => {
        arr.forEach((item, index) => {
            return _arrayGrids[index].innerHTML = item;
        });
    };
    
    const displayWinner = (result) => {
        if (result === false) return;
        _alertModuleText.textContent = result;
        _alertModule.classList.add('active');
        _overlay.classList.add('active');
    };

    const restart = () => {
        gameController.reset();
        _alertModule.classList.remove('active');
        _overlay.classList.remove('active')
    }

    restartButton.addEventListener('click', restart);
    
    return {getGrids, displayBoard, displayWinner,};
    
})();

const gameController = (() => {  

    let _gameboard = gameBoard.getBoard();
    const _grids = displayController.getGrids();

    const player1 = Player();
    player1.setMarker('X');
    const player2 =  Player();
    player2.setMarker('O');

    // Fucntions for check whick Player won
    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    const checkWinO = () => {
        return winConditions.some((row) => {
            return row.every((i) => {
                return _gameboard[i] === "O";
            });
        });
    }

    const checkWinX = () => {
        return winConditions.some((row) => {
            return row.every((i) => {
                return _gameboard[i] === "X";
            });
        });
    }

    const isTie = () => {
        return _grids.every((grid) => {
          return grid.textContent === "X" || grid.textContent === "O";
        });
      }

    const checkWinner = () => {
        if (checkWinX()) return 'Player1 Won! Play Again?';
        if (checkWinO()) return 'Player2 Won! Play Again?';
        if (isTie()) return 'Is a Tie! Another Round?';
        return false;
    }

    const choosePlayer = (playerA, playerB) => {
        if (playerA.getStatus() === true && playerB.getStatus() === true) {
            playerA.setStatus(false);
            playerB.setStatus(true);
            return playerA.getMarker();
        } else if (playerA.getStatus() === true) {
            playerA.setStatus(false);
            playerB.setStatus(true);
            return playerA.getMarker();
        } else if (playerB.getStatus() === true) {
            playerA.setStatus(true);
            playerB.setStatus(false);
            return playerB.getMarker();
        }
    }

    const putSign = (sign, index) => {
        if (_gameboard[index] !== '') return;
        return _gameboard[index] = sign;
    }
    
    const playRound = (e) => {
        e.preventDefault();
        const index = e.target.getAttribute('data-index');
        putSign(choosePlayer(player1, player2), index);
        displayController.displayBoard(_gameboard);
        displayController.displayWinner(checkWinner());
    }

    const reset = () => {
        player1.setStatus(true);
        player2.setStatus(false);
        gameBoard.clearBoard();
        _gameboard = gameBoard.getBoard();
        displayController.displayBoard(_gameboard);
    }
    
    _grids.forEach(grid => { grid.addEventListener('click', playRound);});

    return {reset};
    
})();
