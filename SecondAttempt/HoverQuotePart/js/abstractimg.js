// butterfly/logo with lyrics //
// lyrics and butterfly/logos, etc. //
// renders each pixel with logo and lyrics //
// has a state that changes opacity of each property //

function AbstractImg( typeID, theImg, imgScale, inputLyrics )
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
  	this.loudInput = false;

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
      	this.loadLyricData();
	}

	this.loadLyricData = function()
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

	this.display = function( level )
	{
		var counter = 0;
		var clrCount = 0;
		var alpha = 255 * level;
      	console.log( level );
      	var lyricAlpha;
        var logoAlpha;
      
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
          lyricAlpha = 255;
          logoAlpha = 0;
        }
      	else
        {
          logoAlpha = 255 - alpha;
          if( logoAlpha < 100 )
          {
          	logoAlpha = 0;
          }
		  lyricAlpha = 255 - logoAlpha;
        }

		//var logoAlpha = 255 - alpha;
      	//if( logoAlpha < 100 )
        //{
         // logoAlpha = 0;
        //}
		//var lyricAlpha = 255 - logoAlpha;
      
      	//console.log( "aaaa:" + lyricAlpha );

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

				var xPos = x * this.iScale;
				var yPos = y * this.iScale;
				this.displayLogo( xPos, yPos, this.iScale, brightness, logoAlpha );
				this.displayText( xPos, yPos, this.iScale, brightness, lyricAlpha, this.charArray[ counter ], clrCount );
              	counter++;
			}
		}
	}

	this.displayLogo = function( xPos, yPos, size, clr, alpha )
	{
      	noStroke();
		if( this.id == 1 )
        {
          //this.makeButterfly();
        }
     	else if( this.id == 2 )
        {
          this.makeFist( xPos, yPos, size, clr, alpha );
        }
     	else if( this.id == 3 )
        {
          this.makeEye( xPos, yPos, size, clr, alpha );
        }
	}

	this.makeFist = function( xPos, yPos, size, clr, alpha )
    {
    	// size = max
		fill( clr, clr, clr, alpha );
		ellipse( xPos, yPos, size, size );

		fill( clr, 0, 0, alpha );
		ellipse( xPos - size/3, yPos - size/4, size/3, size/2 );
		fill( 255 );
		ellipse( xPos - size/8, yPos - size/3, size/3, size/2 );
		fill( 0, 0, clr, alpha );
		ellipse( xPos + size/8, yPos - size/3, size/3, size/2 );
		ellipse( xPos + size/3, yPos - size/4, size/3, size/2 );

		fill( clr, clr, clr, alpha );
		ellipse( xPos + size/4, yPos, size/2, size/3 );
    }

	this.makeEye = function( xPos, yPos, size, clr, alpha )
	{
		// size = max
      
		//fill( clr );
		ellipseMode( CENTER );
		ellipse( xPos, yPos, size, size/2 );
		ellipse( xPos, yPos, size/3, size/2 );
	}

	this.displayText = function( xPos, yPos, size, clr, alpha, txt, val )
    {
      	// size = max

      	if( val == 0 )
        {
          fill( clr, 0, 0, alpha );
          console.log( clr );
          console.log( val );
        }
     	else if( val == 1 )
        {
          fill( 0, clr, 0, alpha );
        }
     	else if( val == 2 )
        {
          fill( 0, 0, clr, alpha );
        }
      	else
        {
          fill( clr, clr, clr, alpha );
        }

        this.makeLyrics( xPos, yPos, size, txt );
	}

	this.makeLyrics = function( xPos, yPos, size, txt )
    {
      	// size = max
      	//fill( clr, clr, clr, alpha );
      	textSize( size );
      	text( txt, xPos, yPos );
    }
}