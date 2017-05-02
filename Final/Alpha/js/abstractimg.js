// Not All Heroes Wear Capes
// Brendan Boursiquot
// https://github.com/brendanb96/CC_FinalProject

// CC Final Project: Image Processing and Audio Interaction

//-------------------//
//----AbstractImg Class----//
//-------------------//
// + ABSTRACTIMG OBJECT
// --- MANAGES ABSTRACT STATE IMAGE (LOWRES IMAGE)
// --- HAS TWO FORMS: LOGO DISPLAY AND LYRIC DISPLAY
// --- (ONLY THREE POSSIBLE LOGOS)
// --- STATES ARE BOTH ALWAYS DRAWN BUT WITH DIFFERENT OPACITIES
// --- CHANGES OPACITY BETWEEN STATES BASED ON GIVEN INPUT

//----CONSTRUCTOR----//
function AbstractImg( typeID, theImg, imgScale, inputLyrics )
{
  //----CLASS VARIABLES----//
  // + ID Number for Logo Selection/Choice
  this.id = typeID;

  // + LowRes Image to Use for Abstraction
  this.img = theImg;

  // + The Width of the Object LowResImage * Scale
  this.w = theImg.width * imgScale;

  // + The Height of the Object LowResImage * Scale
  this.h = theImg.height * imgScale;

  // + The Scale of the Image - The Size to Enlargen Each Pixel By
  this.iScale = imgScale;

  // + Song Lyrics to Use For Lyric State
  this.lyrics = inputLyrics;

  // + The Location/Index of the Current Character in Lyrics Array
  this.lyricIndx = 0;

  // + The Song Lyrics Reformatted in an Array of Characters
  this.charArray = [];

  // + Opacity of Lyric State
  this.lyricOpacity;

  // + Opacity of Logo State
  this.logoOpacity;

  // + Checks If (Opacity/Drawing) Input Is Fairly Large
  this.largeInput = false;

  // + Reformatted Pixel Array
  // NOTE: Only Contains "Brightness" Color Values (1/4 of Regular Pixel Array)
  // EXTA NOTE: Assumes Sketch Has a Pixel Density of 1, Whose Default Pixel Array
  // ... Will Be Smaller Than a Sketch with Higher Pixel Density (Those That Use Retina Display )
  this.pixelArray = [];
  
    // FUNCTION NAMING "HIERARCHY" (Mainly For "Display" Functions)
    // "Display" Functions > "Make" Functions > "Create" Functions
    // this.display() is the Global/Total/Main Drawing Function for Object
    // For consistency, major drawings of object are then grouped with a "display"-prefix
    // Furthermore, subportions of these "display"-prefix drawings are "make"-prefix functions
    // going even more detailed, if the function requires it, there are tinier "create"-prefix funcitons

  //----CLASS METHODS----//
  // + Reset Key Sketch Data
  // --- Because Lyric Data Can be Mutated, it is Reloaded Upon Reset
  // --- ... This is Why charArray is Set to Empty, Because charArray
  // --- ... Uses array.push Functionality Inside loadLyricData Function
  this.reset = function()
  {
    this.charArray = [];
    this.loadLyricData();
    this.largeInput = false;
    this.lyricIndx = 0;
  }

  // + SETTERS AND GETTERS (AND/OR SIMILAR FUNCTIONS)
  // + Change lyricIndx to Passed Parameter
  this.setLyricIndx = function( indx )
  {
    this.lyricIndx = indx;
  }

  // + Cut Array From Beginning to "Current" Lyric Index
  this.updateLyrics = function()
  {
    this.charArray.splice( 0, this.lyricIndx - 1 );
  }

  // + LOAD FUNCTIONS (AND/OR SIMILAR FUNCTIONS)
  // + Load All LowRes Image Data and Create Reformat Pixel Array
  // --- NOTE: This Function Returns a Boolean; This Is Strictly If a Function
  // --- ... Specifically Wants To Know If Data Was Loaded... Not Necessary
  // --- ... Data Should Be All Loaded Well-Before Display
  this.loadImgData = function()
  {
    // + Boolean to See If Data Was Loaded
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
        var pixelIndx = ( x + (y*this.img.width) ) * 4;

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
      if( y == (this.img.height - 1) )
      {
        picIsLoaded = true;
      }
    }
    // + Close Of Load Pixels Function
    this.img.updatePixels();

    // + Load All The Input Lyric Data
    this.loadLyricData();

    return picIsLoaded;
  }

  // + Load Input Lyric Data
  // --- Take Input Lyrics and Transforms Into a Array of Characters
  // --- ... This is So 1 Pixel is Mapped to 1 Char
  this.loadLyricData = function()
  {
    // + Get "Limit" of Row or LowResImg Width
    var rowCharLimit = this.img.width;

    // + Insurance That loadLyricData Will Not Be Called With a FULL/NON-EMPTY charArray
    // --- This Is Because charArray is Filled Using array.push Commands/Functions
    this.charArray = [];

    // + Input Lyrics Are Assumed To Be a String Array (Line by Line)
    // ---  Thus, This First "For" Loop Breaks the Array Into "Words"
    for( var i = 0; i < this.lyrics.length; i++ )
    {
      // + Create a String SubArray Containing All Words In That Line
      var wordList = this.lyrics[ i ].split( " " );

      // + Second "For" Loop... Further Break Down All Words Into Characters
      for( var j = 0; j < wordList.length; j++ )
      {
        // Get Current Word
        var word = wordList[ j ];

        // --- Third "For" Loop... The Actual Dividing of a Single Word Into Characters
        for( var k = 0; k < word.length; k++ )
        {
          // --- Push This PieceChar of Word Into charArray
          this.charArray.push( word[ k ] );
        }

        // --- Replace Word Spacing That Was Deleting During Split Function
        this.charArray.push( " " );
      }
    }

    // + Get a Blank or Placeholder Row to Space Out Lines
    var blankRow = this.makeBlankRow( rowCharLimit );

    // + Fill In Character Array With Blank Row
    // --- NOTE: Utilizes p5.splice Function NOT array.splice JavaScript Function
    // --- ... This Takes a Select Array and Inserts a New Array Inside The First One
    // --- EXTRA NOTE: Double Original Length is Needed Because It Will Double Size,
    // --- ...Also, A Fixed Length is Needed Because as More Blank Rows are Addded,
    // --- The Larger the Array Gets, and Can Risk an Infinite Loop If Keep Calling Back array.length
    // --- THIRD NOTE: The "For" Loop is Iterated by 100, It Must Skip The Previous Blank Row (+50)
    // --- AND Must Also Skip the Next Line of Text (+50)
    // --- THIRD NOTE ASSUMES PIXEL ARRAY OF 2500 / LOWRESIMG OF 50px*50px
    var originalLength = this.charArray.length * 2;
    rowCharLimit *= 2; // If 50, rowCharLimit Will Now be 100
    for( var i = 0; i < originalLength; i += rowCharLimit )
    {
      // --- Takes a chararray and Inserts a blankRow at Current Index
      splice( this.charArray, blankRow, i );
    }
  }

  // + Make Placeholder Row, A Row Filled with the Same Character
  this.makeBlankRow = function( rowLength )
  {
    // + Array Initializing
    var blankArray = [];

    // + For Given/Passed/Desired Row Length, Push that Placeholder Character
    for( var i = 0; i < rowLength; i++ )
    {
      // --- Add Character to Blank Row Array
      blankArray.push( "-" );
    }

    return blankArray;
  }

  // + DISPLAY FUNCTIONS (AND/OR SIMILAR FUNCTIONS)
  // FUNCTION NAMING "HIERARCHY"
  // "Display" Functions > "Make" Functions > "Create" Functions
  // this.display() is the Global/Total/Main Drawing Function for Object
  // For consistency, major drawings of object are then grouped with a "display"-prefix
  // Furthermore, subportions of these "display"-prefix drawings are "make"-prefix functions
  // going even more detailed, if the function requires it, there are tinier "create"-prefix funcitons

  // + Main Level Display Function
  // --- Obtain Alpha Values Based on Given Input
  // --- Iterate Through Reduced Pixel Array and Process Each Char and Drawing For Each Pixel
  // --- NOTE: Lyrics and Logos are Processed At Same Time... Opacities Determine Their Appearance
  this.display = function( level )
  {
    // + Get Calculated Alpha Values for Given Level Input 
    var allAlphaValues = this.calcAlphaValues( level );

    // + Associate Obtain Array of Alpha Values with Correct Variables
    var alphVal = allAlphaValues[ 0 ];
    var lyricalphVal = allAlphaValues[ 1 ];
    var logoalphVal = allAlphaValues[ 2 ];

    // + Initiate a Counter for charArray and pixelArray Index Mapping
    var counter = 0;

    // + Loop Through "Reduced" Pixel Array
    for( var y = 0; y < this.img.height; y++ )
    {
      for( var x = 0; x < this.img.width; x++ )
      {
        // + Get Index of Designated Pixel Inside the Pixel Array
        // --- ( x + (y*this.img.width) ) Gets Location of Index Inside Array
        // --- ... Index Will Always Be X-Position + a Certain Offset
        // --- NOTE: Not Multiplied by 4 Because This Array Only Stores 1 Brightness Value Per Pixel
        var pixelIndx = x + ( y * this.img.width );

        // + Get Associated Brightness Value for Pixel at Current Position
        var brightness = this.pixelArray[ pixelIndx ];

        // + Get "True" Position by Scaling X and Y
        var xPos = x * this.iScale;
        var yPos = y * this.iScale;

        this.displayLogo( xPos, yPos, this.iScale, brightness, logoalphVal );

        // + Check If Total Counter Is Less Than The Length of The Char Array
        // ... If So, Keep Iterating and Processing Image
        if( counter < this.charArray.length )
        {
          // // + Get "True" Position by Scaling X and Y
          // var xPos = x * this.iScale;
          // var yPos = y * this.iScale;
          // this.displayLogo( xPos, yPos, this.iScale, brightness, logoalphVal );
          this.displayText( xPos, yPos, this.iScale, brightness, lyricalphVal, counter );
          counter++;
        }
        // + If Total Counter is Not Less Than Length of the Char Array
        // ... In That The Counter Will Continue Out of the Array's Scope, ESCAPE FOR LOOP
        else
        {
          //return;
        }
      }
    }
  }

  // + Calculate Alpha Values Based on an Input Between 0.0 and 1.0
  // --- Translates Input Into 255 Values
  // --- Does Not Use A Conventional/Direct 1:1 Translation, But a Specific Algorithm
  // --- ... Thus, the P5 map() Function is Not Utilized
  this.calcAlphaValues = function( level )
  {
    // + Error Checking and Value Binding
    if( level > 1.00 )
    {
      level = 1.00;
    }
    else if( level < 0.00 )
    {
      level = 0.00;
    }

    // + Initiate All Alpha Values
    // ... Because Input Can At Most be 1, Multiply by 255, So Alpha Value Is At Most 255 (Opaque)
    var alphVal = 255 * level;
    var lyricalphVal;
    var logoalphVal;

    // + Intiate Array That Will Be Returned
    var alphArray = [];

    // QUICK NOTE: Though 0.325 Is Not Even Half of 1.0, Here Is Is Considered Large
    // + If Input Is a Large Value, Than Make largeInput True
    // NOTE: largeInput Will Only Be False At Construction of Object or If
    // ... It Reaches Below a Certain Value. This Is To Ensure That If A Previous Input
    // ... was "Large", The Next Value Will Also Be Large Unless Drastically Lower Than Before
    // ... This Is To Help "Maintain" or "Favor" Drawings/Functions That Require Large Inputs
    if( level > 0.325 )
    {
      this.largeInput = true;
    }
    else if( level < 0.0325 )
    {
      this.largeInput = false;
    }
    
    // + If Input Is Large, Completely Skew Lyric Drawings to Full Opaqueness
    // ... As Well As Making Logos Completely Transparent
    if( this.largeInput )
    {
      lyricalphVal = 255;
      logoalphVal = 0;
    }
    // + ELSE: "Standard" Calculations/Translations
    else
    {
      // + Logo Alpha Value is 255 - Previously Translated Alpha Value
      logoalphVal = 255 - alphVal;

      // + If Logo Alpha Value is "Too Low", Just Make It Transparent
      if( logoalphVal < 85 )
      {
        logoalphVal = 0;
      }
      lyricalphVal = 255 - logoalphVal;
    }
    alphArray[ 0 ] = alphVal;
    alphArray[ 1 ] = lyricalphVal;
    alphArray[ 2 ] = logoalphVal;

    return alphArray; 
  }

  // + Display the Logo Drawing
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

  // + Display the "EYE" Logo
  this.makeEye = function( xPos, yPos, size, clr, alphVal )
  {
    // size = max
    ellipseMode( CENTER );  

    fill( clr, clr, clr, alphVal );
    stroke( clr, 255 - clr, clr, alphVal );
    ellipse( xPos, yPos, size, size/2 );

    stroke( 255 - clr, clr, clr, alphVal );
    ellipse( xPos, yPos, size/3, size/2 );
  }

  // + Display the "PEACE/TARGET" Logo
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

  // + Display the "FLAG" Logo
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

  // + Make Stripes of Flag
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

  // + Obtain and Display Text
  this.displayText = function( xPos, yPos, size, clr, alphVal, indx )
  {
    // size = max
    var txt = this.charArray[ indx ];

    fill( clr, 255 - clr, 0, alphVal );
    if( indx == this.lyricIndx )
    {
      fill( clr, 0, clr, alphVal );
    }
    this.makeLyrics( xPos, yPos, size, txt );
  }

  // + Show Text on Screen
  this.makeLyrics = function( xPos, yPos, size, txt )
  {
    // size = max
    textSize( size );
    text( txt, xPos, yPos );
  }
}