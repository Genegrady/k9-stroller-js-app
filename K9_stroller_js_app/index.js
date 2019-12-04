let body = document.querySelector("body")
let header = document.createElement("div")
header.className = "header"
let headerImage = document.createElement("img")
let headerH2 = document.createElement("h2")
headerH2.innerText = "Choose Your Character"
headerH2.className = "choose"
headerImage.src = "https://fontmeme.com/permalink/191203/ad8b7333cf216b2eb89600beacd204c7.png"
header.append(headerImage)
body.append(header, headerH2)
let cardHolder = document.createElement("div")
cardHolder.className = "holder"
let imageHolder = document.createElement('div')
imageHolder.className = "imgholder"
body.append(cardHolder, imageHolder)

document.addEventListener(`DOMContentLoaded`, () => {


fetch(`http://localhost:3000/characters`)
.then(resp => resp.json())
.then(
    charArr => charArr.forEach(char => {
    getCardImage(char)
})
)
    function getCardImage(card){
        let imageWindow = document.createElement("div")
        imageWindow.className = "window"
        let cardImage = document.createElement("img")
        cardImage.className = "image"
        cardImage.src = card.image
        
        imageWindow.append(cardImage)
        imageHolder.append(imageWindow)
        cardImage.addEventListener(`click`, (event) => {
            getSingleCard(card)

        })
    }
    function getSingleCard(card){
        // debugger
        cardHolder.innerHTML = ""
        let cardName = document.createElement("h2")
        cardName.innerText  = card.name 
        let cardExp = document.createElement("p")
        cardExp.innerText = `Exp: ${card.exp}` 
        let cardBio = document.createElement("p")
        cardBio.innerText = card.bio
        cardBio.className = "bio"
        let cardButton = document.createElement("button")
        cardButton.className = "button"
        cardButton.innerText = "Choose Character"
        cardHolder.append(cardName, cardExp, cardBio, cardButton)

        cardButton.addEventListener(`click`, (event) => {
            body.innerHTML = " "
            body.append(header)
            // let canvas = document.createElement("canvas")
            // canvas.id = "game";
            // canvas.width = 800;
            // canvas.height = 800;
            
            let sideDiv = document.createElement("div")
            sideDiv.className = "score"
            let scoreHeader = document.createElement("p")
            scoreHeader.className = "scoreh"
            scoreHeader.innerText = "High Scores"
            let scoreUl = document.createElement("ul")
            sideDiv.append(scoreHeader,scoreUl)
            let leftSideDiv = document.createElement("div")
            leftSideDiv.className = "mazeimage"
            let mazeImg = document.createElement("img")
            mazeImg.className = "image"
            
            mazeImg.src = card.image
            leftSideDiv.append(mazeImg)
            fetch(`http://localhost:3000/characters/${card.id}`)
            .then(resp => resp.json())
            .then(char => char.scores.forEach(score => {
                let scoreLi = document.createElement("li")
                scoreLi.className = "allscore"
                scoreLi.innerText = `${score.username}: ${score.amt}`
                scoreUl.append(scoreLi)
            }))
            // 
            
            body.append(sideDiv, leftSideDiv)
            canvasDrawing()
            // debugger
            var downloadTimer = setInterval(function(){
                timeLeft -= 1;
                    if(timeLeft <= 0){
                      clearInterval(downloadTimer, card);
                      let name = window.prompt("Please Enter Your Name")
                      fetch(`http://localhost:3000/characters/${card.id}/scores`, {
                       method:'POST',
                       headers: { 
                           'Content-type': 'application/json',
                           'accept': 'application/json'
                       },
                       body: JSON.stringify({
                         amt: score,
                         username: name
                        })
                      })
                      .then(resp => resp.json())
                      .then(newScore=>{
                        //    debugger

                           card.scores.push({username: name, amt: score})
                           scoreUl.innerHTML = ''
                           card.scores.forEach((score) => {
                            let scoreLi = document.createElement("li")
                            scoreLi.className = "allscore"
                            
                            scoreLi.innerText = `${score.username}: ${score.amt}`
                            scoreUl.append(scoreLi)
                           })
                            
                      }
                      )
              }}, 1000);

            // debugger
            })
            

        }


})