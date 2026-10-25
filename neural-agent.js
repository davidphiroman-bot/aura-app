// --- MÓDULO 3: AGENTE NEURONAL OFFLINE ---
function renderNeuralAgentModule() {
    return `
        <div class="space-y-6">
            <div class="glass-panel rounded-2xl p-6 border border-emerald-500/30">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                        <span class="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                            <i data-lucide="bot" class="w-6 h-6"></i>
                        </span>
                        <div>
                            <h3 class="font-bold text-lg text-white">Inferencia LLM Local</h3>
                            <p class="text-xs text-gray-400">Motor neuronal soberano ejecutándose en hardware local</p>
                        </div>
                    </div>
                    <span class="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/20 flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Modelo Activo
                    </span>
                </div>
                
                <div class="h-64 bg-gray-950 rounded-xl p-4 border border-gray-800 flex flex-col justify-between overflow-y-auto mb-4" id="neural-chat-box">
                    <div class="space-y-3 text-xs">
                        <div class="p-3 rounded-xl bg-gray-900 border border-gray-800 text-gray-300">
                            <span class="text-emerald-400 font-bold block mb-1">Aura Neural v5.2</span>
                            Sistema enlazado y listo. Todos los subsistemas de inferencia están aislados en el enclave seguro. ¿Qué comando deseas ejecutar?
                        </div>
                    </div>
                </div>

                <div class="flex gap-2">
                    <input type="text" id="neural-input-prompt" placeholder="Escribe un comando o consulta para el agente..." class="flex-1 bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500">
                    <button onclick="executeNeuralPrompt()" class="px-5 py-2.5 rounded-xl bg-emerald-500 text-black font-semibold text-xs hover:bg-emerald-400 transition-colors flex items-center gap-2">
                        <i data-lucide="send" class="w-4 h-4"></i> Enviar
                    </button>
                </div>
            </div>
        </div>
    `;
}

function executeNeuralPrompt() {
    const input = document.getElementById('neural-input-prompt');
    const chatBox = document.getElementById('neural-chat-box');
    if (!input || !input.value.trim()) return;

    const userText = input.value.trim();
    chatBox.innerHTML += `
        <div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs ml-8">
            <span class="font-bold block mb-1 text-right">Usuario</span>
            ${userText}
        </div>
        <div class="p-3 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 text-xs mr-8">
            <span class="text-emerald-400 font-bold block mb-1">Aura Neural</span>
            Procesando consulta en Bóveda Vectorial y Red Mesh... Operación completada con éxito en entorno seguro Ring-0.
        </div>
    `;
    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
}
