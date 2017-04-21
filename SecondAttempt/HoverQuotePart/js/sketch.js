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

function preload()
{
  img = loadImage( "https://www.openprocessing.org/sketch/421767/files/pic-joey.png" );

  inputText = loadStrings( "https://www.openprocessing.org/sketch/421767/files/joey-temptation-lyrics.txt" );
  
  inputText2 = loadStrings( "https://www.openprocessing.org/sketch/421767/files/kendrick-quotes.txt" );
  song = loadSound( "https://www.openprocessing.org/sketch/421767/files/joey-temptation-song.mp3" );
}

function setup()
{
  createCanvas( 500, 500 );
  smooth();
  pixelDensity( 1 );
  
  cursor(CROSS)

  //abstract = new AbstractImg( 2, img, 10, inputText );
  //abstract.loadImgData();
  
  quoteimg = new QuoteImg( img, 10, inputText2 );
  quoteimg.loadImgData();
  
  song.setVolume( 0.75 );
  song.play();
  
  recAudio = new p5.AudioIn();
  recAudio.start();
  
  //mic = new p5.AudioIn()
  //mic.start();
  
  timer = new Timer( 2000 );
  timer.start();

  // quoteimg = new QuoteImg( 3, img, 10, inputText2 );
  // picLoaded2 = quoteimg.loadImgData();
}

function draw()
{
  background( 255 );
  //var amp = recAudio.getLevel();
  //console.log( recAudio.getLevel() );
  //micLevel = mic.getLevel();
  //console.log( micLevel );
  //console.log( "bbb: " + amp );
  //ampCounter++;
  //totalAmp += amp;
  //var avgAmp = totalAmp / ampCounter;
  
  
  quoteimg.display( mouseX, mouseY );
  //quoteimg.outputInfo(  );
  
  //console.log( "bbb: " + avgAmp );
  
  //var outputVol = song.getVolume();
  //avgAmp *= 2;
  //if( avgAmp > 1.0 )
  //{
    //avgAmp = 0.99;
  //}
  
  //if( timer.isFinished() ) 
  //{
   // background( 255 );
   // abstract.display( avgAmp );
   // timer.start();
  //}
  
  //if( timer.isFinished() ) 
  //{
   // background( 0 );
    //abstract.display( avgAmp );
   // timer.start();
  //}
  
  //console.log( abstract.charArray );
  // if( pic1Loaded && !pic1Displayed )
 //    {
 //       abstract.display();
 //       pic1Displayed = true;
 //    }

 //    if( pic2Loaded && !pic2Displayed )
 //    {
 //       quoteimg.display();
 //     pic2Displayed = true;
 //    }

  // loadPixels();
  // img.loadPixels();

  // for( var y = 0; y < 50; y++ )
  // {
  //  for( var x = 0; x < 50; x++ )
  //  {
  //    var pixelIndx = ( x + (y*img.width) ) * 4;

  //    var r = img.pixels[ pixelIndx + 0 ];
  //    var g = img.pixels[ pixelIndx + 1 ];
  //    var b = img.pixels[ pixelIndx + 2 ];
  //    var a = img.pixels[ pixelIndx + 3 ];

  //    var bright = (r + g + b) / 3;

  //    rectMode( CENTER );
  //    fill( bright );
  //    rect( x * 10, y * 10, 10, 10 );
  //  }
  // }

  // img.updatePixels();
  // updatePixels();

  // makeEye( 50, 50, 50 );
}

// function keyTyped()
// {
//   if( key == '1' )
//   {
//     background( 255 );
//     if( picLoaded && !picDisplayed )
//     {
//       //background( 255 );
//       //abstract.displayText();
//       abstract.display();
//       picDisplayed = true;
//     }
//     picDisplayed = false;
//   }
//   else if( key == '2' )
//   {
//     background( 255 );
//     if( picLoaded2 && !picDisplayed2 )
//     {
//       //background( 255 );
//       //abstract.displayText();
//       abstract.display();
//       picDisplayed2 = true;
//     }
//     picDisplayed2 = false;
//   }
// }

// function makeEye( xPos, yPos, size )
// {
//  // size = mx
//  ellipseMode( CENTER );
//  ellipse( xPos, yPos, size, size/2 );
//  ellipse( xPos, yPos, size/3, size/2 );
// }