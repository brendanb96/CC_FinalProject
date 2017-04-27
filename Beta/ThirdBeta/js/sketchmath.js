// Not All Heroes Wear Capes
// Brendan Boursiquot
// https://github.com/brendanb96/CC_FinalProject

// Beta 1.2: Added Detailed Commets

//-------------------//
//----Sketch Math----//
//-------------------//
// + All Functions Dealing With Sketch Calculations

//----GLOBAL VARIABLES----//

// --- Total Amplitude
// --- (The Accumlative Recored Amplitude Over a Period of Time)
var totalAmp = 0;
// --- Amplitude Counter
// --- (How Many Amplitude Numbers Were Recorded / Used With totalAmp to Find Average)
var ampCounter = 0;



//----CALCULATE CORRECT MENU X-POSITIONS----//
//----(ASSUMES ARRAY CAN BE ANY SIZE...Not Just 3)----//
function calcMenuPositions( xPos, yPos, rapperList )
{
  // + Get Array Size of RapperList
  var arraySize = rapperList.length;

  // + Get Menu Image Size
  var imgSize = menuImgSize;
  
  // + Centering Calculations For *ANY* Size Array
  // --- Get Image "Space" Width (Breathing Room);
  var imgSpaceWidth = imgSize*1.1;

  // --- Calculate Total Width of All Images in Array
  var totalArrayWidth = arraySize * imgSpaceWidth;

  // --- Calculate a Constant Between First Image and Center X-Position of Total Array
  // --- (Assumes a 1*1 Image Size)
  var firstImageOffset = (arraySize - 1) * 0.5;

  // --- Calculate The True Distance Between First Image and Center X-Position of Total Array
  // NOTE: Previous Measurement (firstImageOffset) Assumes a 1*1 Image Size
  var totalArrayOffset = firstImageOffset * imgSpaceWidth;

  // + Re-Centering / Re-Factoring Image Positions
  // --- Creates New X-Position For The First Image To Start At
  // --- (Takes PassedIn X-Position And Subtracts It By The Calculated OffSet)
  // --- (...Stores it in a New X-Position)
  var newXPos = xPos - totalArrayOffset;
  
  // --- Creates New X-Position For The First Image To Start At
  for( var i = 0; i < arraySize; i++ )
  {
    // --- Change Rapper Menu Image X-Position to Newly Calculated X-Position
    rapperList[ i ].changeMenuX( newXPos );

    // --- Increment Newly Calculated X-Position By Image+Margin Width
    newXPos += imgSpaceWidth;
  }
}

//----CALCULATE AVERAGE AMPLITUDE OF AUDIO INPUT----//
//----(USED TO GET AMPLITUDE OVER A TIME INTERVAL)----//
function getAvgAmp()
{
  // + Get Current Instance of Audio Input Amplitude
  var amp = recAudio.getLevel();

  // + Iterate Amplitude Counter
  ampCounter++;

  // + Add Current Amplitude to Total Amplitude Variable
  totalAmp += amp;

  // + Calculate Average Amplitude
  var avgAmp = totalAmp / ampCounter;
  
  // + Increase Average Amp Level for Better Drawing Functionality
  avgAmp *= 2;

  // + Overflow Checking Mechanisms for Time Interval
  // --- Amplitude Counter Check
  if( ampCounter > 50 )
  {
    // --- Zero Out Amplitude Counter
    ampCounter = 0;

    // --- Zero Out Total Amplitude
    totalAmp = 0;
  }

  // --- Average Amplitude Check
  if( avgAmp > 1.0 )
  {
    // --- Never Go Above Absolute Level
    avgAmp = 0.99;
  }

  // + Return Calculated Average
  return avgAmp;
}
