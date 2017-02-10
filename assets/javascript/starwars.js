//create globals


//create a function to create objects for the game. parameters are for
//both display and game functionality.
function Character(name, strength, counter, health, color, imagePath){
  this.name = name;
  this.strength = strength;
  this.counter = counter;
  this.health = health;
  this.color = color;
  this.imagePath = imagePath;

  //methods
  this.isDead = function(){
    if(this.health > 0){
      return false;
    } else {
      return true;
    }
  };

  this.reset = function(){
    this.strength = strength;
    this.health = health;
  }
}

//define character objects and push them into the characterArray
var characterArray = [];
var mace = new Character("Mace Windu", 13, 11, 120, "purple", "assets/images/mace.jpg");
characterArray.push(mace);
var vader = new Character("Darth Vader", 19, 14, 130, "red", "assets/images/vader.jpg");
characterArray.push(vader);
var yoda = new Character("Yoda ", 17, 16, 125, "green", "assets/images/yoda.jpg");
characterArray.push(yoda);
var grievous = new Character("General Grievous", 13, 9, 110, "gray", "assets/images/grievous.jpg");
characterArray.push(grievous);
var rey = new Character("Rey ", 16, 11, 115, "blue", "assets/images/rey.jpg");
characterArray.push(rey);

//initialize empty objects, these will be overridden with the appropriate
//character object when the click events execute.
var playerObj = {};
var opponentObj = {};

var attack = function(agent, patient){
  patient.health -= agent.strength;
  agent.strength += 6;
  agent.health -= patient.counter;
};



//this function is designed to be run with characterArray.map(***).
//it uses some JQ methods to make them unique to each character.
//it also creates divs for each of the characters and appends them to the #choices section.
var createCharacters = function(currentValue){
      var ch = $("<div>");
      var id = currentValue.name.substr(0, currentValue.name.indexOf(" "));
      ch.attr("id", id);
      ch.attr("data-health", currentValue.health);
      ch.addClass("character");
      ch.css("background-image", "url("+ currentValue.imagePath +")");
      ch.html("<h2>"+currentValue.name+"</h2><hr><h5>"+ch.data("health")+"</h5>");
      ch.css("border-color", currentValue.color);
      ch.children().css("background-color", currentValue.color);
      $("#choices").append(ch);
  }


/* This function is designed to run within the array.map() method.
* the array is an array of character objects, the same array as before.
* It takes the divs created by createCharacters() and adds click events
* for player selection. It then moves the player to the #player section
* adds the rest to the #enemies section, then removes the player choice click events
* via $().off("click"). Then it will add the opponent click events which moves
* the ".character" div to the #opponent section. phew - thats a lot.
*/
var addPickClicks = function(currentValue){
    var id = currentValue.name.substr(0, currentValue.name.indexOf(" "));// reusing, not a fan of this
    var hashid = "#" + id;
    $(hashid).on("click", function(){
      playerObj = currentValue;
      var playerChoice = $("#player");
      $(this).appendTo(playerChoice);
      var enemies = $("#choices > div");
      $("#enemies").append(enemies);
      $("#choices").remove();
      enemies.off("click");
      enemies.on("click", function(){
        var opponent = $("#opponent");
        $(this).appendTo(opponent);
        getOpponentObj();
        play(playerObj, opponentObj);
        enemies.off("click");
        });
      });
}

var updateHealthData = function(player, opponent){
  var enemies = $("#enemies > div");
  var currentOpponent = $("#opponent > div");
  var h = player.health;
  var o = opponent.health;
  if(player.isDead()){
    $("button").remove();
    gameOver("l");
    h = 0; // so health doesn't display negative
  } else if (enemies[0] == undefined && currentOpponent[0] == undefined){
    $("button").remove();
    gameOver("w");
  }
  $("#player > div").attr("data-health", h);
  $("#opponent > div").attr("data-health", o);
  $("#player > div > h5").html(h);
  $("#opponent > div > h5").html(o);

}

var getOpponentObj = function(){
  var temp = $("#opponent > div").attr("id");
  var n = characterArray.filter(function(element){
    if(element.name.includes(temp)){
      return element;
    }
  });
  opponentObj = n[0];
}

var play = function(player, opponent){
  var JQplayer = $("#player > div");
  var button = $("<button>");
  button.html("Attack");
  JQplayer.append(button);
  $("#opponent").off("click");
  button.on("click", function(){
    battle(player, opponent);
  });
}

//this function provides the logic for the game loss condition
var gameOver = function(condition){
  var htmlString = ""
  if(condition == "w"){
    htmlString = "You Won!"
  } else if (condition == "l"){
    htmlString = "You Lose."
  }
  var newSpan = $("<span>");
  var playAgainButton = $("<button>");
  newSpan.html(htmlString);
  newSpan.css("color", "white")
  playAgainButton.html("Play Again?");
  newSpan.appendTo($("#player > div"));
  playAgainButton.appendTo($("#player > div"))
  playAgainButton.on("click", function(){
    resetObjects();
    resetGame();
  })
};

//this function will reset the game objects by invoking their reset method
var resetObjects = function(){
  characterArray.map(function(currentValue){
    currentValue.reset();
  });
};

//this function will reset the game board html
var resetGame = function() {
  $(".character").remove();//remove all remaining character divs
  //need to remake the #choices section
  var choices = $("<section>")
  choices.html("<h3>Try A Different Strategy</h3>");
  choices.attr("id", "choices");
  choices.addClass("area");
  choices.prependTo(".main-container")
  characterArray.map(createCharacters);
  characterArray.map(addPickClicks);
}

var battle = function(player, opponent){
    if (player.strength >= opponent.health){
      attack(player, opponent);
      $("#opponent > div").remove();
      nextOpponentClick();
      updateHealthData(player, opponent);
      $("button").remove();
    } else if(!player.isDead() && !opponent.isDead()){
       attack(player, opponent);
       updateHealthData(player, opponent);
    }
};

var nextOpponentClick = function(){
  var enemies = $("#enemies > div");
  if(enemies[0] != undefined){
    $("#enemies > div").on("click", function(){
      var newOpponent = $("#opponent");
      $(this).appendTo(newOpponent);
      getOpponentObj();
      play(playerObj, opponentObj);
      $(this).off("click");
      $("#enemies > div").off("click");
    });
  }
};

characterArray.map(createCharacters);
characterArray.map(addPickClicks);
