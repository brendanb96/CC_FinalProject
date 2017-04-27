// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 18-7: Loading a URL asynchronously
// Added Functionality by Brendan Boursiquot
// BBNotes - Specific Functionality Marks made by Brendan Boursiquot

// Timer Class from Chapter 10

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
function Timer(tempTotalTime) 
{
  // BBNotes: Initilize Timer "Clock"
  this.savedTime = 0;        // When Timer starts
  // BBNotes: Set Variable for Length of Timer or When to "End"
  this.totalTime = tempTotalTime; // How long Timer should last
  // BBNotes: Additional Variable I Created For Time Changes
  this.tempTime = tempTotalTime;
  
  // // BBNotes: Custom Function to Change Time
  this.setTime = function( newTime )
  {
    this.tempTime = newTime;
  }

  // BBNotes: Function that Gets the Current Time Lapsed of the Sketch
  // ... when timer is called
  // Starting the timer
  this.start = function() 
  {
    // BBNotes: Utilizes Reserved Function to Get Time in Milliseconds
    // When the timer starts it stores the current time in milliseconds.
    this.savedTime = millis();
  }

  // BBNotes: Checks if the "Timer" has "Ended"
  // BBNotes: NOTE: This is NOT Continous, Outside Aspects Must be Responsbile
  // ... for Calling This Function and Checking, and Subsequently "Restarting" It
  // The function isFinished() returns true if 5,000 ms have passed. 
  // The work of the timer is farmed out to this method.
  this.isFinished = function()
  { 
    // Check how much time has passed
    var passedTime = millis() - this.savedTime;
    if (passedTime > this.totalTime)
    {
      this.totalTime = this.tempTime;
      return true;
    }
    else 
    {
      return false;
    }
  }
}