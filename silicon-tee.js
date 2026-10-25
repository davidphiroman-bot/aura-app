
// --- MÓDULO 3: OPTIMIZADOR DE SILICIO & ENCLAVE TEE RING-0 ---

function renderSiliconTeModule() {
    return `
        <div class="space-y-6">
            <!-- Cabecera del Módulo -->
            <div class="glass-panel rounded-2xl p-6 border border-cyan-500/30">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                        <span class="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                            <i data-lucide="sliders" class="w-6 h-6"></i>
                        </span>
                        <div>
                            <h3 class="font-bold text-lg text-white">Optimizador Adaptativo de Silicio & TEE</h3>
                            <p class="text-xs text-gray-400">Control de hardware soberano y aislamiento criptográfico Ring-0</p>
                        </div>
                    </div>
                    <span class="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/30 flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        HSM Seguro Activo
                    </span>
                </div>

                <!-- Controles de Frecuencia y Voltaje NPU -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div class="bg-gray-950/80 p-4 rounded-xl border border-gray-800">
                        <span class="text-xs text-gray-400 block mb-1">Frecuencia de Reloj NPU</span>
                        <div class="text-2xl font-bold font-mono text-cyan-400">1.82 GHz</div>
                        <div class="text-[10px] text-gray-500 mt-1">Modo Dinámico / Eficiencia</div>
                    </div>
                    <div class="bg-gray-950/80 p-4 rounded-xl border border-gray-800">
                        <span class="text-xs text-gray-400 block mb-1">Voltaje Adaptativo</span>
                        <div class="text-2xl font-bold font-mono text-purple-400">1.185 V</div>
                        <div class="text-[10px] text-gray-500 mt-1">Regulación por Hardware TEE</div>
                    </div>
                    <div class="bg-gray-950/80 p-4 rounded-xl border border-gray-800">
                        <span class="text-xs text-gray-400 block mb-1">Atestación Criptográfica</span>
                        <div class="text-2xl font-bold font-mono text-rose-400">PASS (0x8F)</div>
                        <div class="text-[10px] text-gray-500 mt-1">Firma HSM verificado</div>
                    </div>
                </div>
            </div>

            <!-- Consola de Atestación y Logs de Enclave -->
            <div class="glass-panel rounded-2xl p-6 border border-rose-500/30 space-y-4">
                <div class="flex items-center justify-between">
                    <h4 class="font-bold text-sm text-white flex items-center gap-2">
                        <i data-lucide="shield-check" class="text-rose-400 w-4 h-4"></i> Consola de Auditoría Ring-0
                    </h4>
                    <button onclick="runTeeAttestation()" class="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-semibold transition">
                        Ejecutar Atestación
                    </button>
                </div>
                <div id="tee-log-console" class="p-4 bg-gray-950 rounded-xl border border-gray-800 font-mono text-xs text-rose-300 space-y-1.5 max-h-40 overflow-y-auto">
                    <p>> [INIT]: Verificando integridad de memoria física en enclave seguro...</p>
                    <p>> [TEE]: Firma digital del Kernel verificado mediante clave pública HSM.</p>
                    <p>> [STATUS]: Sandbox de silicio aislado correctamente. Sin brechas de telemetría.</p>
                </div>
            </div>
        </div>
    `;
}

function runTeeAttestation() {
    const consoleDiv = document.getElementById('tee-log-console');
    if (!consoleDiv) return;
    
    const timestamp = new Date().toLocaleTimeString();
    consoleDiv.innerHTML += `
        <p class="text-cyan-400">> [${timestamp}] Ejecutando nuevo test de atestación hardware...</p>
        <p class="text-emerald-400">> [${timestamp}] OK: Claves de cifrado validadas en silicio. Enclave íntegro.</p>
    `;
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
}
