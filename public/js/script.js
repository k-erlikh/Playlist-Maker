function getSong() {

    let songName = document.getElementById('song').value
    if(songName === '') {
        return alert('Please enter a song name')
    }

    let songDiv = document.getElementById('songInfo')
    songDiv.innerHTML = ''

    fetch(`/search?term=${encodeURIComponent(songName)}`)
    .then(response => {
        if (!response.ok){
            console.error(`Error: ${response.status}`)
        }
        return response.json()
    })
    .then(response =>{
        let songsMatch = document.createElement('h1'); //search title with song name
        songsMatch.textContent = `Songs Matching: ${songName} `
        songDiv.appendChild(songsMatch)//adds haeder containig search results
        makeSearch(response)//sends response to make table of search results in makeSearch
    })
    .catch(error => console.error(`Error while fetching: `, error))
    
}


