// butterfly/logo with lyrics //
// lyrics and butterfly/logos, etc. //
// renders each pixel with logo and lyrics //
// has a state that changes opacity of each property //

function AbstractImg( typeID, theImg, imgScale, inputLyrics; )
{
	//USE TYPE ID FOR A MAKEDRAWING FUNCTION
	this.id = typeID;
	this.img = theImg;
	this.w = theImg.width * imgScale;
	this.h = theImg.height * imgScale;
	this.iScale = imgScale;
	this.lyrics = inputLyrics;
	this.charArray = [];
	this.lyricOpacity;
	this.logoOpacity;

	// Only contains "brightness" color values (1/4 of regular pixel array)
	this.pixelArray = [];

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
	}

	this.loadLyricData()
	{
		for( var i = 0; i < this.lyrics.length; i++ )
        {
          var wordList = this.lyrics[ i ].split( " " );
          for( var j = 0; j < wordList.length; j++ )
          {
            //var charList = wordList[ j ].split
            //for( var k = 0; k < charList; k++ )
            //{
            //  this.wordArray.push( wordList[ j ] );
            //}
            var word = wordList[ j ];
            for( var k = 0; k < word.length; k++ )
            {
              this.charArray.push( word[ k ] );
            }
            this.charArray.push( " " );
          }
        }
	}

	this.display = function()
	{
		var counter = 0;
		var clrCount = 0;

		for( var y = 0; y < 50; y++ )
		{
			for( var x = 0; x < 50; x++ )
			{
				var pixelIndx = x + ( y * this.img.width );
				var brightness = this.pixelArray[ pixelIndx ];

				var xPos = x * this.iScale;
				var yPos = y * this.iScale;
				this.displayLogo( xPos, yPos, this.iScale, brightness );
			}
		}
	}

	this.displayLogo = function( xPos, yPos, size, clr )
	{
		if( this.id == 1 )
        {
          //this.makeButterfly();
        }
     	else if( val == 1 )
        {
          //this.makeFlag();
        }
     	else if( val == 2 )
        {
          this.makeEye();
        }
	}

	this.makeEye = function( xPos, yPos, size, clr )
	{
		// size = max

		if( val == 0 )
        {
          fill( clr, 0, 0 );
        }
     	else if( val == 1 )
        {
          fill( 0, clr, 0 );
        }
     	else if( val == 2 )
        {
          fill( 0, 0, clr );
        }
      	else
        {
          fill( clr );
        }

		//fill( clr );
		ellipseMode( CENTER );
		ellipse( xPos, yPos, size, size/2 );
		ellipse( xPos, yPos, size/3, size/2 );
	}

	this.makeLyrics = function( xPos, yPos, size, clr, txt )
    {
      	// size = max
      	fill( clr );
      	textSize( this.iScale );
      	text( txt, xPos, yPos );
    }
}