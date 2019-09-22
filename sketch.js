/*
PubNub
 * Receiver file that cycles through images based on the input from the controller
 */


// server variables for apps to communicate they must use THE SAME KEYS
//get these keys from your PubNub account
//within your group, you will use 1 of your accounts for the project

let dataServer;
let pubKey = 'pub-c-53a0c097-440a-46e1-ba90-65e578946f33';
let subKey = 'sub-c-a2992c36-d5af-11e9-b2a7-e243f66d3f10';

//name used to sort your messages. used like a radio station. can be called anything
let channelName = "fencingTest_slideShow";


//image variables
let img = [];
let totalImages = 6;
let slideNumber = 0;



function preload()
{
  //rather than making separate variables we are loading them all into an array
  for (let i = 0; i<totalImages; i++)
  {
    img[i] = loadImage("load/img" + (i+1) + ".jpg");
  }

}


function setup()
{
  getAudioContext().resume();
  createCanvas(windowWidth, windowHeight);
  background(255);



   // initialize pubnub
  dataServer = new PubNub(
  {
    subscribe_key : subKey,
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
  });

  //attach callbacks to the pubnub object to handle messages and connections
  dataServer.addListener({ message: readIncoming });
  dataServer.subscribe({channels: [channelName]});

}

function draw()
{
    background(255);
    image(img[slideNumber],0,0); //show the image corresponds to the slide number in the array

}

function readIncoming(inMessage) //when new data comes in it triggers this function,
{

    slideNumber = inMessage.message.slide;
}
