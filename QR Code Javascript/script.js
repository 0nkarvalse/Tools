function generateQRCode() {
    var text = document.getElementById('text').value;
    var qrcodeContainer = document.getElementById('qrcode');
    qrcodeContainer.innerHTML = "";

    if (text.trim() !== "") {
        var qrcode = new QRCode(qrcodeContainer, {
            text: text,
            width: 256,
            height: 256,
        });

        setTimeout(() => {
            var canvas = qrcodeContainer.querySelector('canvas');
            var downloadLink = document.getElementById('download-link');
            downloadLink.href = canvas.toDataURL('image/png');
            downloadLink.style.display = 'block';
        }, 100);
    } else {
        alert("Please enter text or URL");
    }
}