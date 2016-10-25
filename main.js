//API part
var api = "http://api.giphy.com/v1/gifs/search?";
var apiKey = "&api_key=dc6zaTOxFJmzC";
var query = "&q=rolling";
var gifs = [];
var url = api + apiKey + query;

var last = false ;
var toggle = false ;

//keep track of time
var h, m, s ;

//Sensor input part
var serial; // variable to hold an instance of the serialport library
var sensorValue = 0; 

function setup() {
  noCanvas();
  
  // Serial part
  serial = new p5.SerialPort(); // make a new instance of  serialport library
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in
  serial.list(); // list the serial ports
  serial.open("/dev/cu.AdafruitEZ-Link7441-SPP"); // open a port  
}

function draw(){
  //keep track of time
  h = hour();
  m = minute();
  s = second();
  
  //logging time to check
  print("hour:" + h + " min: " + m + " sec: " + s);
  
  //pull new data every 5 seconds
  if (s % 5 === 0) {
  	loadJSON(url, gotData);
    //print(gifs); //prints array to log
  }
  
checkSensor();
  println(toggle);
  println(last);
  
  //show gif when toggle is true
  if (last===true && toggle===false){
    showGif();
  }
}

function checkSensor(){
  //sensor value triggers change of state
  if(sensorValue < 550){
    last = toggle ;
    toggle = true ;
    println("CS happening?");
  }
  else {
    last = toggle ;
    toggle = false ;
  }
}

function showGif(){
  removeElements();
  img = createImg(random(gifs));
	img.size(200, 200);	
  //toggle = false ;
  //remove after 10 seconds
  if (s==(s+10)){
    removeElement();
  }
}

//this function creates the array
function gotData(giphy) {
  for (var i = 0; i < 10; i++) {
  	gifs = append(gifs, giphy.data[i].images.original.url);
    //noprotect
	}
}


// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}


function serialEvent() {
  var inString = serial.readLine();
  if (inString.length > 0) {
    inString = inString.trim();
    var values = split(inString, ",");
     sensorValue = Number(inString);
     println(sensorValue);
  }
}

