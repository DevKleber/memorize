const electron = require('electron');
const pjson = require('./package.json');

const {
    app,
    shell,
    ipcMain
} = electron;
const BrowserWindow = electron.BrowserWindow


let menuTemplate = function () {
    return [{
            label: 'Aplicação',
            submenu: [{
                label: 'Sair',
                accelerator: 'Command+Q',
                click: function () {
                    app.quit() // This is standart function to quit app.
                }
            }]
        },
        {
            label: 'Exibir',
            submenu: [{
                    label: 'Sobre o Campanha',
                    click: function () {
                        // ipcMain.emit('show-about-window-event') // In such way we can trigger function in the main process
                        openAbout()
                    }
                },
                {
                    label: 'Atualizar',
                    accelerator: 'CmdOrCtrl+R',
                    click: function (item, focusedWindow) {
                        focusedWindow.reload(); // reload the page
                    }
                }
            ]
        },
        {
            label: 'Editar',
            submenu: [{
                    label: 'Desfazer',
                    accelerator: 'CmdOrCtrl+Z',
                    selector: 'undo:'
                },
                {
                    label: 'Refazer',
                    accelerator: 'Shift+CmdOrCtrl+Z',
                    selector: 'redo:'
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Recortar',
                    accelerator: 'CmdOrCtrl+X',
                    selector: 'cut:'
                },
                {
                    label: 'Copiar',
                    accelerator: 'CmdOrCtrl+C',
                    selector: 'copy:'
                },
                {
                    label: 'Colar',
                    accelerator: 'CmdOrCtrl+V',
                    selector: 'paste:'
                },
                {
                    label: 'Selecionar tudo',
                    accelerator: 'CmdOrCtrl+A',
                    selector: 'selectAll:'
                }
            ]
        },
        {
            label: 'Ajuda',
            submenu: [{
                    label: 'Atualizar',
                    accelerator: 'CmdOrCtrl+Z',
                    selector: 'undo:'
                },
                {
                    label: 'Ver licença',
                    click: function () {
                        shell.openExternal('https://github.com/DmytroVasin/TimeTracker/blob/master/LICENSE');
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Versão ' + pjson.version,
                    enabled: 'FALSE'
                }
            ]
        }
    ]
}

var newWindow = null

function openAbout() {
    if (newWindow) {
        newWindow.focus()
        return
    }

    newWindow = new BrowserWindow({ height: 300, width: 400, resizable: false, title: 'Sobre o Campanha', minimizable: false, fullscreenable: false })

    const loadView = ({ title, content }) => {
        return (`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${title}</title>
              <meta charset="UTF-8">
            </head>
            <body>
              <div id="view">${content}</div>
            </body>
          </html>
        `)
    }

    var file = 'data:text/html;charset=UTF-8,' + encodeURIComponent(loadView({
        title: "Sobre o Campanha",
        content: pjson.description
    }));
    newWindow.loadURL(file);
    newWindow.setMenuBarVisibility(false)

    newWindow.on('closed', function () {
        newWindow = null
    })
}

module.exports = menuTemplate