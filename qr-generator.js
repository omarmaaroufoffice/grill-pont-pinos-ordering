const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// URL that customers will scan to access the menu
const menuURL = 'https://grill-pont-pinos.onrender.com/';

// Generate QR code
async function generateQRCode() {
  try {
    // Generate QR code as PNG
    const qrCodePath = path.join(__dirname, 'menu-qr-code.png');
    await QRCode.toFile(qrCodePath, menuURL, {
      color: {
        dark: '#2c3e50',  // Dark color
        light: '#ffffff'  // Light color
      },
      width: 300,
      margin: 2,
      errorCorrectionLevel: 'M'
    });

    console.log('✅ QR Code generated successfully!');
    console.log(`📱 QR Code saved to: ${qrCodePath}`);
    console.log(`🔗 QR Code links to: ${menuURL}`);
    
    // Also generate an SVG version
    const svgPath = path.join(__dirname, 'menu-qr-code.svg');
    const svgString = await QRCode.toString(menuURL, {
      type: 'svg',
      color: {
        dark: '#2c3e50',
        light: '#ffffff'
      },
      width: 300,
      margin: 2,
      errorCorrectionLevel: 'M'
    });
    
    fs.writeFileSync(svgPath, svgString);
    console.log(`📱 SVG QR Code saved to: ${svgPath}`);
    
    // Generate a printable HTML version
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Grill at Pont Pinos - Menu QR Code</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            text-align: center;
            padding: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .qr-container {
            background: white;
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            max-width: 500px;
        }
        
        h1 {
            color: #2c3e50;
            margin-bottom: 10px;
            font-size: 2.2rem;
        }
        
        .subtitle {
            color: #7f8c8d;
            margin-bottom: 30px;
            font-size: 1.2rem;
        }
        
        .qr-code {
            margin: 30px 0;
        }
        
        .instructions {
            color: #34495e;
            font-size: 1.1rem;
            line-height: 1.6;
            margin-top: 30px;
        }
        
        .date {
            background: linear-gradient(45deg, #e74c3c, #c0392b);
            color: white;
            padding: 15px;
            border-radius: 10px;
            font-weight: bold;
            font-size: 1.3rem;
            margin: 20px 0;
        }
        
        @media print {
            body {
                background: white;
            }
            .qr-container {
                box-shadow: none;
                border: 2px solid #2c3e50;
            }
        }
    </style>
</head>
<body>
    <div class="qr-container">
        <h1>The Grill at Pont Pinos</h1>
        <div class="subtitle">Special Event Menu</div>
        <div class="date">August 8th Event</div>
        
        <div class="qr-code">
            ${svgString}
        </div>
        
        <div class="instructions">
            <strong>Scan to Order:</strong><br>
            1. Point your phone camera at the QR code<br>
            2. Tap the notification to open the menu<br>
            3. Browse items and add to cart<br>
            4. Enter your name and phone number<br>
            5. Place your order and get your number!
        </div>
    </div>
</body>
</html>`;

    const htmlPath = path.join(__dirname, 'menu-qr-code.html');
    fs.writeFileSync(htmlPath, htmlContent);
    console.log(`🖨️  Printable QR Code saved to: ${htmlPath}`);
    
    console.log('\n📋 Setup Instructions:');
    console.log('1. Print the HTML file for table tents/signs');
    console.log('2. Place QR codes around your venue');
    console.log('3. Start the application with: npm run dev');
    console.log('4. Access admin panel at: http://localhost:3000/admin');
    
  } catch (error) {
    console.error('❌ Error generating QR code:', error);
  }
}

generateQRCode();
