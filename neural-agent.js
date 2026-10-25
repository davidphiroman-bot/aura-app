// --- MÓDULO: AGENTE NEURONAL ON-DEVICE ---

function renderNeuralAgentModule() {
    return `
        <div class="space-y-6">
            <!-- Cabecera del Agente -->
            <div class="glass-panel rounded-2xl p-6 border border-emerald-500/30">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                        <span class="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <i data-lucide="bot" class="w-6 h-6"></i>
                        </span>
                        <div>
                            <h3 class="font-bold text-lg text-white">Agente Neuronal Aura-7B</h3>
                            <p class="text-xs text-gray-400">Inferencia local offline en silicio soberano con cuantización INT4</p>
                        </div>
                    </div>
                    <span class="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/30 flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        Modelo Activo (INT4)
                    </span>
                </div>

                <!-- Consola de Chat / Inferencia -->
                <div class="h-64 bg-gray-950 rounded-xl p-4 border border-gray-800 font-mono text-xs text-gray-300 overflow-y-auto space-y-3 mb-4" id="neural-chat-box">
                    <p class="text-emerald-400">> [SISTEMA]: Núcleo LLM Aura-7B cargado correctamente en memoria NPU.</p>
                    <p class="text-cyan-400">> [USUARIO]: Analiza el estado actual de los módulos soberanos.</p>
                    <p class="text-gray-300">> [AURA]: Todos los subsistemas (Telemetría Ring-0, Red Mesh P2P, Bóveda Vectorial y TEE) operan de manera óptima sin fugas de datos externos.</p>
                </div>

                <!-- Input de Prompt Local -->
                <div class="flex gap-2">
                    <input type="text" id="neural-prompt-input" placeholder="Escribe una instrucción para el agente local..." class="flex-1 bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono">
                    <button onclick="sendNeuralPrompt()" class="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-xs rounded-xl transition flex items-center gap-2">
                        <i data-lucide="send" class="w-4 h-4"></i> Ejecutar
                    </button>
                </div>
            </div>
        </div>
    `;
}

function sendNeuralPrompt() {
    const input = document.getElementById('neural-prompt-input');
    const chatBox = document.getElementById('neural-chat-box');
    if (!input || !chatBox) return;

    const text = input.value.trim();
    if (!text) return;

    chatBox.innerHTML += `<p class="text-cyan-400">> [USUARIO]: ${text}</p>`;
    input.value = '';

    setTimeout(() => {
        chatBox.innerHTML += `<p class="text-gray-300">> [AURA]: Procesando instrucción mediante el acelerador NPU local con cifrado TEE...</p>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);
}

