/**
 * EasyIsSimple - Local Client-Side Image Resizer & Converter Example
 * 
 * This standalone script demonstrates how to convert and resize files
 * locally inside the user's browser using HTML5 Canvas. Your files
 * never touch a server.
 */

async function processImageLocally(file, targetWidth, targetHeight, lockAspectRatio, targetFormat, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    
    img.onload = () => {
      // Release the temporary object URL to free memory
      URL.revokeObjectURL(img.src);
      
      let width = targetWidth;
      let height = targetHeight;
      
      if (lockAspectRatio) {
        const ratio = img.width / img.height;
        if (width / height > ratio) {
          width = height * ratio;
        } else {
          height = width / ratio;
        }
      }
      
      // Create a canvas to execute the scaling operation on client GPU/CPU
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error("Could not acquire 2D canvas context"));
        return;
      }
      
      // Draw the image onto the canvas (resizing it dynamically)
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert the canvas rendering back into a file Blob locally
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Canvas conversion to Blob failed"));
        }
      }, `image/${targetFormat}`, targetFormat === 'png' ? undefined : quality);
    };
    
    img.onerror = (err) => {
      reject(err);
    };
  });
}
