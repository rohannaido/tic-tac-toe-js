const boxes = document.querySelectorAll(".box-input");

for(let i = 0; i < 9; i++){
    boxes[i].addEventListener("click", inputBoxClick)
}

const newGameBtn = document.querySelector(".newgame-btn");


function inputBoxClick(e){
    gameBoard.addNewState(parseInt(e.target.getAttribute("data-index")));
}

const gameBoard = (() => {
    let newGameState = ["","","","","","","","",""];
    let gameBoardStates = [[...newGameState]];
    let tool = "O";
    let indexOfX = [];
    let indexOfO = [];
    let movesCounter = 0;

    const winnerDisplayOutput = document.querySelector(".result-div");
    const newGameDiv = document.querySelector(".newgame-div");
    const newGameBgDiv = document.querySelector(".newgame-bg-div");
    const gameBoxDiv = document.querySelector(".gamebox-div");

    const setTool = (param) => {tool = param};
    
    const getPreviousState = () => {
        return gameBoardStates[gameBoardStates.length - 1];
    }
    
    const askNewGame = () => {
        console.log(newGameDiv);

        newGameDiv.style.display = "flex";
        newGameBgDiv.style.display = "flex";
        gameBoxDiv.style.filter = "blur(8px)"
    }

    const resetGame = () => {
        gameBoardStates = [[...newGameState]];
        tool = "O";
        indexOfX = [];
        indexOfO = [];
        displayController();
        winnerDisplayOutput.innerText = "";
        newGameDiv.style.display = "none";
        newGameBgDiv.style.display = "none";
        gameBoxDiv.style.filter = "none"

    }

    const checkWinner = () => {
        const winPositions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        
        let counterX = 0;
        let counterO = 0;
        for(let i = 0; i < winPositions.length; i++){
            for(let j = 0; j < 3; j++){
                if(indexOfX.includes(winPositions[i][j])){
                    counterX++;
                }
                else if(indexOfO.includes(winPositions[i][j])){
                    counterO++;
                }
            }

            if(counterX === 3){
                askNewGame();
                return "X";
            }
            else if(counterO === 3){
                askNewGame();
                return "O";
            }
            counterX = 0;
            counterO = 0;
        }
        console.log()
        if(indexOfO.length + indexOfX.length === 9){
            askNewGame();
            return "Tie";
        }

        return false;
    }

    const addToXandO = (tool, index) => {
        if(tool === "X"){
            indexOfX.push(index);
        }
        else if(tool === "O"){
            indexOfO.push(index);
        }
        
        if(checkWinner()){
            displayWinner(checkWinner());
        };
    }
    

    const displayWinner = (tool) => {
        if(tool === "X" || tool === "O"){
            winnerDisplayOutput.innerText = tool + " is the winner!";
        }
        else if(tool ==="Tie"){
            winnerDisplayOutput.innerText = "It is a Draw.";
        }
    }
    
    const toggleTool = () => {
        tool = (tool === "X") ? "O" : "X";
    }
    
    const addNewState = (index) => {
        if(getPreviousState()[index] === ""){
            movesCounter++;
            gameBoardStates.push(getPreviousState())
            getPreviousState()[index] = tool;
            addToXandO(tool, index);
            toggleTool();
            displayController();
        }
    }
    
    const displayController = () => {
        for(let i = 0; i < 9; i++){
            boxes[i].textContent = getPreviousState()[i]
        }
    }
    return {resetGame, setTool, displayController, addNewState};
})();

const startNewGame = () => {
    gameBoard.resetGame();
}
newGameBtn.addEventListener("click", startNewGame)

gameBoard.displayController();
