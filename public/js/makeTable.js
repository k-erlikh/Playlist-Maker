//makes search table of 20 song results, based off the GET response of the iTunes API
function makeSearch(response){ 
    let songDiv = document.getElementById('songInfo')
    let table = document.createElement('table'); //table creation
    table.classList.add('table')
    songDiv.appendChild(table)

    //adds child columns of new row
    let newRow = table.insertRow(table.rows.length)//adds initial headers for the columns
    let add = newRow.insertCell(0)
    let song = newRow.insertCell(1)
    let artist = newRow.insertCell(2)
    let cover = newRow.insertCell(3)

    //creates header titles
    add.innerHTML = "➕Add"
    song.innerHTML = "Song"
    artist.innerHTML = "Artist"
    cover.innerHTML = "Cover"

    //Iterates over the GET response results, adds the data to the table
    for (let i = 0; i < 20; i++){ 
        let newRow = table.insertRow(table.rows.length) //creates new row
        newRow.id = Math.floor(Math.random() * 1000000);//assigns unique id to row
        
        let add = newRow.insertCell(0)
        let song = newRow.insertCell(1)
        let artist = newRow.insertCell(2)
        let cover = newRow.insertCell(3)

        //Creation of add button for every song, when clicked, will send song info 
        //and id to a method, which will add the song to the playlist
        let addButton = document.createElement('button')
        addButton.textContent = "➕"
        addButton.addEventListener('click', () =>{
            toPlaylist(response.results[i].trackName, response.results[i].artistName, response.results[i].artworkUrl60, newRow.id)
        })
        add.appendChild(addButton)//adds button to row
        //rest of song data added to row
        song.innerHTML = response.results[i].trackName
        artist.innerHTML = response.results[i].artistName

        let image = document.createElement('img')//to add cover image, must create image element first, then add source url
        image.src = response.results[i].artworkUrl60
        cover.appendChild(image);
    }
}


