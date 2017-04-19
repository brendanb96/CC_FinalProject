// picture improtant lyrics tag //
// hover over and see random important lyrics //

function QuoteImg( theImg, imgScale, inputLyrics )
{
	//get pixelindex function
	this.img = theImg;
	this.w = theImg.width * imgScale;
	this.h = theImg.height * imgScale;
	this.iScale = imgScale;
  	this.quotes = inputLyrics;
  	this.quotesExpanded = [];
	this.lyricOpacity;
	this.logoOpacity;

	// Only contains "brightness" color values (1/4 of regular pixel array)
	this.pixelArray = [];

	this.loadImgData = function()
	{
      	var picIsLoaded = false;
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
              	
              	//var xPos = x * this.iScale;
              	//var yPos = y * this.iScale;
              	//this.makeEye( xPos, yPos, this.iScale, brightness );
			}
          if( y == 49 )
          {
            picIsLoaded = true;
          }
		}
		this.img.updatePixels();
      	//callback( this );
      	
      	var regularIndex = 0;
      	var expansionIndex = regularIndex;
      	var newQuotesArray = shuffle( this.quotes );
      	while( expansionIndex < 2500 )
        {
          if( regularIndex >= this.quotes.length )
          {
            regularIndex = 0;
          }
          
          var lyricLine = this.quotes[ regularIndex ];
          
          this.quotesExpanded.push( lyricLine );
          
          regularIndex++;
          expansionIndex++;
        }
      	return picIsLoaded;
	}

	this.display = function()
	{
        for( var y = 0; y < 50; y++ )
        {
            for( var x = 0; x < 50; x++ )
            {
              var pixelIndx = x + ( y * this.img.width );
              var brightness = this.pixelArray[ pixelIndx ];
              
              var xPos = x * this.iScale;
              var yPos = y * this.iScale;
              this.makeCircle( xPos, yPos, this.iScale, brightness );
            }
          }
		}
	}
    
    this.makeCircle = function( xPos, yPos, size, clr )
    {
      fill( clr );
      ellipseMode( CENTER );
      ellipse( xPos, yPos, size, size );
    }

    this.makeLyrics = function( xPos, yPos, size, clr, txt, val )
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
      	textSize( size );
      	text( txt, xPos, yPos );
    }
    
    this.outputInfo = function( xPos, yPos )
    {
      	//var newX = ceil( map( xPos, 0, 500, 0, 50 ) );
      	//var newY = ceil( map( yPos, 0, 500, 0, 50 ) );
      	var indxX = ceil( xPos / this.iScale );
      	var indxY = ceil( yPos / this.iScale );
      	this.outputScreen( indxX, indxY );
      	this.outputText( indxX, indxY );
    }

    this.outputText = function( xPos, yPos )
    {
    	fill( 255, 255, 0 );
		var clr = color( 255, 55, 255 );
		var pixelIndx = xPos + ( yPos * this.img.width );
		var lyricLine = this.quotesExpanded[ pixelIndx ];

		var scaledX = xPos * this.iScale;
		var scaledY = yPos * this.iScale

		this.makeCircle( scaledX, scaledY, this.iScale, clr ); 
		textAlign( LEFT );
		this.makeLyrics( scaledX, scaledY, this.iScale, clr, lyricLine );
		//get pixelindex function
    }
    
    this.outputScreen = function( xPos, yPos )
    {
      fill( 200 );
      stroke( 0 );
      strokeWeight( 2 );
      rect( xPos, yPos, this.iScale * 2, this.iScale * 2 )
    }
}