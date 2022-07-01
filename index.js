const boxes = document.querySelectorAll(".box-input");

for(let i = 0; i < 9; i++){
    boxes[i].addEventListener("click", inputBoxClick)
}

function inputBoxClick() {}

const gameBoard = (() => {
    // let gameBoardStates = [["X","O","X","X","O","","","",""]]
    let gameBoardStates = [["","","","","","","","",""]]
    let tool = "X";

    const setTool = (param) => {tool = param};
    
    const getPreviousState = () => {
        return gameBoardStates[gameBoardStates.length - 1];
    }

    const toggleTool = () => {
        tool = (tool === "X") ? "O" : "X";
    }
    
    const addNewState = (index) => {
        if(getPreviousState()[index] === ""){
            gameBoardStates.push(getPreviousState())
            getPreviousState()[index] = tool;
            toggleTool();
            displayController();
        }
    }
    
    const displayController = () => {
        for(let i = 0; i < 9; i++){
            boxes[i].textContent = getPreviousState()[i]
        }
    }
    return {setTool, displayController, addNewState};
})();

gameBoard.displayController();

gameBoard.addNewState(0)
gameBoard.addNewState(1)
gameBoard.addNewState(8)
gameBoard.addNewState(7)

gameBoard.addNewState(7)
gameBoard.addNewState(7)
gameBoard.addNewState(7)
gameBoard.addNewState(7)