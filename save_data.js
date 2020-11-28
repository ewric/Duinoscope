/**
 * Save acquired data in .csv format.
 */

const { fstat } = require("fs");
const  path     = require('path');


function save_data()
{
    let data_csv = '';
    let all_months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
    let date_now = new Date();
    let day     = date_now.getDate();
    let month   = date_now.getMonth();
    let year    = date_now.getFullYear();
    let hour    = date_now.getHours();
    let minute  = date_now.getMinutes();
    let second  = date_now.getSeconds();
    
    const file_path = path.join(process.env.PORTABLE_EXECUTABLE_DIR, SAVE_DATA_FILE+
        '_'+String(day)+String(all_months[month])+String(year)+'_'+
        String(hour)+'_'+String(minute)+'_'+String(second)+'.csv');
        
    for (let i = 0 ; i<buffer_aquisition.length ; i++)
    {
        data_csv += i*acquisition_period+','+
        gain*(5/HALF_SCREEN)*(buffer_aquisition[i]-mid_screen)+'\n';
    }
    fs.writeFileSync(file_path, data_csv);
}