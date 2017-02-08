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
}

//define character objects and push them into the characterArray
var characterArray = [];
var mace = new Character("Mace Windu", 10, 5, 100, "purple", "assets/images/mace.jpg");
characterArray.push(mace);
var vader = new Character("Darth Vader", 13, 7, 120, "red", "assets/images/vader.jpg");
characterArray.push(vader);
var yoda = new Character("Yoda ", 12, 10, 110, "green", "assets/images/yoda.jpg");
characterArray.push(yoda);
// var grievous = new Character("General Grievous", 10, 4, 95, "gray", "assets/images/grievous.jpg");
// characterArray.push(grievous);
// var rey = new Character("Rey ", 11, 6, 105, "blue", "assets/images/rey.jpg");
// characterArray.push(rey);

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
  var h = player.health;
  var o = opponent.health;
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

var counter = 0;

var play = function(player, opponent){
  counter++;
  console.log("ran play "+counter+" times")
  var JQplayer = $("#player > div");
  var button = $("<button>");
  button.html("Attack");
  JQplayer.append(button);
  $("#opponent").off("click");
  button.on("click", function(){
    battle(player, opponent);
  });
}

var battle = function(player, opponent){
  if (player.strength >= opponent.health){
    attack(player, opponent);
    $("#opponent > div").remove();
    nextOpponentClick();
    updateHealthData(player, opponent);
    $("button").remove();
    console.log("ran button.remove");
  } else if(!player.isDead() && !opponent.isDead()){
    attack(player, opponent);
    updateHealthData(player, opponent);
    console.log("ran keep playing");
  }
};

var nextOpponentClick = function(){
  $("#enemies > div").on("click", function(){
    var newOpponent = $("#opponent");
    $(this).appendTo(newOpponent);
    getOpponentObj();
    play(playerObj, opponentObj);
  });
};

//still to do, find out a better way for DOM logic. Need a game end scenario.


characterArray.map(createCharacters);
characterArray.map(addPickClicks);
