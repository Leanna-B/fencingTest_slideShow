/* This sketch creates a channel called "fencingTest_SlideShow".
It presents test content from the Fencing book as a slideshow array of JPG images.
Slides can be accessed and scrolled through by multiple users using the remote control script. */

// server variables
let dataServer;
let pubKey = 'pub-c-53a0c097-440a-46e1-ba90-65e578946f33';
let subKey = 'sub-c-a2992c36-d5af-11e9-b2a7-e243f66d3f10';

//channelName fencingTest_slideShow
let channelName = "fencingTest_slideShow";

//image variables
let img = [];
let totalImages = 6;
let slideNumber = 0;

//preload images into an array
function preload(){
  for (let i = 0; i<totalImages; i++)
  {
    img[i] = loadImage("load/img" + (i+1) + ".jpg");
  }
}

function setup(){
  getAudioContext().resume();
  createCanvas(windowWidth, windowHeight);
  background(255);

// initialize pubnub
  dataServer = new PubNub({
    subscribe_key : subKey,
    ssl: true
  });

//attach callbacks to the pubnub object
  dataServer.addListener({ message: readIncoming });
  dataServer.subscribe({channels: [channelName]});
}

function draw()
{
    background(255);
    image(img[slideNumber],0,0);
}

function readIncoming(inMessage){
    slideNumber = inMessage.message.slide;
}
