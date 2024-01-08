window.addEventListener('load', ()=>{ //when window is laoded
    loadTable()
})

function loadTable(){//loads in data to playlist table
    let localkeys = Object.keys(localStorage)
    for (let i = 0; i < localStorage.length; i++){//iterates through the keys
        let currentKey = localkeys[i]
        try { //will try to parse data (should only work if value being passed is a song info object)
            let parsedInfo = JSON.parse(localStorage.getItem(currentKey))
            toPlaylist(parsedInfo.trackName, parsedInfo.artistName, parsedInfo.artworkUrl60, currentKey)
        }
        catch{ //wont parse and add random items in localstorage
            console.warn('Error unable to parse for: ',currentKey)
        }  
    }
}

