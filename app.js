
document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) {
        lucide.createIcons();
    }
    startCanvasAnimations();
    updateCustomWidget();
});

function switchViewMode(mode) {
    const gal = document.getElementById('view-mode-gallery');
    const single = document.getElementById('view-mode-single');
    if (!gal || !single) return;
    
    if (mode === 'gallery') {
        gal.classList.remove('hidden');
        single.classList.add('hidden');
    } else {
        gal.classList.add('hidden');
        single.classList.remove('hidden');
    }
}

function setActiveTab(tabId) {
    switchViewMode('single');
    const tabs = ['hub', 'widget-designer', 'neural', 'vault', 'mesh', 'tee'];
    tabs.forEach(t => {
        const btn = document.getElementById('tab-' + t);
        const content = document.getElementById('content-' + t);
        if (t === tabId) {
            if (btn) btn.className = "tab-btn px-3 py-1.5 rounded-lg bg-gray-800 text-white font-medium flex items-center gap-2 whitespace-nowrap border border-gray-700";
            if (content) content.classList.remove('hidden');
        } else {
            if (btn) btn.className = "tab-btn px-3 py-1.5 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white font-medium flex items-center gap-2 whitespace-nowrap";
            if (content) content.classList.add('hidden');
        }
    });
    if (tabId === 'widget-designer') updateCustomWidget();
}

function openTabFromGallery(tabId) {
    setActiveTab(tabId);
}

function updateCustomWidget() {
    const radiusInput = document.getElementById('wd-radius');
    if (!radiusInput) return;
    const radius = radiusInput.value;
    document.getElementById('wd-radius-val').innerText = radius + 'px';
    const container = document.getElementById('widget-preview-container');
    if (container) {
        container.style.borderRadius = radius + 'px';
        container.innerHTML = `<div class="text-sm font-bold text-purple-300 font-mono">Widget Personalizado Aura</div><div class="text-2xl font-bold text-white mt-1">48.2 TOPS</div>`;
    }
}

function startCanvasAnimations() {
    const c = document.getElementById('hub-main-canvas');
    if (!c) return;
    const ctx = c.getContext('2d');
    let step = 0;
    function draw() {
        c.width = c.clientWidth;
        c.height = c.clientHeight;
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.beginPath();
        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2;
        for (let x = 0; x < c.width; x += 10) {
            const y = c.height / 2 + Math.sin((x + step) * 0.05) * 20;
            if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
        step += 2;
        requestAnimationFrame(draw);
    }
    draw();
}
function setActiveTab(tabId) {
    // Oculta la galería general y muestra la vista de pantalla activa
    switchViewMode('single');

    // Mapea cada pestaña con su respectivo módulo modular
    const modules = {
        'tee': renderSiliconTeModule(),       // Viene de silicon-tee.js
        'mesh': renderMeshNetworkModule(),     // Viene de mesh-network.js
        'vault': renderVectorVaultModule(),    // Viene de vector-vault.js
        'neural': renderNeuralAgentModule()    // Viene de neural-agent.js
    };

    // Inyecta el contenido del módulo seleccionado en el contenedor principal
    // (Puedes asegurarte de tener un <div id="dynamic-module-container"></div> en tu HTML para esto)
    const container = document.getElementById('dynamic-module-container');
    if (container && modules[tabId]) {
        container.innerHTML = modules[tabId];
    }

    // Refresca los iconos gráficos de Lucide
    if (window.lucide) {
        lucide.createIcons();
    }
        

