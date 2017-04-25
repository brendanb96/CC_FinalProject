function Rapper( typeID, name, highResImg, highResSize, lowResImg, theSong, quoteLyrics, songLyrics, timerTime )
{
  //USE TYPE ID FOR A MAKEDRAWING FUNCTION
  this.id = typeID;
  this.imgScale = width / lowResImg.width;
  this.mainImg = new MenuImg( name, highResImg, highResSize );
  this.quImg = new QuoteImg( lowResImg, this.imgScale, quoteLyrics );
  this.abImg = new AbstractImg( typeID, lowResImg, this.imgScale, songLyrics );
  this.song = theSong;
  this.state = 0;
  this.quImgIsLoaded = this.quImg.loadImgData();
  this.abImgIsLoaded = this.abImg.loadImgData();
  this.songIsPlaying = false;
  this.timer = new Timer( 500 );
  this.timerTempo = timerTime;
  this.frame = 0;
  
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