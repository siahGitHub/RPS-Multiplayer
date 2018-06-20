// Initialize Firebase
// This is the code we copied and pasted from our app page

var config = {
    apiKey: "AIzaSyBL1snLeJjsdwLMuQbRja-ISwyljf2Amtg",
    authDomain: "siah-firebase-project.firebaseapp.com",
    databaseURL: "https://siah-firebase-project.firebaseio.com",
    projectId: "siah-firebase-project",
    storageBucket: "siah-firebase-project.appspot.com",
    messagingSenderId: "122949426588"
};
firebase.initializeApp(config);

// Make sure to match the configuration to the script version number in the HTML
// (Ex. 3.0 != 3.7.0)

// Assign the reference to the database to a variable named 'database'
// var database = ...
var database = firebase.database();

// Initial Values
var game = {
    gameStatus: "awaiting players",
    numberOfPlayers: 0
};

database.ref('rps/game').push(game);
// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref('rps/player/').on("child_added", function (childSnapshot) {

    console.log(childSnapshot.val());
    //addPlayer(childSnapshot.val());
    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// This function allows you to update your page in real-time when the firebase database changes.
database.ref('rps/game/').on("child_added", function (childSnapshot) {

    console.log(childSnapshot.val());
    //addPlayer(childSnapshot.val());
    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

//check the number of players in the game
// --------------------------------------------------------------
function addPlayer(employee) {
    var row = $("<tr>").html("<td>" + employee.name + "</td>" + "<td>" + employee.role + "</td>" + "<td>" + employee.monthlyRate + "</td>" + "<td>" + employee.startDate + "</td>");
    //$("#employee-table").append(row);
    $('tbody').append(row);
}


// Whenever a user clicks the submit-bid button
$("#add-player").on("click", function (event) {
    // Prevent form from submitting
    event.preventDefault();

    playerName = $("#name-input").val();
    age = $("#role-input").val();
    wins = $("#start-input").val();
    losses = $("#rate-input").val();

    var player = {
        name: playerName,
        age: age,
        wins: wins,
        losses: losses,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    };

    //update game info to show a player has joined the game and push to the database
    if (parseInt(game.numberOfPlayers) < 2) {
        game.numberOfPlayers++;
        game.gameStatus = "awaiting another player"
        database.ref('rps/game').set(game);

        //push player details to database
        database.ref('rps/player').push(player);
    }
    else {
        game.gameStatus = "game ready";
        console.log(game);
    }

    
});