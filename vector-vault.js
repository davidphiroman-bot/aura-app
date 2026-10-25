// --- MÓDULO: BÓVEDA VECTORIAL & MEMORIA RAG ---

function renderVectorVaultModule() {
    return `
        <div class="space-y-6">
            <!-- Cabecera y Estado de la Bóveda -->
            <div class="glass-panel rounded-2xl p-6 border border-amber-500/30">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                        <span class="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            <i data-lucide="database" class="w-6 h-6"></i>
                        </span>
                        <div>
                            <h3 class="font-bold text-lg text-white">Bóveda Vectorial de Memoria RAG</h3>
                            <p class="text-xs text-gray-400">Almacenamiento local cifrado con embeddings de silicio soberano</p>
                        </div>
                    </div>
                    <span class="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono border border-amber-500/30 flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                        Cifrado HSM Activo
                    </span>
                </div>

                <!-- Métricas de la Bóveda -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div class="bg-gray-950/80 p-4 rounded-xl border border-gray-800">
                        <span class="text-xs text-gray-400 block mb-1">Vectores Indexados</span>
                        <div class="text-2xl font-bold font-mono text-amber-400">1,420</div>
                        <div class="text-[10px] text-gray-500 mt-1">Embeddings locales 768-dim</div>
                    </div>
                    <div class="bg-gray-950/80 p-4 rounded-xl border border-gray-800">
                        <span class="text-xs text-gray-400 block mb-1">Espacio Ocupado</span>
                        <div class="text-2xl font-bold font-mono text-purple-400">42.8 MB</div>
                        <div class="text-[10px] text-gray-500 mt-1">IndexedDB / SQLite Encriptado</div>
                    </div>
                    <div class="bg-gray-950/80 p-4 rounded-xl border border-gray-800">
                        <span class="text-xs text-gray-400 block mb-1">Estado de Sincronización</span>
                        <div class="text-2xl font-bold font-mono text-emerald-400">100% Sinc</div>
                        <div class="text-[10px] text-gray-500 mt-1">Sin fugas hacia la nube</div>
                    </div>
                </div>
            </div>

            <!-- Buscador y Consultas Vectoriales RAG -->
            <div class="glass-panel rounded-2xl p-6 border border-gray-800 space-y-4">
                <h4 class="font-bold text-sm text-white flex items-center gap-2">
                    <i data-lucide="search" class="text-amber-400 w-4 h-4"></i> Explorador de Memoria Semántica
                </h4>
                
                <div class="flex gap-2">
                    <input type="text" id="vault-search-input" placeholder="Buscar conceptos en la memoria local (ej. parámetros de silicio)..." class="flex-1 bg-gray-950 border border-gray-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono">
                    <button onclick="executeVaultQuery()" class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold text-xs rounded-xl transition">
                        Consultar RAG
                    </button>
                </div>

                <div id="vault-results-box" class="p-4 bg-gray-950 rounded-xl border border-gray-800 font-mono text-xs text-gray-300 space-y-2">
                    <p class="text-gray-500">> Escribe una consulta para buscar coincidencias vectoriales en el almacenamiento local.</p>
                </div>
            </div>
        </div>
    `;
}

function executeVaultQuery() {
    const input = document.getElementById('vault-search-input');
    const resultsBox = document.getElementById('vault-results-box');
    if (!input || !resultsBox) return;

    const query = input.value.trim() || "estado general";
    resultsBox.innerHTML = `
        <p class="text-amber-400">> Buscando similitud semántica para: "${query}"...</p>
        <p class="text-emerald-400">> [Match 98.4%]: Módulo de silicio y telemetría Ring-0 optimizado correctamente.</p>
        <p class="text-gray-400">> [Match 85.1%]: Red Mesh P2P operando con cifrado AES-256 local.</p>
    `;
}

