/**
 * AURA AI - ESTUDIO DE LOGOS E IDENTIDAD VECTORIAL
 */

function renderLogoStudioApp() {
    return `
        <div class="max-w-4xl mx-auto space-y-6 p-4">
            <div class="p-6 bg-gray-900/90 rounded-2xl border border-emerald-500/30 backdrop-blur-xl flex justify-between items-center">
                <div>
                    <h2 class="text-xl font-bold text-white">Diseñador Vectorial de Logos PWA</h2>
                    <p class="text-xs text-gray-400">Generación de sellos gráficos e identidades maskable en alta definición</p>
                </div>
                <span class="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono rounded-full">SVG Engine</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-gray-950 p-5 rounded-2xl border border-gray-800 space-y-4">
                    <div>
                        <label class="text-xs text-emerald-400 font-bold block mb-1">Insignia / Isotipo</label>
                        <select id="logo-shape" onchange="redrawLogoSVG()" class="w-full bg-gray-900 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-emerald-500 outline-none">
                            <option value="hexagon">Hexágono de Silicio</option>
                            <option value="shield">Escudo Soberano</option>
                            <option value="orbit">Red Orbital Mesh</option>
                        </select>
                    </div>

                    <div>
                        <label class="text-xs text-emerald-400 font-bold block mb-1">Nombre / Acrónimo</label>
                        <input type="text" id="logo-label" value="AURA" oninput="redrawLogoSVG()" class="w-full bg-gray-900 border border-gray-800 rounded-xl p-2.5 text-xs text-white focus:border-emerald-500 outline-none">
                    </div>

                    <div>
                        <label class="text-xs text-emerald-400 font-bold block mb-2">Color Acento</label>
                        <div class="flex gap-3">
                            <button onclick="setLogoColor('#10b981')" class="w-8 h-8 rounded-full bg-emerald-500 ring-2 ring-white/20"></button>
                            <button onclick="setLogoColor('#06b6d4')" class="w-8 h-8 rounded-full bg-cyan-500 ring-2 ring-white/20"></button>
                            <button onclick="setLogoColor('#8b5cf6')" class="w-8 h-8 rounded-full bg-purple-500 ring-2 ring-white/20"></button>
                            <button onclick="setLogoColor('#f59e0b')" class="w-8 h-8 rounded-full bg-amber-500 ring-2 ring-white/20"></button>
                        </div>
                    </div>

                    <button onclick="downloadLogoPNG()" class="w-full py-3 bg-emerald-500 text-black font-bold text-xs rounded-xl hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20">
                        Descargar Render PNG (512x512)
                    </button>
                </div>

                <div class="bg-gray-950 p-6 rounded-2xl border border-gray-800 flex flex-col items-center justify-center">
                    <div id="svg-render-container" class="w-48 h-48 bg-gray-900 rounded-2xl border border-emerald-500/30 flex flex-col items-center justify-center p-4 shadow-2xl">
                        <!-- Canvas / SVG Inject -->
                    </div>
                </div>
            </div>
        </div>
    `;
}

let activeColor = '#10b981';

function setLogoColor(color) {
    activeColor = color;
    redrawLogoSVG();
}

function redrawLogoSVG() {
    const shape = document.getElementById('logo-shape')?.value || 'hexagon';
    const label = document.getElementById('logo-label')?.value || 'AURA';
    const container = document.getElementById('svg-render-container');
    if (!container) return;

    let path = '';
    if (shape === 'shield') {
        path = `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="${activeColor}" stroke-width="1.8"/>`;
    } else if (shape === 'orbit') {
        path = `<circle cx="12" cy="12" r="9" fill="none" stroke="${activeColor}" stroke-width="1.8"/><path d="M3.6 9h16.8M3.6 15h16.8" stroke="${activeColor}" stroke-width="1.5"/>`;
    } else {
        path = `<path d="M12 2l9 4.9v9.8l-9 4.9-9-4.9V6.9z" fill="none" stroke="${activeColor}" stroke-width="1.8"/>`;
    }

    container.innerHTML = `
        <svg width="96" height="96" viewBox="0 0 24 24" class="drop-shadow-[0_0_12px_${activeColor}]">
            ${path}
        </svg>
        <span class="text-xs font-bold text-white tracking-widest mt-3 uppercase">${label}</span>
    `;
}

function downloadLogoPNG() {
    const container = document.getElementById('svg-render-container');
    if (!container) return;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#050811';
    ctx.fillRect(0, 0, 512, 512);

    ctx.fillStyle = activeColor;
    ctx.font = 'bold 48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(document.getElementById('logo-label')?.value || 'AURA', 256, 420);

    const link = document.createElement('a');
    link.download = 'aura-logo-sovereign.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}
