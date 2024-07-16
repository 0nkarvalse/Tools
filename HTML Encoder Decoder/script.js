// Function to handle encoding and decoding based on active tab
function handleConversion() {
    const inputText = document.getElementById('inputText').value;
    if (document.getElementById('encodeTab').classList.contains('active')) {
        const encodedText = encodeHTML(inputText);
        document.getElementById('outputText').value = encodedText;
    } else {
        const decodedText = decodeHTML(inputText);
        document.getElementById('outputText').value = decodedText;
    }
}

// Event listener for Convert button
document.getElementById('convertButton').addEventListener('click', function() {
    handleConversion();
});

// Event listener for Copy button
document.getElementById('copyButton').addEventListener('click', function() {
    const outputText = document.getElementById('outputText');
    outputText.select();
    document.execCommand('copy');
    alert('Copied to clipboard!');
});

// Event listener for Reset button
document.getElementById('resetButton').addEventListener('click', function() {
    document.getElementById('inputText').value = '';
    document.getElementById('outputText').value = '';
});

// Event listener for Encode HTML tab
document.getElementById('encodeTab').addEventListener('click', function() {
    document.getElementById('encodeTab').classList.add('active');
    document.getElementById('decodeTab').classList.remove('active');
    document.getElementById('convertButton').textContent = 'Encode'; // Change Convert button text
});

// Event listener for Decode HTML tab
document.getElementById('decodeTab').addEventListener('click', function() {
    document.getElementById('decodeTab').classList.add('active');
    document.getElementById('encodeTab').classList.remove('active');
    document.getElementById('convertButton').textContent = 'Decode'; // Change Convert button text
});

// Function to encode HTML entities
function encodeHTML(text) {
    const textarea = document.createElement('textarea');
    textarea.textContent = text;
    return textarea.innerHTML; // Encoded HTML
}

// Function to decode HTML entities
function decodeHTML(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.textContent; // Decoded text
}