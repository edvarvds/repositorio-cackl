// Função para detectar se o dispositivo é iOS (iPhone, iPad, iPod)
function isIOS() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    // Verifica se é iOS
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return true;
    }
    
    // Método alternativo para detecção de iOS
    return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
}

// Quando o documento estiver carregado, adicionar listeners aos formulários
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona evento ao formulário de consulta CPF
    const cpfForm = document.getElementById('cpf-form');
    if (cpfForm) {
        const originalSubmit = cpfForm.onsubmit;
        
        cpfForm.onsubmit = function(event) {
            // Se for iOS, previne o envio normal e mostra mensagem
            if (isIOS()) {
                event.preventDefault();
                showIOSMessage();
                return false;
            }
            
            // Caso contrário, continua com o comportamento original
            if (typeof originalSubmit === 'function') {
                return originalSubmit.call(this, event);
            }
            return true;
        };
    }
});

// Função para mostrar mensagem "Em progresso" para usuários iOS
function showIOSMessage() {
    // Cria o elemento de overlay se não existir
    let overlay = document.getElementById('ios-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'ios-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        overlay.style.zIndex = '9999';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.padding = '20px';
        overlay.style.textAlign = 'center';
        
        const messageBox = document.createElement('div');
        messageBox.style.maxWidth = '400px';
        messageBox.style.backgroundColor = '#f0f0f0';
        messageBox.style.borderRadius = '8px';
        messageBox.style.padding = '30px';
        messageBox.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        
        const title = document.createElement('h2');
        title.innerText = 'Em progresso';
        title.style.color = '#333';
        title.style.marginBottom = '15px';
        title.style.fontSize = '24px';
        
        const message = document.createElement('p');
        message.innerText = 'Esta funcionalidade ainda não está disponível para dispositivos iOS. Por favor, acesse através de um dispositivo Android.';
        message.style.color = '#666';
        message.style.lineHeight = '1.5';
        
        const icon = document.createElement('div');
        icon.innerHTML = '<i class="fas fa-tools" style="font-size: 48px; color: #999; margin-bottom: 20px;"></i>';
        
        messageBox.appendChild(icon);
        messageBox.appendChild(title);
        messageBox.appendChild(message);
        overlay.appendChild(messageBox);
        
        document.body.appendChild(overlay);
    } else {
        overlay.style.display = 'flex';
    }
}