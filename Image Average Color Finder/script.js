document.addEventListener('DOMContentLoaded', function() {
    const upload = document.getElementById('upload');
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');
    const averageColorDisplay = document.getElementById('averageColorDisplay');
    const averageColorCode = document.getElementById('averageColorCode');
  
    upload.addEventListener('change', handleImageUpload);
  
    function handleImageUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
  
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                // Ensure image is scaled to fit within 500px width
                const scaleFactor = 500 / img.width;
                canvas.width = 500;
                canvas.height = img.height * scaleFactor;
                ctx.drawImage(img, 0, 0, 500, img.height * scaleFactor);
  
                // Calculate average color
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const averageColor = getAverageColor(imageData);
                displayAverageColor(averageColor);
            };
            img.src = event.target.result;
        };
  
        reader.readAsDataURL(file);
    }
  
    function getAverageColor(imageData) {
        let red = 0, green = 0, blue = 0;
        const totalPixels = imageData.data.length / 4; // Each pixel consists of 4 elements: RGBA
  
        for (let i = 0; i < imageData.data.length; i += 4) {
            red += imageData.data[i];
            green += imageData.data[i + 1];
            blue += imageData.data[i + 2];
        }
  
        red = Math.floor(red / totalPixels);
        green = Math.floor(green / totalPixels);
        blue = Math.floor(blue / totalPixels);
  
        return { red, green, blue };
    }
  
    function displayAverageColor(color) {
        const { red, green, blue } = color;
        const rgbColor = `rgb(${red}, ${green}, ${blue})`;
        averageColorDisplay.style.backgroundColor = rgbColor;
        averageColorCode.innerHTML = `
            <p>RGB: ${rgbColor}</p>
            <p>Hex: ${rgbToHex(red, green, blue)}</p>
        `;
    }
  
    function rgbToHex(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }
  });
  