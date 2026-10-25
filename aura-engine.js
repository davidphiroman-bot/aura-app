/**
 * AURA AI SOVEREIGN OS - ENGINE CORE v6.0
 * Motor Soberano de Persistencia, Estado y Ejecución de Módulos Offline
 */

class AuraEngine {
    constructor() {
        this.dbName = 'AuraSovereignDB';
        this.dbVersion = 1;
        this.db = null;
        this.state = {
            activeTab: 'home',
            networkStatus: 'OFFLINE_AIRGAP',
            agents: [],
            widgets: [],
            telemetry: { cpu: 12, npuTemp: 34.2, ramFree: '6.4GB' }
        };
        this.init();
    }

    async init() {
        await this.initDatabase();
        this.loadStateFromStorage();
        this.startTelemetryLoop();
        console.log('[AURA ENGINE] Sistema Soberano inicializado y desacoplado.');
    }

    initDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('agents')) {
                    db.createObjectStore('agents', { keyPath: 'id' });
                }
                if (!db.objectStoreNames.contains('logos')) {
                    db.createObjectStore('logos', { keyPath: 'id', autoIncrement: true });
                }
                if (!db.objectStoreNames.contains('widgets')) {
                    db.createObjectStore('widgets', { keyPath: 'id' });
                }
                if (!db.objectStoreNames.contains('vault')) {
                    db.createObjectStore('vault', { keyPath: 'hash' });
                }
            };
            request.onsuccess = (e) => {
                this.db = e.target.result;
                resolve();
            };
            request.onerror = (e) => reject(e);
        });
    }

    loadStateFromStorage() {
        const saved = localStorage.getItem('AURA_STATE');
        if (saved) {
            try { this.state = { ...this.state, ...JSON.parse(saved) }; } catch (e) {}
        }
    }

    saveState() {
        localStorage.setItem('AURA_STATE', JSON.stringify(this.state));
    }

    // Persistencia IndexedDB genérica
    async saveData(storeName, item) {
        if (!this.db) return;
        return new Promise((resolve) => {
            const tx = this.db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            store.put(item);
            tx.oncomplete = () => resolve(true);
        });
    }

    async getAllData(storeName) {
        if (!this.db) return [];
        return new Promise((resolve) => {
            const tx = this.db.transaction(storeName, 'readonly');
            const store = tx.objectStore(storeName);
            const req = store.getAll();
            req.onsuccess = () => resolve(req.result || []);
        });
    }

    startTelemetryLoop() {
        setInterval(() => {
            this.state.telemetry.cpu = Math.floor(10 + Math.random() * 25);
            this.state.telemetry.npuTemp = (33.0 + Math.random() * 2.5).toFixed(1);
            this.dispatchTelemetryUpdate();
        }, 3000);
    }

    dispatchTelemetryUpdate() {
        const cpuEl = document.getElementById('telemetry-cpu-val');
        const tempEl = document.getElementById('telemetry-temp-val');
        if (cpuEl) cpuEl.innerText = `${this.state.telemetry.cpu}%`;
        if (tempEl) tempEl.innerText = `${this.state.telemetry.npuTemp}°C`;
    }
}

window.auraEngine = new AuraEngine();
