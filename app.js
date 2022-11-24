const practicePicture = [[1,1,0,0,0],
                         [0,1,0,0,1],
                         [0,1,1,1,1],
                         [0,1,0,0,1],
                         [0,1,0,0,1]
                        ]
const block1 = document.getElementById('b1')

block1.addEventListener('click', changeItem)

let currentPicture = []

practicePicture.forEach(row => {
    let tempRow = []
    row.forEach(item => {
        tempRow.push(item)
    })
    currentPicture.push(tempRow)
})

console.log(currentPicture)

function changeItem(e){
    background = getComputedStyle(block1, 'background-color').backgroundColor
    if(background === "white")
    block1.style.backgroundColor = "black"
    console.log(background)
}

function currentTime() {
    let date = new Date(); 
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";
    
    if(hh == 0){
        hh = 12;
    }
    if(hh > 12){
        hh = hh - 12;
        session = "PM";
        }
    
        hh = (hh < 10) ? "0" + hh : hh;
        mm = (mm < 10) ? "0" + mm : mm;
        ss = (ss < 10) ? "0" + ss : ss;
        
        let time = hh + ":" + mm + ":" + ss + " " + session;
    
    document.getElementById("clock").innerText = time; 
    let t = setTimeout(function(){ currentTime() }, 1000);
    }
    currentTime();