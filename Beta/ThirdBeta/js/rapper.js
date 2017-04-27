// Not All Heroes Wear Capes
// Brendan Boursiquot
// https://github.com/brendanb96/CC_FinalProject

// Beta 1.2: Added Detailed Commets

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
  this.song = theSong;
  this.state = 0;
  this.quImgIsLoaded = this.quImg.loadImgData();
  this.abImgIsLoaded = this.abImg.loadImgData();
  this.songIsPlaying = false;
  // + Create Timer Object
  // NOTE: Initial Time is 0.5s
  this.timer = new Timer( 500 );
  // + Time Passed In From Constructor Parameter
  // NOTE: Time Is Used to Load "Lyric" Screens, So Initial Time Is 0.5s So
  // ... That First Screen Can Appear Quickily
  this.timerTempo = timerTime;
  this.frame = 0;
  
  //----CLASS METHODS----//

  this.reset = function()
  {
    this.timer = new Timer( 500 );
    this.song.stop;
    this.quImg.reset();
    this.abImg.reset();
    this.frame = 0;
    this.state = 0;
  }

  // + d
  this.display = function( level )
  {
    this.timer.start();
    if( this.state == 0 )
    {
      this.mainImg.display();
    }
    if( this.state == 1 )
    {
      if( this.songIsPlaying )
      {
        this.song.stop();
        this.songIsPlaying = false;
      }

      this.quImg.display( mouseX, mouseY );
    }
    else if( this.state == 2 )
    {
      if( this.frame == 0 )
      {
        this.timer.start();
        this.timer.setTime( this.timerTempo );
        this.frame = 1;
      }
      
      if( this.timer.isFinished() )
      {
        if( this.frame < 2 )
        {
          this.frame = 2;
        }
        else
        {
          this.abImg.setLyricIndx( 2500 );
          this.abImg.updateLyrics();
        }
        this.timer.start();
      }

      if( !level )
      {
        return;
      }

      if( !this.songIsPlaying )
      {
        this.song.play();
        this.songIsPlaying = true;
      }
      
      this.song.setVolume( 0.75 );
      this.abImg.display( level );
    }
  }

  // + d
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

}