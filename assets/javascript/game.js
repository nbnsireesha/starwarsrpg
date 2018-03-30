var gameOn = false;
var chooseDefender = false;
var userDeath = false;
var victim;
var assailant;
var winner;
var deadOnes = [];
var audiofiles = ["assets/audio-files/Chewbacca Sound 2.mp3","assets/audio-files/sense_fear.wav","assets/audio-files/I_am_a_Jedi_like_my_father_before_me.ogx","assets/audio-files/I have you now.mp3"];
var attackAudio = "assets/audio-files/sw4-lightsabre.wav";
var winAudio = "assets/audio-files/Ta Da-SoundBible.com-1884170640.mp3";
var failAudio = "assets/audio-files/Dont fail me again.mp3";
var audio = new Audio();
// var noDef = true;
$("#restart").hide();
$("#Attack").hide();
	// LukeSkywalker attributes
$("#LukeSkywalker").attr("hp","100");
$("#LukeSkywalker").attr("attackPower","6");
$("#LukeSkywalker").attr("name","LukeSkywalker");
$("#LukeSkywalker").attr("counterAttackPower","25");
var likeHp = $("#LukeSkywalker").attr("hp");
//var attackuser = $("#LukeSkywalker").attr("hp");

//Chewbacca attributes
$("#Chewbacca").attr("hp","120");
$("#Chewbacca").attr("attackPower","6");
$("#Chewbacca").attr("name","Chewbacca");
$("#Chewbacca").attr("counterAttackPower","10");
var ChewbaccaHp = $("#Chewbacca").attr("hp");

//yoda attributes
$("#yoda").attr("hp","180");
$("#yoda").attr("name","yoda");
$("#yoda").attr("attackPower","6");
$("#yoda").attr("counterAttackPower","5");
var yodaHp = $("#yoda").attr("hp");

//DarthSidious attributes
$("#darthvader").attr("hp","150");
$("#darthvader").attr("name","DarthVader");
$("#darthvader").attr("attackPower","6");
$("#darthvader").attr("counterAttackPower","15");
var darthvaderHp = $("#darthvader").attr("hp");


var chooseId;//your charecter id
var defId;
$(".character").on("click",function(){

	
	if (!(gameOn) && !(chooseDefender)) {

		var chooseId = this.id;
		console.log(chooseId);
		function palyAudio(){
			if(chooseId == "Chewbacca"){
				audio.src = audiofiles[0];
				audio.volume = 0.3;
				audio.play();

			}
			if(chooseId == "yoda"){
				audio.src = audiofiles[1];
				audio.volume = 0.3;
				audio.play();

			}
			if(chooseId == "LukeSkywalker"){
				audio.src = audiofiles[2];
				audio.volume = 0.3;
				audio.play();

			}
			if(chooseId == "darthvader"){
				audio.src = audiofiles[3];
				audio.volume = 0.3;
				audio.play();
			}
		}
		palyAudio();
		//setInterval(palyAudio(), 10000);
		
		chooseDefender = true; // flags that user needs to choose opponent next
		assailant = $(this).detach();// removes user from available
		console.log(assailant);
		$("#chooseText").html(" Enemy"); 
		assailant.appendTo("#yourChar"); // adds user to battle
		$(".character").css("background-color", "#428bca");
		$(this).css("background-color","#dff0d8");
		$(this).css("width","58%");
		$(this).css("margin-right","0px");
		
		
		
	} else if (chooseDefender) { //user is alive and needs a new opponent
		
		defId = this.id;
		console.log(defId);
		function palyAudio(){
			if(defId == "Chewbacca"){
				audio.src = audiofiles[0];
				audio.volume = 0.3;
				audio.play();

			}
			if(defId == "yoda"){
				audio.src = audiofiles[1];
				audio.volume = 0.3;
				audio.play();

			}
			if(defId == "LukeSkywalker"){
				audio.src = audiofiles[2];
				audio.volume = 0.3;
				audio.play();

			}
			if(defId == "darthvader"){
				audio.src = audiofiles[3];
				audio.volume = 0.3;
				audio.play();
			}
		}
		palyAudio();
		chooseDefender = false;
		gameOn = true; //flags functionality of fight and reset buttons, disables characters
		// noDef = false;
		victim = $(this).detach(); // removes opponent from available
		victim.appendTo("#Defender"); // adds opponent to battle
		$("#Attack").show();
		$("#messages2").hide();
		$(this).css("background-color", "#42a9a4");
		$(this).css("width","58%");
		//console.log(victim);
		$(this).css("margin-left","0px");

	}

})
//start the game
$("button").on("click",function(){
	// if(!(gameOn) && !(userDeath) && noDef== true)
	// {
	// 	$("#messages").show();
	// 	$("#messages").html("Please choose Defender");
	// }
	if(gameOn){
		attack();
	}
	else if(userDeath ||!(gameOn)){
		restart();
		
		
	}
})
function attack(){
	  // var temp = $("#"+chooseId);
	 // console.log(temp);
	 // $(function(){window.setInterval("$("#"+temp).toggle()",2000);});
	 audio.src = attackAudio;
	 audio.play();

	var VictimHP =parseInt(victim.attr("hp"));//getting victim hp
	console.log(parseInt(VictimHP));
	var userAttackPower = parseInt(assailant.attr("attackPower"));//getting your charecter attack power
	//var userAPColor = userAttackPower.fontcolor("yellow");
	VictimHP = VictimHP-userAttackPower;//decreasing victim hp by user
	victim.attr("hp",VictimHP);//changing victim hp value
	$("#Defender").find(".CharHp").html(VictimHP);
	$("#messages").html("you did " +userAttackPower +" " +"damage to" +" " +victim.attr("name"));
	userAttackPower = userAttackPower+6; //update attack-power
	assailant.attr("attackPower", userAttackPower); //change data on user attack power
	//check to see if victim has been killed
	if (VictimHP <= 0) {
			deadOnes.push(victim.detach());
			//console.log(deadOnes.join());
			$("#messages2").hide();
			$("#messages").html(" And you killed him!");
			$("#messages2").html("choose another defender");
			$("#messages2").show();
			checkForOtherCharecters();
			$("#Attack").hide();
	}
	else{
		// get user hp of your charecter
		var youCharHp = parseInt(assailant.attr("hp"));
		var counterAttack = parseInt(victim.attr("counterAttackPower"));
		youCharHp = youCharHp - counterAttack;
		assailant.attr("hp",youCharHp);
		$("#yourChar").find(".CharHp").html(youCharHp);
		//$("#messages").append("   ");
		$("#messages2").html(victim.attr("name") +" " + "did" +" " +counterAttack +" " + "damage to you.")
		if(youCharHp<=0){
			$("#messages2").hide();
			 $("#messages").html("He Killed you");
			 audio.src = failAudio;
			audio.play();
			userDeath = true;
			gameOn = false;//if user dead the game should be restarted 
			deadOnes.push(assailant.detach());
			$("#Attack").hide();
			$("#restart").show();
		}
		else{
			$("#messages2").show();
		}
		
	}

}
function checkForOtherCharecters(){
	if(deadOnes.length == 3){
		$("#messages").text("You won the game");
		audio.src = winAudio;
		audio.play();
		$("#Attack").hide();
		$("#restart").show();
		$("#messages2").hide();
		gameOn=false;
	}
	else{
		chooseDefender = true;
	}

}
function restart(){
	//noDef = true;
	var attackuser = 6;
	chooseDefender = false;//defender need to be choosen
	userDeath = false;//user is not dead he is alive
	gameOn = false; //only when you choose a defender gameOn will be true
	for(var i=0 ; i<deadOnes.length; i++){
		deadOnes[i].appendTo("#available");
	}
	deadOnes = [];
	winner = assailant.detach();
	winner.appendTo("#available");
	var oppon = victim.detach();
	oppon.appendTo("#available");
	$(".character").css("background-color", "#dff0d8");
	$(".character").css("width","15%");
	$("#messages").html("");
	$("#messages2").html("");
	$("#chooseText").html("charecter");
	$("#restart").hide();
	$("#Attack").hide();
	//$("#available").find(".CharHp").html($("#LukeSkywalker").attr("hp"));
	$("#available").find(".Chewbacca_Hp").html(ChewbaccaHp);
	$("#Chewbacca").attr("hp",ChewbaccaHp);
	$("#Chewbacca").attr("attackPower",attackuser);

	$("#available").find(".yoda_Hp").html(yodaHp);
	$("#yoda").attr("hp",yodaHp);
	$("#yoda").attr("attackPower",attackuser);

	$("#available").find(".LukeHp").html(likeHp);
	$("#LukeSkywalker").attr("hp",likeHp);
	$("#LukeSkywalker").attr("attackPower",attackuser);

	$("#available").find(".darthvader_Hp").html(darthvaderHp);
	$("#darthvader").attr("hp",darthvaderHp);
	$("#darthvader").attr("attackPower",attackuser);
	//console.log

}