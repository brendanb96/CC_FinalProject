// Not All Heroes Wear Capes
// Brendan Boursiquot
// https://github.com/brendanb96/CC_FinalProject

// CC Final Project: Image Processing and Audio Interaction

//-------------------//
//----Rapper Class----//
//-------------------//
// + RAPPER OBJECT
// --- MANAGES THREE AUXILLARY IMAGE OBJECTS AND ONE AUXILLARY TIMER OBJECT
// --- DISPLAYS VARIOUS PROCESSED IMAGES, LYRICS, AND SONGS
// --- HAS THREE DIFFERENT STATES:
// --- ... MENU STATE, QUOTE STATE, ABSTRACT STATE

//----CONSTRUCTOR----//
function Rapper( typeID, name, highResImg, highResSize, lowResImg, theSong, quoteLyrics, songLyrics, timerTime )
{
  //----CLASS VARIABLES----//
  // + Calculate the Scale of Each "New" Processed Pixel
  this.imgScale = width / lowResImg.width;

  // + Create MenuImg Object
  // NOTE: class( personName, theImg, imgSize, inputLyrics )
  this.mainImg = new MenuImg( name, highResImg, highResSize );

  // + Create QuoteImg Object
  // NOTE: class( theImg, imgScale, inputLyrics )
  this.quImg = new QuoteImg( lowResImg, this.imgScale, quoteLyrics );

  // + Create AbstractImg Object
  // NOTE: class( typeID, theImg, imgScale, inputLyrics )
  this.abImg = new AbstractImg( typeID, lowResImg, this.imgScale, songLyrics );

  // + Song to Play
  this.song = theSong;

  // + State Variable To Identify The Current Image State
  this.state = 0;

  // + Boolean Variable To See If Data Loaded
  // --- Initiates Quote Image Data Loading
  // --- NOTE: This Is Simply Used To Load Image Data Upon Construction Of This Object
  // --- ... This Variable Is Used Simply To Catch the Return Boolean of The Function
  this.quImgIsLoaded = this.quImg.loadImgData();

  // + Boolean Variable To See If Data Loaded
  // --- Initiates Abstract Image Data Loading
  // --- NOTE: This Is Simply Used To Load Image Data Upon Construction Of This Object
  // --- ... This Variable Is Used Simply To Catch the Return Boolean of The Function
  this.abImgIsLoaded = this.abImg.loadImgData();

  // + Boolean Variable To See If Song Is Currently Playing 
  this.songIsPlaying = false;

  // + Create Timer Object
  // NOTE: Initial Time is 0.5s
  this.timer = new Timer( 500 );

  // + Time Passed In From Constructor Parameter
  // NOTE: Time Is Used to Load "Lyric" Screens, So Initial Time Is 0.5s So
  // ... That First Screen Can Appear Quickily
  this.timerTempo = timerTime;

  // + Variable Checking The State of the Abstract Image
  // --- If The Abstract Image Just Started ( Frame == 0 ), Then Start Timer
  // --- Other Frames Are Used to Change Timer/Time
  this.frame = 0;

  // + How Long The Screen Change (Lyric Screen) Alert
  this.alertTimer = new Timer( 2500 );

  // + Total Pixel Count for LowResImages
  this.lowResPixelCount = lowResImg.width * lowResImg.height;
  
  //----CLASS METHODS----//
  // + Reset Key Sketch Data
  // --- Because Lyric Data Can be Mutated, it is Reloaded Upon Reset
  // --- ... This is Why charArray is Set to Empty, Because charArray
  // --- ... Uses array.push Functionality Inside loadLyricData Function
  this.reset = function()
  {
    this.timer = new Timer( 500 );
    this.song.stop;
    this.songIsPlaying = false;
    this.quImg.reset();
    this.abImg.reset();
    this.frame = 0;
    this.state = 0;
  }

  // + SETTERS AND GETTERS (AND/OR SIMILAR FUNCTIONS)
  this.mouseOnObject = function()
  {
    return this.mainImg.mouseInArea();
  }

  this.getState = function()
  {
    return this.state;
  }

  this.setState = function( newState )
  {
    this.state = newState;
  }

  this.changeMenuX = function( newX )
  {
    this.mainImg.setX( newX );
  }

  this.getMenuImg = function()
  {
    return this.mainImg;
  }

  // + DISPLAY FUNCTIONS (AND/OR SIMILAR FUNCTIONS)
  this.display = function( level )
  {
    // + MENU IMAGE STATE
    if( this.state == 0 )
    {
      this.mainImg.display();
    }
    // + QUOTE IMAGE STATE
    else if( this.state == 1 )
    {
      this.abImg.reset();
      if( this.songIsPlaying )
      {
        this.song.stop();
        this.songIsPlaying = false;
      }

      this.quImg.display( mouseX, mouseY );
    }
    // + ABSTRACT IMAGE STATE
    else if( this.state == 2 )
    {
      this.quImg.reset();
      // + If This is First Frame, Start Timer, Change Timer Length, and Change Frame
      // NOTE: There Are Multiple Screen Showing Different Portions of The Input Lyrics
      // ... The Initial Timer Is Short As The First Lyric Screen Should Show Up Instantly
      if( this.frame == 0 )
      {
        this.timer.start();
        this.timer.setTime( this.timerTempo );
        this.frame = 1;
      }
      
      // + If Timer Is Finished AND Is Not An "Early" Frame, Change Lyric Screen
      if( this.timer.isFinished() )
      {
        // + If This Is An "Early" Frame (The Timer Is Short)
        // --- Simply Change The Frame To "2"
        if( this.frame < 2 )
        {
          this.frame = 2;
        }
        else
        {
          // + Each "Screen" Is Assumed To Hold a 2500 Length Char Array or lowResPixelCount
          // --- This Sets The "Cut Off" To The Last Item and Updates The Lyrics
          // --- ... This Is How The Screen "Changes"
          // --- ALSO: Start Alert Timer TO Alert User of Screen Change
          this.abImg.setLyricIndx( this.lowResPixelCount );
          this.abImg.updateLyrics();
          this.alertTimer.start();
        }
        this.timer.start();
      }

      // + Check To See If Screen Was Changed Recently
      this.changeScreenCheck();

      // + If Level/Input Is Invalid, Simply Exit The Function
      if( !level )
      {
        return;
      }

      // + Check To See If The Song is Already Playing and Play It.
      if( !this.songIsPlaying )
      {
        this.song.play();
        this.songIsPlaying = true;
      }
      
      // + Set Volume to 3/4 of Max and Display Image Based on Level/Input
      this.song.setVolume( 0.75 );
      this.abImg.display( level * 2);
    }
  }

  // + Check If Screen Has Been Changed Recently
  // --- As Long as The Length of the Alert Is Not Over, Display the Message
  this.changeScreenCheck = function()
  {
    if( !this.alertTimer.isFinished() )
    {
      this.screenChangeAlert();
    }
  }
  
  // + Draw Screen Change Alert
  this.screenChangeAlert = function()
  {
    textSize( width/16 );
    textAlign( CENTER );
    text( "SCREEN CHANGE", width/2, height/2 );
  }
}