// Not All Heroes Wear Capes
// Brendan Boursiquot
// https://github.com/brendanb96/CC_FinalProject

// Beta 1.2: Added Detailed Commets

//-------------------//
//----MenuImg Class----//
//-------------------//
// + MENUIMG OBJECT
// --- MANAGES THREE AUXILLARY IMAGE OBJECTS AND ONE AUXILLARY TIMER OBJECT
// --- DISPLAYS VARIOUS PROCESSED IMAGES, LYRICS, AND SONGS
// --- HAS THREE DIFFERENT STATES:
// --- ... MENU STATE, QUOTE STATE, ABSTRACT STATE

//----CONSTRUCTOR----//
function MenuImg( personName, theImg, imgSize )
{
    //get pixelindex function
    this.name = personName;
    this.img = theImg;
    //this.size = width * imgScale;
    this.size = imgSize;
    this.x = 0;
    this.y = height/2;

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

	this.getX = function()
	{
		return this.x;
	}

	this.setX = function( newX )
	{
		this.x = newX;
	}

	this.writeName = function()
	{
	  fill( 0 );
	  textFont( 'Helvetica' );
	  textSize( height/20 );
	  text( this.name, width/2, 5*height/6 );
	}

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
}