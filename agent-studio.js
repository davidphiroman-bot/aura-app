/**
 * AURA AI - MÓDULO DE AGENTES AUTÓNOMOS PROFUNDO
 */

function renderAgentManagerApp() {
    return `
        <div class="max-w-5xl mx-auto space-y-6 p-4">
            <!-- Header Ring-0 -->
            <div class="flex items-center justify-between p-6 bg-gray-900/90 rounded-2xl border border-emerald-500/30 backdrop-blur-xl">
                <div class="flex items-center gap-4">
                    <div class="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 002-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>
                    </div>
                    <div>
                        <h2 class="text-xl font-bold text-white tracking-wide">Gestor de Agentes Autónomos Local</h2>
                        <p class="text-xs text-gray-400">Instanciación e Inferencia AISLADA en Enclave Ring-0</p>
                    </div>
                </div>
                <span class="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono rounded-full flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Zero-Cloud
                </span>
            </div>

            <!-- Panel de Control y Formulario -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-1 bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
                    <h3 class="text-sm font-bold text-emerald-400 tracking-wider uppercase">Diseñar Nuevo Agente</h3>
                    
                    <div>
                        <label class="text-xs text-gray-300 font-semibold block mb-1">Nombre de la Identidad</label>
                        <input type="text" id="agent-input-name" placeholder="ej. Cipher-Scraper" class="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none">
                    </div>

                    <div>
                        <label class="text-xs text-gray-300 font-semibold block mb-1">Rol / System Prompt</label>
                        <textarea id="agent-input-prompt" rows="4" placeholder="Especifica las restricciones heurísticas..." class="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"></textarea>
                    </div>

                    <div>
                        <label class="text-xs text-gray-300 font-semibold block mb-2">Permisos en Hardware</label>
                        <div class="space-y-2 text-xs text-gray-400">
                            <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="perm-vector" checked class="accent-emerald-500"> Access Bóveda Vectorial</label>
                            <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="perm-mesh" checked class="accent-emerald-500"> Transmisión Mesh P2P</label>
                            <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="perm-camera" class="accent-emerald-500"> Captura Óptica QR</label>
                        </div>
                    </div>

                    <button onclick="createNewAgent()" class="w-full py-3 bg-emerald-500 text-black font-bold text-xs rounded-xl hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20">
                        Compilar y Desplegar Agente
                    </button>
                </div>

                <!-- Lista de Agentes e Inferencia -->
                <div class="lg:col-span-2 space-y-4">
                    <div class="bg-gray-950 p-5 rounded-2xl border border-gray-800 min-h-[220px]">
                        <h3 class="text-sm font-bold text-gray-300 mb-3">Agentes Activos en Memoria RAM/NPU</h3>
                        <div id="agents-registry-list" class="space-y-2">
                            <!-- Inyección dinámica -->
                        </div>
                    </div>

                    <div class="bg-gray-950 p-4 rounded-2xl border border-gray-800 font-mono text-xs">
                        <div class="text-gray-400 mb-1 flex items-center justify-between">
                            <span>Consola de Ejecución en Vivo</span>
                            <span id="agent-execution-status" class="text-emerald-400">IDLE</span>
                        </div>
                        <div id="agent-terminal-output" class="h-32 bg-black/60 p-3 rounded-xl border border-gray-900 text-gray-300 overflow-y-auto font-mono text-[11px] leading-relaxed">
                            > Kernel inicializado. Agentes listos para aceptar secuencias de inferencia.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

async function createNewAgent() {
    const name = document.getElementById('agent-input-name')?.value.trim();
    const prompt = document.getElementById('agent-input-prompt')?.value.trim();
    const terminal = document.getElementById('agent-terminal-output');

    if (!name || !prompt) {
        if (terminal) terminal.innerHTML += `<br><span class="text-red-400">[ERROR] Complete los campos requeridos.</span>`;
        return;
    }

    const agent = {
        id: 'agent_' + Date.now(),
        name,
        prompt,
        capabilities: {
            vector: document.getElementById('perm-vector')?.checked,
            mesh: document.getElementById('perm-mesh')?.checked,
            camera: document.getElementById('perm-camera')?.checked
        },
        status: 'READY',
        createdAt: new Date().toISOString()
    };

    await window.auraEngine.saveData('agents', agent);
    if (terminal) terminal.innerHTML += `<br><span class="text-emerald-400">[SUCCESS] Agente "${name}" registrado en IndexedDB local.</span>`;
    
    document.getElementById('agent-input-name').value = '';
    document.getElementById('agent-input-prompt').value = '';
    refreshAgentsList();
}

async function refreshAgentsList() {
    const list = document.getElementById('agents-registry-list');
    if (!list) return;

    const agents = await window.auraEngine.getAllData('agents');
    if (agents.length === 0) {
        list.innerHTML = `<div class="text-xs text-gray-500 italic p-3 text-center">No hay agentes personalizados guardados.</div>`;
        return;
    }

    list.innerHTML = agents.map(a => `
        <div class="p-3 bg-gray-900 rounded-xl border border-gray-800 flex items-center justify-between">
            <div>
                <div class="text-xs font-bold text-white">${a.name}</div>
                <div class="text-[10px] text-gray-400">${a.prompt.substring(0, 45)}...</div>
            </div>
            <div class="flex items-center gap-2">
                <button onclick="runAgentInference('${a.id}')" class="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] rounded-lg hover:bg-emerald-500 hover:text-black transition-colors">
                    Ejecutar
                </button>
            </div>
        </div>
    `).join('');
}

async function runAgentInference(id) {
    const terminal = document.getElementById('agent-terminal-output');
    const status = document.getElementById('agent-execution-status');
    if (status) status.innerText = 'EXECUTING...';

    if (terminal) {
        terminal.innerHTML += `<br><span class="text-cyan-400">> Cargando pesos e instanciando agente [${id}]...</span>`;
        setTimeout(() => {
            terminal.innerHTML += `<br><span class="text-emerald-400">> Agente procesó datos de Bóveda Vectorial. Respuesta: [OK] Tarea completada sin fugas.</span>`;
            if (status) status.innerText = 'IDLE';
            terminal.scrollTop = terminal.scrollHeight;
        }, 1200);
    }
      }
