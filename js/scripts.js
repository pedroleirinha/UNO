class Card {
    constructor(JSONCard) {
        this.id = JSONCard.id;
        this.category = JSONCard.descricao_categoria;
        this.color = JSONCard.descricao_cor;
        this.quantity = JSONCard.quantidade;
        this.number = JSONCard.numero;
    }
}

class Player {
    constructor(playerNumber, name) {
        this.playerNumber = playerNumber;
        this.name = name;
        this.turnPlayedCards = [];
        this.hand = [];
        this.unoState = false;
        this.cardsToDraw = 0;
    }
    disableUno() {
        this.unoState = false;
    }
    enableUno() {
        this.unoState = true;
    }
    hasUno() {
        return this.unoState === true;
    }
    playCard(clickedCard) {
        let index = this.hand.findIndex(card => card.id === clickedCard.id);
        this.hand.splice(index, 1);
        this.turnPlayedCards.push(clickedCard);
    }
    addCardDeck(newCard) {
        this.hand.push(newCard);
    }
    getTurnCardsNumber() {
        return this.turnPlayedCards.length;
    }
    emptyPlayedCards() {
        this.turnPlayedCards = [];
    }
    checkPlayerHasPlayed() {
        if (this.turnPlayedCards.length > 0) {
            return true;
        } else {
            alert("You have to play at least one card in order to finish!");
            return false;
        }
    }
    hasCardsToDraw() {
        return this.cardsToDraw > 0;
    }
}

class Model {
    constructor() {
        //List of Cards
        this.gameOver = false;
        this.totalNumberCards = 0;
        this.deck = [];
        this.playerTurn = 0;
        this.usedCards = [];
        this.defaultHandSize = 7;
        this.playerList = [new Player(1, "Thunder"), new Player(2, "Shadow")];
        this.numberOfPlayers = 2;
        this.topCard;
        this.currentPlayer = this.playerList[0];
    }

    transferOldCardsToDeck() {
        this.deck = this.deck.concat(this.usedCards);
    }

    isGameOver() {
        return this.gameOver;
    }

    getNextCurrentPlayer() {
        return this.playerList[this.playerTurn == this.playerList.length - 1 ? 0 : this.playerTurn + 1];
    }

    changeCurrentPlayer() {
        this.playerTurn = this.playerTurn == this.playerList.length - 1 ? 0 : this.playerTurn + 1;
    }

    getCurrentPlayer() {
        return this.playerList[this.playerTurn];
    }


    getStartingHands() {
        this.playerList.forEach((player) => {
            for (let i = 0; i < this.defaultHandSize; i++) {
                let newCard = this.deck[i];
                player.addCardDeck(newCard);
                this.deck.splice(0, 1);
            }
        });
    }

    getNewTopCard() {
        let allNumbers = this.deck.filter(card => card.category === "Number");
        this.setNewTopCard(allNumbers[allNumbers.length - 1]);
        this.deck.splice(this.deck.findIndex(card => this.topCard.id = card.id), 1);
        return this.topCard;
    }

    setNewTopCard(newCard) {
        this.topCard = newCard;
    }

    shuffleDeck() {
        let currentIndex = this.deck.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = this.deck[currentIndex];
            this.deck[currentIndex] = this.deck[randomIndex];
            this.deck[randomIndex] = temporaryValue;
        }
    }

    getNewCardFromDeck() {
        return this.deck.pop();
    }

    verifyColor(cardColor) {
        return cardColor === this.topCard.color;
    }
    verifyNumber(cardNumber) {
        return cardNumber === parseInt(this.topCard.number);
    }
    verifyQuantity(cardQuantity) {
        return cardQuantity === parseInt(this.topCard.quantity);
    }
    verifyCategory(cardCategory) {
        return cardCategory === this.topCard.category;
    }

    matchesLastCardProp(cardPlayedNumber, prop, val) {
        if (cardPlayedNumber === 0) {
            return this.topCard[prop] === val;
        }
        return false;
    }
    checkNumberCard(cardPlayedNumber, number, color) {
        return this.verifyNumber(number) || this.matchesLastCardProp(cardPlayedNumber, "color", color);
    }

    checkChangeColorCard(cardPlayedNumber, category) {
        return cardPlayedNumber === 0 ? true : this.verifyCategory(category);
    }

    checkGoGetCard(cardPlayedNumber, quantity, category, color) {
        if (cardPlayedNumber === 0) {
            //If its the first card played
            if (quantity == 2) {
                if (this.verifyQuantity(quantity) || this.verifyColor(color) || this.verifyCategory(category)) {
                    return true;
                }
            } else {
                return true;
            }
        }
        else {
            //If second or further card played
            if (this.verifyQuantity(quantity) && this.verifyCategory(category)) {
                return true;
            }
        }
        return false;
    }

    checkChangeDirectionCard(cardPlayedNumber, color, category) {
        return this.verifyCategory(category) || this.matchesLastCardProp(cardPlayedNumber, "color", color);
    }

    goGetCard() {
        return this.drawCardToPlayer(this.getNextCurrentPlayer());
    }

    drawCardToPlayer(player) {
        let drawnCard = this.getNewCardFromDeck();
        player.addCardDeck(drawnCard);
        return drawnCard;
    }

    skipTurn() {
        this.changeCurrentPlayer();
    }

    checkStopCard(cardPlayedNumber, color, category) {
        return this.verifyCategory(category) || this.matchesLastCardProp(cardPlayedNumber, "color", color);
    }

    validateCard(drawnCard, cardPlayedNumber) {
        let number = parseInt(drawnCard.number);
        let category = drawnCard.category;
        let quantity = parseInt(drawnCard.quantity);
        let color = drawnCard.color;

        switch (category) {
            case "GoGet":
                return this.checkGoGetCard(cardPlayedNumber, quantity, category, color)
            case "ChangeDirection":
                return this.checkChangeDirectionCard(cardPlayedNumber, color, category);
            case "Number":
                return this.checkNumberCard(cardPlayedNumber, number, color);
            case "Stop":
                return this.checkStopCard(cardPlayedNumber, color, category);
            case "ChangeColor":
                return this.checkChangeColorCard(cardPlayedNumber, category);
        }
        return false;
    }

    playerWon(player) {
        return player.hand.length === 0;
    }

    removePlayedCardDeck(playedCard) {
        let indexOfPlayedCard = this.deck.indexOf((card) => card.id === playedCard.id);
        this.deck.splice(indexOfPlayedCard, 1);
    }

    playCard(playedCard, cardPlayedNumber) {
        if (this.validateCard(playedCard, cardPlayedNumber)) {
            this.getCurrentPlayer().playCard(playedCard);

            this.deck.splice(Math.floor(Math.random() * this.deck.length), 0, playedCard);
            this.topCard = playedCard;
            console.log(this.deck);
            return true;
        }
        return false;
    }

    hasFullStack() {
        return this.deck.length > 2 * this.totalNumberCards / 3;
    }
    hasMediumStack() {
        return this.deck.length <= 2 * this.totalNumberCards / 3;
    }

    hasSmallStack() {
        return this.deck.length < this.totalNumberCards / 3;
    }
}

class View {
    showGameBoard() {
        $("body").delay(500).fadeIn(2000);
    }

    removeCardHand(cardToRemove) {
        $(cardToRemove).remove();
    }

    showColorPicker() {
        $("#colorPallet").fadeIn();
    }
    hideColorPicker() {
        $("#colorPallet").fadeOut();
    }
    showUnoImg(playerNumber) {
        $(`#player${playerNumber} #unoIMG`).fadeIn();
    }
    hideUnoImg(playerNumber) {
        $(`#player${playerNumber} #unoIMG`).fadeOut();
    }

    showActiveTurn(playerList, activePlayer) {
        playerList.forEach(player => $(`#player${player.playerNumber} h1`).removeClass("activeTurn"));
        $(`#player${activePlayer.playerNumber} h1`).addClass("activeTurn");
    }

    showDeckCard(deckHand, card) {
        deckHand.append(card);
    }

    showTopCard(topCard) {
        $("#topCard").replaceWith($(topCard).attr("id", "topCard"));

    }

    displayPlayersNames(players) {
        players.forEach(player => {
            $(`#player${player.playerNumber} > h1`).text(player.name);
        })
    }

    changeTopCardClass(className) {
        let remainingDeck = $("#remainingDeck");
        remainingDeck.removeClass();
        remainingDeck.addClass(`${"img"} ${className}`);
    }
}

class Controller {
    constructor() {
        this.view = new View();
        this.con = new Model();

        this.setButtonClicks();
    }

    setButtonClicks() {
        this.con.playerList.forEach(player => {
            $(`#player${player.playerNumber} #finish`).on("click", () => {
                this.con.transferOldCardsToDeck();
                //After clicking in the finish Button, check if it was the correct button, if the player has already played at least 1 card and if the card played doenst have a neutral back color
                if (player.playerNumber === this.con.getCurrentPlayer().playerNumber && player.checkPlayerHasPlayed() && this.con.topCard.color !== "neutral") {

                    this.cardActionByCategory(player);

                    //After, check to see if it was the last card played
                    if (this.con.playerWon(this.con.getCurrentPlayer())) {

                        $(`#player${this.con.getCurrentPlayer().playerNumber}`).addClass("victory");
                        this.con.gameOver = true;
                        alert(`The player ${this.con.getCurrentPlayer().name} has won`);
                    } else {
                        //If the game continues, change player, show new pleyer turn and empty the array of cards played by the player
                        this.con.changeCurrentPlayer();
                        this.view.showActiveTurn(this.con.playerList, this.con.getCurrentPlayer());
                        player.emptyPlayedCards();
                    }
                    console.log(this.con.deck);
                }
            });

            $(`#player${player.playerNumber} #uno`).on("click", () => {
                if (player.hand.length === 1) {
                    this.view.showUnoImg(player.playerNumber);
                    player.enableUno();
                } else {
                    alert("Too early for uno, my dude");
                    //Go fetch like 7 cards
                }
            });
        });

        const colorPalletDiv = document.querySelectorAll("#colorPallet > div.card");
        colorPalletDiv.forEach(colorCard => {
            $(colorCard).on("click", () => {
                let colorClassName = colorCard.classList[colorCard.classList.length - 1];
                let colorName = colorCard.classList[1].slice(0, colorClassName.length - 4);
                this.con.topCard.color = colorName;
                $("#topCard").removeClass("neutralBack");
                $("#topCard").addClass(colorClassName);
                this.view.hideColorPicker();
            });
        });



    }
    cardActionByCategory(player) {
        let categoryPlayed = player.turnPlayedCards[0].category;
        switch (categoryPlayed) {
            case "Stop":
            case "ChangeDirection":
                //If the played card is a STOP or CHANGEDIRECTION than skip a turn
                this.con.skipTurn();
                break;
            case "GoGet":
                //Calculate the total cards to get from the deck
                let numberOfCardsDraw = this.con.getCurrentPlayer().turnPlayedCards.reduce((accumulator, card) => accumulator + parseInt(card.quantity), 0);
                this.con.getNextCurrentPlayer().cardsToDraw += numberOfCardsDraw;
                break;
        }
    }
    async getAllCards() {
        //Fetch all cards
        return fetch("http://localhost/getCards.php").then(response => {
            return response.json();
        }).then(returnedValue => {
            //For each card return in JSON, create an instance and save it in the deck array
            returnedValue.forEach(JsonValue => {
                this.con.deck.push(new Card(JsonValue));
            });
            this.con.totalNumberCards = this.con.deck.length;
            //Shuffle the deck
            this.con.shuffleDeck();
            //Draw for each player, x numbers of cards. The number is define as a variable called defaultHandSize
            this.con.getStartingHands();
        });
    }

    startGame() {
        //Start by hiding the color picker
        this.view.hideColorPicker();
        //Fetch all the cards from the Database
        this.getAllCards().then(() => {
            //For each player draw
            this.con.playerList.forEach(player => {
                //Show hands
                this.showInitialCards(player);
            });
            //Get and Show the first Top Card
            this.view.showTopCard(this.paintCard(this.con.getNewTopCard()));
            this.view.showGameBoard();
        });

        //Set a click listener to draw a card as the user clicks in the remaining deck
        $("#remainingDeck").on("click", () => {
            console.log(this.con.deck);
            if (this.con.hasFullStack()) {
                this.view.changeTopCardClass("fullStackDeck");
            } else if (this.con.hasSmallStack()) {
                this.view.changeTopCardClass("smallStackDeck");
            } else if (this.con.hasMediumStack()) {
                this.view.changeTopCardClass("mediumStackDeck");
            }

            let currentPlayer = this.con.getCurrentPlayer();

            if (!this.con.isGameOver()) {
                let numberCardsDrawn = 0;

                do {
                    //Show a new card from the deck
                    this.showDrawnCard(currentPlayer, this.con.drawCardToPlayer(currentPlayer));
                    numberCardsDrawn++;

                } while (numberCardsDrawn < currentPlayer.cardsToDraw);

                this.con.getCurrentPlayer().cardsToDraw = 0;
            }
        });

        //Show whitch user is the firs to play
        this.view.showActiveTurn(this.con.playerList, this.con.getCurrentPlayer());
    }

    showDrawnCard(player, drawnCard) {
        //Get the HTML Div for the correspondent player zone
        let deckHand = $(`#player${player.playerNumber} > .deckZone`)[0];
        //Create the HTML Card with all the necessary classes and content
        let displayedCard = this.paintCard(drawnCard);
        //Set the click listener
        this.defineCardClickEvent(player, displayedCard, drawnCard);
        //Show the created card in the browser
        this.view.showDeckCard(deckHand, displayedCard)
    }

    defineCardClickEvent(player, displayedCard, clickedCardObj) {
        //Card Clicked
        $(displayedCard).on("click", () => {
            //Check if, its the correct player turn and if the last card played was not a neutralCard
            if (player.playerNumber === this.con.getCurrentPlayer().playerNumber && this.con.topCard.color !== "neutral") {
                //Check if the played card can be played
                let playerTurn = player.getTurnCardsNumber();
                let playerHasCardsToDraw = player.hasCardsToDraw()

                playerTurn = playerHasCardsToDraw ? 2 : player.getTurnCardsNumber();

                if (this.con.playCard(clickedCardObj, playerTurn)) {

                    if (playerHasCardsToDraw) {
                        console.log(`You have ${player.cardsToDraw} cards to draw`);
                        this.con.getNextCurrentPlayer().cardsToDraw = player.cardsToDraw;
                        player.cardsToDraw = 0;
                    }

                    //If the card played has a neutral color, the user has to pick a new one
                    if (clickedCardObj.color === "neutral") {
                        this.view.showColorPicker();
                    }
                    this.view.removeCardHand(displayedCard);
                    this.view.showTopCard(displayedCard);
                }
            }
            else {
                console.log(`Invalid Card`);
            }
        });
    }

    showInitialCards(player) {
        //Sort initial hand by color
        let hand = player.hand.sort((card1, card2) => card1.color.localeCompare(card2.color));;

        //Get HTML Div of the Deck Zone
        let deckHand = $(`#player${player.playerNumber} > .deckZone`)[0];
        //Write the player Name in the titles
        $(`#player${player.playerNumber} > h1`).text(player.name);

        //Empty the deckHand just in case
        deckHand.innerHTML = "";

        //For each card in hand, display it in the browser
        hand.forEach(card => {
            this.showDrawnCard(player, card);
        })
    }

    paintCard(card) {
        //Get the card info into seperate variables
        let color = card.color;
        let category = card.category;
        let quantity = parseInt(card.quantity);
        let number = parseInt(card.number);

        //Create the basic template for a card
        let newCard = $(`<div class="card"></div>`);
        newCard.addClass(color + "Back");
        newCard.addClass(category);
        newCard.addClass(category === "ChangeDirection" || category === "ChangeColor" || category === "Stop" ? "img" : "");

        if (number < 10) {
            //If the number is lesser the 10, means its a numbered card
            newCard.text(number);
        } else if (quantity != 0) {
            //If the quantity is different than 0, means its a GoGet card
            newCard.text(`+${quantity}`);
        }

        return newCard[0];
    }
}

class Game {
    constructor() {
        this.controller = new Controller();
        this.controller.startGame();
    }
}

$(function () {
    window.game = new Game();
});