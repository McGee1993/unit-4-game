$(document).ready(function() {
    var playerNumber = 0;
    var gameNumber = numberGenerator();
    var wins = 0;
    var losses = 0;
    var crystal;

    function randomCrystal() {
        return {
            red: {
                points: Math.floor(Math.random()*12) + 1,
                imageUrl: "assets/images/red.png"
            },
            blue: {
                points: Math.floor(Math.random()*12) + 1,
                imageUrl: "assets/images/blue.png"
            },
            yellow: {
                points: Math.floor(Math.random()*12) + 1,
                imageUrl: "assets/images/yellow.png"
            },
            green: {
                points: Math.floor(Math.random()*12) + 1,
                imageUrl: "assets/images/green.png"
            }
        };
    }
    function numberGenerator() {
        return Math.floor(Math.random()*102) + 19;
    }
    function resetGame() {
        playerNumber = 0;
        crystal = randomCrystal();
        gameNumber = numberGenerator();
        $("#number").text(gameNumber);
    }
    function updateDom(didPlayerWin) {
        $("#wins").empty();
        if (didPlayerWin === true) {
            $("#wins").append($("<p>").text("You win !!!"));
            resetGame();
            renderMatchingNumber();
        }
        else if (didPlayerWin === false) {
            $("#wins").append($("<p>").text("You lose :("));
            resetGame();
            renderMatchingNumber();
        }
        var wSpan = $("<span>").text(wins);
        var lSpan = $("<span>").text(losses);
        var pWins = $("<p>").text("Wins: ");
        var pLosses = $("<p>").text("Losses: ");
        pWins.append(wSpan);
        pLosses.append(lSpan);
        $("#wins").append(pWins);
        $("#wins").append(pLosses);
    }
    function renderCrystal() {
        for (var key in crystal){
            var crystalDiv = $("<div class='crystal-button' data-name='" + key + "'>");
            var crystalImg = $("<img alt= 'image' class='crystal-img'>").attr("src", crystal[key].imageUrl);
            crystalDiv.append(crystalImg);
            $("#buttons").append(crystalDiv);
        }
    }
    function updateMatchingNumber(crystals) {
        playerNumber += crystal[crystals.attr("data-name")].points;
    }
    function renderMatchingNumber() {
        var scoreNumDiv = $("<div id= 'score-number'>").text(playerNumber);
        $("#score").html();
        $("#score").html(scoreNumDiv);
    }
    resetGame();
    updateDom();
    renderCrystal();
    renderMatchingNumber();
    $(".crystal-button").on("click", function(event) {
        updateMatchingNumber($(this));
        renderMatchingNumber();
        if (playerNumber === gameNumber) {
            wins++;
            resetGame();
            updateDom(true);
        }
        else if (playerNumber > gameNumber) {
            losses++;
            resetGame();
            updateDom(false);
        }
    });
});