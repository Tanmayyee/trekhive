const imageInput = document.getElementById('image-upload');
const previewContainer = document.getElementById('image-preview-container');
const errorMsg = document.getElementById('image-error');

let currentNewFiles = []; // Nayi select ki gayi files ka record

if (imageInput) {
    imageInput.addEventListener('change', function(e) {
        // Jab user files select kare, usko currentNewFiles array mein daal do
        currentNewFiles = Array.from(this.files);
        renderPreviews();
    });
}

function renderPreviews() {
    if (!previewContainer) return;
    previewContainer.innerHTML = ''; 
    if (errorMsg) errorMsg.classList.add('hidden'); 
    
    // 1. Calculate Existing Images (Database me pehle se kitni hain)
    const baseExisting = parseInt(imageInput.getAttribute('data-existing')) || 0;
    const deleteCheckboxes = document.querySelectorAll('.delete-checkbox:checked');
    const remainingImages = baseExisting - deleteCheckboxes.length;

    // 2. Check Limit (Max 5 total)
    if (remainingImages + currentNewFiles.length > 5) {
        showError(`Max 5 images allowed. You have ${remainingImages} existing and tried to add ${currentNewFiles.length} more.`);
        currentNewFiles = []; // Saari nayi files hata do array se
        updateFileInput(); // HTML input tag ko khali karo
        return;
    }

    // 3. Check Size (Max 10MB)
    const maxSize = 10 * 1024 * 1024; 
    const oversizedFile = currentNewFiles.find(f => f.size > maxSize);
    
    if (oversizedFile) {
        showError(`The file "${oversizedFile.name}" exceeds 10MB.`);
        currentNewFiles = [];
        updateFileInput();
        return;
    }

    // 4. Render "New" Files with a RED CROSS
    currentNewFiles.forEach((file, index) => {
        const imgUrl = URL.createObjectURL(file);
        const imgBox = document.createElement('div');
        imgBox.className = "relative mt-3"; // Removed 'group' to make cross ALWAYS visible
        
        imgBox.innerHTML = `
            <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden border-2 border-emerald-500 shadow-sm relative">
                <img src="${imgUrl}" class="w-full h-full object-cover">
            </div>
            <span class="absolute bottom-1 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase pointer-events-none z-0">New</span>
            
            <!-- Hamesha dikhne wala Laal Cross Button -->
            <button type="button" onclick="removeNewImage(${index})" 
                class="absolute -top-2 -right-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md transition-all hover:scale-110 focus:outline-none cursor-pointer z-10">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        `;
        previewContainer.appendChild(imgBox);
    });

    updateFileInput();
}

// DataTransfer API: Taaki jo file user ne cross ki hai, wo actual form submit hone par backend pe na jaye
function updateFileInput() {
    const dt = new DataTransfer();
    currentNewFiles.forEach(file => dt.items.add(file));
    imageInput.files = dt.files; // Backend ko sirf bachi hui files jayengi
}

// Global function: Nayi upload ki hui image ko UI aur HTML input dono se hatane ke liye
window.removeNewImage = function(index) {
    currentNewFiles.splice(index, 1); // Array se hatao
    renderPreviews(); // UI ko refresh karo
};

// Global function: Pehle se saved image ko hatane ke liye
window.removeExistingImage = function(checkboxId, boxId) {
    // Hidden checkbox ko check (tick) karo
    const checkbox = document.getElementById(checkboxId);
    checkbox.checked = true;
    
    // Image box ko screen se gayab karo
    const box = document.getElementById(boxId);
    box.style.display = 'none';
    
    // Limit wapas calculate karne ke liye preview render call karo
    renderPreviews();
};

function showError(msg) {
    if (!errorMsg) return;
    errorMsg.innerText = msg;
    errorMsg.classList.remove('hidden');
    errorMsg.classList.add('block');
}