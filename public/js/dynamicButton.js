function toPlaylist(trackName, artistName, artworkUrl60, id){
    let list = document.getElementById('playlist') //song will be added to existing playlist element
    let newRow = list.insertRow(list.rows.length)//added at bottom
    newRow.id = id; //id of row is set
    
    if (!(id in localStorage)){//checks if song is already in localstorage
        let info ={ //object that will be sent to local storage
            trackName : trackName,
            artistName : artistName,
            artworkUrl60 : artworkUrl60
        }
        localStorage.setItem(id,JSON.stringify(info))//only adds it if its new
    }
    //add new child columns of row
    let buttons = newRow.insertCell(0)
    let song = newRow.insertCell(1)
    let artist = newRow.insertCell(2)
    let cover = newRow.insertCell(3)

    //Buttons are all created with a unique event listener that, when clicked, activates
    //a method and sends the id info
    let delButton = document.createElement('button') //creation of delete button
    delButton.textContent = "➖"
    delButton.addEventListener('click', () =>{ //add unique event listener based off id
        removeSong(id)
    })

    let upButton = document.createElement('button')//creation of move up button
    upButton.textContent = "⬆️"
    upButton.addEventListener('click', () =>{
        moveUp(id)
    })

    let downButton = document.createElement('button')//creation of move down button
    downButton.textContent = "⬇️"
    downButton.addEventListener('click', () =>{
        moveDown(id)
    })

    //add unique buttons to button container
    buttons.appendChild(delButton)
    buttons.appendChild(upButton)
    buttons.appendChild(downButton)

    //fills rest of columns with song info
    song.innerHTML = trackName 
    artist.innerHTML = artistName
    let image = document.createElement('img')
    image.src = artworkUrl60
    cover.appendChild(image);
}

//removes song based off the id of row being removed
function removeSong(id){ 
    let row = document.getElementById(id)//finds row of corresponding id
    row.parentNode.removeChild(row)
    localStorage.removeItem(id)//removes song from local storage by id
}

//swaps position of selected row and row above 
function moveUp(id){ 
    let row = document.getElementById(id)
    let prevRow = row.previousElementSibling //finds row above 
    if (prevRow && prevRow.id != "-1"){ //if row isnt the header, and exists, remove
        row.parentNode.insertBefore(row,prevRow)
    }
}

//swaps position of row below selected and row selected
function moveDown(id){ 
    let row = document.getElementById(id)
    let followingRow = row.nextElementSibling //finds row below
    if (followingRow && followingRow.id != "-1"){
        row.parentNode.insertBefore(followingRow,row)//swaps rows
    }
}