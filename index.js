document.addEventListener('DOMContentLoaded', () => {
    const menuOptions = document.querySelectorAll('#menu .opcao');
    const savedOption = localStorage.getItem('selectedOption');
    
    if (savedOption) {
        menuOptions[savedOption].classList.add('selected');
    }

    menuOptions.forEach((option, index) => {
        option.addEventListener('click', () => {
            localStorage.setItem('selectedOption', index);
            menuOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });

    const clearPreferencesButton = document.getElementById('clearPreferences');
    clearPreferencesButton.addEventListener('click', () => {
        localStorage.clear();
        location.reload(); 

        const customEvent = new CustomEvent('preferencesCleared', {
            detail: { message: 'Preferências limpas com sucesso' },
            bubbles: true,
            cancelable: true
        });
        clearPreferencesButton.dispatchEvent(customEvent);
    });

    const userNameDisplay = document.getElementById('userName');
    const editNameButton = document.getElementById('editName');
    const savedName = localStorage.getItem('userName') || 'Usuário';

    userNameDisplay.textContent = savedName;

    editNameButton.addEventListener('click', () => {
        const newName = prompt('Digite o novo nome:', savedName);
        if (newName) {
            userNameDisplay.textContent = newName;
            localStorage.setItem('userName', newName);
            const customEvent = new CustomEvent('userNameChanged', {
                detail: { newName: newName },
                bubbles: true,
                cancelable: true
            });
            editNameButton.dispatchEvent(customEvent);
        }
    });

    document.body.addEventListener('preferencesCleared', (e) => {
        console.log('Capture: Preferências limpas:', e.detail.message);
    }, true);

    document.body.addEventListener('userNameChanged', (e) => {
        console.log('Capture: Nome do usuário alterado para:', e.detail.newName);
    }, true);

    document.body.addEventListener('preferencesCleared', (e) => {
        console.log('Bubble: Preferências limpas:', e.detail.message);
    });

    document.body.addEventListener('userNameChanged', (e) => {
        console.log('Bubble: Nome do usuário alterado para:', e.detail.newName);
    });

    const notificationArea = document.getElementById('notificationArea');

    document.body.addEventListener('preferencesCleared', (e) => {
        notificationArea.textContent = e.detail.message;
        notificationArea.style.display = 'block';
        hideNotification();
    });

    document.body.addEventListener('userNameChanged', (e) => {
        notificationArea.textContent = `Nome do usuário alterado para ${e.detail.newName}`;
        notificationArea.style.display = 'block';
        hideNotification();
    });

    function hideNotification() {
        setTimeout(() => {
            notificationArea.style.display = 'none';
        }, 2000);
    }
});
