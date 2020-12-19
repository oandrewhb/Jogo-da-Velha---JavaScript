function clickBtn(id){
    if(!vitoria("X") && !vitoria("O") && !tabuleiroFull()){
        var botao = document.querySelector('#'+id);
        if(botao.textContent == ""){
            botao.textContent = getJogadorAtivo();

            var delay = 200
            if(vitoria("X")){
                setTimeout(function () {
                    alert("Jogador X ganhou!")
                    resetTabuleiro();
                }, delay);
            } else if(vitoria("O")){
                setTimeout(function () {
                    alert("Jogador O ganhou!")
                    resetTabuleiro();
                }, delay);
            } else if(tabuleiroFull()){
                setTimeout(function () {
                    alert("Deu velha")
                    resetTabuleiro();
                }, delay);
            } else {
                changeJogadorAtivo()
            }
        }
    }
}

//Retorna o jogador que estiver na vez
function getJogadorAtivo(){
    return document.querySelector('#jogador-ativo').textContent;
}

//Alterna o jogador atual
function changeJogadorAtivo(){
    var jogadorAtivo = getJogadorAtivo();
    if(jogadorAtivo == "X"){
        document.querySelector('#jogador-ativo').textContent = "O";
        document.querySelector('#jogador-x').classList.remove('ativo');
        document.querySelector('#jogador-o').classList.add('ativo');
    } else {
        document.querySelector('#jogador-ativo').textContent = "X";
        document.querySelector('#jogador-x').classList.add('ativo');
        document.querySelector('#jogador-o').classList.remove('ativo');
    }
}

//Reseta o tabuleiro (torna o condeuto de todas as casas == "")
function resetTabuleiro(){
    for(var i = 0; i <= 8; i++){
        document.querySelector('#btn-'+i).textContent = "";
    }
}

//Verifica se um jogador ja ganhou o jogo
function vitoria(jogador){
    var tabuleiro = [[document.querySelector('#btn-0').textContent,document.querySelector('#btn-1').textContent,document.querySelector('#btn-2').textContent],
                  [document.querySelector('#btn-3').textContent,document.querySelector('#btn-4').textContent,document.querySelector('#btn-5').textContent],
                  [document.querySelector('#btn-6').textContent,document.querySelector('#btn-7').textContent,document.querySelector('#btn-8').textContent]]

    //procura por vitoria na horizontal
    var vitoriaHorizontal = false
    for(var linha = 0; linha <= 2; linha++){		
        var contadorVitoriaHorizontal = 0	
        for(var coluna = 0; coluna <= 2; coluna++){
            if(tabuleiro[linha][coluna] == jogador){contadorVitoriaHorizontal++}
        }
        if(contadorVitoriaHorizontal == 3){vitoriaHorizontal = true}
    }

    //procura por vitória na vertical
    var vitoriaVertical = false
    for(var coluna = 0; coluna <= 2; coluna++){		
        var contadorVitoriaVertical = 0	
        for(var linha = 0; linha <= 2; linha++){
            if(tabuleiro[linha][coluna] == jogador){contadorVitoriaVertical++}
        }
        if(contadorVitoriaVertical == 3){vitoriaVertical = true}
    }

    //procura vitória na diagonal
    var vitoriaDiagonal = false
    if(tabuleiro[1][1] == jogador){
        if(tabuleiro[0][0] == jogador && tabuleiro[2][2] == jogador){
            vitoriaDiagonal = true
        } else if(tabuleiro[0][2] == jogador && tabuleiro[2][0] == jogador){
            vitoriaDiagonal = true
        }
    }

    //analisa os resultados para o retorno
    if(vitoriaHorizontal || vitoriaVertical || vitoriaDiagonal){
        return true
    } else {
        return false
    }
}

//Verifica se o tabuleiro ja foi preenchido
function tabuleiroFull(){
    var casasPreenchidas = 0
    for(var i = 0; i <= 8; i++){
        if(document.querySelector('#btn-'+i).textContent != ""){casasPreenchidas++}
    }
    return casasPreenchidas == 9
}