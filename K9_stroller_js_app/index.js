
let body = document.querySelector("body")
let header = document.createElement("div")
header.className = "header"
let headerImage = document.createElement("img")
headerImage.src = "https://fontmeme.com/permalink/191203/ad8b7333cf216b2eb89600beacd204c7.png"
header.append(headerImage)
body.append(header)
let cardHolder = document.createElement("div")
cardHolder.className = "holder"
body.append(cardHolder)

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
        body.append(imageWindow)
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
        let cardButton = document.createElement("button")
        cardButton.className = "button"
        cardButton.innerText = "Choose Character"
        cardHolder.append(cardName,cardExp,cardBio, cardButton)
        cardButton.addEventListener(`click`, (event) => {
            body.innerHTML = " "
            let canvas = document.createElement("canvas")
            canvas.id = "game";
            canvas.width = 800;
            canvas.height = 800;
            let sideDiv = document.createElement("div")
            fetch(`http://localhost:3000/characters/${card.id}`)
            .then(resp => resp.json())
            .then(json_resp => console.log(json_resp))
            body.append(canvas, sideDiv)
            
            

        })


}
})

