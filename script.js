document.addEventListener('DOMContentLoaded', () => {
    // Dynamic background
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        document.documentElement.style.setProperty('--mouse-x', `${x}%`);
        document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    });

    const urlInput = document.getElementById('url-input');
    const generateBtn = document.getElementById('generate-btn');
    const mainContainer = document.getElementById('main-container');
    const qrArea = document.getElementById('qr-area');
    const qrcodeDiv = document.getElementById('qrcode');
    const qrWrapper = document.getElementById('qr-wrapper');

    let qrCodeObj = null;

    const generateQR = () => {
        const url = urlInput.value.trim();
        if (!url) {
            alert("URL을 입력해주세요.");
            return;
        }

        // Move input area down
        mainContainer.classList.add('input-shifted');
        
        // Clear previous QR
        qrcodeDiv.innerHTML = '';
        
        // Generate new QR
        qrCodeObj = new QRCode(qrcodeDiv, {
            text: url,
            width: 200,
            height: 200,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });

        // Show QR Area
        setTimeout(() => {
            qrArea.classList.add('qr-visible');
        }, 300);
    };

    generateBtn.addEventListener('click', generateQR);
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') generateQR();
    });

    // Download as JPG
    qrWrapper.addEventListener('click', () => {
        const canvas = qrcodeDiv.querySelector('canvas');
        if (canvas) {
            // Create a temporary canvas to ensure white background for JPG
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            const ctx = tempCanvas.getContext('2d');
            
            // Fill white background
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
            
            // Draw QR code on top
            ctx.drawImage(canvas, 0, 0);

            const dataUrl = tempCanvas.toDataURL('image/jpeg', 1.0);
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'qrcode.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });
});
