// picture improtant lyrics tag //
// hover over and see random important lyrics //

// Not All Heroes Wear Capes
// Brendan Boursiquot
// https://github.com/brendanb96/CC_FinalProject

// Beta 1.2: Added Detailed Commets

//-------------------//
//----QuoteImg Class----//
//-------------------//
// + QUOTEIMG OBJECT
// --- MANAGES THREE AUXILLARY IMAGE OBJECTS AND ONE AUXILLARY TIMER OBJECT
// --- DISPLAYS VARIOUS PROCESSED IMAGES, LYRICS, AND SONGS
// --- HAS THREE DIFFERENT STATES:
// --- ... MENU STATE, QUOTE STATE, ABSTRACT STATE

//----CONSTRUCTOR----//
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

    // The Reduced Pixel Array
    // Only contains "brightness" color values (1/4 of regular pixel array)
    this.pixelArray = [];

    this.reset = function()
    {
      shuffle( this.quotesExpanded );
    }

    this.loadImgData = function()
    {
        var picIsLoaded = false;

        this.img.loadPixels();
        for( var y = 0; y < 50; y++ )
        {
            for( var x = 0; x < 50; x++ )
            {
                // Calculate the Location of the Wanted Pixel
                // In the Pixel Area. (Translate a 2-dimension 
                // coordinate into a 1-dimension array)
                // Multipled by 4 for each pixel value: R, G, B, A.
                var pixelIndx = ( x + (y * this.img.width) ) * 4;

                var r = this.img.pixels[ pixelIndx + 0 ];
                var g = this.img.pixels[ pixelIndx + 1 ];
                var b = this.img.pixels[ pixelIndx + 2 ];
                var a = this.img.pixels[ pixelIndx + 3 ];

                // calculate brightness
                var brightness = (r + g + b) / 3;

                // calculate index of this pixel for the
                // "reduced" pixel array
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
        
        // This function takes the passed Strings, randomizes them,
        // and repeats all the Strings until there is a quote for each
        // of the 2500 pixels.
        this.expandQuotes();
        
        return picIsLoaded;
    }

    this.expandQuotes = function()
    {
        // Original Index
        var regularIndex = 0;

        // New Index
        var expansionIndex = regularIndex;

        // New Randomized Array
        var newQuotesArray = shuffle( this.quotes );

        // 2500 is length of The Reduced Pixel Array
        while( expansionIndex < 2500 )
        {
            // Limit Check
            if( regularIndex >= newQuotesArray.length )
            {
                regularIndex = 0;
            }

            var lyricLine = newQuotesArray[ regularIndex ];

            this.quotesExpanded.push( lyricLine );

            regularIndex++;
            expansionIndex++;
        }
    }

    this.display = function( xIn, yIn )
    {
        textFont("Helvetica");
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
      this.outputInfo( xIn, yIn );
    }
    
    this.makeCircle = function( xPos, yPos, size, clr )
    {
        fill( clr );
        ellipseMode( CENTER );
        ellipse( xPos, yPos, size, size );
    }

    this.makeLyrics = function( xPos, yPos, size, clr, txt, txt2 )
    {
        // size = max
        //fill( clr );
        textSize( size );
        text( txt, xPos, yPos );
        if( txt2 )
        {
          textSize( size );
          text( "\n" + txt2, xPos, yPos );
        }
    }
    
    this.outputInfo = function( xPos, yPos )
    {
        //var newX = ceil( map( xPos, 0, 500, 0, 50 ) );
        //var newY = ceil( map( yPos, 0, 500, 0, 50 ) );
        var indxX = round( xPos / this.iScale );
        var indxY = round( yPos / this.iScale );
      
        var textSize = this.iScale * 1.25;
        
        var pixelIndx = indxX + ( indxY * this.img.width );
        var lyricLine = this.quotesExpanded[ pixelIndx ];
        
        var lyricWidth = textWidth( lyricLine ) * 1.05;
        
        var reverse = false;
        var stack = false;
      
        if( xPos + lyricWidth > width )
        {
            reverse = true;
            if( xPos - lyricWidth < 0 )
            {
              stack = true;
              if( xPos - lyricWidth/2 < 0 )
              {
                reverse = false;
              }
            }
        }
      
        this.outputScreen( indxX, indxY, lyricWidth, reverse, stack, textSize  );
        this.outputText( indxX, indxY, lyricLine, reverse, stack, textSize );
    }

    this.outputText = function( xPos, yPos, text, reverse, stack, size )
    {
        fill( 255, 255, 0 );
        var clr = color( 205, 205, 105 );
        textLeading(20);
        textSize( size );
        textAlign( LEFT );

        var scaledX = xPos * this.iScale;
        var scaledY = yPos * this.iScale;
      
        this.makeCircle( scaledX, scaledY, size, clr );
      
      
        if( reverse )
        {
          textAlign( RIGHT );
        }
      
        if( stack )
        {
          var newTxt1 = text.substr( 0, text.length/2 );
          var newTxt2 = text.substr( text.length/2 - 1, text.length );
          
          if( reverse )
          {
            scaledX -= this.iScale*2;
          }
          else
          {
            scaledX += this.iScale*2;
          }
          
          this.makeLyrics( scaledX, scaledY, size*1.1, clr, newTxt1, newTxt2 );
        }
        else
        {
          scaledX += this.iScale;
          this.makeLyrics( scaledX, scaledY, size*1.1, clr, text );
        }
    }
    
    this.outputScreen = function( xPos, yPos, txtWidth, reverse, stack, size )
    {
        fill( 125 );
        stroke( 0 );
        strokeWeight( 2 );
      
        rectMode( CENTER ); 
      
        var scaledX = xPos * this.iScale + txtWidth/2;
        var scaledY = yPos * this.iScale;
        
        var rectHeight = size * 2.2;
      
        if( reverse )
        {
          scaledX -= txtWidth;
          scaledX += size;
        }
      
        if( stack )
        {
          if( reverse )
          {
            scaledX += txtWidth/4;
            scaledX -= size;
          }
          else
          {
            scaledX -= txtWidth/4;
            scaledX += size;
          }
          rect( scaledX, scaledY, txtWidth/1.50, rectHeight*2 );
        }
        else
        {
          scaledX += size;
          rect( scaledX, scaledY, txtWidth*1.25, rectHeight );
        }
    }
}