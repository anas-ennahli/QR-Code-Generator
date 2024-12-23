 // Dark mode toggle
 const toggleDarkMode = document.getElementById('toggleDarkMode');
 const darkModeIcon = document.getElementById('darkModeIcon');
 const darkModeText = document.getElementById('darkModeText');

 toggleDarkMode.addEventListener('click', () => {
   document.documentElement.classList.toggle('dark');
   const isDark = document.documentElement.classList.contains('dark');

   darkModeIcon.src = isDark
     ? "https://img.icons8.com/ios-filled/24/ffffff/sun--v1.png"
     : "https://img.icons8.com/ios-filled/24/000000/moon-symbol.png";

   darkModeText.textContent = isDark ? "Light Mode" : "Dark Mode";
 });

 document.getElementById('generateBtn').addEventListener('click', () => {
   const link = document.getElementById('linkInput').value;
   const qrCodeDiv = document.getElementById('qrcode');
   const downloadOptions = document.getElementById('downloadOptions');

   // Clear any previous QR codes
   qrCodeDiv.innerHTML = '';
   downloadOptions.classList.add('hidden');

   if (link) {
     // Generate QR code canvas
     QRCode.toCanvas(link, { width: 200 }, (error, canvas) => {
       if (error) {
         console.error(error);
         alert('Could not generate QR code.');
         return;
       }
       qrCodeDiv.appendChild(canvas);
       downloadOptions.classList.remove('hidden');

       // Download PNG
       document.getElementById('downloadPng').addEventListener('click', () => {
         const pngLink = canvas.toDataURL();
         const anchor = document.createElement('a');
         anchor.href = pngLink;
         anchor.download = 'qrcode.png';
         anchor.click();
       });
     });

     // Generate QR code SVG
     QRCode.toString(link, { type: 'svg' }, (error, svg) => {
       if (error) {
         console.error(error);
         return;
       }
       document.getElementById('downloadSvg').addEventListener('click', () => {
         const blob = new Blob([svg], { type: 'image/svg+xml' });
         const url = URL.createObjectURL(blob);
         const anchor = document.createElement('a');
         anchor.href = url;
         anchor.download = 'qrcode.svg';
         anchor.click();
         URL.revokeObjectURL(url);
       });
     });
   } else {
     alert('Please enter a valid link.');
   }
 });