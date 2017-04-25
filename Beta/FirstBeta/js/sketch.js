// Array of Rapper Objects
var rapperList = [];

// Data Loaded Checks
var pic1Loaded = false;
var pic2Loaded = false;

// File Texts
var inputText = " ";
var inputText2 = " ";

// Are the pictures currently displaying?
var pic1Displayed = false;
var pic2Displayed = false;

// Recorded Input
var recAudio;

// Average Amp Across a Short Interval
//var avgAmp;
var totalAmp = 0;
var ampCounter = 0;
var timer;

// Song Variable
var song;

// A FUNCTION TO "RESET" DRAWING OR DISPLAY A NEW BACKGROUND
// DOES THIS SO DRAW FUNCTIONS CAN BE UTILIZED ONCE
// AND ERASED WHEN NEEDED
// (Avoids re-processing Images Forever)
var reset = false;

var centerX;
var centerY;

var imageArray = [];
var maxImages = 3;

var title = "Not All Heroes Wear Capes";

var name1 = "Kendrick Lamar";
var name2 = "Joey Bada$$";
var name3 = "J. Cole";

var menuimg1;
var menuimg2;
var menuimg3;

var artimg1;
var artimg2;
var artimg3;
  
var songLyrics1;
var songLyrics2;
var songLyrics3;
  
var quoteLines1;
var quoteLines2;
var quoteLines3;
  
var song1
var song2;
var song3;

var drawState = 0;
var rapperSelection = 0;
var rapperIsSelected = false;

var menuImgSize = 120;

function preload()
{
  menuimg1 = loadImage( "../data/img/highres/menu-kendrick.png" );
  menuimg2 = loadImage( "../data/img/highres/menu-joey.png" );
  menuimg3 = loadImage( "../data/img/highres/menu-cole.png" );

  artimg1 = loadImage( "../data/img/lowres/pic-kendrick.png" );
  artimg2 = loadImage( "../data/img/lowres/pic-joey.png" );
  artimg3 = loadImage( "../data/img/lowres/pic-cole.png" );
  
  songLyrics1 = loadStrings( "../data/lyrics/songs/kendrick-i-lyrics.txt" );
  songLyrics2 = loadStrings( "../data/lyrics/songs/joey-temptation-lyrics.txt" );
  songLyrics3 = loadStrings( "../data/lyrics/songs/cole-neighbors-lyrics.txt" );
  
  quoteLines1 = loadStrings( "../data/lyrics/quotes/kendrick-quotes.txt" );
  quoteLines2 = loadStrings( "../data/lyrics/quotes/kendrick-quotes.txt" );
  quoteLines3 = loadStrings( "../data/lyrics/quotes/kendrick-quotes.txt" );
  
  song1 = loadSound( "../data/sound/kendrick-i-song.mp3" );
  song2 = loadSound( "../data/sound/joey-temptation-song.mp3" );
  song3 = loadSound( "../data/sound/cole-neighbors-song.mp3" );
}

function setup()
{
  createCanvas( 500, 500 );
  smooth();
  pixelDensity( 1 );
  cursor( CROSS );

  centerX = width/2;
  centerY = height/2;

  rapperList[ 0 ] = new Rapper( 1, name1, menuimg1, menuImgSize, artimg1, song1, quoteLines1, songLyrics1 );
  rapperList[ 1 ] = new Rapper( 2, name2, menuimg2, menuImgSize, artimg2, song2, quoteLines2, songLyrics2 );
  rapperList[ 2 ] = new Rapper( 3, name3, menuimg3, menuImgSize, artimg3, song3, quoteLines3, songLyrics3 );
  
  recAudio = new p5.AudioIn();
  recAudio.start();
  
  timer = new Timer( 2000 );
  timer.start();
  
  calcMenuPositions( width/2, height/2 );
}

function draw()
{
  background( 255 );

  var recLevel = getAvgAmp();

  if( drawState == 0 )
  {
    displayMenu();
  }
  else if( drawState == 1 )
  {
    rapperList[ rapperSelection ].setState( 1 );
    rapperList[ rapperSelection ].display();
  }
  else if( drawState == 2 )
  {
    rapperList[ rapperSelection ].setState( 2 );
    rapperList[ rapperSelection ].display( recLevel );
  }
}

function calcMenuPositions( xPos, yPos )
{ 
  var imgSizeArray = [];
  var arraySize = rapperList.length;
  var imgXArray = [];

  var imgSize = menuImgSize;
  
  // CENTERING CALCULATIONS FOR ANY SIZE ARRAY (NOT ONLY 3 IMAGES)
  // Get Image "Space" Width (Breathing Room);
  var imgSpaceWidth = imgSize*1.1;

  // Total Width of All Images in Array
  var totalArrayWidth = arraySize * imgSpaceWidth;

  // A Measurement Between First Image and Center X-Position of Total Array
  var firstImageOffset = (arraySize - 1) * 0.5;

  // Calculates The Distance Between First Image and Center X-Position of Total Array
  // Uses the Previous Measurement
  var totalArrayOffset = (firstImageOffset/arraySize) * totalArrayWidth;

  // Offsets from the Center X-Position of Total Array
  var newXPos = xPos - totalArrayOffset;
  
  for( var i = 0; i < arraySize; i++ )
  {
    imgSizeArray[ i ] = imgSize;
    imgXArray[ i ] = newXPos;
    newXPos += imgSpaceWidth;

    var theImg = rapperList[ i ].changeMenuX( imgXArray[ i ] );
  }
}

function displayMenu()
{
  makePanAfricanFlag();
  makeTitle();
  makeImageOptions();
}

function makeImageOptions()
{
  for( var i = 0; i < rapperList.length; i++ )
  {
    rapperList[ i ].display();
  }
}

function makePanAfricanFlag()
{
  rectMode( CORNER );

  var stripeHeight = height/3;
  var stripeWidth = width;
  
  fill( 120, 15, 15 );
  rect( 0, 0, stripeWidth, stripeHeight );
  fill( 15, 15, 15 );
  rect( 0, stripeHeight, stripeWidth, stripeHeight );
  fill( 15, 120, 15 );
  rect( 0, 2*stripeHeight, stripeWidth, stripeHeight );
}

function makeTitle()
{
  fill( 255 );
  textAlign( CENTER );
  textFont( 'Helvetica' );
  textSize( height/20 );
  text( title, centerX, centerY/3 );
}

function getAvgAmp()
{
  var amp = recAudio.getLevel();
  ampCounter++;
  totalAmp += amp;
  var avgAmp = totalAmp / ampCounter;
  
  if( ampCounter > 50 )
  {
    ampCounter = 0;
    totalAmp = 0;
  }
  
  //var outputVol = song.getVolume();
  avgAmp *= 2;

  if( avgAmp > 1.0 )
  {
    avgAmp = 0.99;
  }
  console.log( avgAmp );
  return avgAmp;
}

function mousePressed()
{
  for( var i = 0; i < rapperList.length; i++ )
  {
    if( rapperList[ i ].mouseOnObject() && drawState == 0 )
    {
      rapperSelection = i;
      rapperIsSelected = true;
      drawState = 1;
      return;
    }
  }
}

function keyTyped()
{
  if( rapperIsSelected )
  {
    if( key == '1' )
    {
      drawState = 1;
      rapperList[ rapperSelection ].setState( 1 );
    }
    
    if( key == '2' )
    {
      drawState = 2;
      rapperList[ rapperSelection ].setState( 2 );
    }
  }
}