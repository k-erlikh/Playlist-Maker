const express = require('express')
const http = require('http')
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.static(__dirname + '/public'))

app.get(['/', '/index.html', '/mytunes', '/mytunes.html'], (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.get('/search', (request, response) => {
  let song = request.query.term
  console.log('Received song:', song);
  if(!song) {
    response.json({message: 'Please enter a song name'})
    return
  }

  let options = {
    "method": "GET",
    "hostname": "itunes.apple.com",
    "port": null,
    "path": `/search?term=${encodeURIComponent(song)}&entity=musicTrack&limit=20`,
    "headers": {
    "useQueryString": true
    }
  }

  http.request(options, function(apiResponse) {
    let songData = ''
    apiResponse.on('data', function(chunk) {
      songData += chunk
    })
    apiResponse.on('end', function() {
      response.contentType('application/json').json(JSON.parse(songData))
    })
  }).end() 
})

app.listen(PORT, err => {
  if(err) console.log(err)
  else {
    console.log(`Server listening on port: ${PORT}`)
    console.log(`To Test:`)
    console.log(`http://localhost:3000/mytunes.html`)
    console.log(`http://localhost:3000/index.html`)
  }
})
