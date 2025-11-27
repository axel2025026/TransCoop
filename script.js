// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar la aplicación
    initApp();
});

function initApp() {
    // Configurar eventos
    setupEventListeners();
    
    // Cargar datos iniciales
    loadInitialData();
}

function setupEventListeners() {
    // Botón de transcripción
    const transcribeBtn = document.getElementById('transcribe-btn');
    transcribeBtn.addEventListener('click', handleTranscription);
    
    // Botón de subir a la comunidad
    const uploadBtn = document.getElementById('upload-btn');
    uploadBtn.addEventListener('click', handleUpload);
    
    // Navegación suave
    setupSmoothScrolling();
}

function setupSmoothScrolling() {
    // Seleccionar todos los enlaces de navegación
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function handleTranscription() {
    const musicLink = document.getElementById('music-link').value;
    const instrument = document.getElementById('instrument').value;
    const resultContainer = document.getElementById('result');
    
    // Validar entrada
    if (!musicLink) {
        showMessage('Por favor, ingresa un enlace de música.', 'error');
        return;
    }
    
    // Mostrar mensaje de procesamiento
    resultContainer.innerHTML = `
        <div class="processing">
            <div class="spinner"></div>
            <p>Procesando tu solicitud...</p>
        </div>
    `;
    
    // Simular procesamiento (en una aplicación real, aquí se haría una llamada a una API)
    setTimeout(() => {
        // Simular resultado exitoso
        const instrumentNames = {
            'guitarra': 'Guitarra',
            'bajo': 'Bajo',
            'piano': 'Piano',
            'bateria': 'Batería',
            'violin': 'Violín',
            'saxofon': 'Saxofón'
        };
        
        resultContainer.innerHTML = `
            <div class="success-result">
                <h3>¡Transcripción completada!</h3>
                <p>Se ha generado la partitura para ${instrumentNames[instrument]}.</p>
                <div class="sheet-preview">
                    <div class="sheet-mockup">
                        <div class="staff">
                            <div class="staff-line"></div>
                            <div class="staff-line"></div>
                            <div class="staff-line"></div>
                            <div class="staff-line"></div>
                            <div class="staff-line"></div>
                        </div>
                        <div class="notes">
                            <div class="note"></div>
                            <div class="note"></div>
                            <div class="note"></div>
                        </div>
                    </div>
                </div>
                <div class="actions">
                    <button class="btn">Descargar Partitura</button>
                    <button class="btn secondary">Compartir</button>
                </div>
            </div>
        `;
        
        // Agregar estilos para la vista previa de partitura
        addSheetMusicStyles();
        
        showMessage('Transcripción completada con éxito.', 'success');
    }, 2000);
}

function handleUpload() {
    const songTitle = document.getElementById('song-title').value;
    const artist = document.getElementById('artist').value;
    const fileInput = document.getElementById('file-upload');
    
    // Validar entrada
    if (!songTitle || !artist || !fileInput.files.length) {
        showMessage('Por favor, completa todos los campos y selecciona un archivo.', 'error');
        return;
    }
    
    // Simular subida
    showMessage('Subiendo tu transcripción...', 'info');
    
    setTimeout(() => {
        showMessage('¡Tu transcripción ha sido subida exitosamente a la comunidad!', 'success');
        
        // Limpiar formulario
        document.getElementById('song-title').value = '';
        document.getElementById('artist').value = '';
        document.getElementById('file-upload').value = '';
    }, 1500);
}

function showMessage(message, type) {
    // Crear elemento de mensaje
    const messageEl = document.createElement('div');
    messageEl.className = `message ${type}`;
    messageEl.textContent = message;
    
    // Estilos para el mensaje
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease-out;
    `;
    
    // Colores según el tipo
    if (type === 'error') {
        messageEl.style.backgroundColor = '#f44336';
    } else if (type === 'success') {
        messageEl.style.backgroundColor = '#4CAF50';
    } else {
        messageEl.style.backgroundColor = '#2196F3';
    }
    
    // Agregar al DOM
    document.body.appendChild(messageEl);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        messageEl.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 300);
    }, 3000);
}

function addSheetMusicStyles() {
    // Agregar estilos CSS para la vista previa de partitura
    const style = document.createElement('style');
    style.textContent = `
        .sheet-preview {
            margin: 20px 0;
        }
        
        .sheet-mockup {
            position: relative;
            height: 120px;
            background-color: white;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 10px;
        }
        
        .staff {
            position: relative;
            height: 100%;
        }
        
        .staff-line {
            position: absolute;
            width: 100%;
            height: 1px;
            background-color: #333;
        }
        
        .staff-line:nth-child(1) { top: 20%; }
        .staff-line:nth-child(2) { top: 35%; }
        .staff-line:nth-child(3) { top: 50%; }
        .staff-line:nth-child(4) { top: 65%; }
        .staff-line:nth-child(5) { top: 80%; }
        
        .notes {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        
        .note {
            position: absolute;
            width: 15px;
            height: 15px;
            background-color: #333;
            border-radius: 50%;
        }
        
        .note:nth-child(1) { top: 45%; left: 20%; }
        .note:nth-child(2) { top: 35%; left: 40%; }
        .note:nth-child(3) { top: 55%; left: 60%; }
        
        .processing {
            text-align: center;
        }
        
        .spinner {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-left-color: #4CAF50;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 15px;
        }
        
        .actions {
            display: flex;
            gap: 10px;
            justify-content: center;
            margin-top: 20px;
        }
        
        .btn.secondary {
            background-color: #6c757d;
        }
        
        .btn.secondary:hover {
            background-color: #5a6268;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    
    document.head.appendChild(style);
}

function loadInitialData() {
    // En una aplicación real, aquí cargaríamos datos de una API
    console.log('Cargando datos iniciales...');
    
    // Simular carga de datos populares
    setTimeout(() => {
        console.log('Datos cargados exitosamente');
    }, 500);
}

// Funcionalidad adicional: Búsqueda en tiempo real (para futuras implementaciones)
function setupSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar canciones...';
    searchInput.id = 'search-input';
    
    // Estilos para el campo de búsqueda
    searchInput.style.cssText = `
        padding: 10px 15px;
        border: 1px solid #ddd;
        border-radius: 5px;
        width: 250px;
        margin-left: 20px;
    `;
    
    // Agregar al header
    const headerContainer = document.querySelector('header .container');
    headerContainer.appendChild(searchInput);
    
    // Evento de búsqueda
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        // En una aplicación real, aquí filtraríamos los resultados
        console.log('Buscando:', searchTerm);
    });
}

// Inicializar búsqueda (comentado por ahora)
// setupSearch();
