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

$(document).ready(function(){
  for(var i = 0; i<characterArray.length; i++){
    var ch = $("<div>");
    var id = characterArray[i].name.substr(0, characterArray[i].name.indexOf(" "));
    ch.attr("id", id);
    ch.addClass("character");
    ch.css("background-image", "url("+ characterArray[i].imagePath +")");
    ch.html("<h2>"+characterArray[i].name+"</h2>");
    ch.css("border-color", characterArray[i].color);
    ch.children().css("background-color", characterArray[i].color);
    $("#choices").append(ch);
    var hashid = "#"+id;
    $(hashid).on("click", function(){
      var playerChoice = $("#player");
      $(this).appendTo(playerChoice);
      var enemies = $("#choices > div");
      $("#enemies").append(enemies);
      enemies.off("click");
      enemies.on("click", function(){
        var opponent = $("#opponent");
        $(this).appendTo(opponent);
      });
    });
  }


});
