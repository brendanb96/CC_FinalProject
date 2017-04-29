// Not All Heroes Wear Capes
// Brendan Boursiquot
// https://github.com/brendanb96/CC_FinalProject

// CC Final Project: Image Processing and Audio Interaction

//-------------------//
//----MAIN SKETCH----//
//-------------------//
// + DISPLAYS THREE RENOWNED RAPPERS
// --- UPON SELECTED ONE OF THEM
// --- YOU WILL VIEW A PROCESSED IMAGE
// --- HOVERING OVER THE TEXT WILL DISPLAY POTENT ONE-LINERS
// --- PRESSING '2' WILL SWITCH TO A MORE ABSTRACT IMAGE AND A SONG
// --- WHENEVER THE MICROPHONE PICKS UP A SIGNAL,
// --- ... AT A CERTAIN AMPLITUDE, IT WILL ALTER THE SKETCH
// --- ... AND DISPLAY THE LYRICS TO THE SONG, THAT ARE IN SYNC

//----GLOBAL VARIABLES----//

// + Array of Rapper Objects
var rapperList = [];

// + Recorded Input Variables
// --- Audio Variable
var recAudio;

// + Canvas Variables
// --- Horizontal Center
var centerX;
// --- Vertical Center
var centerY;

// + Global String Variables
// --- Title of Sketch
var title = "Not All Heroes Wear Capes";
// --- Rapper Names
// --- (Numbers Correspond Across All Other Variables)
var name1 = "Kendrick Lamar";
var name2 = "Joey Bada$$";
var name3 = "J. Cole";

// + High Resolution Menu Images - Rappers
// (Numbers Correspond Across All Other Variables)
var menuimg1;
var menuimg2;
var menuimg3;

// + Low Resolution Sketch Images - Rappers
// (Numbers Correspond Across All Other Variables)
var artimg1;
var artimg2;
var artimg3;

// + Full Song Lyrics - Rappers
// (Numbers Correspond Across All Other Variables)
var songLyrics1;
var songLyrics2;
var songLyrics3;

// + List of One-Liners - Rappers
// (Numbers Correspond Across All Other Variables)
var quoteLines1;
var quoteLines2;
var quoteLines3;

// + Audio for Songs - Rappers
// (Numbers Correspond Across All Other Variables)
var song1
var song2;
var song3;

// + State Variables - Rappers
// --- What Screen to Display
// --- NOTE: There Will Be Multiple DrawState Changes During Same Event For Insurance/Error Prevention
var drawState = 0;
// --- Which Rapper is Selected
var rapperSelection = 0;
// --- If ANY Rapper is Selected (or should be selected)
var rapperIsSelected = false;

// + High Resolution Menu Image Size
var menuImgSize = 120;

// + A VARIABLE TO "RESET" DRAWING OR DISPLAY A NEW BACKGROUND
// DOES THIS SO DRAW FUNCTIONS CAN BE UTILIZED ONCE
// AND ERASED WHEN NEEDED
// (Avoids re-processing Images Forever)
var reset = false;

// + Average Amplitude Over a Time Interval
// --- So That "Input Changes" Are Not Instant and Fickle
var avgAmp;

// + Time Interval Length for Recording Average Amp Data
var recTimer;

//----PRELOAD ALL DATA----//
function preload()
{
  // + Load All High Resolution Menu Images
  menuimg1 = loadImage( "../data/img/highres/menu-kendrick.png" );
  menuimg2 = loadImage( "../data/img/highres/menu-joey.png" );
  menuimg3 = loadImage( "../data/img/highres/menu-cole.png" );

  // + Load All Full Song Lyrics
  artimg1 = loadImage( "../data/img/lowres/pic-kendrick.png" );
  artimg2 = loadImage( "../data/img/lowres/pic-joey.png" );
  artimg3 = loadImage( "../data/img/lowres/pic-cole.png" );

  // + Load All Lists of One-Liners
  songLyrics1 = loadStrings( "../data/lyrics/songs/kendrick-i-lyrics.txt" );
  songLyrics2 = loadStrings( "../data/lyrics/songs/joey-temptation-lyrics.txt" );
  songLyrics3 = loadStrings( "../data/lyrics/songs/cole-neighbors-lyrics.txt" );

  // + Load All High Resolution Images
  quoteLines1 = loadStrings( "../data/lyrics/quotes/kendrick-quotes.txt" );
  quoteLines2 = loadStrings( "../data/lyrics/quotes/joey-quotes.txt" );
  quoteLines3 = loadStrings( "../data/lyrics/quotes/cole-quotes.txt" );
  
  // + Load All Audio for Songs
  song1 = loadSound( "../data/sound/kendrick-i-song.mp3" );
  song2 = loadSound( "../data/sound/joey-temptation-song.mp3" );
  song3 = loadSound( "../data/sound/cole-neighbors-song.mp3" );
}

//----SET-UP ALL UNINITIATED VARIABLES AND CANVAS---//
function setup()
{
  // + Canvas Variables
  // --- Canvas Size (500x500 for Convenience)
  createCanvas( 500, 500 );
  // --- Smooth Egdges of Drawings and Images
  smooth();
  // --- Set Pixel-Density to 1 to Render Equally on All Screens
  // --- (Does Not Take Advantage of Retina Display or Other High Density Screens)
  pixelDensity( 1 );
  // --- Make Cursor a Cross/Plus Pointer
  cursor( CROSS );

  // + Uninitiated Custom Global Variables
  // --- Create Center Points
  centerX = width/2;
  centerY = height/2;

  // --- Create New Rapper Objects and Put them in List
  // NOTE: class(typeID, name, highResImg, highResSize, lowResImg, theSong, quoteLyrics, songLyrics, timerTime)
  rapperList[ 0 ] = new Rapper( 1, name1, menuimg1, menuImgSize, artimg1, song1, quoteLines1, songLyrics1, 72000 );
  rapperList[ 1 ] = new Rapper( 2, name2, menuimg2, menuImgSize, artimg2, song2, quoteLines2, songLyrics2, 87500 );
  rapperList[ 2 ] = new Rapper( 3, name3, menuimg3, menuImgSize, artimg3, song3, quoteLines3, songLyrics3, 75000 );
  
  // --- Create New Audio Input Object And Start It
  recAudio = new p5.AudioIn();
  recAudio.start();
  
  // --- Calculate Menu Positions
  calcMenuPositions( width/2, height/2, rapperList );

  // --- Create New Average Amp Object For Audio Input Amp Processing
  avgAmp = new AvgAmp();

 // --- Create New Timer Object for Time Interval with Specified Time Length
  recTimer = new Timer( 1500 );
  recTimer.start();
}

//----DRAW FUNCTION----//
function draw()
{
  // + White Background
  background( 255 );

  // + Get Average Amp
  // --- Update Average Amp With Current Audip Input Amp Level
  avgAmp.update( recAudio.getLevel() );
  // --- Get Previous Time Interval's Average Amp
  // --- NOTE: This Will Always Be The Same Until Next Timer Interval "Expires"
  // --- ... This Ensures a "Nice Flow" And That Values Do Not Change Drastically
  var recLevel = avgAmp.getSavedAvg();

  // + Check if Time Interval for Recording Audio Is Finished
  if( recTimer.isFinished() )
  {
    // + Get The Calculated Average From The Time Interval
    recLevel = avgAmp.getAvg();

    // + Reset the Average That Was Calculated For Future Amp Processing
    // ... In The Next Interval
    avgAmp.reset();

    // + Restart Timer
    recTimer.start();
  }

  // + Draw State Checking and Execution
  // --- DrawState 0: Menu Screen
  if( drawState == 0 )
  {
    // --- Call Function to Display Menu
    displayMenu();
  }
  // --- DrawState 1: Quote/OneLiner Screen
  else if( drawState == 1 )
  {
    // --- Call Function to Display Selected Rapper
    // NOTE: The Rapper Object Handles Its Own States
    // EXTRA NOTE: setState Method is Called Here For Sketch/Object Sync Insurancce
    rapperList[ rapperSelection ].setState( 1 );
    rapperList[ rapperSelection ].display();
  }
  // --- DrawState 2: Abstract/Song Screen
  else if( drawState == 2 )
  {
    // --- Call Function to Display Selected Rapper
    // NOTE: The Rapper Object Handles Its Own States
    // EXTRA NOTE: setState Method is Called Here For Sketch/Object Sync Insurancce
    rapperList[ rapperSelection ].setState( 2 );
    rapperList[ rapperSelection ].display( recLevel );
  }
}

//----DISPLAY THE MENU/HOME SCREEN----//
function displayMenu()
{
  // + Create Pan-African Flag Background
  makePanAfricanFlag();
  // + Create Title Text
  makeTitle();
  // + Create Menu Options/Images
  makeImageOptions();
}

//----DISPLAY THE PAN-AFRICAN FLAG BACKGROUND----//
function makePanAfricanFlag()
{
  // + rectMode Is Set To Corner So That Positions Do Not Need Any Extra Calculations
  // ... When Working With a Centered Rectangle
  rectMode( CORNER );

  // + Create Height of the Stripes
  var stripeHeight = height/3;
  // + Create Width of the Stripes
  var stripeWidth = width;
  
  // + Top Stripe
  // --- Make Color a Semi-Bright Red
  fill( 120, 15, 15 );
  // --- Draw Stripe at Origin
  rect( 0, 0, stripeWidth, stripeHeight );

  // + Middle Stripe
  // --- Make Color a Dark But Not Absolute Black
  fill( 15, 15, 15 );
  // --- Draw Stripe at Center (Relative)
  rect( 0, stripeHeight, stripeWidth, stripeHeight );

  // + Bottom Stripe
  // --- Make Color a Semi-Bright Green
  fill( 15, 120, 15 );
  // --- Draw Stripe at Bottom (Relative)
  rect( 0, 2*stripeHeight, stripeWidth, stripeHeight );
}

//----DISPLAY THE TITLE TEXT----//
function makeTitle()
{
  // + Make Color White
  fill( 255 );

  // + Align In Center
  textAlign( CENTER );

  // + Change Default Font to Helvetica
  textFont( 'Helvetica' );

  // + Set FontSize to a Ratio of the Height
  textSize( height/20 );

  // + Use Global Title String and Center Variables
  // ... To Display Text
  text( title, centerX, centerY/3 );
}

//----DISPLAY THE PAN-AFRICAN FLAG BACKGROUND----//
function makeImageOptions()
{
  // + Display All Rappers Images
  for( var i = 0; i < rapperList.length; i++ )
  {
    // + Call Function to Display Current Rapper
    // NOTE: The Rapper Object Handles Its Own States
    // EXTRA NOTE: Menu Images May Have Mouse-Methods Nested Within Object
    rapperList[ i ].display();
  }
}

//----MOUSE CLICK EVENT LISTENER----//
function mousePressed()
{
  // + Check Each Rapper In List
  for( var i = 0; i < rapperList.length; i++ )
  {
    // + Check If Mouse Is Hovered Over Current Rapper
    // ... and If Sketch Is On The Menu/Home Screen
    if( rapperList[ i ].mouseOnObject() && drawState == 0 )
    {
      // + Change Rapper Selection to Current Rapper
      rapperSelection = i;

      // + Change Rapper Selection Boolean to True
      rapperIsSelected = true;

      // + Change Draw State of The Sketch
      drawState = 1;

      // + Escape For Loop If Not At End
      return;
    }
  }
}

//----KEYBOARD EVENT LISTENER----//
function keyPressed()
{
  // + Check If There Is a Rapper Selected
  if( rapperIsSelected )
  {
    // + If Key Typed was '1', Change Draw State to 1
    if( key == '1' )
    {
      // + Change Draw State to 1
      drawState = 1;

      // + setState Method is Called to Sync Rapper with Sketch
      rapperList[ rapperSelection ].setState( 1 );
    }
    
    // + If Key Typed was '2', Change Draw State to 2
    if( key == '2' )
    {
      // + Change Draw State to 2
      drawState = 2;

      // + setState Method is Called to Sync Rapper with Sketch
      rapperList[ rapperSelection ].setState( 2 );
    }
  }

  // + Go Back A State/Screen
  if( keyCode == BACKSPACE )
  {
    drawState--;
    console.log( drawState );
    rapperList[ rapperSelection ].setState( drawState );
    if( drawState <= 0 )
    {
      rapperList[ rapperSelection ].reset();
      drawState = 0;
      rapperSelection = 0;
      rapperIsSelected = false;
    }
  }
}

function reset()
{

}