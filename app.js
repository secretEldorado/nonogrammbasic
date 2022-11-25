// Set the playing field
let practicePicture
path = window.location.pathname

console.log(path)
if(path == "/"){
    practicePicture =  [
        [1,1,0,0,0],
        [0,1,0,0,1],
        [0,1,1,1,1],
        [0,1,0,0,1],
        [0,1,0,0,1]
    ]
}
if(path == "/about.html"){
    practicePicture =  [
        [0,0,1,1,0,0,0,0,0,0],
        [0,1,1,1,1,0,1,0,0,0],
        [1,0,0,0,0,1,0,1,0,0],
        [0,0,1,1,0,1,0,1,1,0],
        [0,1,1,1,1,1,1,1,1,1],
        [0,1,1,1,1,1,1,1,0,1],
        [0,1,1,1,1,1,1,1,1,1],
        [0,1,1,1,1,1,1,0,1,1],
        [0,0,1,1,1,1,0,1,1,0],
        [0,0,0,1,1,1,1,1,0,0]
    ]
}
if(path == "/login.html"){
    practicePicture =  [
        [1,1,0,0,0,1,1],
        [1,1,0,0,1,0,1],
        [0,1,1,1,1,0,1],
        [0,1,0,0,1,0,0],
        [0,1,0,0,1,1,0]
    ]
}

const box = document.getElementById('game')
const listRow = document.getElementById('left')
const listColumn = document.getElementById('up')
box.addEventListener('click', changeField)
listRow.addEventListener('click', numberSolvedLeft)
listColumn.addEventListener('click', numberSolvedLeft)

let currentPicture = []
let countBox = 1
let rowPosition = 1
let clockTick = true

//set width of the field
box.style.width = `${practicePicture[0].length * 25}px`
box.style.setProperty('grid-template-columns', `repeat(${practicePicture[0].length}, 1fr)`)

practicePicture.forEach(row => {
    //create row
    let countRow = 0;
    const singleRow = document.createElement('div')
    singleRow.className='single-line'
    singleRow.id = `${rowPosition}r`
    let haveused = false
    const tempArray = []

    row.forEach(item => {
        //set row
        if(item === 1) {
            countRow++
        }
        else if(item === 0 && countRow !== 0) {
            const number = document.createElement('p')
            number.innerText = countRow
            number.className = 'not-solved'
            singleRow.appendChild(number)
            countRow = 0
            haveused = true
        } 

        //set block
        const block = document.createElement('div')
        block.className= 'block white-color'
        block.id = `${countBox}`
        countBox++
        box.appendChild(block)

        //push array
        tempArray.push(0)
    })

    //get row if last array is 1
    if(countRow !== 0){
        const number = document.createElement('p')
        number.innerText = countRow
        number.className = 'not-solved'
        singleRow.appendChild(number)
        countRow = 0
    }
    //whole row is 0
    else if(!(haveused)) {
        const number = document.createElement('p')
        number.innerText = countRow
        number.className = 'solved'
        singleRow.appendChild(number)
    }
    rowPosition++
    listRow.appendChild(singleRow)
    currentPicture.push(tempArray)
})

//create columns
for(let i = 0; i < practicePicture[0].length; i++) {
    let columnCount = 0
    const singleColumn = document.createElement('div')
    singleColumn.className='single-line'
    singleColumn.id = `${i+1}c`
    let haveused = false

    for(let j = 0; j < practicePicture.length; j++) {
        if(practicePicture[j][i] === 1) {
            columnCount++
        } else if(practicePicture[j][i] === 0 && columnCount !== 0) {
            const number = document.createElement('p')
            number.innerText = columnCount
            number.className = 'not-solved'
            singleColumn.appendChild(number)
            columnCount = 0
            haveused = true
        }
    }

    //get column if last array is 1
    if(columnCount !== 0){
        const number = document.createElement('p')
        number.innerText = columnCount
        number.className = 'not-solved'
        singleColumn.appendChild(number)
        columnCount = 0
    }
    //whole column is 0
    else if(!(haveused)) {
        const number = document.createElement('p')
        number.innerText = 0
        number.className = 'solved'
        singleColumn.appendChild(number)
    }
    listColumn.appendChild(singleColumn)
}

function changeField(e){
    //the edge is touched
    if(e.target.className === 'box-playing-field'){
        return
    }
    if(e.target.tagName === "P" || e.target.hasChildNodes()) {
        let target = ''
        if(e.target.tagName === "P") {
            target = e.target.parentElement
        } else {
            target = e.target
        }
        const block = document.getElementById(target.id)
        block.innerHTML = ''
    } else {
        const target = e.target.id
        const block = document.getElementById(`${target}`)
        if(e.target.classList.contains('white-color') && !(block.hasChildNodes())) {
            block.className = 'block black-color'
        }
        else if(e.target.classList.contains('black-color')) {
            block.className = 'block white-color'
            block.innerHTML = '<p>X</p>'
        }
    }

    // set field
    if(e.target.tagName !== "P"){
        const position = parseInt(e.target.id)
        const positionx = ((position - 1) % currentPicture.length)
        const positiony = Math.trunc((position - 1) / currentPicture.length)
        currentPicture[positiony][positionx] = e.target.classList.contains('black-color') ? 1 : 0
    }

    // win condition
    let winCount = 0
    for(let i = 0; i < currentPicture.length; i++) {
        for(let j = 0; j < currentPicture[0].length; j++) {
            if(currentPicture[i][j] === practicePicture[i][j]) {
                winCount++
            }
        }
    }

    if(winCount === currentPicture.length * currentPicture[0].length) {
        const title = document.getElementById('title')
        title.innerText = 'Congratulations!'
        const button = document.getElementById('selectbtn')
        button.innerHTML = '<a href="/">Choose A New Level</a>'
        clockTick = false
    }
    
}

function numberSolvedLeft(e){
    const crossedCheck = e.target.className
    if (e.target.tagName == "P"){
        e.target.className = crossedCheck === "not-solved" ? "solved" : "not-solved" 
    }
}

    let mm
    let ss
    let start = false
function showTime() {
    
    if(!start) {
        mm = 0
        ss = 0
    } else {
        ss++
        mm = parseInt(mm)
    }

    if(ss > 59) {
        mm++
        ss = 0
    }

    mm = (mm < 10) ? "0" + mm : mm
    ss = (ss < 10) ? "0" + ss : ss
    
    let time = mm + ":" + ss
    start = true
    
    document.getElementById("clock").innerText = time; 
    let t = setTimeout(function(){ 
        if(clockTick) {
            showTime()
        } 
    }, 1000);
    }
showTime();