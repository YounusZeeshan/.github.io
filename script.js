(function(){
    "use strict";

    window.addEventListener("load", function(){
        const startGame = document.getElementById('startgame');
        const gameControl = document.getElementById('gamecontrol');
        const game = document.getElementById('game');
        const score = document.getElementById('score');
        const actionArea = document.getElementById('actions');
        const p1name = prompt("Type the name for the player 1")
        const p2name = prompt("Type the name for the player 2")
        
        const gameData = {
            dice: ['1die.jpg', '2die.jpg', '3die.jpg',
            '4die.jpg', '5die.jpg', '6die.jpg'],
            players: [p1name, p2name],
            score: [0, 0],
            roll1: 0,
            roll2: 0,
            rollSum: 0,
            index: 0,
            gameEnd: 49
        };

        startGame.addEventListener("click", function(){

            gameData.index = Math.round(Math.random())

            gameControl.innerHTML = "<h2 id='end'>The Game Has Started</h2>"
            gameControl.innerHTML += "<button id='quit'>Wanna Quit?</button>"

            document.getElementById("quit").addEventListener("click", function(){
                location.reload();
            });

            setUpTurn()
        })

        function setUpTurn(){
            game.innerHTML = `<p>Roll the dice for player ${gameData.players[gameData.index]}</p>`
            actionArea.innerHTML = '<button id="roll">Roll the Dice!</button>'
            document.getElementById("roll").addEventListener("click", function(){
                throwDice()
            })
        }

        function throwDice(){
            actionArea.innerHTML = "";
            gameData.roll1 = Math.floor(Math.random() * 6) + 1
            gameData.roll2 = Math.floor(Math.random() * 6) + 1
            game.innerHTML = `<p>Roll the dice for player ${gameData.players[gameData.index]}</p>`
            game.innerHTML += `<img src="${gameData.dice[gameData.roll1 - 1]}" alt="die">`
            game.innerHTML += `<img src="${gameData.dice[gameData.roll2 - 1]}" alt="die">`
            gameData.rollSum = gameData.roll1 + gameData.roll2

            if(gameData.rollSum === 2){
                game.innerHTML += '<p>Oh snap! Snake Eyes</p>'
                gameData.score[gameData.index] = 0;
                gameData.index ? (gameData.index = 0) : (gameData.index = 1)
                setTimeout(setUpTurn, 2000) 
            } 
            else if (gameData.roll1 === 1 || gameData.roll2 === 1){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1)
                game.innerHTML += `<p>Sorry, one of your rolls was a one, switching to player ${gameData.players[gameData.index]}</p>`
                showCurrScore()
                setTimeout(setUpTurn, 2000)
            } 
            else{
                gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum
                actionArea.innerHTML = "<button id='rollagain'>Roll Again</button> or <button id='pass'>Pass</button>"

                document.getElementById("rollagain").addEventListener("click", function(){
                    throwDice()
                })

                document.getElementById("pass").addEventListener("click", function(){
                    gameData.index ? (gameData.index = 0) : (gameData.index = 1)
                    setUpTurn()
                })

                checkWinningCondition()
            }
        }

        function checkWinningCondition(){
            if(gameData.score[gameData.index] > gameData.gameEnd){
                score.innerHTML = `<h2>The Winner is player ${gameData.players[gameData.index]} with ${gameData.score[gameData.index]} points!</h2>`
                actionArea.innerHTML = "";
                document.getElementById("end").innerHTML = "<h2>The Game Has Ended!</h2>"
                document.getElementById("quit").innerHTML = "Start a New Game?"
            }
            else{
                showCurrScore()
            }
        }
            
        function showCurrScore(){
            score.innerHTML = `<p>The score for <strong>${gameData.players[0]} is ${gameData.score[0]}</strong> and the score for <strong>${gameData.players[1]} is ${gameData.score[1]}</strong></p>`
        }
    })
})();