          /* =========================================================
            openWindow Funktion
          ============================================================ */

          function openWindow(url, width, height) {
            window.open(url, 'popup', 'width=600,height=400');
        }

            /* =========================================================
            Switch Windows
          ============================================================ */

// Script.js: Anpassung der Button-Erstellung und Event-Listener

document.addEventListener("DOMContentLoaded", function () {
    const buttonContainer = document.getElementById('button-container');

    // Alle Sektionen mit einer ID sammeln
    const sections = document.querySelectorAll('.content section[id]');

    // Mapping von Abschnitts-IDs zu Icons
    const iconMapping = {
        "Home": {
            "name": "Home (Alpha)",
            "icon": "home",
            "type": "page"
        },
        "Desktop": {
            "name": "Desktop (Beta)",
            "icon": "monitor",
            "type": "desktop"
        },
        "Test": {
            "name": "Test",
            "icon": "home",
            "type": "page"
        }
    }

    // Buttons dynamisch erstellen mit der Klasse 'switch-button'
    sections.forEach(section => {
        const id = section.id;
        let title = id;
        let iconData = iconMapping[id] || { icon: 'file', type: 'page' };
        let iconName = iconData.icon;
        let isActive = section.classList.contains('active') ? 'active' : '';

        // if-else Abfrage, um den Button entsprechend dem Typ zu erstellen
        if (iconData.type === 'desktop') {
            buttonContainer.innerHTML += `
            <li>
                <button id="taskCounter" class="${isActive} switch-button" data-section="${id}">
                    <i data-feather="${iconName}"></i>
                    <p>${title} <span id="desktopCounter">0</span></p>
                </button>
                <ul class="dropdown" id="windowList">
                    <!-- Dynamisch gefüllte Liste der Fenster -->
                    <li><button id="closeAllButton">Alles schließen</button></li>
                </ul>
            </li>
            `;
        } else {
            buttonContainer.innerHTML += `
            <li>
                <button class="${isActive} switch-button" data-section="${id}">
                    <i data-feather="${iconName}"></i>
                    <p>${title}</p>
                </button>
            </li>
            `;
        }
    });

    // Event-Handling für die Switch-Buttons
    const buttons = buttonContainer.querySelectorAll('button.switch-button');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            // Aktiven Button setzen
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Alle Sektionen verstecken und nur die ausgewählte zeigen
            document.querySelectorAll('.content section').forEach(sec => sec.classList.remove('active'));
            const sectionId = button.getAttribute('data-section');
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Feather Icons initialisieren
    feather.replace();

    // Initialisierung des Task Counters
    updateTaskCounter();
});

        /* =========================================================
            Overview Funtkionen
          ============================================================ */

        // Funktion zum Umschalten der Panel-Inhalte
        function togglePanel(element) {
            const panel = element.closest(".panel");
            const allPanels = document.querySelectorAll('.panel');
        
            allPanels.forEach(p => {
            if (p !== panel) {
                p.classList.remove('open');
            }
            });
        
            panel.classList.toggle("open");
        }
        
        // Funktion zum Erzeugen der Übersicht aus den Datenobjekten
        function generateOverview(data) {
            const overviewDiv = document.querySelector(".overview");
            let html = `
            <h2>Overview</h2>
            
            `;
        
            data.forEach(({ group, panels }) => {
            let detailsHtml = `
            <details>
                <summary>${group}</summary>`;
        
            panels.forEach(({ buttonText, content, onClick, link, icon }) => {
                // Bestimmen, ob ein Button oder ein Link angezeigt werden soll
                let actionElement = "";
                if (onClick) {
                actionElement = `<button onclick="${onClick}('${buttonText}', '${link}')">${buttonText}</button> <span class="icon"><a href="${link}" target="_blank"><i data-feather="link-2"></i></a></span>`;
                } else if (link) {
                actionElement = `<a href="${link}" target="_blank">${buttonText}  <i data-feather="link-2"></i></a>`;
                } else {
                actionElement = `<span>${buttonText}</span>`;
                }
        
                detailsHtml += `
                <div class="panel">
                <div class="panel-header">
                    <i data-feather="${icon}"></i>${actionElement}
                    <span class="icon"><button onclick="openWindow('${link}')"><i data-feather="external-link"></i></button></span>
                    <span class="icon end" onclick="togglePanel(this)">
                    <span class="triangle">></span>
                    </span>
                </div>
                <div class="panel-content">
                    <div>${content}</div>
                </div>
                </div>`;
            });
        
            detailsHtml += `
            </details>`;
        
            html += detailsHtml;

            });
        
            overviewDiv.innerHTML = html;
        
            feather.replace();
        }
        
        // Funktion zum Schließen aller Panels außer dem aktuellen
        function closeOtherPanels(currentPanel) {
            const allPanels = document.querySelectorAll('.panel');
            allPanels.forEach(panel => {
            if (panel !== currentPanel) {
                panel.classList.remove('open');
            }
            });
        }
        
        // Initialisieren der Übersicht und Hinzufügen der Event-Listener
        document.addEventListener('DOMContentLoaded', () => {
            // Laden der Daten aus der config.json
            fetch('config.json')
            .then(response => response.json())
            .then(config => {
                const data = config.data;
                generateOverview(data);
        
                // Optional: Wenn du möchtest, dass beim Öffnen eines Details innerhalb einer Gruppe alle anderen Gruppen geschlossen werden
                const allDetails = document.querySelectorAll('.overview details');
                allDetails.forEach(details => {
                details.addEventListener('toggle', function() {
                    if (this.open) {
                    allDetails.forEach(d => {
                        if (d !== this) {
                        d.removeAttribute('open');
                        }
                    });
                    }
                });
                });
            })
            .catch(error => {
                console.error('Fehler beim Laden der config.json:', error);
            });
        });   
    
            /* =========================================================
                Einbindung von Icons
            ============================================================ */
            feather.replace(); // Initialisiere die Icons
    
        // Beispielhafte Definition der Funktion togglePanel
        function togglePanel(element) {
        const panelContent = element.parentElement.nextElementSibling;
        panelContent.style.display =
            panelContent.style.display === "none" ? "block" : "none";
        const triangle = element.querySelector(".triangle");
        triangle.textContent = triangle.textContent === ">" ? "v" : ">";
        }
    
    
        // Funktion zum Schließen aller Panels außer dem aktuellen
        function closeOtherPanels(currentPanel) {
            const allPanels = document.querySelectorAll('.panel');
            allPanels.forEach(panel => {
            if (panel !== currentPanel) {
                panel.classList.remove('open');
            }
            });
        }
    
        // Initialisieren der Übersicht und Hinzufügen der Event-Listener
        document.addEventListener('DOMContentLoaded', () => {
    
            // Optional: Wenn Sie möchten, dass beim Öffnen eines Details innerhalb einer Gruppe alle anderen Gruppen geschlossen werden
            const allDetails = document.querySelectorAll('.overview details');
            allDetails.forEach(details => {
            details.addEventListener('toggle', function() {
                if (this.open) {
                allDetails.forEach(d => {
                    if (d !== this) {
                    d.removeAttribute('open');
                    }
                });
                }
            });
            });
        });

/* =========================================================
   Funktion zum Aktualisieren des Task Counters
============================================================ */
const updateTaskCounter = () => {
    const taskCounter = document.getElementById('taskCounter');
    const desktopCounter = document.getElementById('desktopCounter');
    const windows = document.querySelectorAll('.window');
    const windowList = document.getElementById('windowList');

    if (!windowList) {
        console.error('windowList Element nicht gefunden');
        return; // Brich die Funktion ab, wenn windowList nicht vorhanden ist
    }

    // Zählertext aktualisieren
    if (desktopCounter) {
        desktopCounter.innerText = `${windows.length}`;
    }

    // Bestehende Liste leeren und "Alles schließen" Button hinzufügen
    windowList.innerHTML = '<li><button id="closeAllButton">Alles schließen</button></li>';

    // Event-Listener für "Alles schließen" erneut hinzufügen
    document.getElementById('closeAllButton').addEventListener('click', closeAllWindows);

    // Dropdown-Menü mit offenen Fenstern füllen
    windows.forEach(win => {
        const windowTitle = win.querySelector('.window-header span').innerText;
        const listItem = document.createElement('li');

        // Container für Fenster-Button und Schließen-Button
        const container = document.createElement('div');
        container.classList.add('window-list-item');

        // Fenster-Button erstellen
        const button = document.createElement('button');
        button.innerText = windowTitle;
        button.onclick = () => {
            win.style.display = 'flex';
            bringToFront(win);
            removeTask(win.id);
            saveState();
            updateTaskCounter();
        };

        // Schließen-Button erstellen
        const closeButton = document.createElement('button');
        closeButton.classList.add('window-list-close-button');
        closeButton.textContent = '✖';
        closeButton.onclick = (event) => {
            event.stopPropagation();
            closeWindow(win.id);
        };

        // Buttons zum Container hinzufügen
        container.appendChild(button);
        container.appendChild(closeButton);

        // Container zum Listenelement hinzufügen
        listItem.appendChild(container);

        // Listenelement zur Fensterliste hinzufügen
        windowList.appendChild(listItem);
    });
};

  
          /* =========================================================
             Variablen und Initialisierungen
          ============================================================ */
          const headerHeight = 60; // Höhe des Headers
          let highestZ = 2;
          let windowCount = 1;
  
          const leftSnapOverlay = document.getElementById('left-snap-overlay');
          const rightSnapOverlay = document.getElementById('right-snap-overlay');
          const topSnapOverlay = document.getElementById('top-snap-overlay');
  
          const mainElement = document.querySelector('main');
  
          /* =========================================================
             Z-Index Management
          ============================================================ */
          const bringToFront = (target) => {
              highestZ++;
              target.style.zIndex = highestZ;
          };
  
          /* =========================================================
             Drag- und Resize-Funktionalität
          ============================================================ */
          const makeDraggableResizable = (win) => {
              interact(win)
                  .draggable({
                      allowFrom: '.window-header',
                      inertia: true,
                      modifiers: [
                          interact.modifiers.restrictRect({
                              restriction: mainElement,
                              endOnly: true
                          })
                      ],
                      listeners: {
                          start: (event) => {
                              bringToFront(event.target);
                              const win = event.target;
                              // Wenn Fenster maximiert oder gesnappt ist, zur vorherigen Größe zurückkehren
                              if (win.classList.contains('maximized') || win.classList.contains('snapped')) {
                                  restoreWindowSize(win);
                              }
                          },
                          move: (event) => {
                              const target = event.target;
                              const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                              const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
  
                              target.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  
                              target.setAttribute('data-x', x);
                              target.setAttribute('data-y', y);
  
                              // Fenster-Snapping-Vorschau
                              showSnapOverlay(x, y, target.offsetWidth, target.offsetHeight);
                          },
                          end: (event) => {
                              handleWindowSnap(event);
                              // Overlays ausblenden
                              leftSnapOverlay.style.display = 'none';
                              rightSnapOverlay.style.display = 'none';
                              topSnapOverlay.style.display = 'none';
                          }
                      }
                  })
                  .resizable({
                      edges: { left: false, right: true, bottom: true, top: false },
                      modifiers: [
                          interact.modifiers.restrictSize({
                              min: { width: 300, height: 200 },
                              max: {
                                  width: mainElement.offsetWidth,
                                  height: mainElement.offsetHeight
                              }
                          }),
                          interact.modifiers.restrictEdges({
                              outer: mainElement
                          })
                      ],
                      inertia: true,
                      listeners: {
                          move: (event) => {
                              const target = event.target;
                              let width = event.rect.width;
                              let height = event.rect.height;
  
                              target.style.width = width + 'px';
                              target.style.height = height + 'px';
  
                              const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.deltaRect.left;
                              const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.deltaRect.top;
  
                              target.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  
                              target.setAttribute('data-x', x);
                              target.setAttribute('data-y', y);
                          }
                      }
                  });
  
              // Event Listener für Fokus
              win.addEventListener('mousedown', () => {
                  bringToFront(win);
              });
          };
  
          // Funktion zur Wiederherstellung der Fenstergröße
          const restoreWindowSize = (win) => {
              win.classList.remove('maximized', 'snapped');
              win.style.width = win.getAttribute('data-prev-width') || '1200px';
              win.style.height = win.getAttribute('data-prev-height') || '800px';
              win.style.transform = `translate3d(${win.getAttribute('data-prev-x') || 0}px, ${win.getAttribute('data-prev-y') || 0}px, 0)`;
              win.setAttribute('data-x', win.getAttribute('data-prev-x') || 0);
              win.setAttribute('data-y', win.getAttribute('data-prev-y') || 0);
              win.style.top = '';
              win.style.left = '';
          };
  
          /* =========================================================
             Anpassung der Snap-Funktion
          ============================================================ */
          const handleWindowSnap = (event) => {
              const target = event.target;
              const x = parseFloat(target.getAttribute('data-x')) || 0;
              const y = parseFloat(target.getAttribute('data-y')) || 0;
              const windowWidth = target.offsetWidth;
              const windowHeight = target.offsetHeight;
              const screenWidth = mainElement.offsetWidth;
              const screenHeight = mainElement.offsetHeight;
              const edgeThreshold = 0; // Fenster muss den Rand berühren
  
              // Links Snap
              if (x <= edgeThreshold) {
                  // Speichere vorherige Position und Größe
                  saveWindowStateBeforeSnap(target);
                  // Snap to left half
                  target.style.width = (screenWidth / 2) + 'px';
                  target.style.height = (screenHeight) + 'px';
                  target.style.transform = `translate3d(0px, 0px, 0)`;
                  target.setAttribute('data-x', 0);
                  target.setAttribute('data-y', 0);
                  target.classList.add('snapped');
              }
              // Rechts Snap
              else if (x + windowWidth >= screenWidth - edgeThreshold) {
                  // Speichere vorherige Position und Größe
                  saveWindowStateBeforeSnap(target);
                  // Snap to right half
                  target.style.width = (screenWidth / 2) + 'px';
                  target.style.height = (screenHeight) + 'px';
                  target.style.transform = `translate3d(${screenWidth / 2}px, 0px, 0)`;
                  target.setAttribute('data-x', screenWidth / 2);
                  target.setAttribute('data-y', 0);
                  target.classList.add('snapped');
              }
              // Oben Snap (Maximieren)
              else if (y <= edgeThreshold) {
                  maximizeWindow(target.id);
              }
          };
  
          // Funktion zum Speichern des Fensterzustands vor dem Snap
          const saveWindowStateBeforeSnap = (win) => {
              if (!win.classList.contains('snapped') && !win.classList.contains('maximized')) {
                  win.setAttribute('data-prev-x', win.getAttribute('data-x') || 0);
                  win.setAttribute('data-prev-y', win.getAttribute('data-y') || 0);
                  win.setAttribute('data-prev-width', win.style.width);
                  win.setAttribute('data-prev-height', win.style.height);
              }
          };
  
          // Anpassung der Maximierungsfunktion
          const maximizeWindow = (id) => {
              const win = document.getElementById(id);
              if (win) {
                  if (!win.classList.contains('maximized')) {
                      win.setAttribute('data-prev-x', win.getAttribute('data-x') || 0);
                      win.setAttribute('data-prev-y', win.getAttribute('data-y') || 0);
                      win.setAttribute('data-prev-width', win.style.width);
                      win.setAttribute('data-prev-height', win.style.height);
                      win.classList.add('maximized');
                      win.style.transform = '';
                      win.style.top = '0';
                      win.style.left = '0';
                      win.style.width = '100%';
                      win.style.height = '100%';
                  } else {
                      restoreWindowSize(win);
                  }
                  bringToFront(win);
                  saveState();
              }
          };
  
          /* =========================================================
             Funktion für Snap Overlay
          ============================================================ */
          const showSnapOverlay = (x, y, windowWidth, windowHeight) => {
              const screenWidth = mainElement.offsetWidth;
              const screenHeight = mainElement.offsetHeight;
              const edgeThreshold = 0; // Fenster muss den Rand berühren
  
              let showLeft = false;
              let showRight = false;
              let showTop = false;
  
              // Überprüfen, ob nahe am linken Rand
              if (x <= edgeThreshold) {
                  showLeft = true;
              }
              // Überprüfen, ob nahe am rechten Rand
              else if (x + windowWidth >= screenWidth - edgeThreshold) {
                  showRight = true;
              }
              // Überprüfen, ob nahe am oberen Rand
              if (y <= edgeThreshold) {
                  showTop = true;
              }
  
              // Overlays entsprechend anzeigen oder ausblenden
              leftSnapOverlay.style.display = showLeft ? 'block' : 'none';
              rightSnapOverlay.style.display = showRight ? 'block' : 'none';
              topSnapOverlay.style.display = showTop ? 'block' : 'none';
          };
  
          // Initiale Fenster draggable und resizable machen
          document.querySelectorAll('.window').forEach(win => {
              makeDraggableResizable(win);
          });
  
          /* =========================================================
             Fenster Steuerungsfunktionen
          ============================================================ */
          const closeWindow = (id) => {
              const win = document.getElementById(id);
              if (win) {
                  win.remove();
                  removeTask(id);
                  saveState();
                  updateTaskCounter();
              }
          };
  
          const minimizeWindow = (event, id) => {
              if (event) event.stopPropagation();
  
              const win = document.getElementById(id);
              if (win) {
                  win.style.display = 'none';
                  addTask(id, win.querySelector('.window-header span').innerText);
                  saveState();
                  updateTaskCounter();
              }
          };
  
          /* =========================================================
             Taskleiste Management
          ============================================================ */
          const addTask = (id, title) => {
              const taskbar = document.getElementById('taskbar');
  
              if (document.getElementById('task-' + id)) {
                  return;
              }
  
              const task = document.createElement('div');
              task.classList.add('task');
              task.id = 'task-' + id;
  
              const img = document.createElement('img');
              img.src = 'img/small-logo.png';
              img.alt = '';
  
              const text = document.createElement('span');
              text.textContent = title;
  
              // Schließen-Button erstellen
              const closeButton = document.createElement('button');
              closeButton.classList.add('task-close-button');
              closeButton.textContent = '✖';
              closeButton.onclick = (event) => {
                  event.stopPropagation(); // Verhindert das Auslösen des Klick-Handlers des Tasks
                  closeWindow(id);
              };
  
              task.appendChild(img);
              task.appendChild(text);
              task.appendChild(closeButton);
  
              task.onclick = (event) => {
                  if (event.target !== closeButton) {
                      restoreWindow(id);
                  }
              };
  
              taskbar.appendChild(task);
              updateTaskCounter();
          };
  
          const removeTask = (id) => {
              const task = document.getElementById('task-' + id);
              if (task && task.parentNode) {
                  task.parentNode.removeChild(task);
              }
          };
  
          /* =========================================================
             Fenster wiederherstellen
          ============================================================ */
          const restoreWindow = (id) => {
              const win = document.getElementById(id);
              if (win) {
                  win.style.display = 'flex'; // Fenster sichtbar machen
                  bringToFront(win);
                  // Überprüfen, ob der Taskleisten-Eintrag existiert, bevor er entfernt wird
                  if (document.getElementById('task-' + id)) {
                      removeTask(id); // Entfernt das Fenster aus der Taskleiste
                  }
                  saveState();
                  updateTaskCounter();
              }
          };
  
          /* =========================================================
             Zustand der Fenster speichern und laden
          ============================================================ */
          const saveState = () => {
            const windows = document.querySelectorAll('.window');
            const state = [];
            windows.forEach(win => {
                const windowTitle = win.querySelector('.window-header span').innerText;
                const iframe = win.querySelector('.window-content iframe');
                const windowUrl = iframe ? iframe.src : '';
                state.push({
                    id: win.id,
                    top: win.style.top,
                    left: win.style.left,
                    width: win.style.width,
                    height: win.style.height,
                    x: win.getAttribute('data-x') || 0,
                    y: win.getAttribute('data-y') || 0,
                    minimized: win.style.display === 'none',
                    maximized: win.classList.contains('maximized'),
                    windowTitle: windowTitle,
                    windowUrl: windowUrl
                });
            });
            localStorage.setItem('windowsState', JSON.stringify(state));
            localStorage.setItem('windowCount', windowCount);
        };
  
          const loadState = () => {
            const state = JSON.parse(localStorage.getItem('windowsState'));
            const savedWindowCount = parseInt(localStorage.getItem('windowCount'), 10);
            if (savedWindowCount && savedWindowCount > windowCount) {
                windowCount = savedWindowCount;
            }
            if (state) {
                state.forEach(w => {
                    // Fenster erstellen mit iframeWindow()
                    iframeWindow(w.windowTitle, w.windowUrl, {
                        id: w.id,
                        top: w.top,
                        left: w.left,
                        width: w.width,
                        height: w.height,
                        x: parseFloat(w.x),
                        y: parseFloat(w.y),
                        minimized: w.minimized,
                        maximized: w.maximized
                    });
        
                    const win = document.getElementById(w.id);
        
                    // Stelle sicher, dass das Fenster draggable und resizable ist
                    makeDraggableResizable(win);
        
                    // Bringe das Fenster nach vorne
                    bringToFront(win);
                });
                updateTaskCounter();
            }
        };
  
          /* =========================================================
             Event Listener für Laden und Schließen der Seite
          ============================================================ */
          window.onload = () => {
              loadState();
  
              // Theme laden
              const savedTheme = localStorage.getItem('theme') || 'light';
              document.documentElement.setAttribute('data-theme', savedTheme);
          };
  
          window.addEventListener('beforeunload', saveState);
  
          /* =========================================================
             "Alles schließen" Button Funktionalität
          ============================================================ */
          const closeAllWindows = () => {
              const windows = document.querySelectorAll('.window');
              windows.forEach(win => {
                  closeWindow(win.id);
              });
          };
  
          /* =========================================================
             Theme Umschalten
          ============================================================ */
          const themeToggleButton = document.getElementById('themeToggle');
  
          themeToggleButton.addEventListener('click', () => {
              const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
              const newTheme = currentTheme === 'light' ? 'dark' : 'light';
              document.documentElement.setAttribute('data-theme', newTheme);
              localStorage.setItem('theme', newTheme);
          });
  
          /* =========================================================
             System Apps
          ============================================================ */
          const iframeWindow = (buttonText, link, options = {}) => {
            const windowTitle = buttonText;
            const windowContent = `
                <div class="iframe-container">
                    <!-- Ladebalken -->
                    <div class="loader">
                        <div class="progress-bar">
                            <div class="progress-bar-inner"></div>
                        </div>
                        <button onclick="hideLoader(this.parentElement.nextElementSibling)">Ladebalken Ausblenden</button>
                    </div>
                    <!-- Das iframe -->
                    <iframe src="${link}" onload="hideLoader(this)"></iframe>
                </div>
            `;
            sysWindow(windowTitle, windowContent, link, options);
        };
        
  
          const createNewSysWindow = () => {
              const windowTitle = 'Fenster erstellen';
              const windowContent = `
                  <div>
  
                  </div>
              `;
              sysWindow(windowTitle, windowContent);
          };
  
          const sysSetting = () => {
              const windowTitle = 'Einstellung';
              const link = 'setting.html';

              iframeWindow(windowTitle, link);
          };
  
          const sysSupport = () => {
              const windowTitle = 'Support';
              const windowContent = `
                  <div>
  
                  </div>
              `;
              sysWindow(windowTitle, windowContent);
          };
  
          const sysLogin = () => {
              const windowTitle = 'Login';
              const windowContent = `
                  <div>
  
                  </div>
              `;
              sysWindow(windowTitle, windowContent);
          };
  
          const sysWindow = (windowTitle, windowContent, link, options = {}) => {
            windowCount++;
            const win = document.createElement('div');
            win.classList.add('window');
            win.id = options.id || `window${windowCount}`;
        
            // Positionierung
            if (options.top !== undefined && options.left !== undefined) {
                win.style.top = options.top;
                win.style.left = options.left;
            } else {
                const offset = (windowCount * 20) % 100;
                win.style.top = `50px`;
                win.style.left = `${50 + offset}px`;
            }
        
            // Größe
            win.style.width = options.width || '600px';
            win.style.height = options.height || '400px';
        
            // Datenattribute für die Position
            if (options.x !== undefined && options.y !== undefined) {
                win.setAttribute('data-x', options.x);
                win.setAttribute('data-y', options.y);
                win.style.transform = `translate3d(${options.x}px, ${options.y}px, 0)`;
            }
        
            win.innerHTML = `
                <div class="window-header">
                    <span><a href="${link}">${windowTitle}</a></span>
                    <div class="buttons">
                        <button class="window-button" onclick="minimizeWindow(event, '${win.id}')">_</button>
                        <button class="window-button" onclick="maximizeWindow('${win.id}')">□</button>
                        <button class="window-close" onclick="closeWindow('${win.id}')">✖</button>
                    </div>
                </div>
                <div class="window-content">
                    ${windowContent}
                </div>
                <div class="resize-handle"></div>
            `;
            mainElement.appendChild(win);
            makeDraggableResizable(win);
        
            // Zustand setzen
            if (options.maximized) {
                win.classList.add('maximized');
                win.style.transform = '';
                win.style.top = '0';
                win.style.left = '0';
                win.style.width = '100%';
                win.style.height = '100%';
            } else if (options.minimized) {
                win.style.display = 'none';
                addTask(win.id, windowTitle);
            }
        
            bringToFront(win);
            saveState();
            updateTaskCounter();
        };

            /* =========================================================
             Laden der Settings beim start
          ============================================================ */

          sysSetting()