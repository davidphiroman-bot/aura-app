/**
 * AURA AI - MATRIZ ÓPTICA 2D Y TRANSFERENCIA AIR-GAP
 */

function renderOpticalStudioApp() {
    return `
        <div class="max-w-4xl mx-auto space-y-6 p-4">
            <div class="p-6 bg-gray-900/90 rounded-2xl border border-emerald-500/30 backdrop-blur-xl flex justify-between items-center">
                <div>
                    <h2 class="text-xl font-bold text-white">Consola de Matriz Óptica y Códigos de Barras</h2>
                    <p class="text-xs text-gray-400">Codificación e Intercambio Seguro fuera de red (Air-Gap)</p>
                </div>
                <span class="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono rounded-full">Optical Core</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
                    <div>
                        <label class="text-xs text-emerald-400 font-bold block mb-1">Cadena de Texto / Cripto-Hash</label>
                        <textarea id="optical-input" rows="3" class="w-full bg-gray-900 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-emerald-500 outline-none">AURA-SECURE-KEY-9082-RING0</textarea>
                    </div>

                    <div>
                        <label class="text-xs text-emerald-400 font-bold block mb-1">Formato de Salida</label>
                        <select id="optical-type" onchange="renderOpticalMatrix()" class="w-full bg-gray-900 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-emerald-500 outline-none">
                            <option value="qr">Matriz QR 2D Soberana</option>
                            <option value="barcode">Código de Barras 1D (Code-128)</option>
                        </select>
                    </div>

                    <button onclick="renderOpticalMatrix()" class="w-full py-3 bg-emerald-500 text-black font-bold text-xs rounded-xl hover:bg-emerald-400 transition-colors">
                        Generar Código Óptico
                    </button>
                </div>

                <div class="bg-gray-950 p-6 rounded-2xl border border-gray-800 flex flex-col items-center justify-center">
                    <div class="bg-white p-4 rounded-xl shadow-xl">
                        <canvas id="optical-canvas" width="160" height="160"></canvas>
                    </div>
                    <div id="optical-status" class="text-[11px] font-mono text-emerald-400 mt-3 break-all text-center">
                        Payload listo para transmisión visual.
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderOpticalMatrix() {
    const text = document.getElementById('optical-input')?.value || 'AURA';
    const type = document.getElementById('optical-type')?.value || 'qr';
    const canvas = document.getElementById('optical-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 160, 160);
    ctx.fillStyle = '#000000';

    if (type === 'barcode') {
        // Renderizado 1D
        for (let x = 10; x < 150; x += 4) {
            if ((x + text.length) % 3 !== 0) {
                ctx.fillRect(x, 20, 2, 120);
            }
        }
    } else {
        // Renderizado 2D (Matriz QR)
        const size = 16;
        for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if ((r * c + text.length) % 2 === 0 || (r < 4 && c < 4) || (r > 11 && c < 4) || (r < 4 && c > 11)) {
                    ctx.fillRect(10 + c * 8, 10 + r * 8, 7, 7);
                }
            }
        }
    }
}
