const email = sessionStorage.getItem('email');

// Redireciona para a página inicial caso não esteja logado
if (!!email === false) {
    window.location.href = '../pages/index.html';
}

let idAtualizar = -1;
let listaMemos = JSON.parse(localStorage.getItem(email)) ?? [];

const formCadastro = document.getElementById('form-cadastro');
const formAtualizar = document.getElementById('form-atualizar');

const nameUpdate = document.getElementById('name-update');
const phoneUpdate = document.getElementById('memo-update');

const row = document.getElementById('list-contacts');

const modalCadastro = new bootstrap.Modal('#modal-cadastro');
const modalApagar = new bootstrap.Modal('#modal-apagar');
const modalAtualizar = new bootstrap.Modal('#modal-atualizar');

//Carrega os recados ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    listaMemos.forEach(recado => addContact(recado))
});

//Botão de Deslogar
document.getElementById('logout-button').addEventListener(
    'click', () => {
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('password');
        window.location.href = '../pages/index.html'
    }
);

//Submit do cadastro de recados
formCadastro.addEventListener('submit', e => {
    e.preventDefault();
    if (!formCadastro.checkValidity()) {
        formCadastro.classList.add('was-validated');
        return;
    };

    const name = document.getElementById('name').value;
    const memo = document.getElementById('memo').value;

    const newMemo = {
        id: new Date().getTime(),
        name,
        memo
    };

    listaMemos.push(newMemo);
    localStorage.setItem(email, JSON.stringify(listaMemos));
    formCadastro.reset();
    addContact(newMemo);
    modalCadastro.hide();
    formCadastro.classList.remove('was-validated');
    showAlert('success', 'Recado adicionado com sucesso!')
})


//Submit ao atualizar
formAtualizar.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!formAtualizar.checkValidity()) {
        formAtualizar.classList.add('was-validated')
        return
    }

    const exist = listaMemos.some((memo) => {
        if (memo.id === idAtualizar) {
            return false
        }

        return memo.memo === phoneUpdate.value
    })

    if (exist) {
        modalAtualizar.hide()
        showAlert('danger', 'Esse número já esta salvo como outro memo!')
        return
    }

    const newIndex = listaMemos.findIndex((memo) => memo.id === idAtualizar);
    listaMemos[newIndex].name = nameUpdate.value;
    listaMemos[newIndex].memo = phoneUpdate.value;

    localStorage.setItem(email, JSON.stringify(listaMemos));

    const cardTitle = document.querySelector(`#memo-${idAtualizar} .card-title`);
    cardTitle.innerHTML = nameUpdate.value;

    const cardText = document.querySelector(`#memo-${idAtualizar} .card-text`);
    cardText.innerHTML = phoneUpdate.value;


    modalAtualizar.hide();
    showAlert('success', 'Recado atualizado com sucesso!');
    idAtualizar = -1;
    formAtualizar.classList.remove('was-validated');
})

function addContact(recado) {
    const { id, name, memo } = recado;
    const col = document.createElement('div')
    col.setAttribute('class', 'col-12 col-sm-6 col-lg-4 col-xl-3')
    col.setAttribute('id', `memo-${id}`)

    const card = document.createElement('div')
    card.setAttribute('class', 'card')

    const cardBody = document.createElement('div')
    cardBody.setAttribute('class', 'card-body text-light')

    const cardTitle = document.createElement('h5')
    cardTitle.setAttribute('class', 'card-title text-light')
    cardTitle.innerHTML = name

    const cardText = document.createElement('p')
    cardText.setAttribute('class', 'card-text')
    cardText.innerHTML = memo

    const buttonEdit = document.createElement('button')
    buttonEdit.setAttribute('class', 'btn btn-success m-1')
    buttonEdit.addEventListener('click', () => {
        modalAtualizar.show()
        nameUpdate.value = name
        phoneUpdate.value = memo
        idAtualizar = id
    })
    buttonEdit.innerHTML = `<i class="bi bi-pencil-square"></i>`


    const buttonDelete = document.createElement('button')
    buttonDelete.setAttribute('class', 'btn btn-danger m-1')
    buttonDelete.addEventListener('click', () => {
        modalApagar.show()
        const confirmar = document.getElementById('confirmar-exclusao')
        confirmar.setAttribute('onclick', `apagar(${id})`)
    })
    buttonDelete.innerHTML = `<i class="bi bi-trash3"></i>`

    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardText)
    cardBody.appendChild(buttonEdit)
    cardBody.appendChild(buttonDelete)

    card.appendChild(cardBody)
    col.appendChild(card)

    row.appendChild(col)
}

function apagar(idMemo) {
    const indice = listaMemos.findIndex(memo => memo.id === idMemo)
    listaMemos.splice(indice, 1)

    localStorage.setItem(email, JSON.stringify(listaMemos))

    const col = document.getElementById(`memo-${idMemo}`)
    col.remove()


    modalApagar.hide()
    showAlert('success', 'Recado deletado com sucesso!')
}

function showAlert(modo, mensagem) {
    const containerToast = document.getElementById('container-notificacao');

    const toast = document.createElement('div');
    toast.setAttribute('role', 'alert')
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.setAttribute('class', 'toast align-items-center border-0 show');
    toast.classList.add(`text-bg-${modo}`);

    const content = document.createElement('div');
    content.setAttribute('class', 'd-flex');

    const toastBody = document.createElement('div')
    toastBody.setAttribute('class', 'toast-body')
    toastBody.innerHTML = `${mensagem}`

    const butttonDismiss = document.createElement('button')
    butttonDismiss.setAttribute('type', 'button')
    butttonDismiss.setAttribute('class', 'btn-close btn-close-white me-2 m-auto')
    butttonDismiss.setAttribute('data-bs-dismiss', 'toast')
    butttonDismiss.setAttribute('aria-label', 'Fechar notificação')

    content.appendChild(toastBody)
    content.appendChild(butttonDismiss)
    toast.appendChild(content);

    containerToast.appendChild(toast)


    setTimeout(() => {
        containerToast.children[0].remove()
    }, 2000)

}






