function generateBarcode() {
    const barcodeInput = document.getElementById('barcodeInput').value.trim();

    if (!barcodeInput) {
        alert('Please enter a barcode text!');
        return;
    }

    // Clear previous barcode
    const barcode = document.getElementById('barcode');
    barcode.innerHTML = '';

    // Generate new barcode
    JsBarcode('#barcode', barcodeInput, {
        format: 'CODE128', // Choose the barcode format (CODE128, EAN, etc.)
        displayValue: true, // Display the text below the barcode
        fontSize: 14,
        width: 2,
        height: 50,
        margin: 10
    });
}
