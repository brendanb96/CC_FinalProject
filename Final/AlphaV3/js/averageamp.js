// Not All Heroes Wear Capes
// Brendan Boursiquot
// https://github.com/brendanb96/CC_FinalProject

// CC Final Project: Image Processing and Audio Interaction

//-------------------//
//----AvgAmp Class----//
//-------------------//
// + AVGAMP OBJECT
// --- MANAGES AVERAGE AMPLITUDE AND RELATED FUNCTIONS
// --- CREATES ARCHIVED AVERAGES IN CASE USED WITH TIME FUNCTIONS
// --- AND CERTAIN FUNCTIONS NEED TO CONTACT IT BEFORE TIMER ENDS

//----CONSTRUCTOR----//
function AvgAmp()
{
	//----CLASS VARIABLES----//
  	// + Archive Variable For "Stored"/Previous Average
	this.archive = 0;
	// + The Current Average Amplitude In Process
	this.avgAmp = 0;
	// + The Total Amplitude From All Updates
	this.totalAmp = 0;
	// + The Counter Measuring The Amount of Times AvgAmp Object Updated
	this.ampCounter = 0;

	//----CLASS METHODS----//
	// + Reset Average Amplitude Data
	// --- If This Object Is Used Often, This Helps To Reduce Calculation Data
	// --- NOTE: Archive Amp Can And Should Not Be Reset To Avoid Total Data Deletion
	this.reset = function()
	{
		this.avgAmp = 0;
		this.totalAmp = 0;
		this.ampCounter = 0;
	}

	// + SETTERS AND GETTERS (AND/OR SIMILAR FUNCTIONS)
	// + Get Calculated Average
	// --- Return avgAmp and Archive It
	this.getAvg = function()
	{
		this.archive = this.avgAmp;
		return this.avgAmp;
	}

	// + Get "Stored"/Previous Average
	// --- Return archive
	this.getSavedAvg = function()
	{
		return this.archive;
	}

	// + Update Average Amplitude
	// --- Adds to TotalAmp, Iterates Counter, Updates Calculated Average
	this.update = function( ampLevel )
	{
		this.totalAmp += ampLevel;
		this.ampCounter++;

		this.avgAmp = this.calcAvg();
	}

	// + Calculate Average Amp
	// --- Divide Total Amp by Number of Average Amp Updates
	this.calcAvg = function()
	{
		return this.totalAmp / this.ampCounter;
	}
}