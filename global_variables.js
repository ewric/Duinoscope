/////////////////////////////////////////////////////////////////////
///////////////////VARIABLES INITIALIZATION /////////////////////////
/////////////////////////////////////////////////////////////////////
//Do not change these values unless you know what you are doing
//They change the frequency shown on screen, what can dessync it with 
//the time/div shown.

const SINC_FILTER_SAMPLES = 100;

const RESAMPLE_MULTIPLIER = 5;

var reductor_index = 0;

const REDUCTOR = [1198, 602, 364 , 460 , 230, 138, 46]; 
//REDUCTOR is a vector that decreases window points to get smallers time/div.
/* define 500 and 300us/div was difficult using timer trigger of 50 and 30.
For this reason, we choose to use reductor. Despite using all samples, we use 
602 for 500us/div and 364 for 300us/div. It was adjusted by regra de 3.
Bellow that, we put ADC in free running mode, what give us a period of 13us.
Every div in without REDUCTOR uses 20 samples per div.
So, by regra de 3, we use REDUCTOR vector to decrease quantity of samples linearly.
So, we can get smaller time/div.
*/


var mid_screen=511;
const HALF_SCREEN = 409;//size from mid to top or bottom

var trigger_status = 0; //trigger varies 0~2, 0 - off, 1 - rising, 2 - falling
var trigger_lvl = mid_screen;


var v_ref = mid_screen; //mid value or y axes times 10. it is the dc value 
 //added to the input to set signal to mid adc range.
var adjust_v_ref = 0;


const VERTICAL_STEP = 8; //step for trigger and dc lvl line movement.
 


 //a gain that multiplies all acquired data. It works as a compensation
//for wrong resistor gains and ADC gain error
var adjust_gain = 1;

var acquisition_period = 0.00005; //start of acquisition period (reset point)
var gain = 1; //start of gain (reset point)


let buffer_aquisition = []; //store data acquisition when received from serial


let flag_pause = false; //store pause status if paused, do not acquire (it only stops after ending
//acquisition array)
let flag_button_pause = false;

let flag_button_save_data = false;


const CONFIG_FILE = 'config.csv'; //config file path
const INITIAL_CONFIG = "adjust_v_ref=0\n"+"adjust_gain=1\n"; //config default values


const SAVE_DATA_FILE = 'save_data';