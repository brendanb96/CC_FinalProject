// CODE CREDIT: (START)
// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 18-7: Loading a URL asynchronously
// Timer Class from Chapter 10

// CODE CREDIT: (END)

// Added Functionality by Brendan Boursiquot
// BBNotes - Specific Functionality Marks made by Brendan Boursiquot

// ADDED FUNCTIONALITY:
// "tempTime" and "setTime"
// tempTime is a variable that can store new time lengths,
// so that the Timer time can be changed
// --
// The way this works, when the Object method setTime is called,
// it stores the passed value into the tempTime variable.
// When the PREVIOUS time is finished AND the isFinished method is called,
// the new time will then take effect.

// BBNotes: Construct a Timer Object with a specifc time
function Timer( timeLength ) 
{
  // BBNotes: Initilize Timer "Clock"
  this.startTime = 0;        // When Timer starts

  // BBNotes: Set Variable for Length of Timer or When to "End"
  this.endTime = timeLength; // How long Timer should last

  // BBNotes: **Additional Variable Created For Time Changes
  this.tempTime = timeLength;

  //BBNotes: ----CLASS METHODS----//
  
  // BBNotes: **Custom Function to Change Time
  this.setTime = function( newTime )
  {
    // BBNotes: Store the Passed In Variable Into Temp Time To Change It
    // BBNotes: NOTE: Temp Time Will Always Equal endTime Until Changed
    this.tempTime = newTime;
  }

  // BBNotes: Function that Gets the Current Time Lapsed of the Sketch
  // BBNotes: ... When Timer is Called
  // Starting the timer
  this.start = function() 
  {
    // BBNotes: Utilizes Reserved P5 Function to Get Time in Milliseconds
    this.startTime = millis();
  }

  // BBNotes: Checks if the "Timer" has "Ended"
  // BBNotes: NOTE: This is NOT Continous, Outside Aspects Must be Responsbile
  // BBNotes: ... for Calling This Function and Checking, and Subsequently "Restarting" It
  // BBNotes: This Function Calculates the Time Elapsed Since The Timer 
  // BBNotes: ... Object "Started" (see this.start() for Reference)
  // BBNotes: ... If the Time Elapsed Is Greater than Timer "Length", It Returns True
  this.isFinished = function()
  { 
    // BBNotes: Subtract Current Time (Reserved P5 Function millis() )
    // BBNotes: ... From this.startTime (Time in millis When Function Started)
    // BBNotes: ... This Obtains the Time Elapsed
    var passedTime = millis() - this.startTime;

    // BBNotes: Checks If Time Elapsed is Greater Than The End Time (Timer Length)
    if( passedTime > this.endTime )
    {
      // BBNotes: **Custom Functionality to Store the "Temporary Time" Into End Time
      // BBNotes: ... This Is Used So That Timer Length Can Be Changed
      // BBNotes: NOTE: It Changes endTime Only When The Previous EndTime Has Elapsed
      // BBNotes: ... This Means Timer Length Changes Only After Previous Time Has Elapsed
      this.endTime = this.tempTime;

      // BBNotes: RETURN THAT THE TIMER HAS ENDED
      return true;
    }
    else 
    {
      // BBNotes: RETURN THAT THE TIMER HAS NOT ENDED / IS STILL GOING
      return false;
    }
  }
}