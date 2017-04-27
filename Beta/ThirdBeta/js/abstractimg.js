// butterfly/logo with lyrics //
// lyrics and butterfly/logos, etc. //
// renders each pixel with logo and lyrics //
// has a state that changes opacity of each property //

// Not All Heroes Wear Capes
// Brendan Boursiquot
// https://github.com/brendanb96/CC_FinalProject

// Beta 1.2: Added Detailed Commets

//-------------------//
//----AbstractImg Class----//
//-------------------//
// + ABSTRACTIMG OBJECT
// --- MANAGES THREE AUXILLARY IMAGE OBJECTS AND ONE AUXILLARY TIMER OBJECT
// --- DISPLAYS VARIOUS PROCESSED IMAGES, LYRICS, AND SONGS
// --- HAS THREE DIFFERENT STATES:
// --- ... MENU STATE, QUOTE STATE, ABSTRACT STATE

//----CONSTRUCTOR----//
function AbstractImg( typeID, theImg, imgScale, inputLyrics )
{
  //USE TYPE ID FOR A MAKEDRAWING FUNCTION
  this.id = typeID;
  this.img = theImg;
  this.w = theImg.width * imgScale;
  this.h = theImg.height * imgScale;
  this.iScale = imgScale;
  this.lyrics = inputLyrics;
  this.lyricIndx = 0;
  this.charArray = [];
  this.screenCharLimit = this.img.width;
  this.lyricOpacity;
  this.logoOpacity;
  this.loudInput = false;

  // Only contains "brightness" color values (1/4 of regular pixel array)
  this.pixelArray = [];
  
    // FUNCTION NAMING "HIERARCHY"
    // "Display" Functions > "Make" Functions > "Create" Functions
    // this.display() is the Global/Total/Main Drawing Function for Object
    // For consistency, major drawings of object are then grouped with a "display"-prefix
    // Furthermore, subportions of these "display"-prefix drawings are "make"-prefix functions
    // going even more detailed, if the function requires it, there are tinier "create"-prefix funcitons
  
  this.reset = function()
  {
    this.charArray = [];
    this.loadLyricData();
    this.loadInput = false;
    this.lyricIndx = 0;
  }

  this.setLyricIndx = function( indx )
  {
    this.lyricIndx = indx;
  }

  this.loadImgData = function()
  {
    this.img.loadPixels();
    for( var y = 0; y < 50; y++ )
    {
      for( var x = 0; x < 50; x++ )
      {
        var pixelIndx = ( x + (y*this.img.width) ) * 4;

        var r = this.img.pixels[ pixelIndx + 0 ];
        var g = this.img.pixels[ pixelIndx + 1 ];
        var b = this.img.pixels[ pixelIndx + 2 ];
        var a = this.img.pixels[ pixelIndx + 3 ];

        var brightness = (r + g + b) / 3;

        var newPixelIndx = pixelIndx / 4;

        this.pixelArray[ newPixelIndx ] = brightness;
      }
      if( y == 49 )
      {
        picIsLoaded = true;
      }
    }
    this.img.updatePixels();
    this.loadLyricData();
  }

  this.loadLyricData = function()
  {
    var totalCharLimit = this.pixelArray.length;
    var rowCharLimit = sqrt( this.pixelArray.length );
    this.charArray = [];

    for( var i = 0; i < this.lyrics.length; i++ )
    {
      var wordList = this.lyrics[ i ].split( " " );
      for( var j = 0; j < wordList.length; j++ )
      {
        var word = wordList[ j ];
        for( var k = 0; k < word.length; k++ )
        {
          this.charArray.push( word[ k ] );
        }
        this.charArray.push( " " );
      }
    }

    var blankRow = this.makeBlankRow( rowCharLimit );
    var originalLength = this.charArray.length;
    for( var i = 0; i < originalLength; i += 100 )
    {
      splice( this.charArray, blankRow, i );
    }
  }

  this.updateLyrics = function()
  {
    // insurance
    //this.charArray.splice( 0, this.charArray.length );
    //this.charArray.length = 0;
    //this.charArray = [];
    this.charArray.splice( 0, this.lyricIndx - 1 );
  }

  this.makeBlankRow = function( rowLength )
  {
    var blankArray = [];
    for( var i = 0; i < rowLength; i++ )
    {
      blankArray.push( "-" );
    }
    return blankArray;
  }

  this.display = function( level )
  {
    var counter = 0;
    var clrCount = 0;
    var alphVal = 255 * level;
    var lyricalphVal;
    var logoalphVal;
  
    if( level > 0.1 )
    {
      this.loudInput = true;
    }
    else if( level < 0.005 )
    {
      this.loudInput = false;
    }
  
    if( this.loudInput )
    {
      lyricalphVal = 255;
      logoalphVal = 0;
    }
    else
    {
      logoalphVal = 255 - alphVal;
      if( logoalphVal < 100 )
      {
        logoalphVal = 0;
      }
      lyricalphVal = 255 - logoalphVal;
    }

    for( var y = 0; y < 50; y++ )
    {
      for( var x = 0; x < 50; x++ )
      {
        var pixelIndx = x + ( y * this.img.width );
        var brightness = this.pixelArray[ pixelIndx ];

        if( this.charArray[ counter ] == ' ' )
        {
            clrCount++;
        }
        if( clrCount >= 3 )
        {
          clrCount = 0;
        }

        if( counter < this.charArray.length )
        {
          var xPos = x * this.iScale;
          var yPos = y * this.iScale;
          this.displayLogo( xPos, yPos, this.iScale, brightness, logoalphVal );
          this.displayText( xPos, yPos, this.iScale, brightness, lyricalphVal, counter, clrCount );
          counter++;
        }
        else
        {
          return;
        }
      }
    }
  }

  this.displayLogo = function( xPos, yPos, size, clr, alphVal )
  {
    if( this.id == 1 )
    {
      this.makePeaceTarget( xPos, yPos, size, clr, alphVal );
    }
  else if( this.id == 2 )
    {
      this.makeFlag( xPos, yPos, size, clr, alphVal );
    }
  else if( this.id == 3 )
    {
      this.makeEye( xPos, yPos, size, clr, alphVal );
    }
    strokeWeight( 1 );
    noStroke();
  }

  this.makeEye = function( xPos, yPos, size, clr, alphVal )
  {
    // size = max
      
    fill( clr, clr, clr, alphVal );
    ellipseMode( CENTER );
    ellipse( xPos, yPos, size, size/2 );
    ellipse( xPos, yPos, size/3, size/2 );
  }

  this.makePeaceTarget = function( xPos, yPos, size, clr, alphVal )
  {
    ellipseMode( CENTER );
    noFill();
    var targetClr = 255 - clr;
    strokeWeight( size / 25 );
    
    stroke( clr/10, clr, clr/10, alphVal );
    line( xPos, yPos - size/2, xPos, yPos + size/2 );
    line( xPos, yPos, xPos + size/3, yPos + size/3 );
    line( xPos, yPos, xPos - size/3, yPos + size/3 );

    stroke( targetClr, targetClr, targetClr, alphVal );
    ellipse( xPos, yPos, size, size );
    ellipse( xPos, yPos, size/1.5, size/1.5 );
    ellipse( xPos, yPos, size/3, size/3 );
    line( xPos - size/2, yPos, xPos + size/2, yPos );
  }
    
  this.makeFlag = function( xPos, yPos, size, clr, alphVal )
  {
    // MAYBE CALL THIS ONCE OUTSIDE OF FOR LOOP
    // "1.9" BASED ON FLAGWIDTH RATIO 
    var constant = size / 1.9;  
    // RATIOS ARE SET, MULTIPLY BY INPUTED SIZE
    var flagHeight = 1 * constant;
    var flagWidth = 1.9 * constant;
    var starBoxHeight = 3/7 * constant;
    var starBoxWidth = 5/7 * constant;
    var stripeHeight = 1/7 * constant;
    //var starDistance = 1/16 * constant;
    
    noFill();
    rectMode( CORNER );
    rect( xPos, yPos, flagWidth, flagHeight );
    
    fill( 0, 0, clr, alphVal );
    rect( xPos, yPos, starBoxWidth, starBoxHeight );
    this.createStripes( xPos, yPos, flagWidth, starBoxWidth, stripeHeight, clr, alphVal );
  }
    
  this.createStripes = function( xPos, yPos, flagWidth, boxWidth, stripeHeight, clr, alphVal )
  {
    var offsetDistance = flagWidth - boxWidth;
    
    for( var i = 0; i < 7; i++ )
    {
      var newXPos = xPos + boxWidth;
      if( i % 2 == 0 )
      {
        stroke( clr, 0, 0, alphVal );
      }
      else
      {
        stroke( clr, clr, clr, alphVal );
      }
      
      if( i >= 4 )
      {
        line( xPos, yPos, newXPos + offsetDistance, yPos );
      }
      else
      {
        line( newXPos, yPos, newXPos + offsetDistance, yPos );
      }
      
      yPos += stripeHeight;
    }
    noStroke();
  }

  this.displayText = function( xPos, yPos, size, clr, alphVal, indx, val )
  {
    // size = max
    var txt = this.charArray[ indx ];

    if( val == 0 )
    {
      fill( clr, 0, 0, alphVal );
    }
    else if( val == 1 )
    {
      fill( 0, clr, 0, alphVal );
    }
    else if( val == 2 )
    {
      fill( 0, 0, clr, alphVal );
    }
    else
    {
      fill( clr, clr, clr, alphVal );
    }

    this.makeLyrics( xPos, yPos, size, txt );
  }

  this.makeLyrics = function( xPos, yPos, size, txt )
  {
    // size = max
    //fill( clr, clr, clr, alphVal );
    textSize( size );
    text( txt, xPos, yPos );
  }
}