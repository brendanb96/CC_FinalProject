// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 18-7: Loading a URL asynchronously

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

function Timer(tempTotalTime) {
  this.savedTime = 0;        // When Timer starts
  this.totalTime = tempTotalTime; // How long Timer should last
  this.tempTime = tempTotalTime;
  
  // custom function
  this.setTime = function( newTime )
  {
    this.tempTime = newTime;
  }

  // Starting the timer
  this.start = function() 
  {
    // When the timer starts it stores the current time in milliseconds.
    this.savedTime = millis();
  }

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