var img;

// Image 1 with the Logos and Song Lyrics
var abstract;

// Image 2 with Song One-Liners Displying On Pixel "Hover"
var quoteimg;

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

var auraPos = 1;

function preload()
{
  img1 = loadImage( "https://www.openprocessing.org/sketch/422567/files/kendrickreg.png" );
  img2 = loadImage( "https://www.openprocessing.org/sketch/422567/files/joeyreg.png" );
  img3 = loadImage( "https://www.openprocessing.org/sketch/422567/files/colereg.png" );
  
  inputText = loadStrings( "https://www.openprocessing.org/sketch/421767/files/joey-temptation-lyrics.txt" );
  
  inputText2 = loadStrings( "https://www.openprocessing.org/sketch/421767/files/kendrick-quotes.txt" );
  
  song = loadSound( "https://www.openprocessing.org/sketch/421767/files/joey-temptation-song.mp3" );
}

function setup()
{
  createCanvas( 500, 500 );
  smooth();
  pixelDensity( 1 );
  
  cursor(CROSS);
  
  centerX = width/2;
  centerY = height/2;
  
  imageArray[ 0 ] = img1;
  imageArray[ 1 ] = img2;
  imageArray[ 2 ] = img3;
}

function draw()
{
  background( 255 );
  
  rectMode( CORNER );
  
  makePanAfricanFlag();
  makeTitle();
  
  var imgSize = 120;
  
  printImgArray( centerX, centerY, imgSize );
}

function printImgArray( xPos, yPos, imgSize )
{
  imageMode( CENTER );
  
  var imgSizeArray = [];
  var arraySize = imageArray.length;
  var imgXArray = [];
  
  //if( (mouseY > yPos - imgSize) && (mouseY < yPos + imgSize) )
  //{
    //if( (mouseX > xPos - imgSize/arraySize) && (mouseX < xPos + imgSize/arraySize) )
    //{
      //imgSizeArray[ 0 ] *= 2;
    //}
  //}
  
  // CENTERING CALCULATIONS FOR ANY SIZE ARRAY (NOT ONLY 3 IMAGES)
  // Get Image "Space" Width (Breathing Room);
  var imgSpaceWidth = imgSize*1.1;
  // Total Width of All Images in Array
  var totalArrayWidth = imageArray.length * imgSpaceWidth;
  // A Measurement Between First Image and Center X-Position of Total Array
  var firstImageOffset = (imageArray.length - 1) * 0.5;
  // Calculates The Distance Between First Image and Center X-Position of Total Array
  // Uses the Previous Measurement
  var totalArrayOffset = (firstImageOffset/imageArray.length) * totalArrayWidth;
  // Offsets from the Center X-Position of Total Array
  var newXPos = xPos - totalArrayOffset;
  
  for( var i = 0; i < arraySize; i++ )
  {
    imgSizeArray[ i ] = imgSize;
    imgXArray[ i ] = newXPos;
    newXPos += imgSpaceWidth;
  }
  
  if( (mouseY > yPos - imgSize) && (mouseY < yPos + imgSize) )
  {
    if( (mouseX > imgXArray[0] - imgSize/2) && (mouseX < imgXArray[0] + imgSize/2) )
    {
      imgSizeArray[ 0 ] *= 2;
      makeSuperAura();
      writeName( "Kendrick Lamar" );
    }
    else if( (mouseX > imgXArray[1] - imgSize/2) && (mouseX < imgXArray[1] + imgSize/2) )
    {
      imgSizeArray[ 1 ] *= 2;
      makeSuperAura();
      writeName( "Joey Bada$$" );
    }
    else if( (mouseX > imgXArray[2] - imgSize/2) && (mouseX < imgXArray[2] + imgSize/2) )
    {
      imgSizeArray[ 2 ] *= 2;
      makeSuperAura();
      writeName( "J. Cole" );
    }
  }
  
  console.log( newXPos );
  
  for( var i = 0; i < imageArray.length; i++ )
  {
    var theImg = imageArray[ i ];
    var theSize = imgSizeArray[ i ];
    var theXPos = imgXArray[ i ];
    
    printImage( theImg, theXPos, yPos, theSize );
  }
  
  
  //imageMode( CENTER );
  //image( img1, xPos - imgSize, yPos, imgSize1, imgSize1 );
  //image( img2, xPos, yPos, imgSize2, imgSize2 );
  //image( img3, xPos + imgSize, yPos, imgSize3, imgSize3 );
}

function printImage( theImg, xPos, yPos, imgSize )
{
  image( theImg, xPos, yPos, imgSize, imgSize )
}

function makePanAfricanFlag()
{
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

function writeName( name )
{
  fill( 0 );
  textFont( 'Helvetica' );
  textSize( height/20 );
  text( name, centerX, 5*centerY/3 );
}

function makeSuperAura()
{
  for( var x = 0; x < width; x += 20 )
  {
    for( var y = 0; y < height; y += 20 )
    {
      if( x % 40 == 0 )
      {
        stroke( random( 255 ), random( 255 ), random( 255 ) );
        line( mouseX, mouseY, x, y );
      }
    }
  }
  noStroke();
}