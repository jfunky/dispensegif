//API part
var api = "https://api.giphy.com/v1/gifs/search?";
var apiKey = "&api_key=dc6zaTOxFJmzC";
var query = "&q=rolling";
var gifs = [];
var url = api + apiKey + query;
var changeState = false ;

//keep track of time
var m, h, s ;


function setup() {
  noCanvas();
}

function draw(){
  //keep track of time
  m = minute();
  h = hour();
  s = second();
  
  //print("hour:" + h + " min: " + m + " sec: " + s);
  //print(changeState);
  
  //pull new data every 5 seconds
  if (s % 5 === 0) {
    loadJSON(url, gotData);
    //print(gifs);
  }
}

//when something happens, show a gif
//right now, testing with mouse clicks
function mouseReleased() {
  removeElements();
  img = createImg(random(gifs));
  img.size(600, 600);
  
  changeState = !changeState ;
}

//this function creates the array
function gotData(giphy) {
  for (var i = 0; i < 10; i++) {
    gifs = append(gifs, giphy.data[i].images.original.url);
  }
}
