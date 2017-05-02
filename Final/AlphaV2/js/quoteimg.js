// Not All Heroes Wear Capes
// Brendan Boursiquot
// https://github.com/brendanb96/CC_FinalProject

// CC Final Project: Image Processing and Audio Interaction

//-------------------//
//----QuoteImg Class----//
//-------------------//
// + QUOTEIMG OBJECT
// --- MANAGES QUOTE STATE IMAGE (LOWRES IMAGE)
// --- DISPLAYS ENLARGENED PIXELS (ELLIPSES)
// --- AND SHOWS ONE-LINE OF LYRICS FOR EACH PIXEL

//----CONSTRUCTOR----//
function QuoteImg( theImg, imgScale, inputLyrics )
{
    //----CLASS VARIABLES----//
    // + ID Number for Logo Selection/Choice
    this.img = theImg;

    // + LowRes Image to Use for Abstraction
    this.w = theImg.width * imgScale;

    // + The Width of the Object LowResImage * Scale
    this.h = theImg.height * imgScale;

    // + The Scale of the Image - The Size to Enlargen Each Pixel By
    this.iScale = imgScale;

    // + The Quotes / One-Liners
    this.quotes = inputLyrics;

    // + Quotes "Expanded"/Duplicated/Filled To Match 1:1 With Each Pixel
    this.quotesExpanded = [];

    // The Reduced Pixel Array
    // Only contains "brightness" color values (1/4 of regular pixel array)
    this.pixelArray = [];

    //----CLASS METHODS----//
    // Reset Quotes (Avoid ReProcessing of Old Quotes Array and Randomize/Mix Expanded Array)
    this.reset = function()
    {
      shuffle( this.quotesExpanded );
    }

    // + LOAD FUNCTIONS (AND/OR SIMILAR FUNCTIONS)
    // + Load All LowRes Image Data and Create Reformat Pixel Array
    // --- NOTE: This Function Returns a Boolean; This Is Strictly If a Function
    // --- ... Specifically Wants To Know If Data Was Loaded... Not Necessary
    // --- ... Data Should Be All Loaded Well-Before Display
    this.loadImgData = function()
    {
        var picIsLoaded = false;

        // + Load LowRes Image Pixels
        this.img.loadPixels();

        // + Loop Through Default Pixel Array By Y*X
        for( var y = 0; y < this.img.height; y++ )
        {
            for( var x = 0; x < this.img.width; x++ )
            {
                // Calculate the Location of the Wanted Pixel
                // In the Pixel Area. (Translate a 2-Dimension 
                // Coordinate Into a 1-Dimensional array)
                // + Get Index of Designated Pixel Inside the Pixel Array
                // --- ( x + (y*this.img.width) ) Gets Location of Index Inside Array
                // --- ... Index Will Always Be X-Position + a Certain Offset
                // --- ... This Offset = Y-Position * Width ("How Far Down In Rows Is The Location?")
                // --- This is Multipled By 4 Becayse There Exists R-G-B-A Values for Each Pixel
                var pixelIndx = ( x + (y * this.img.width) ) * 4;

                // + Get R-G-B-A Values for This Specific Pixel
                // --- "+ 0" Used for Intuition/Consistency Sake
                var r = this.img.pixels[ pixelIndx + 0 ];
                var g = this.img.pixels[ pixelIndx + 1 ];
                var b = this.img.pixels[ pixelIndx + 2 ];
                var a = this.img.pixels[ pixelIndx + 3 ];

                // + Calculate Brightness Values for This Index
                // --- Brightness is the Average of the RGB Values
                var brightness = (r + g + b) / 3;

                // + Calculates New Pixel Index by Dividing by 4
                // --- New Pixel Array Uses Only Brightness, 1/4 of Original Array Size
                var newPixelIndx = pixelIndx / 4;

                // + Map Brightness Value of This Pixel to Its Position in New Array
                this.pixelArray[ newPixelIndx ] = brightness;
            }
            if( y == 49 )
            {
                picIsLoaded = true;
            }
        }
        // + Close Of Load Pixels Function
        this.img.updatePixels();
        
        // This function takes the passed Strings, randomizes them,
        // and repeats all the Strings until there is a quote for each
        // of the 2500 pixels.
        this.expandQuotes();

        return picIsLoaded;
    }

    // + "Expand"/Duplicate Quote Array Until It Matches Length of Pixel Array
    this.expandQuotes = function()
    {
        // + Original Index
        var regularIndex = 0;

        // + New Index
        var expansionIndex = regularIndex;

        // + New Randomized Array
        var newQuotesArray = shuffle( this.quotes );

        // + Bound Expansion to Length of The Reduced Pixel Array
        while( expansionIndex < this.pixelArray.length )
        {
            // --- Limit Check
            // NOTE: newQuotesArray is Same Length as Original Array... Just Has Shuffled Items
            if( regularIndex >= newQuotesArray.length )
            {
                regularIndex = 0;
            }

            var lyricLine = newQuotesArray[ regularIndex ];

            this.quotesExpanded.push( lyricLine );

            // --- Iterations to Go Through Loop and Prevent Infinite Cycle
            regularIndex++;
            expansionIndex++;
        }
    }

    // + DISPLAY FUNCTIONS (AND/OR SIMILAR FUNCTIONS)
    // FUNCTION NAMING "HIERARCHY"
    // "Display" Functions > "Make" Functions > "Create" Functions
    // this.display() is the Global/Total/Main Drawing Function for Object
    // For consistency, major drawings of object are then grouped with a "display"-prefix
    // Furthermore, subportions of these "display"-prefix drawings are "make"-prefix functions
    // going even more detailed, if the function requires it, there are tinier "create"-prefix funcitons

    // + Main Level Display Function
    // --- Iterate Through Reduced Pixel Array and Display Drawing Each Pixel
    // --- Display Quotes For Pixel At Input Location
    this.display = function( xIn, yIn )
    {
        textFont("Helvetica");

        // + Loop Through Array and Make Circles for Each Pixel
        // ... Circle Size = iScale... if lowResImage is 50px*50px and QuoteImage is 500px*500px,
        // ... iScale will be 10px.
        for( var y = 0; y < this.img.height; y++ )
        {
            for( var x = 0; x < this.img.width; x++ )
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
    
    // + Draw Ellipse
    this.makeCircle = function( xPos, yPos, size, clr )
    {
        fill( clr );
        ellipseMode( CENTER );
        ellipse( xPos, yPos, size, size );
    }

    // + Draw Lyrics on Screen at Specific Point
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
    
    // + Output The Quotes
    this.outputInfo = function( xPos, yPos )
    {
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

    // + Draw Quote Text
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
    
    // + Draw Quote Background Screen
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