function clickBtn(id){
    var botao = document.querySelector('#'+id);
    botao.textContent = getJogadorAtivo();
    changeJogadorAtivo();
}

function getJogadorAtivo(){
    return document.querySelector('#jogador-ativo').textContent;
}

function changeJogadorAtivo(){
    var jogadorAtivo = getJogadorAtivo();
    if(jogadorAtivo == "x"){
        document.querySelector('#jogador-ativo').textContent = "o";
        document.querySelector('#jogador-x').classList.remove('ativo');
        document.querySelector('#jogador-o').classList.add('ativo');
    } else {
        document.querySelector('#jogador-ativo').textContent = "x";
        document.querySelector('#jogador-x').classList.add('ativo');
        document.querySelector('#jogador-o').classList.remove('ativo');
    }
}