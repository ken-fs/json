const fs = require('fs');
const path = require('path');

// 创建一个简单的 ICO 文件生成器
// 这里我们将基于现有的蓝色 SVG 创建一个 ICO 文件

function createBlueIconData() {
  // 这是一个 16x16 蓝色渐变图标的数据
  // 基于项目的蓝色主题 (#3B82F6, #2563EB, #1D4ED8)
  const iconHeader = Buffer.alloc(6);
  iconHeader.writeUInt16LE(0, 0); // Reserved
  iconHeader.writeUInt16LE(1, 2); // Type (1 = ICO)
  iconHeader.writeUInt16LE(1, 4); // Number of images

  // Directory entry for 16x16 icon
  const dirEntry = Buffer.alloc(16);
  dirEntry.writeUInt8(16, 0);  // Width
  dirEntry.writeUInt8(16, 1);  // Height
  dirEntry.writeUInt8(0, 2);   // Color count
  dirEntry.writeUInt8(0, 3);   // Reserved
  dirEntry.writeUInt16LE(1, 4); // Planes
  dirEntry.writeUInt16LE(32, 6); // Bits per pixel
  dirEntry.writeUInt32LE(1128, 8); // Image size
  dirEntry.writeUInt32LE(22, 12); // Image offset

  // Create a simple blue gradient bitmap
  const bitmapHeader = Buffer.alloc(40);
  bitmapHeader.writeUInt32LE(40, 0);  // Header size
  bitmapHeader.writeInt32LE(16, 4);   // Width
  bitmapHeader.writeInt32LE(32, 8);   // Height (doubled for ICO)
  bitmapHeader.writeUInt16LE(1, 12);  // Planes
  bitmapHeader.writeUInt16LE(32, 14); // Bits per pixel
  bitmapHeader.writeUInt32LE(0, 16);  // Compression
  bitmapHeader.writeUInt32LE(1024, 20); // Image size
  bitmapHeader.writeUInt32LE(0, 24);  // X pixels per meter
  bitmapHeader.writeUInt32LE(0, 28);  // Y pixels per meter
  bitmapHeader.writeUInt32LE(0, 32);  // Colors used
  bitmapHeader.writeUInt32LE(0, 36);  // Important colors

  // Create pixel data with blue gradient and JSON-like pattern
  const pixelData = Buffer.alloc(1024); // 16x16 * 4 bytes (BGRA) * 2 (for mask)

  // Blue colors from theme
  const blue1 = { b: 0xF6, g: 0x82, r: 0x3B, a: 0xFF }; // #3B82F6
  const blue2 = { b: 0xEB, g: 0x63, r: 0x25, a: 0xFF }; // #2563EB
  const blue3 = { b: 0xD8, g: 0x4E, r: 0x1D, a: 0xFF }; // #1D4ED8
  const white = { b: 0xFF, g: 0xFF, r: 0xFF, a: 0xFF };

  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const idx = ((15 - y) * 16 + x) * 4; // Flip Y for BMP format

      let color;

      // Create a JSON-like pattern with curly braces and content
      if ((x === 2 || x === 13) && (y >= 3 && y <= 12)) {
        // Curly braces
        color = white;
      } else if ((x >= 4 && x <= 11) && (y === 5 || y === 8 || y === 11)) {
        // Content lines
        color = white;
      } else {
        // Background gradient
        const gradientPos = (x + y) / 30;
        if (gradientPos < 0.33) {
          color = blue1;
        } else if (gradientPos < 0.66) {
          color = blue2;
        } else {
          color = blue3;
        }
      }

      pixelData.writeUInt8(color.b, idx);     // Blue
      pixelData.writeUInt8(color.g, idx + 1); // Green
      pixelData.writeUInt8(color.r, idx + 2); // Red
      pixelData.writeUInt8(color.a, idx + 3); // Alpha
    }
  }

  // Mask data (all transparent for 32-bit icons)
  const maskData = Buffer.alloc(64); // 16x16 / 8 bits per byte * 2

  return Buffer.concat([iconHeader, dirEntry, bitmapHeader, pixelData, maskData]);
}

// Generate the favicon
const iconData = createBlueIconData();
fs.writeFileSync('favicon-blue.ico', iconData);

console.log('Blue favicon generated successfully!');
console.log('Please replace the existing favicon.ico files with favicon-blue.ico');