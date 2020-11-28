// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const path = require('path');

//permite que um processo renderizador do electron
//reutilize módulos carregados
app.allowRendererProcessReuse = false;

function createWindow ()
 {
    const mainWindow = new BrowserWindow(
  {
    width:           800,
    height:          600,
    autoHideMenuBar: true,
    center:          true,
    resizable:       false,
    backgroundColor: '#A0A0A0',
    webPreferences:
    {
      nodeIntegration: true
    }
 })

  // and load the index.html of the app.
   mainWindow.loadFile('index.html')

  // Open the DevTools.
   //mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => 
{
  createWindow()
  //Linka um evento de activate quando abrir uma nova janela
  //caso nenhuma janela esteja aberta no macOS
  app.on('activate',()=>
   {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

//Encerra a aplicação quando todas as janelas são fechadas
//Caso especial para MacOS
app.on('window-all-closed', ()=>
{
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
