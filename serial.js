

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

let port;
let parser;

//port = new SerialPort("COM8", { baudRate: 57600 }); //creates port, path of port and baudrate
//parser = port.pipe(new Readline());//define a new parser wich size is limited by newline

//console.log(port);
//console.log(parser);


function check_connected_serial_ports(callback)
{
    // Promise approach
    let list_ports = [];
    SerialPort.list().then(ports => {
        ports.forEach((port)=> {
            list_ports.push(port.path);
        });
        //console.log(list_ports);
        return callback(list_ports);
    });
}


function port_begin(port_string)
{   
    port = new SerialPort(port_string, { baudRate: 57600 }); //creates port, path of port and baudrate
    parser = port.pipe(new Readline());
    eval("parser.on('data', (line) => acquisition_treatment(line));");
}

