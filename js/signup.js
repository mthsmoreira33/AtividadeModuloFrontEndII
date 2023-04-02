document.getElementById('form-cadastro').addEventListener('submit', e => {
    e.preventDefault();
    const emailInput = document.getElementById('emailSignUp').value;
    const passwordInput = document.getElementById('passwordSignUp').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;


    if (passwordInput !== passwordConfirm) {
        showAlert('danger', 'Senhas devem ser iguais!');
        return;
    }

    //Verifica se o usuário já existe na base de dados de usuário
    const usersDB = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = usersDB.some(usr => usr.email === emailInput);

    if (userExists) {
        showAlert('danger', 'Email já cadastrado');
        return;
    }

    const user = {
        id: new Date().getTime(),
        email: emailInput,
        password: passwordInput
    }

    //Adiciona o novo user na base de dados
    usersDB.push(user);
    localStorage.setItem('users', JSON.stringify(usersDB));

    //Loga direto o usuário no sistema de CRUD
    sessionStorage.setItem('email', emailInput);
    sessionStorage.setItem('password', passwordInput);

    showAlert('success', 'Cadastro realizado com sucesso, você será redirecionado a página de cadastro de recados');

    //Adiciona delay de 2 segundos para redirecionar o usuário ao sistema CRUD
    setTimeout(() => {
        window.location.href = '../pages/crud.html';
    }, 1000);

})

function showAlert(modo, mensagem) {
    const containerAlert = document.getElementById('container-notificacao');
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
