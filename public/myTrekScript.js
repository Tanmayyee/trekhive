   // delete warning 
    let activeFormId = null; 

    function showDeleteModal(formId) {
        activeFormId = formId; 
        const deleteModal = document.getElementById('delete-modal');
        if (!deleteModal) return;
        
        const deleteModalContent = deleteModal.querySelector('div');

        deleteModal.classList.remove('hidden');
        deleteModal.classList.add('flex');
        
        setTimeout(() => {
            deleteModal.classList.remove('opacity-0');
            deleteModalContent.classList.remove('scale-95');
            deleteModalContent.classList.add('scale-100');
        }, 10);
    }

    function closeDeleteModal() {
        const deleteModal = document.getElementById('delete-modal');
        if (!deleteModal) return;
        
        const deleteModalContent = deleteModal.querySelector('div');

        deleteModal.classList.add('opacity-0');
        deleteModalContent.classList.remove('scale-100');
        deleteModalContent.classList.add('scale-95');
        
        setTimeout(() => {
            deleteModal.classList.add('hidden');
            deleteModal.classList.remove('flex');
            activeFormId = null; 
        }, 300);
    }

    function submitDeleteForm() {
        if (activeFormId) {
            document.getElementById(activeFormId).submit(); 
        }
    }