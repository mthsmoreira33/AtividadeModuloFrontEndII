document.getElementById('form-login').addEventListener ('submit', e => {
    e.preventDefault();
    const emailInput = document.getElementById('emailLogin').value;
    const passwordInput = document.getElementById('passwordLogin').value;

    //Confere se email e senha digitados existem no local storage
    const usersDB = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = usersDB.some(user => user.email === emailInput && user.password === passwordInput);

    if(!userExists) {
        showAlert('danger', 'Email ou senha não reconhecidos');
        return;
    }

    sessionStorage.setItem('email', emailInput);
    sessionStorage.setItem('password', passwordInput);

    showAlert('success', `Bem vindo ${emailInput}!`);

    //Adiciona delay de 2 segundos para redireciona para sistema de CRUD
    setTimeout(() => {
        window.location.href = '../pages/crud.html';
    }, 2000);

})

function showAlert(modo, mensagem) {
    const containerAlert = document.getElementById('container-alert');
    const toast = document.createElement('div');
    toast.setAttribute('role', 'alert')
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.setAttribute('class', 'toast align-items-center border-0 show');
    toast.classList.add(`text-bg-${modo}`);
    const content = document.createElement('div');
    content.setAttribute('class', 'd-flex');
    const toastBody = document.createElement('div');
    toastBody.setAttribute('class', 'toast-body');
    toastBody.innerHTML = `${mensagem}`;
    const butttonDismiss = document.createElement('button');
    butttonDismiss.setAttribute('type', 'button');
    butttonDismiss.setAttribute('class', 'btn-close btn-close-white me-2 m-auto');
    butttonDismiss.setAttribute('data-bs-dismiss', 'toast');
    butttonDismiss.setAttribute('aria-label', 'Fechar notificação');
    content.appendChild(toastBody);
    content.appendChild(butttonDismiss);
    toast.appendChild(content);
    containerAlert.appendChild(toast);
    setTimeout(() => {
        containerAlert.children[0].remove();
    }, 2000)

}
