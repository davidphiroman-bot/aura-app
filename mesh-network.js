// --- MÓDULO: RED MESH P2P DESCONECTADA ---

function renderMeshNetworkModule() {
    return `
        <div class="space-y-6">
            <!-- Cabecera y Estado de la Red -->
            <div class="glass-panel rounded-2xl p-6 border border-blue-500/30">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                        <span class="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            <i data-lucide="share-2" class="w-6 h-6"></i>
                        </span>
                        <div>
                            <h3 class="font-bold text-lg text-white">Topología de Red Mesh P2P</h3>
                            <p class="text-xs text-gray-400">Comunicación descentralizada y cifrada de extremo a extremo sin internet</p>
                        </div>
                    </div>
                    <span class="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono border border-blue-500/30 flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                        4 Nodos Activos
                    </span>
                </div>

                <!-- Canvas de Visualización de Nodos Mesh -->
                <div class="h-64 bg-gray-950 rounded-xl p-4 border border-gray-800 relative overflow-hidden">
                    <canvas id="mesh-topology-canvas" class="w-full h-full"></canvas>
                </div>
            </div>

            <!-- Panel de Control de Enlaces y Paquetes -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Lista de Nodos Cercanos -->
                <div class="glass-panel rounded-2xl p-5 border border-gray-800 space-y-4">
                    <h4 class="font-bold text-sm text-white flex items-center gap-2">
                        <i data-lucide="radio" class="text-blue-400 w-4 h-4"></i> Nodos en el Radio (LoRa / BLE)
                    </h4>
                    <div class="space-y-2 font-mono text-xs">
                        <div class="p-3 bg-gray-950 rounded-xl border border-gray-800 flex items-center justify-between">
                            <div>
                                <span class="text-white font-bold">Node-Aura-Alpha</span>
                                <div class="text-[10px] text-gray-400">Señal: -62 dBm • Cifrado AES-256</div>
                            </div>
                            <span class="text-emerald-400">Conectado</span>
                        </div>
                        <div class="p-3 bg-gray-950 rounded-xl border border-gray-800 flex items-center justify-between">
                            <div>
                                <span class="text-white font-bold">Node-Mobile-Secure</span>
                                <div class="text-[10px] text-gray-400">Señal: -75 dBm • Relé Activo</div>
                            </div>
                            <span class="text-emerald-400">Conectado</span>
                        </div>
                    </div>
                </div>

                <!-- Consola de Transmisión de Paquetes -->
                <div class="glass-panel rounded-2xl p-5 border border-gray-800 space-y-4">
                    <h4 class="font-bold text-sm text-white flex items-center gap-2">
                        <i data-lucide="terminal" class="text-cyan-400 w-4 h-4"></i> Tráfico de Paquetes Mesh
                    </h4>
                    <div id="mesh-traffic-log" class="p-3 bg-gray-950 rounded-xl border border-gray-800 font-mono text-[10px] text-blue-300 space-y-1 h-28 overflow-y-auto">
                        <p>> [BROADCAST]: Sincronización de bloques vectoriales iniciada.</p>
                        <p>> [SECURE]: Paquete enrutado de forma anónima a través de Node-Mobile-Secure.</p>
                        <p>> [STATUS]: Canales libres de interferencia electromagnética.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

