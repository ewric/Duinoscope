/**
 * Check if config.csv exists. If not, it creates it.
 * If it exists, it updates all config values.
 */
function config_file_check()
{
    if(!(fs.existsSync(path.join(process.env.PORTABLE_EXECUTABLE_DIR,CONFIG_FILE))))
    {
        fs.writeFileSync(path.join(process.env.PORTABLE_EXECUTABLE_DIR,CONFIG_FILE),INITIAL_CONFIG);
    }
    update_variables_by_config_file();
}

update_variables_by_config_file = () =>
{
    let config = '';
    config = String(fs.readFileSync(path.join(process.env.PORTABLE_EXECUTABLE_DIR,CONFIG_FILE)));

    //get mid_screen from config file and update
    let initial_index = config.indexOf("adjust_v_ref=");
    initial_index += 13;
    let last_index = initial_index;
    while(config[last_index] != '\n')
    {
        last_index++;
        if(last_index >= config.length) break;
    }
    adjust_v_ref = Number(config.slice(initial_index,last_index));
    

    //get adjust_gain_1V_div from config file and update
    initial_index = config.indexOf("adjust_gain=");
    initial_index += 12;
    last_index = initial_index;
    while(config[last_index] != '\n')
    {
        last_index++;
        if(last_index >= config.length) break;
    }
    adjust_gain_1V_div = Number(config.slice(initial_index,last_index));

}



/**
 * It uploads config.csv with actual mid_screen and gain_adjust
 */

function upload_config_file()
{
    let new_config_file = "mid_screen="+String(v_ref)+"\n"+
    "adjust_gain="+String(adjust_gain)+"\n";
    const file_path = path.join(process.env.PORTABLE_EXECUTABLE_DIR,CONFIG_FILE);
    fs.writeFileSync(CONFIG_FILE,new_config_file);
}