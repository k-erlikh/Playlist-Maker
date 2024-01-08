const ENTER=13

function handleKeyUp(event) { //if enter key is clicked
event.preventDefault()
   if (event.keyCode === ENTER) {
      document.getElementById("submit_button").click()
  }
}