   // delete warning 
        const deleteModal = document.getElementById('delete-modal');
        const deleteModalContent = deleteModal.querySelector('div');
        const deleteForm = document.getElementById('delete-trek-form');

        function showDeleteModal() {
            deleteModal.classList.remove('hidden');
            deleteModal.classList.add('flex');
            
            setTimeout(() => {
                deleteModal.classList.remove('opacity-0');
                deleteModalContent.classList.remove('scale-95');
                deleteModalContent.classList.add('scale-100');
            }, 10);
        }

        function closeDeleteModal() {
            deleteModal.classList.add('opacity-0');
            deleteModalContent.classList.remove('scale-100');
            deleteModalContent.classList.add('scale-95');
            
            setTimeout(() => {
                deleteModal.classList.add('hidden');
                deleteModal.classList.remove('flex');
            }, 300);
        }

        function submitDeleteForm() {
            deleteForm.submit();
        }