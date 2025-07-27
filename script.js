// Pega os inputs
const txtpeso = document.getElementById('txtpeso');
const txtalt = document.getElementById('txtaltura');

// Valida peso: apenas números inteiros até 400
txtpeso.addEventListener('input', () => {
    txtpeso.value = txtpeso.value.replace(/\D/g, '');
    if (Number(txtpeso.value) > 400) {
        alert('O peso máximo permitido é 400')
        txtpeso.value = '400';
    }
});

txtalt.addEventListener('input', () => {
    // Remove tudo que não for número
    let val = txtalt.value.replace(/\D/g, '');

    // Só processa se tiver pelo menos 2 dígitos
    if (val.length >= 2) {
        // Coloca a vírgula depois do primeiro dígito
        txtalt.value = val.slice(0, 1) + '.' + val.slice(1, 3);
    } else {
        txtalt.value = val;
    }

    // Limita a no máximo "2,75"
    let altFormatada = txtalt.value.replace(',', '.');
    let valor = parseFloat(altFormatada);
    if (!isNaN(valor) && valor > 2.75) {
        alert('A altura máxima permitida é 2.75')
        txtalt.value = '2.75';
    }
});

// Função chamada no botão "Calcular"
function calcular() {
    const peso = Number(txtpeso.value);
    const altura = Number(txtalt.value);

    // Verifica se os campos estão preenchidos corretamente
    if (!peso || !altura || altura === 0) {
        alert('Preencha corretamente os campos.');
        return;
    }

    const imc = peso / (altura * altura);
    const resultado = parseFloat(imc.toFixed(1));

    const resimc = document.getElementById('imc');
    const conteiner_res = document.getElementById('conteudores');
    const msg = document.getElementById('msg');

    conteiner_res.style.display = 'block';
    resimc.innerHTML = resultado;

    if (resultado < 18.5) {
        resimc.style.color = 'orange';
        msg.innerText = 'Cuidado! Você está abaixo do peso!';
    } else if (resultado <= 24.9) {
        resimc.style.color = 'green';
        msg.innerText = 'Você está no peso ideal!';
    } else if (resultado < 29.9) {
        resimc.style.color = 'orange';
        msg.innerText = 'Cuidado! Você está com sobrepeso!';
    } else if (resultado < 34.9) {
        resimc.style.color = 'darkorange';
        msg.innerText = 'Cuidado! Você está com obesidade moderada!';
    } else if (resultado <= 39.9) {
        resimc.style.color = 'red';
        msg.innerText = 'Cuidado! Você está com obesidade severa!';
    } else {
        resimc.style.color = 'darkred';
        msg.innerText = 'Cuidado! Você está com obesidade mórbida!';
    }

    msg.style.marginTop = '10px';

    // Limpa os campos após calcular
    txtpeso.value = '';
    txtalt.value = '';
}