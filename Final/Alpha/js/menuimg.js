// Not All Heroes Wear Capes
// Brendan Boursiquot
// https://github.com/brendanb96/CC_FinalProject

// CC Final Project: Image Processing and Audio Interaction

//-------------------//
//----MenuImg Class----//
//-------------------//
// + MENUIMG OBJECT
// --- MANAGES MENU STATE IMAGE
// --- DISPLAYS A HIGHRES IMAGE
// --- HOVERING SPARKS A CERTAIN ANIMATION

//----CONSTRUCTOR----//
function MenuImg( personName, theImg, imgSize )
{
	//----CLASS VARIABLES----//
  	// + String for Menu Item Name/Title
    this.name = personName;

    // + High Resolution of Menu Image
    this.img = theImg;

    // + The Size of the High Resolution Image
    this.size = imgSize;

    // + Initialize X-Position of Image
    this.x = 0;

    // + Initialize Y-Position of Image
    this.y = height/2;

    //----CLASS METHODS----//
    // + SETTERS AND GETTERS (AND/OR SIMILAR FUNCTIONS)
  	// + Return X
	this.getX = function()
	{
		return this.x;
	}

	// + Change X
	this.setX = function( newX )
	{
		this.x = newX;
	}

	// Return Whether or Not Mouse Is Hovering Over Image
	this.mouseInArea = function()
	{
		var mouseIsInArea = false;
		if( (mouseY > this.y - this.size) && (mouseY < this.y + this.size) )
		{
			if( (mouseX > this.x - this.size/2) && (mouseX < this.x + this.size/2) )
			{
				mouseIsInArea = true;
			}
		}
		return mouseIsInArea;
	}

	// + DISPLAY FUNCTIONS (AND/OR SIMILAR FUNCTIONS)
	// + Main Level Display Function
    this.display = function()
	{
		var displaySize = this.size;

		if( this.mouseInArea() )
		{
			displaySize *= 2;
			this.makeSuperAura();
			this.writeName();
		}
		
		imageMode( CENTER );
	  	image( theImg, this.x, this.y, displaySize, displaySize )
	}

	// + Write Name On Bottom of Screen / Underneath Image
	this.writeName = function()
	{
	  fill( 0 );
	  textFont( 'Helvetica' );
	  textSize( height/20 );
	  text( this.name, width/2, 5*height/6 );
	}

	// + Make a Hovering Animation
	this.makeSuperAura = function()
	{
	  for( var x = 0; x < width; x += 20 )
	  {
	    for( var y = 0; y < height; y += 20 )
	    {
	      if( x % 40 == 0 )
	      {
	        stroke( random( 255 ), random( 255 ), random( 255 ) );
	        line( mouseX, mouseY, x, y );
	      }
	    }
	  }
	  noStroke();
	}
}