function fecharModal() {
    document.querySelector('body').style.overflow = 'visible';

    document.querySelector('iframe').setAttribute('src', '');
    document.querySelector('.modal').classList.add('desativado');
}

function abrirModal(adr) {
    document.querySelector('body').style.overflow = 'hidden';

    document.querySelector('iframe').setAttribute('src', `https://rocketseat.com.br/${adr}`);
    document.querySelector('#linkExt').setAttribute('href', `https://rocketseat.com.br/${adr}`);
    document.querySelector('.modal').classList.remove('desativado');
}
