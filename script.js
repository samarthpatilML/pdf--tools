function createPDF() {
    const fileInput = document.getElementById('fileInput');
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.innerHTML = ''; // Clear previous images
    const files = fileInput.files;

    if (files.length === 0) {
        alert('Please select at least one image.');
        return;
    }

    const imgElements = [];
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = document.createElement('img');
            img.src = event.target.result;
            imagePreview.appendChild(img);
            imgElements.push(img);

            if (imgElements.length === files.length) {
                generatePDF(imgElements);
            }
        };
        reader.readAsDataURL(file);
    });
}

function generatePDF(images) {
    const opt = {
        margin: 0.5,
        filename: 'photos.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    const pdfContent = document.createElement('div');
    images.forEach(img => {
        const imgWrapper = document.createElement('div');
        imgWrapper.appendChild(img.cloneNode());
        pdfContent.appendChild(imgWrapper);
    });

    html2pdf().set(opt).from(pdfContent).save().then(() => {
        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = URL.createObjectURL(pdfContent);
        downloadLink.download = 'photos.pdf';
        downloadLink.style.display = 'block';
    });
}