//create globals

//define character objects

function Character(name, strength, counter, health, color){
  this.name = name;
  this.strength = strength;
  this.counter = counter;
  this.health = health;
  this.color = color;


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

var mace = new Character("Mace Windu", 10, 5, 50, "purple");
var vader = new Character("Darth Vader", 13, 7, 60, "red");
var yoda = new Character("Yoda", 12, 10, 70, "green");
var grievous = new Character("General Grievous", 10, 4, 45, "gray");
