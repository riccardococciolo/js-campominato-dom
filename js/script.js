function generateNumbers(maxNumber) {
    let result = []
    for (let i = 1; i <= maxNumber; i++) {
        result.push(i);
    }
    return result
}

function getRndInteger(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateBombs(max) {
    const result = [];
    while (result.length < 16) {
        const rndNumber = getRndInteger(1, max);
        if(!result.includes(rndNumber)) {
            result.push(rndNumber)
        }
    }
    return result
}

console.log(generateNumbers(10));

document.querySelector(".button").addEventListener("click", function() {
    const level = document.getElementById("mySelect").value;
    let gridSize = "";
    let cellSize = "";

    switch (level) {
        case "easy":
            gridSize = generateNumbers(100)
            cellSize = 10;
            break;
        case "hard":
            gridSize = generateNumbers(81)
            cellSize = 9;
            break;
        case "insane":
            gridSize = generateNumbers(49)
            cellSize = 7;
            break;
    
        default:
            break;
    }

    gridGenerator(gridSize, cellSize);
})


const gridElem = document.querySelector(".grid");

function gridGenerator(maxGrid, cellSize) {
    gridElem.innerHTML = "";
    for (let i = 0; i < maxGrid.length; i++) {
        const curNumber = maxGrid[i];
        const cell = cellGenerator(curNumber, cellSize);
        cell.addEventListener("click", handleCellClick);
        gridElem.append(cell);
    }
}

console.log(gridGenerator);


function cellGenerator(innerNumber, cellSize) {
    const newCell = document.createElement("div");
    newCell.classList.add("cell");
    newCell.style.width = `calc(100% / ${cellSize})`;
    newCell.innerHTML = innerNumber;
    return newCell
}

function handleCellClick() {
        this.classList.add("lightblue");

}