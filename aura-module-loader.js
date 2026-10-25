/**
 * AURA AI SOVEREIGN OS - UNIVERSAL MODULE LOADER & RUNTIME (145 MÓDULOS)
 * Carga dinámicamente las pantallas de Stitch e inyecta lógica reactiva
 */

class AuraModuleLoader {
    constructor() {
        this.containerId = 'app-content';
        this.cache = new Map();
    }

    /**
     * Carga de forma asíncrona cualquier pantalla de los 145 módulos
     * @param {string} moduleFolder Nombre exacto de la carpeta del módulo
     */
    async loadModule(moduleFolder) {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const path = `./${moduleFolder}/code.html`;

        try {
            container.innerHTML = `
                <div class="flex flex-col items-center justify-center p-12 space-y-4">
                    <div class="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                    <p class="text-xs font-mono text-emerald-400">Cargando Módulo Enclave: ${moduleFolder}...</p>
                </div>
            `;

            let htmlText = this.cache.get(path);
            if (!htmlText) {
                const response = await fetch(path);
                if (!response.ok) throw new Error(`Módulo no encontrado (${response.status})`);
                htmlText = await response.text();
                this.cache.set(path, htmlText);
            }

            // Extraer el contenido del body
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, 'text/html');
            const bodyContent = doc.body ? doc.body.innerHTML : htmlText;

            // Inyectar en el DOM principal
            container.innerHTML = bodyContent;

            // Re-activar iconos y vincular eventos dinámicos
            if (window.lucide) window.lucide.createIcons();
            this.bindDynamicInteractions(container, moduleFolder);

            console.log(`[AURA LOADER] Módulo '${moduleFolder}' cargado e interconectado.`);
        } catch (err) {
            container.innerHTML = `
                <div class="p-6 bg-red-950/40 border border-red-500/30 rounded-2xl text-center space-y-3">
                    <h3 class="text-sm font-bold text-red-400">Error al Cargar el Módulo</h3>
                    <p class="text-xs text-gray-400">${err.message}</p>
                    <button onclick="window.auraLoader.loadModule('${moduleFolder}')" class="px-4 py-2 bg-red-500/20 text-red-300 rounded-xl text-xs font-mono">Reintentar Carga</button>
                </div>
            `;
        }
    }

    /**
     * Conecta botones, formularios e inputs del HTML cargado con el Engine
     */
    bindDynamicInteractions(container, moduleFolder) {
        // Habilitar todos los inputs para almacenar estado local al escribir
        const inputs = container.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('change', (e) => {
                if (window.auraEngine) {
                    window.auraEngine.saveData('module_states', {
                        id: `${moduleFolder}_${e.target.name || e.target.id || 'field'}`,
                        value: e.target.value,
                        timestamp: Date.now()
                    });
                }
            });
        });

        // Habilitar simulación de botones de acción
        const buttons = container.querySelectorAll('button');
        buttons.forEach(btn => {
            if (!btn.getAttribute('onclick')) {
                btn.addEventListener('click', () => {
                    const statusBox = container.querySelector('.font-mono, [class*="status"], [class*="log"]');
                    if (statusBox) {
                        statusBox.innerHTML += `<br><span class="text-emerald-400">> Acción ejecutada en ${moduleFolder} [OK]</span>`;
                    }
                });
            }
        });
    }
}

window.auraLoader = new AuraModuleLoader();
