function uploadFile() {
    var input = document.querySelector('input[type="file"]')

    if(!input.files[0]) {
        return;
    }

    var data = new FormData()
    data.append('file', input.files[0])
    fetch('/', {
        method: 'POST',
        body: data
    }).catch((err) => (alert(err))).finally(() => location.reload());


}

function colorDetail(obj) {
    fetch(`https://www.thecolorapi.com/id?rgb=${obj.style.backgroundColor}`)
        .then((res) => res.json())
        .then((json) => {
            preencherModal(json);
        });

}

function preencherModal(cor) {
    modal.style.display = "flex";
    document.getElementById("hex").innerHTML = `hex: ${cor.hex.value}`
    if(cor.name.exact_match_name) {
        document.getElementById("nome").innerHTML = `Cor exata! Nome: <strong>${cor.name.value}</strong>`
    } else {
        document.getElementById("nome").innerHTML = `Nome da cor mais próxima: <strong>${cor.name.value}</strong>`
    }
    let cssVars = document.querySelector(':root');
    cssVars.style.setProperty('--amostra', cor.hex.value);
}
