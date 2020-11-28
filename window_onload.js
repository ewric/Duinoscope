


///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////      PLOT        ///////////////////////////////////
const fs                    = require("fs");
const { protocol }          = require("electron");
const { list, parsers }     = require("serialport");
const { config }            = require("process");
const { TIMEOUT }           = require("dns");


///////////////////////////////////////////////////////////////////////////////////
window.onload = ()=>
{
    const canvas_1     = document.getElementById("main-plot-1");
    const canvas_1_ctx = canvas_1.getContext('2d');

    var plot_1 = new Chart(canvas_1_ctx,
    {
        type: 'line', 
        data: 
        {
            labels: [1,20,40,60,80,100,120,140,160,180,200],
            datasets: 
            [
                {
                    label: 'Sinal restaurado',
                    data: [],
                    fill: false,
                    borderColor: 'rgba(100,100,100,0.8)',
                    borderWidth: 1.5,
                    pointRadius: 0
                },
                {
                    label: 'Trigger',
                    data: [],
                    fill: false,
                    borderColor: 'rgba(10,10,200,0.8)',
                    borderWidth: 1.5,
                    pointRadius: 0
                },
                {
                    label: 'Dc lvl',
                    data: [],
                    fill: false,
                    borderColor: 'rgba(150,150,150,0.8)',
                    borderWidth: 1.,
                    borderDash: [10,10],
                    pointRadius: 0
                },
                {
                    label: 'vertical_tick1',
                    data: [],
                    fill: false,
                    borderColor: 'rgba(150,150,150,0.6)',
                    borderWidth: 1.,
                    pointRadius: 0
                },
                {
                    label: 'vertical_tick2',
                    data: [],
                    fill: false,
                    borderColor: 'rgba(150,150,150,0.6)',
                    borderWidth: 1.,
                    pointRadius: 0
                },
                {
                    label: 'vertical_tick3',
                    data: [],
                    fill: false,
                    borderColor: 'rgba(150,150,150,0.6)',
                    borderWidth: 1.,
                    pointRadius: 0
                },
                {
                    label: 'vertical_tick4',
                    data: [],
                    fill: false,
                    borderColor: 'rgba(150,150,150,0.6)',
                    borderWidth: 1.,
                    pointRadius: 0
                },
                {
                    label: 'vertical_tick5',
                    data: [],
                    fill: false,
                    borderColor: 'rgba(150,150,150,0.6)',
                    borderWidth: 1.,
                    pointRadius: 0
                },
                {
                    label: 'vertical_tick6',
                    data: [],
                    fill: false,
                    borderColor: 'rgba(150,150,150,0.6)',
                    borderWidth: 1.,
                    pointRadius: 0
                }, 
                {
                    label: 'vertical_tick7',
                    data: [],
                    fill: false,
                    borderColor: 'rgba(150,150,150,0.6)',
                    borderWidth: 1.,
                    pointRadius: 0
                }, 
                {
                    label: 'vertical_tick8',
                    data: [],
                    fill: false,
                    borderColor: 'rgba(150,150,150,0.6)',
                    borderWidth: 1.,
                    pointRadius: 0
                },
                {
                    label: 'vertical_tick9',
                    data: [],
                    fill: false,
                    borderColor: 'rgba(150,150,150,0.6)',
                    borderWidth: 1.,
                    pointRadius: 0
                }
            ]
        },  
        options:
        {
            animation: {
                duration: 0
            },
            legend:
            {
                display: false,
                onClick: (e) => e.stopPropagation()
            },
            scales:
            {
                yAxes:
                [
                    {
                        gridLines:
                        {
                            display: false
                        },
                        //type: 'linear',
                        display: false,
                        ticks:
                        {
                            display: true,
                            min: mid_screen-HALF_SCREEN,
                            max: mid_screen+HALF_SCREEN,
                            //maxTicksLimit: 10
                            beginAtZero: false,
                            //suggestedMin: mid_screen-HALF_SCREEN,
                            //stepSize: 2*HALF_SCREEN/9,
                            //suggestedMax: mid_screen+HALF_SCREEN
                        }
                    }
                ],
                xAxes:
                [
                    {
                        //type: 'linear',
                        //position: 'bottom',
                        display: true,
                        ticks:
                        {    
                            beginAtZero: true,
                            maxTicksLimit: 10
                        }
                    }
                ]
            }
        }
    });


    ////////////////////////////////////////////////////////////////////////////////
    //////////////////         BUTTON FUNCTIONS       //////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////
    const botao_pause = document.getElementById("botao_1");


    botao_pause.onclick = ()=>
    {
        flag_button_pause = !flag_button_pause;
        if(flag_button_pause == false)
        {
            flag_pause = false;
        }
    }

    //////// time/div buttons ///////////////////////////////////////////////////////
    const time_div_ = document.getElementById("time_div");
    const botao_10usdiv = document.getElementById("btn_10usdiv");
    const botao_30usdiv = document.getElementById("btn_30usdiv");
    const botao_50usdiv = document.getElementById("btn_50usdiv");
    const botao_100usdiv = document.getElementById("btn_100usdiv");
    const botao_300usdiv = document.getElementById("btn_300usdiv");
    const botao_500usdiv = document.getElementById("btn_500usdiv");
    const botao_1msdiv = document.getElementById("btn_1msdiv");
    const botao_3msdiv = document.getElementById("btn_3msdiv");
    const botao_5msdiv = document.getElementById("btn_5msdiv");
    const botao_10msdiv = document.getElementById("btn_10msdiv");
    const botao_30msdiv = document.getElementById("btn_30msdiv");
    const botao_50msdiv = document.getElementById("btn_50msdiv");
    const botao_100msdiv = document.getElementById("btn_100msdiv");
    const botao_300msdiv = document.getElementById("btn_300msdiv");
    const botao_500msdiv = document.getElementById("btn_500msdiv");

    botao_10usdiv.onclick = ()=>//adjust made by REDUCTOR of samples
    {
         port.write('F1100\n');
         acquisition_period = 0.000013;
         time_div_.innerText = "10 us/div";
         reductor_index = 6;
    }
    botao_30usdiv.onclick = ()=>//adjust made by REDUCTOR of samples
    {
         port.write('F1100\n');
         acquisition_period = 0.000013;
         time_div_.innerText = "30 us/div";
         reductor_index = 5;
    }
    botao_50usdiv.onclick = ()=>//adjust made by REDUCTOR of samples
    {
         port.write('F1100\n');
         acquisition_period = 0.000013;
         time_div_.innerText = "50 us/div";
         reductor_index = 4;
    }
    botao_100usdiv.onclick = ()=> //adjust made by REDUCTOR of samples
    {
         port.write('F1100\n');
         acquisition_period = 0.000013;
         time_div_.innerText = "100 us/div";
         reductor_index = 3;
    }
    botao_300usdiv.onclick = ()=>//adjust made by REDUCTOR of samples
    {
         port.write('11200\n');
         acquisition_period = 0.00005;
         time_div_.innerText = "300 us/div";
         reductor_index = 2;
    }
    botao_500usdiv.onclick = ()=> //adjust made by REDUCTOR of samples
    {
        port.write('11200\n');
        acquisition_period = 0.00005;
        time_div_.innerText = "500 us/div";
        reductor_index = 1;
    }
    botao_1msdiv.onclick = ()=>
    {
        port.write('11200\n');
        acquisition_period = 0.00005;
        time_div_.innerText = "1 ms/div";
        reductor_index = 0;
    }
    botao_3msdiv.onclick = ()=>
    {
        port.write('13200\n');
        acquisition_period = 0.00015;
        time_div_.innerText = "3 ms/div";
        reductor_index = 0;
    }
    botao_5msdiv.onclick = ()=>
    {
        port.write('15200\n');
        acquisition_period = 0.00025;
        time_div_.innerText = "5 ms/div";
        reductor_index = 0;
    }
    botao_10msdiv.onclick = ()=>
    {
        port.write('11300\n');
        acquisition_period = 0.0005;
        time_div_.innerText = "10 ms/div";
        reductor_index = 0;
    }
    botao_30msdiv.onclick = ()=>
    {
        port.write('13300\n'); 
        acquisition_period = 0.0015;
        time_div_.innerText = "30 ms/div";
        reductor_index = 0;
    }
    botao_50msdiv.onclick = ()=>
    { 
        port.write('15300\n');
        acquisition_period = 0.0025;
        time_div_.innerText = "50 ms/div"; 
        reductor_index = 0;
    }
    botao_100msdiv.onclick = ()=>
    { 
        port.write('11400\n'); 
        acquisition_period = 0.005;
        time_div_.innerText = "100 ms/div"; 
        reductor_index = 0;
    }
    botao_300msdiv.onclick = ()=>
    { 
        port.write('13400\n');
        acquisition_period = 0.015;
        time_div_.innerText = "300 ms/div"; 
        reductor_index = 0;
    }
    botao_500msdiv.onclick = ()=>
    { 
        port.write('15400\n'); 
        acquisition_period = 0.025;
        time_div_.innerText = "500 ms/div";
        reductor_index = 0;
    }
    /////////////////// trigger buttons///////////////////////////////////////////////
    const btn_trigger_increase = document.getElementById("trigger+");
    const btn_trigger_         = document.getElementById("trigger");
    const btn_trigger_decrease = document.getElementById("trigger-");
    btn_trigger_.onclick = ()=>
    {
        trigger_status++;
        if(trigger_status > 2)
        {
            trigger_status = 0;
        }
        if(trigger_status === 0) {btn_trigger_.innerText = "Trigger: OFF";}
        if(trigger_status === 1) {btn_trigger_.innerText = "Trg: Rising";}
        if(trigger_status === 2) {btn_trigger_.innerText = "Trg: Falling";}
    }
    btn_trigger_increase.onclick = ()=>
    {
        if(trigger_lvl < mid_screen+HALF_SCREEN-10) {trigger_lvl += VERTICAL_STEP;}
    }
    
    btn_trigger_decrease.onclick = ()=>
    {
        if(trigger_lvl > mid_screen-HALF_SCREEN+10) {trigger_lvl -= VERTICAL_STEP;}
    }

    /////////////////// DC LVL  buttons///////////////////////////////////////////////
    const btn_dc_lvl_increase = document.getElementById("dc_lvl+");
    const btn_dc_lvl_decrease = document.getElementById("dc_lvl-");
    const btn_dc_lvl_reset = document.getElementById("dc_lvl");

    btn_dc_lvl_increase.onclick = ()=> //increase dc lvl by a specified amount
    {
        port.write('3100\n');
        if(v_ref+VERTICAL_STEP < mid_screen+HALF_SCREEN-10) v_ref += VERTICAL_STEP;
        port.write('3'+('000' + Math.round(v_ref+adjust_v_ref)).substr(-4)+'0\n');//keep string size if v_ref has 2 digits
    }
    btn_dc_lvl_decrease.onclick = ()=> //decrease dc lvl by a specified amount
    {
        port.write('3200\n');
        if(v_ref-VERTICAL_STEP > mid_screen-HALF_SCREEN+10) v_ref -= VERTICAL_STEP;
        port.write('3'+('000' + Math.round(v_ref+adjust_v_ref)).substr(-4)+'0\n');//keep string size if v_ref has 2 digits
    }
    btn_dc_lvl_reset.onclick = ()=> //decrease dc lvl by a specified amount
    {
        port.write('3300\n');
        v_ref = mid_screen;
        port.write('3'+('000' + Math.round(v_ref+adjust_v_ref)).substr(-4)+'0\n'); //keep string size if v_ref has 2 digits
    }


    /////////////////// volt/div  buttons///////////////////////////////////////////////
    const btn_volt_div_ = document.getElementById("volt_div");
    const btn_1Vdiv_ = document.getElementById("btn_1Vdiv");
    const btn_500mVdiv_ = document.getElementById("btn_500mVdiv");
    const btn_200mVdiv_ = document.getElementById("btn_200mVdiv");
    const btn_100mVdiv_ = document.getElementById("btn_100mVdiv");
    const btn_50mVdiv_ = document.getElementById("btn_50mVdiv");
    const btn_20mVdiv_ = document.getElementById("btn_20mVdiv");

    btn_1Vdiv_.onclick = ()=>
    {
        port.write('21000\n');
        btn_volt_div_.innerText = "1 V/Div";
        gain = 1;
    }
    btn_500mVdiv_.onclick = ()=>
    {
        port.write('22000\n');
        btn_volt_div_.innerText = "500 mV/Div";
        gain = 0.5;
    }
    btn_200mVdiv_.onclick = ()=>
    {
        port.write('23000\n');
        btn_volt_div_.innerText = "200 mV/Div";
        gain = 0.2;
    }
    btn_100mVdiv_.onclick = ()=>
    {
        port.write('24000\n');
        btn_volt_div_.innerText = "100 mV/Div";
        gain = 0.1;
    }
    btn_50mVdiv_.onclick = ()=>
    {
        port.write('25000\n');
        btn_volt_div_.innerText = "50 mV/Div";
        gain = 0.05;
    }
    btn_20mVdiv_.onclick = ()=>
    {
        port.write('26000\n');
        btn_volt_div_.innerText = "20 mV/Div";
        gain = 0.02;
    }


    /////////////////// COM select  buttons///////////////////////////////////////////////
    const COM_ = document.getElementById("COM");
    const COM1_ = document.getElementById("COM1");
    const COM2_ = document.getElementById("COM2");
    const COM3_ = document.getElementById("COM3");
    const COM4_ = document.getElementById("COM4");
    const COM5_ = document.getElementById("COM5");
    const COM6_ = document.getElementById("COM6");
    const COM7_ = document.getElementById("COM7");
    const COM8_ = document.getElementById("COM8");

    COM_.onclick = ()=> //activate only COMs that are being used
    {
        //disable all buttons
        COM1_.disabled = true;COM2_.disabled = true;COM3_.disabled = true;COM4_.disabled = true;
        COM5_.disabled = true;COM6_.disabled = true;COM7_.disabled = true;COM8_.disabled = true;
        //enable only connected buttons
        check_connected_serial_ports(resultado =>
            {
            resultado.forEach(element =>
                {
                    eval(element + '_.disabled=false');
                });
        });
    }

    
    //Connect to defined COM
    COM1_.onclick = ()=>
    {com_port = "COM1"; COM_.innerText = "COM1";port_begin("COM1");reset_settings();COM_.disabled = true;}
    COM2_.onclick = ()=>
    {com_port = "COM2"; COM_.innerText = "COM2"; port_begin("COM2");reset_settings();COM_.disabled = true;}
    COM3_.onclick = ()=>
    {com_port = "COM3"; COM_.innerText = "COM3";port_begin("COM3");reset_settings();COM_.disabled = true;}
    COM4_.onclick = ()=>
    {com_port = "COM4"; COM_.innerText = "COM4";port_begin("COM4");reset_settings();COM_.disabled = true;}
    COM5_.onclick = ()=>
    {com_port = "COM5"; COM_.innerText = "COM5";port_begin("COM5");reset_settings();COM_.disabled = true;}
    COM6_.onclick = ()=>
    {com_port = "COM6"; COM_.innerText = "COM6";port_begin("COM6");reset_settings();COM_.disabled = true;}
    COM7_.onclick = ()=>
    {com_port = "COM7"; COM_.innerText = "COM7";port_begin("COM7");reset_settings();COM_.disabled = true;}
    COM8_.onclick = ()=>
    {com_port = "COM8"; COM_.innerText = "COM8"; port_begin("COM8");reset_settings();COM_.disabled = true;}



    ///////////////////       Save data button   ///////////////////////////////////
    const btn_save_data_ = document.getElementById("btn_save_data");

    btn_save_data_.onclick = ()=>
    {
        flag_button_save_data = true;
    }

















    //////////////////// Calibration buttons   ///////////////////////////////////////
    /*const btn_set_mid_screen_ = document.getElementById("btn_set_mid_screen");

    btn_set_mid_screen_.onclick = () => 
    {
        upload_config_file();
        reset_settings();
    }*/




    //////////////////////////////////////////////////////////////////////////////////
    ///////////////////       PLOT FUNCTIONS       ///////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////
    window.update_plot_1 = ()=>
    {
        plot_1.update();
    }

    window.add_plot_1_data = function(x,y)
    {
        plot_1.data.labels.push(x);
        plot_1.data.datasets[0].data.push(y);//{x,y}
    }

    window.add_plot_1_data_trigger = function(y)
    {
        plot_1.data.datasets[1].data.push(y);//{x,y}
    }

    window.add_plot_1_data_Dc_lvl = function(y)
    {
        plot_1.data.datasets[2].data.push(y);//{x,y}
    }

    window.add_plot_1_vertical_ticks = () =>
    {
        plot_1.data.datasets[3].data.push(mid_screen+Math.round(4*HALF_SCREEN/5));//vertical_tick_1
        plot_1.data.datasets[4].data.push(mid_screen+Math.round(3*HALF_SCREEN/5));//vertical_tick_2
        plot_1.data.datasets[5].data.push(mid_screen+Math.round(2*HALF_SCREEN/5));//vertical_tick_3
        plot_1.data.datasets[6].data.push(mid_screen+Math.round(1*HALF_SCREEN/5));//vertical_tick_4
        plot_1.data.datasets[7].data.push(mid_screen);//vertical_tick_5
        plot_1.data.datasets[8].data.push(mid_screen-Math.round(1*HALF_SCREEN/5));//vertical_tick_6
        plot_1.data.datasets[9].data.push(mid_screen-Math.round(2*HALF_SCREEN/5));//vertical_tick_7
        plot_1.data.datasets[10].data.push(mid_screen-Math.round(3*HALF_SCREEN/5));//vertical_tick_8
        plot_1.data.datasets[11].data.push(mid_screen-Math.round(4*HALF_SCREEN/5));//vertical_tick_9
    }

    window.clear_plot_1_data = function()
    {
        plot_1.data.labels = [];
        plot_1.data.datasets[0].data = [];//samples interpolation
        plot_1.data.datasets[1].data = [];//trigger
        plot_1.data.datasets[2].data = [];//dc lvl
        plot_1.data.datasets[3].data = [];//vertical_tick_1
        plot_1.data.datasets[4].data = [];//vertical_tick_2
        plot_1.data.datasets[5].data = [];//vertical_tick_3
        plot_1.data.datasets[6].data = [];//vertical_tick_4
        plot_1.data.datasets[7].data = [];//vertical_tick_5
        plot_1.data.datasets[8].data = [];//vertical_tick_6
        plot_1.data.datasets[9].data = [];//vertical_tick_7
        plot_1.data.datasets[10].data = [];//vertical_tick_8
        plot_1.data.datasets[11].data = [];//vertical_tick_9
    }


    /** Reset time/div, V/div, and configs to default.     */
    function reset_settings()
    {
        setTimeout(() =>
        {
            port.write('\n');
            //reset time/div
            setTimeout(() => {
                port.write('11200\n');
            }, 100);
            //port.write('11200\n');
            acquisition_period = 0.00005;
            time_div_.innerText = "1 ms/div";
            reductor_index = 0;

            //reset volt/div
            btn_volt_div_.innerText = "1 V/div";
            setTimeout(() => {
                port.write('21000\n');
            }, 200);
            //port.write('21000\n');
            gain = 1;
            v_ref = mid_screen;
            trigger_lvl = mid_screen;
            
            //sends V_ref to uC
            setTimeout(() => {
                port.write('3'+('000' + Math.round(v_ref+adjust_v_ref)).substr(-4)+'0\n');
            }, 300);
            //port.write('3'+('000' + Math.round(v_ref+adjust_v_ref)).substr(-4)+'0\n');
            //reset trigger
            trigger_status = 0;
            btn_trigger_.innerText = "Trigger: OFF";
            config_file_check();
        }, 2000);
            
    }
}



function pause()
{
    flag_pause = 1;
}


