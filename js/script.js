function generateNumbers(maxNumber) {
    let result = []
    for (let i = 1; i <= maxNumber; i++) {
        result.push(i);
    }
    return result
}

const clickedCell = [];

function getRndInteger(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(generateNumbers(10));

document.querySelector(".button").addEventListener("click", function () {
    const level = document.getElementById("mySelect").value;
    let gridSize = [];
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

    function generateBombs(max) {
        const result = [];
        while (result.length < 16) {
            const rndNumber = getRndInteger(1, max.length);
            console.log(rndNumber);
            if (!result.includes(rndNumber)) {
                result.push(rndNumber);
            }
        }
        console.log(result);
        return result
    }

    console.log(gridSize);
    

    const bombs = generateBombs(gridSize);
    const maxClick = gridSize - bombs.length;

    let cell = "";

    function gridGenerator(maxGrid, cellSize) {
        gridElem.innerHTML = "";
        for (let i = 0; i < maxGrid.length; i++) {
            const curNumber = maxGrid[i];
            let cell = cellGenerator(curNumber, cellSize);
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
        const clickedNumber = parseInt(this.textContent);
        console.log(clickedNumber);

        if(bombs.includes(clickedNumber)) {
            endGame(false);
        } else {
            this.classList.add("lightblue");
            clickedCell.push(clickedNumber);
            if (clickedCell.length === maxClick) {
                endGame(true);
            }
        }
    }

    function endGame(isWinner) {
        gridElem.querySelectorAll(".cell").forEach(cell =>  {
            const cellNumber = parseInt(cell.textContent);
            if (bombs.includes(cellNumber)) {
                cell.classList.add("red");
            }
            cell.removeEventListener("click", handleCellClick);
        });
    
        if (isWinner) {
            const win = document.createElement('H1');
            win.textContent = "Congratulazioni, hai vinto!";
            gridElem.append(win);
            console.log("Congratulazioni, hai vinto!");
        } else {
            const lose = document.createElement('H1');
            lose.textContent = `Hai trovato una bomba, hai perso!
            Il tuo punteggio é: ${clickedCell.length}`;
            gridElem.append(lose);
            console.log(`Hai trovato una bomba, hai perso!
            Il tuo punteggio é: ${clickedCell.length}`);
            
        }
    }
})


const gridElem = document.querySelector(".grid");