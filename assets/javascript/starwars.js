//create globals

//define character objects

function Character(name, strength, counter, health, color, imagePath){
  this.name = name;
  this.strength = strength;
  this.counter = counter;
  this.health = health;
  this.color = color;
  this.imagePath = imagePath;

  //methods
  this.attack = function(target){
    target.health -= this.strength;
    this.strength += 6;
    this.health -= target.counter;
  };

  this.isDead = function(){
    if(this.health > 0){
      return false;
    } else {
      return true;
    }
  };
}

var characterArray = [];
var mace = new Character("Mace Windu", 10, 5, 50, "purple", "assets/images/mace.jpg");
characterArray.push(mace);
var vader = new Character("Darth Vader", 13, 7, 60, "red", "assets/images/vader.jpg");
characterArray.push(vader);
var yoda = new Character("Yoda ", 12, 10, 70, "green", "assets/images/yoda.jpg");
characterArray.push(yoda);
var grievous = new Character("General Grievous", 10, 4, 45, "gray", "assets/images/grievous.jpg");
characterArray.push(grievous);


var playerObj = {};
var opponentObj = {};

var  createCharacters = function(currentValue){
      var ch = $("<div>");
      var id = currentValue.name.substr(0, currentValue.name.indexOf(" "));
      ch.attr("id", id);
      ch.addClass("character");
      ch.css("background-image", "url("+ currentValue.imagePath +")");
      ch.html("<h2>"+currentValue.name+"</h2>");
      ch.css("border-color", currentValue.color);
      ch.children().css("background-color", currentValue.color);
      $("#choices").append(ch);
  }

  var addInitialClick = function(currentValue){
    var id = currentValue.name.substr(0, currentValue.name.indexOf(" "));// reusing, not a fan of this
    var hashid = "#" + id;
    $(hashid).on("click", function(){
      playerObj = currentValue;
      var playerChoice = $("#player");
      $(this).appendTo(playerChoice);
      var enemies = $("#choices > div");
      $("#enemies").append(enemies);
      enemies.off("click");
      enemies.on("click", function(){
        var opponent = $("#opponent");
        $(this).appendTo(opponent);
        getOpponentObj();
        play(playerObj, opponentObj);
        });
      });
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
  var JQplayer = $("#player");
  var JQopponent = $("#opponent");
  console.log(player)
  console.log(opponent)

    JQplayer.on("click", function(){
      if(!player.isDead() && !opponent.isDead()){
        player.attack(opponent);
        console.log(player.health);
      } else if (opponent.isDead()){
        $("#opponent").empty();
      }
  })
}

$(document).ready(function(){
    characterArray.map(createCharacters);
    characterArray.map(addInitialClick);
  }
);
