//Chalange 1: your age and days

function ageIndays(){
    var birthYear = prompt('Which year were you born?');
    var ageIndays = (2022-birthYear)*365;
    var h1 = document.createElement("h1");
    var textAnswer = document.createTextNode('You are ' + ageIndays+ " days old");
    h1.setAttribute('id','ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}
function reset(){
    document.getElementById('ageInDays').remove();
}

//Chalanger 2: Cat Generator
function GebereteCat(){
    var image = document.createElement('img');
    var div = document.getElementById("flex-cat-gen");
    image.src='static/image/cat-chat.gif';
    div.appendChild(image);

}
function RemoveCat(){

    var remove = document.getElementById('flex-cat-gen');
    remove.removeChild(remove.childNodes[0]);
    //document.getElementById("flex-cat-gen").remove(image)
}

//Chalanger 3: Rock paper Scissor
function rpsGame(yourChoise){
    console.log(yourChoise);
    var humanChoice, botChoice;
    humanChoice = yourChoise.id;
    botChoice = numberToCoice(randToRpsInt());
    console.log('Computer Choice: '+botChoice);
    results= decideWinner(humanChoice,botChoice); // [0,1] human lost | bot won
    console.log(results);
    message = finalMessage(results);//{'message': 'You won!', 'color', 'green'}
    console.log(message)
    rpsFrontEnd(yourChoise.id, botChoice,message);
}

function randToRpsInt(){
    return Math.floor(Math.random()*3);
}

function numberToCoice(number){
    return ['rock','paper','scissors'][number];
}

function decideWinner(yourChoise, computerChoise){
    var rpsDatabase = {
        'rock':{'scissors':1, 'rock': 0.5, 'paper':0},
        'paper':{'rock':1, 'paper': 0.5, 'scissors':0},
        'scissors':{'paper':1, 'scissors': 0.5, 'rock':0},
    }
    var youScore = rpsDatabase[yourChoise][computerChoise];
    var comouterScore = rpsDatabase[computerChoise][yourChoise];

    return [youScore, comouterScore];
}


function finalMessage([youScore, comouterScore]){
    if(youScore === 0){
        return {'message': 'You lost!', 'color': 'red'};
    } else if (youScore === 0.5){
        return {'message':'You tied!', 'color': 'yellow'};
    }
    else {
        return {'message': 'You won!', 'color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
    }

    //lets remove all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();
    
    
    var LineDiv = document.createElement('div')
    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    LineDiv.innerHTML = "<h1>You <-----------------> Computer</h1>"


    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "'height = 150 width = 150 style = 'box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"
    messageDiv.innerHTML = "<h1 style ='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "'height = 150 width = 150 style = 'box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>"
    
    document.getElementById('flex-box-01').appendChild(LineDiv);
    document.getElementById('flex-box-div').appendChild(humanDiv);
    document.getElementById('flex-box-div').appendChild(messageDiv);
    document.getElementById('flex-box-div').appendChild(botDiv);
}

//Chalange 4: Chage the COlor of All Buttorns!

var all_buttons = document.getElementsByTagName('button');

//console.log(all_buttons);

var copyAllButtons = [];
for (let i=0; i < all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}
//console.log(copyAllButtons);



function buttonClorChaange(buttonThingy){
    if(buttonThingy.value ==='red'){
        buttonRed();
    } else if(buttonThingy.value ==='green'){
        buttonGreen();
    }else if(buttonThingy.value ==='reset'){
        buttonReset();
    }else if(buttonThingy.value === 'random'){
        buttonRandom();
    }
}

function buttonRed(){
    for(let i =0; i<all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}


function buttonGreen(){
    for(let i =0; i<all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonReset(){
    for(let i =0; i<all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function buttonRandom(){
    var choices = ['btn-primary','btn-danger', 'btn-warning', 'btn-success']
    for (let i =0; i< all_buttons.length; i++){
        var randomNumber = Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}


















//Chalange 5: Blackjack
let blackjackGame = {
    'you':{'scoreSpan': '#your-blackjack-reuslt', 'div': '#your-box','score':0},
    'dealer':{'scoreSpan': '#dealer-blackjack-reuslt', 'div': '#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap': {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins': 0,
    'losses':0,
    'draws':0,
    'isStand': false,
    'turnsOver': false,

};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);


function blackjackHit(){
    if(blackjackGame['isStand'] === false){

        let card = randomCard();
        //console.log(card);
        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU);
        //console.log(YOU['score']);
    }


}
function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];

}
function showCard(card,activePlayer){
    if(activePlayer['score']<=21){
    let cardImage = document.createElement('img');
    cardImage.src = `static/image/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
    }
}

function blackjackDeal(){
    //let winner = comouterWinner();
    //showResult(winner);

    //showResult(comouterWinner());

    if(blackjackGame['turnsOver'] === true){

        blackjackGame['isStand'] = false;

        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        for (i =0; i<yourImages.length;i++)
        {
            yourImages[i].remove();

        }
        for (i =0; i<dealerImages.length;i++)
        {
            dealerImages[i].remove();

        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#your-blackjack-reuslt').textContent = 0;
        document.querySelector('#dealer-blackjack-reuslt').textContent = 0;

        document.querySelector('#your-blackjack-reuslt').style.color = '#ffffff';
        document.querySelector('#dealer-blackjack-reuslt').style.color = '#ffffff';

        document.querySelector('#blackjack-result').textContent = "Let's play";
        document.querySelector('#blackjack-result').style.color = "black";

        blackjackGame['turnsOver'] = true;
    }
}


function updateScore(card, activePlayer){
    if(card ==='A'){
    //If adding 11 keeps me below 21, add 11, otherwise add 1
    if(activePlayer['score']+blackjackGame['cardsMap'][card][1]<= 21){
        activePlayer['score']  += blackjackGame['cardsMap'][card][1];
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card][0];
    }

  } else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
}

}
function showScore(activePlayer){
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}


 async function dealerLogic(){
    blackjackGame['isStand'] = true;

    while(DEALER['score'] <16 && blackjackGame['isStand'] === true){
        let card = randomCard();
        showCard(card,DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);  
        await sleep(1000);   
    }
  
    blackjackGame['turnsOver'] = true;
    let winner = comouterWinner();
    showResult(winner);
   

}

//Computer winner and return who just won
//update the wins, draws and losses

function comouterWinner(){
    let winner;
    if(YOU['score']<= 21){
        // condition higher score than dealer or when dealer busts but you're 21 or under 
        if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
            blackjackGame['wins']++;
            //console.log("YOU won!");
            winner = YOU;
        } else if(YOU['score'] < DEALER['score']){
            blackjackGame['losses']++;
            //console.log('You Lost!');
            winner = DEALER;
        } else if(YOU['score'] === DEALER['score']){
            blackjackGame['draws']++;
            //console.log('You draw!');
        }
    //condition: When user busts but dealer doesn't
    } else if(YOU['score'] > 21 && DEALER['score'] <= 21){
        blackjackGame['losses']++;
        //console.log('You lost!');
        winner = DEALER;
        //Condition: when dealer and you Bust
    } else if(YOU['score'] > 21 && DEALER['score']> 21){
        blackjackGame['draws']++;
        //console.log('You draw!');
    }
    console.log(blackjackGame);
    return winner;
}

function showResult(winner){
    let message, messageColor;

    if(blackjackGame['turnsOver'] === true){

        if(winner === YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You Won!';
            messageColor = 'green';
            winSound.play();
    
        } else if(winner === DEALER){
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You Lost!';
            messageColor = 'red';
            lossSound.play();
        } else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You Drew!';
            messageColor = 'black';
        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }
 
}