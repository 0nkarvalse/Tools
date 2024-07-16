document.addEventListener('DOMContentLoaded', function() {
    const upload = document.getElementById('upload');
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');
    const colorDisplay = document.getElementById('colorDisplay');
    const colorCodes = document.getElementById('colorCodes');
    const colorShadesContainer = document.getElementById('colorShades');
  
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
  
                // Extract color information on click
                canvas.addEventListener('click', function(event) {
                    const x = event.offsetX;
                    const y = event.offsetY;
                    extractColorInformation(x, y);
                });
            };
            img.src = event.target.result;
        };
  
        reader.readAsDataURL(file);
    }
  
    function extractColorInformation(x, y) {
        const imageData = ctx.getImageData(x, y, 1, 1);
        const pixel = imageData.data;
        const rgba = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${pixel[3]/255})`;
        const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
        const hsl = rgbToHsl(pixel[0], pixel[1], pixel[2]);
  
        // Display color in colorDisplay
        colorDisplay.style.backgroundColor = rgba;
  
        // Display color codes in colorCodes
        colorCodes.innerHTML = `
            <li>Hex: ${hex}</li>
            <li>RGBA: ${rgba}</li>
            <li>HSLA: ${hsl}</li>
        `;
  
        // Generate and display color shades
        const shades = generateColorShades(pixel[0], pixel[1], pixel[2]);
        displayColorShades(shades);
    }
  
    function generateColorShades(r, g, b) {
        const shades = [];
        const step = 25; // Adjust the step size for lighter/darker shades
  
        for (let i = 4; i >= 0; i--) {
            const shadeR = Math.max(0, r - i * step);
            const shadeG = Math.max(0, g - i * step);
            const shadeB = Math.max(0, b - i * step);
            const rgba = `rgba(${shadeR}, ${shadeG}, ${shadeB}, 1)`;
            const hex = rgbToHex(shadeR, shadeG, shadeB);
            const hsl = rgbToHsl(shadeR, shadeG, shadeB);
            shades.push({ rgba, hex, hsl });
        }
  
        return shades;
    }
  
    function displayColorShades(shades) {
        colorShadesContainer.innerHTML = '';
        shades.forEach(shade => {
            const shadeBox = document.createElement('div');
            shadeBox.classList.add('shadeBox');
            shadeBox.style.backgroundColor = shade.rgba;
            
            const colorCode = document.createElement('p');
            colorCode.textContent = `Hex: ${shade.hex}`;
            shadeBox.appendChild(colorCode);
            
            colorShadesContainer.appendChild(shadeBox);
        });
    }
  
    function rgbToHex(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }
  
    function rgbToHsl(r, g, b) {
        r /= 255, g /= 255, b /= 255;
  
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
  
        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
  
        return `hsla(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, 1)`;
    }
  });
  