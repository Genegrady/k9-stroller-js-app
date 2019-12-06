let body = document.querySelector("body")
body.style.backgroundImage = "url('https://media.giphy.com/media/19J1ZOQRQYxYQ/giphy.gif')"
body.style.backgroundSize="100%";
body.style.backgroundRepeat="absolute";
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
let instructions = document.createElement('div')
instructions.className = "instructions"
instructions.innerText = "HELLO FELLOW PLAYERS!!! THE OBJECTIVE OF THIS GAME IS TO REACH THE END TILE AT THE BOTTOM RIGHT OF THE MAZE BEFORE TIME RUNS OUT. YOU CAN CONTROL YOUR CHARACTER USING THE ARROW KEYS. THE TIMER WILL START AS SOON AS YOU CLICK PLAY NOW. GOOD LUCK. "
body.append(cardHolder, imageHolder, instructions)
let scoreArray = []
cardHolder.style.display = "none"

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
            cardHolder.style.display = ""
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
        cardButton.innerText = "PLAY NOW"
        cardHolder.append(cardName, cardExp, cardBio, cardButton)

        cardButton.addEventListener(`click`, (event) => {
            body.innerHTML = " "
            body.append(header)
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
                // let newDeleteButton = document.createElement("button")
                // newDeleteButton.className = "newdelete"
                // newDeleteButton.innerText = "x"
                scoreLi.className = "allscore"
                scoreLi.innerText = `${score.username}: ${score.amt}`
                // scoreLi.append(newDeleteButton)
                scoreUl.append(scoreLi)
                
                                
                    
                // newDeleteButton.addEventListener("click",(e) => {
                //     fetch(`http://localhost:3000/scores/${score.id}`, {
                //          method:'DELETE',
                //         })
                //          .then(resp => resp.json())
                //         .then(()=>{scoreLi.remove})
                // })
            }))
            
            body.append(sideDiv, leftSideDiv)
            canvasDrawing()
            var downloadTimer = setInterval(function(){
                
                timeLeft -= 1;
                    if(timeLeft <= 0){
                      clearInterval(downloadTimer, card);
                      scoreUl.innerHTML = ""
                      let name = window.prompt("Please Enter Your Name")
                      let grabCanvas = document.querySelector('#game')
                      grabCanvas.parentNode.removeChild(grabCanvas)

                      let gameOverDiv = document.createElement('div')
                      gameOverDiv.className = "gameover" 
                      gameOverDiv.innerText = "Game OVER Thank you for playing K9 Stroller"
                      gameOverDiv.style.textAlign = "center"
                      
                      let reloadLink = document.createElement("a")
                      reloadLink.href = "file:///Users/rubenvallejo/Desktop/AccessLabs/mod-3/mod3project/k9-stroller-js-app/K9_stroller_js_app/index.html"
                      reloadLink.innerText = "Try Again"
                      reloadLink.style.textAlign = "center"

                      let breakTag = document.createElement("br")
                      gameOverDiv.append(breakTag, reloadLink)
                      
                      body.append(gameOverDiv)
                      
                      
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
                      .then(newScore= (scores) =>{
                          
                            function compare(a, b){
                                const scoreA = a.username.toUpperCase();
                                const scoreB = b.username.toUpperCase();

                                let comparison = 0

                                if (scoreA > scoreB) {
                                    comparison = 1;
                                } else if (scoreA < scoreB) {
                                    comparison = -1;
                                }
                                return comparison;
                            }
                            
                            // debugger
                            scores.forEach(score =>{
                            let scoreLi = document.createElement("li")
                            let deleteButton = document.createElement("button")
                            deleteButton.className = "deleted"
                            deleteButton.innerText = "x"
                            // let updateButton = document.createElement("button")
                            // updateButton.className = "update"
                            // updateButton.innerText = "Change Username"
                            scoreLi.className = "allscore"
                            scoreLi.innerText = `${score.username}: ${score.amt}`
                            
                            scoreLi.append(deleteButton)
                            scoreUl.append(scoreLi)
                            scoreLi.addEventListener("click", (e) => {
                                
                            })
                            

                            deleteButton.addEventListener("click",(e) => {
                                fetch(`http://localhost:3000/scores/${score.id}`, {
                                    method:'DELETE',
                                     })
                                    .then(resp => resp.json())
                                    .then(()=> {scoreLi.remove()})
                                   
                            })
                            })
                            // let lastScore = scores.slice(-1)[0]
                            
                           scores.sort(compare)
                            
                        //   console.log(scoreArray)
                           
                           }
                      
                          
                           
                      
                      )
              }}, 1000);

           
            })
            

        }


})

