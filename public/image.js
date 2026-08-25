    const imageInput = document.getElementById('image-upload');
    const previewContainer = document.getElementById('image-preview-container');
    const errorMsg = document.getElementById('image-error');

    imageInput.addEventListener('change', function() {
        // Clear old previews and errors
        previewContainer.innerHTML = ''; 
        errorMsg.classList.add('hidden'); 
        
        const files = Array.from(this.files);
        
        // Check no of files
        if (files.length > 5) {
            showError("You can only upload a maximum of 5 images at a time.");
            this.value = ''; //input reset
            return;
        }

        // Check size
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes
        const oversizedFile = files.find(file => file.size > maxSize);
        
        if (oversizedFile) {
            showError(`The file "${oversizedFile.name}" is larger than 10MB. Please choose smaller images.`);
            this.value = ''; 
            return;
        }

        // mini previews
        files.forEach(file => {
            const imgUrl = URL.createObjectURL(file); // Creates a temporary URL for preview
            
            const imgBox = document.createElement('div');
            imgBox.className = 'w-10 h-10 rounded-md overflow-hidden border border-slate-200 shadow-sm relative group';
            
            imgBox.innerHTML = `
                <img src="${imgUrl}" class="w-full h-full object-cover">
            `;
            previewContainer.appendChild(imgBox);
        });
    });

    function showError(msg) {
        errorMsg.innerText = msg;
        errorMsg.classList.remove('hidden');
    }
