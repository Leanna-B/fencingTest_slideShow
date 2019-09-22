/*
 *PubNub
 * remote controller that sends a variable to all the listening devices
 */

// server variables for apps to communicate they must use THE SAME KEYS
//get these keys from your PubNub account
//within your group, you will use 1 of your accounts for the project

let dataServer;
let pubKey = 'pub-c-53a0c097-440a-46e1-ba90-65e578946f33';
let subKey = 'sub-c-a2992c36-d5af-11e9-b2a7-e243f66d3f10';

//input variables

let nextButton;
let slideNumber=0;
let totalImages = 4;


//name used to sort your messages. used like a radio station. can be called anything
let channelName = "powerpoint";

function setup()
{

  createCanvas(windowWidth, windowHeight);
  background(255);



   // initialize pubnub
  dataServer = new PubNub(
  {
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
  });


  //create the button

  sendButton = createButton('NEXT');
  sendButton.position(0, 0);
  sendButton.mousePressed(sendTheMessage);
  sendButton.size(windowWidth,windowHeight);

}

function draw()
{


}


//sends from the button press
function sendTheMessage()
{

slideNumber = ((slideNumber+1)<=(totalImages-1)) ? slideNumber+=1 : 0; //shorthand for conditional assignment


//console.log(slideNumber);

  //publish the number to everyone.
  dataServer.publish(
    {
      channel: channelName,
      message:
      {
        slide: slideNumber
      }
    });

}
