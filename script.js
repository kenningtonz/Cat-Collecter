let floodTime = 10;
let currentTime = 0;
let myCats = 0;
let allCatsInShelter = 0;

let catRoamingSpace = document.querySelector(`#roamingCats`);
let audio = new Audio("./meow .m4a");


let catTypes = ["./imgs/catBlack.gif", "./imgs/catWhite.gif", "./imgs/catOrange.gif", "./imgs/catCalico.gif", "./imgs/catGrey.gif"];

let catTypesWalk = ["./imgs/catBlackWalk.gif", "./imgs/catWhiteWalk.gif", "./imgs/catOrangeWalk.gif", "./imgs/catCalicoWalk.gif", "./imgs/catGreyWalk.gif"];

let theShelter = [];

// let theShelter = [
//     [{
//         chanceOfFinding,
//         amt,
//         collected: false
//     }, {
//         chanceOfFinding: .3,
//         amt: 10,
//         collected: false
//     }, {
//         chanceOfFinding: .9,
//         amt: 1,
//         collected: false
//     }, {
//         chanceOfFinding: .9,
//         amt: 7,
//         collected: false
//     }],
//     [{
//         chanceOfFinding: .2,
//         amt: 3,
//         collected: false
//     }, {
//         chanceOfFinding: .4,
//         amt: 2,
//         collected: false
//     }, {
//         chanceOfFinding: .4,
//         amt: 2,
//         collected: false
//     }, {
//         chanceOfFinding: .5,
//         amt: 6,
//         collected: false
//     }],
//     [{
//         chanceOfFinding: .4,
//         amt: 2,
//         collected: false
//     }, {
//         chanceOfFinding: .5,
//         amt: 6,
//         collected: false
//     }, {
//         chanceOfFinding: .2,
//         amt: 3,
//         collected: false
//     }, {
//         chanceOfFinding: .4,
//         amt: 5,
//         collected: false
//     }],
//     [{
//         chanceOfFinding: .7,
//         amt: 6,
//         collected: false
//     }, {
//         chanceOfFinding: .2,
//         amt: 7,
//         collected: false
//     }, {
//         chanceOfFinding: .8,
//         amt: 4,
//         collected: false
//     }, {
//         chanceOfFinding: .4,
//         amt: 3,
//         collected: false
//     }],
//     [{
//         chanceOfFinding: .6,
//         amt: 2,
//         collected: false
//     }, {
//         chanceOfFinding: .1,
//         amt: 9,
//         collected: false
//     }, {
//         chanceOfFinding: .6,
//         amt: 8,
//         collected: false
//     }, {
//         chanceOfFinding: .8,
//         amt: 4,
//         collected: false
//     }]
// ]
// let shelterLength = theShelter.length;
// let shelterWidth = theShelter[1].length;

let shelterLength = 5;
let shelterWidth = 4;
let maxCatsPerHouse = 10;

let houses = ["pumpkin", "kirby", "pineapple", "cactus", "strawberry"];

function assignHouses() {
    for (let y = 0; y < shelterLength; y++) {
        for (let x = 0; x < shelterWidth; x++) {
            let rndInt = Math.floor(Math.random() * 5);
            let mySquare = document.querySelector(`#shelter_${x}_${y} `);
            mySquare.classList.add(`${houses[rndInt]}`);
        }
    }
}

function onScreenConsoleLog(text) {
    let onScreenUpdates = document.querySelector("#onScreenUpdates");
    onScreenUpdates.innerHTML = text;
}

//creates shelter randomly
function createShelter() {
    for (let y = 0; y < shelterLength; y++) {
        theShelter[y] = [];
        for (let x = 0; x < shelterWidth; x++) {
            let rndAmt = Math.floor(Math.random() * maxCatsPerHouse) + 1;
            let rndChance = Math.random();
            theShelter[y][x] = {
                chanceOfFinding: rndChance,
                amt: rndAmt,
                collected: false
            };
        }
    }
    console.log(theShelter);
}

function totalCatInShelter() {
    allCatsInShelter = 0;
    for (let y = 0; y < theShelter.length; y++) {
        for (let x = 0; x < theShelter[x].length; x++) {
            allCatsInShelter += theShelter[y][x].amt;
        }
    }
    console.log(`there is ${allCatsInShelter} total Cats to be found`);
    return allCatsInShelter;
};


function findCatAtLocation(lengthCoord, widthCoord) {
    let shelterSpot = theShelter[lengthCoord][widthCoord];
    let CatChance = Math.random();
    let CatFound;
    console.log(lengthCoord);
    console.log(widthCoord);

    if (CatChance > shelterSpot.chanceOfFinding && shelterSpot.collected == false) {
        myCats += shelterSpot.amt;
        onScreenConsoleLog(`Meow! I found ${shelterSpot.amt} cats!`);
        console.log(`Meow! I found ${shelterSpot.amt}`);
        CatFound = {
            found: true,
            amt: shelterSpot.amt
        };

        for (let i = 0; i < shelterSpot.amt; i++) {
            let rndInt = Math.floor(Math.random() * 5);
            let cat = document.createElement("img");
            cat.src = catTypesWalk[rndInt];
            cat.classList.add("cat");
            catRoamingSpace.appendChild(cat);
            animateCat(cat);
        }

    } else {
        console.log(`darn tootin!  No cats in that house!!`);
        onScreenConsoleLog(`darn tootin!  No Cats for me!`);
        CatFound = {
            found: false,
            amt: 0
        };
    }
    return CatFound;
}



function getNextCatPos() {
    //the animated cats next position
    let padding = 25;
    let catSize = 48;

    let startX = padding;
    let endX = catRoamingSpace.offsetWidth - padding - catSize;
    let startY = padding;
    let endY = catRoamingSpace.offsetHeight - 50 - catSize;

    return {
        moveX: Math.floor(Math.random() * (endX - startX) + startX),
        moveY: Math.floor(Math.random() * (endY - startY) + startY),
    }
}


function animateCat(object) {
    let catTL = gsap.timeline();
    let flipped = 1;

    catTL.to(object, {
            x: () => {
                let xMove = getNextCatPos().moveX;
                if (object.getBoundingClientRect().x < xMove) {
                    flipped = -1;
                }
                return xMove;
            },
            y: () => {
                return getNextCatPos().moveY;
            },
            duration: 2,
            ease: "none",
            repeat: -1,
            repeatRefresh: true
        })
    catTL.to(object, {
        scaleX: () => {
            let tempFlipped = flipped;
            flipped = 1;
            return tempFlipped;
        },
        duration: 0.1,
        repeatDelay: 1.9,
        repeat: -1,
        repeatRefresh: true
    }, "<+0.1")

}

function removeActions(square) {
    square.removeEventListener("click", squareClicks);
    square.classList.remove("hovering");
    square.removeEventListener("mouseenter", squareOver);
    square.removeEventListener("mouseleave", squareOut);
}

function updateRound() {
    currentTime += 1;
    if (currentTime == floodTime) {
        console.log("game is over!");
        onScreenConsoleLog(`game is over! You found a total of ${myCats} cats!`);
        removeAllBoardClicks();
    }
}

function squareClicks(e) {
    removeActions(e.target);
    let yVal = e.target.id.split("_")[2];
    console.log(typeof yVal)
    let xVal = e.target.id.split("_")[1];
    // * 17. console log the value of wasCatFound.  What is it?  Describe it in your own words.
    //its the object that hols number of cats and if collected
    let wasCatFound = findCatAtLocation(yVal, xVal);
    console.log(wasCatFound);

    if (wasCatFound.found == true) {
        e.target.classList.add("collectedCat");
        let cat = document.createElement("img");
        let rndInt = Math.floor(Math.random() * 5);
        cat.src = catTypes[rndInt];
        cat.classList.add("houseCat");
        e.target.appendChild(cat);
        audio.play();
    } else {
        e.target.classList.add("collectedNoCat");
    }
    updateRound();
    updateStatsDisplay();
}

function squareOver(e) {
    e.target.classList.add("hovering");
}

function squareOut(e) {
    e.target.classList.remove("hovering");
}

function removeAllBoardClicks() {
    for (let y = 0; y < shelterLength; y++) {
        for (let x = 0; x < shelterWidth; x++) {
            let mySquare = document.querySelector(`#shelter_${x}_${y} `);
            mySquare.removeEventListener("click", squareClicks);
            mySquare.removeEventListener("mouseenter", squareOver);
            mySquare.removeEventListener("mouseleave", squareOut);
        }
    }
}

function setupGameboardClicks() {
    for (let y = 0; y < shelterLength; y++) {
        for (let x = 0; x < shelterWidth; x++) {
            let mySquare = document.querySelector(`#shelter_${x}_${y} `);
            mySquare.addEventListener("click", squareClicks);
            mySquare.addEventListener("mouseenter", squareOver);
            mySquare.addEventListener("mouseleave", squareOut);
        }
    }
}

function updateStatsDisplay() {
    let totalCat = document.querySelector("#totalCat");
    totalCat.innerHTML = `Total Cats: ${totalCatInShelter()}`;
    let currentRound = document.querySelector("#currentTime");
    currentRound.innerHTML = `Current Round: ${currentTime}`;
    let collectedCats = document.querySelector("#collectedCat");
    collectedCats.innerText = `Collected Cats: ${myCats}`;
    let totalTime = document.querySelector("#totalTime");
    totalTime.innerText = `Rounds To Collect Cats: ${floodTime}`;
}

function clearSquares() {
    for (let y = 0; y < shelterLength; y++) {
        for (let x = 0; x < shelterWidth; x++) {
            let mySquare = document.querySelector(`#shelter_${x}_${y}`);
            //removing all classes
            mySquare.className = '';
            mySquare.removeEventListener("click", squareClicks);
            mySquare.removeEventListener("mouseenter", squareOver);
            mySquare.removeEventListener("mouseleave", squareOut);
        }
    }
}

//removes cats in roaming space and houses
function removeCats() {
    while (catRoamingSpace.firstChild) {
        catRoamingSpace.removeChild(catRoamingSpace.lastChild);
    }
    for (let y = 0; y < shelterLength; y++) {
        for (let x = 0; x < shelterWidth; x++) {
            let mySquare = document.querySelector(`#shelter_${x}_${y} `);
            while (mySquare.firstChild) {
                mySquare.removeChild(mySquare.lastChild);
            }
        }
    }
}

function newGame() {
    floodTime = 10;
    currentTime = 0;
    myCats = 0;
    allCatsInShelter = 0;
    onScreenConsoleLog(`Click the houses to find cats!`);
    createShelter();
    clearSquares();
    removeCats();
    updateStatsDisplay();
    setupGameboardClicks();
    assignHouses();
}

function initReset() {
    let reset = document.querySelector("#reset");
    reset.addEventListener("click", newGame);
}

function initGame() {
    initReset();
    newGame();
}

initGame();