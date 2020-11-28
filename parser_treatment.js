
acquisition_treatment = (line)=>
{
    //console.log(line);
    if(flag_pause === false)
    {
        if(line === 'inicio') //starts aquisition transfer
        {
            buffer_aquisition = [];
            return;
        }
        if(line === 'fim') //ends aquisition transfer
        {
            //let temp_buffer = buffer_aquisition.slice(250);             
            let temp_buffer = sinc_filtering_function(buffer_aquisition,SINC_FILTER_SAMPLES,RESAMPLE_MULTIPLIER);
            //temp_buffer has 2398 size.
            temp_buffer = trigger_adjust(temp_buffer);
            //apply for smallers time/div (less than 500us/div)

            temp_buffer = temp_buffer.slice(Math.round(REDUCTOR[0]/2-REDUCTOR[reductor_index]/2),
            Math.round(REDUCTOR[0]/2+REDUCTOR[reductor_index]/2));
            for (let i = 0; i<temp_buffer.length; i++)
            {
                //limit temp_buffer to avoid chart slides.
                if (temp_buffer[i] < mid_screen-HALF_SCREEN) { temp_buffer[i]= mid_screen-HALF_SCREEN}
                if (temp_buffer[i] > mid_screen+HALF_SCREEN) { temp_buffer[i]= mid_screen+HALF_SCREEN}
                add_plot_1_data(i,temp_buffer[i]); //add samples to graph data
                add_plot_1_data_trigger(trigger_lvl);//add trigger line in graph
                add_plot_1_data_Dc_lvl(v_ref);//add dc lvl line in graph
                add_plot_1_vertical_ticks(); //add vertical ticks in graph
                if (i === temp_buffer.length-1)
                {
                    update_plot_1();
                    clear_plot_1_data();
                }
            }
            if(flag_button_pause === true) pause();
            if(flag_button_save_data === true) {save_data(); flag_button_save_data = 0;}
            return;
        }
        buffer_aquisition.push((Math.round(Number(line)-mid_screen)*adjust_gain+mid_screen));
    }
}


function trigger_adjust(data)
{
    if (trigger_status == 1) //rising trigger
    {
        
        for(let i = REDUCTOR[0]/2+1 ; i < 3*REDUCTOR[0]/2 ; i++)
        {
            if(data[i-5]<trigger_lvl & data[i+5]>trigger_lvl)
            {  
                data = data.slice(Math.round(i-REDUCTOR[0]/2), Math.round(i+REDUCTOR[0]/2));
                return data;
            }
        }
    }
    if (trigger_status == 2) // falling trigger
    {
        for(let i = REDUCTOR[0]/2 ; i < 3*REDUCTOR[0]/2 ; i++)
        {
            if(data[i-5]>trigger_lvl & data[i+5]<trigger_lvl)
            {  
                data = data.slice(Math.round(i-REDUCTOR[0]/2), Math.round(i+REDUCTOR[0]/2));
                return data;
            }
        }
    }
    return data;
}