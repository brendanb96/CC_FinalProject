// Not All Heroes Wear Capes
// Brendan Boursiquot
// https://github.com/brendanb96/CC_FinalProject

// CC Final Project: Image Processing and Audio Interaction

//-------------------//
//----Sketch Math----//
//-------------------//
// + All Functions Dealing With Sketch Calculations

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