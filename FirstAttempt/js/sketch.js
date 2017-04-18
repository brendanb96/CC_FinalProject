
var img;
var abstract;
var pic1Loaded = false;
var pic2Loaded = false;
var inputText = " ";
var inputText2 = " ";

var pic1Displayed = false;
var pic2Displayed = false;
// A FUNCTION TO "RESET" DRAWING OR DISPLAY A NEW BACKGROUND
// DOES THIS SO DRAW FUNCTIONS CAN BE UTILIZED ONCE
// AND ERASED WHEN NEEDED
// (Avoids re-processing Images Forever)
var reset = false;

// "hover text"
// reutilizes the same object and redraws dynamically to avoid erasing

// var imgSizeFactor = 50;

// var imgSizeFactor = 50;

function preload()
{
  img = loadImage( "../data/img/pic-cole.png" );
  inputText = loadStrings( "../data/lyrics/songs/cole-neighbors-lyrics.txt" );
  inputText2 = loadStrings( "../data/lyrics/quotes/cole-quotes.txt" );
}

function setup()
{
  createCanvas( 500, 500 );
  smooth();
  pixelDensity( 1 );

  abstract = new AbstractImg( 3, img, 10 );
  abstract.loadImgData();

  quoteimg = new QuoteImg( 3, img, 10, inputText2 );
  picLoaded2 = quoteimg.loadImgData();
}

function draw()
{
	if( pic1Loaded && !pic1Displayed )
    {
   		abstract.display();
    	pic1Displayed = true;
    }

    if( pic2Loaded && !pic2Displayed )
    {
   		quoteimg.display();
    	pic2Displayed = true;
    }

	// loadPixels();
	// img.loadPixels();

	// for( var y = 0; y < 50; y++ )
	// {
	// 	for( var x = 0; x < 50; x++ )
	// 	{
	// 		var pixelIndx = ( x + (y*img.width) ) * 4;

	// 		var r = img.pixels[ pixelIndx + 0 ];
	// 		var g = img.pixels[ pixelIndx + 1 ];
	// 		var b = img.pixels[ pixelIndx + 2 ];
	// 		var a = img.pixels[ pixelIndx + 3 ];

	// 		var bright = (r + g + b) / 3;

	// 		rectMode( CENTER );
	// 		fill( bright );
	// 		rect( x * 10, y * 10, 10, 10 );
	// 	}
	// }

	// img.updatePixels();
	// updatePixels();

	// makeEye( 50, 50, 50 );
}

function keyTyped()
{
  if( key == '1' )
  {
    background( 255 );
    if( picLoaded && !picDisplayed )
    {
      //background( 255 );
      //abstract.displayText();
      abstract.display();
      picDisplayed = true;
    }
    picDisplayed = false;
  }
  else if( key == '2' )
  {
    background( 255 );
    if( picLoaded2 && !picDisplayed2 )
    {
      //background( 255 );
      //abstract.displayText();
      abstract.display();
      picDisplayed2 = true;
    }
    picDisplayed2 = false;
  }
}

// function makeEye( xPos, yPos, size )
// {
// 	// size = mx
// 	ellipseMode( CENTER );
// 	ellipse( xPos, yPos, size, size/2 );
// 	ellipse( xPos, yPos, size/3, size/2 );
// }

