var can_changeJogadorAtivo = true//variavel que dita se pode ou nao mudar o jogador ativo
var jogadorAtivo = "X"//variavel que guarda o jogador que esta na vez

//Funcao do botao quando clicado
function clickBtn(id){
    if(!vitoria("X") && !vitoria("O") && !tabuleiroFull()){
        var botao = document.querySelector('#'+id);
        if(botao.textContent == ""){
            botao.textContent = jogadorAtivo;

            var delay = 200
            if(vitoria("X")){
                setTimeout(function () {
                    alert("Jogador X ganhou!")
                    resetTabuleiro();
                    atualizaPlacar("x")
                }, delay);
            } else if(vitoria("O")){
                setTimeout(function () {
                    alert("Jogador O ganhou!")
                    resetTabuleiro();
                    atualizaPlacar("o")
                }, delay);
            } else if(tabuleiroFull()){
                setTimeout(function () {
                    alert("Empate!")
                    resetTabuleiro();
                }, delay);
            } else {
                changeJogadorAtivo()
            }
        }
        lockChangeJogadorAtivo()
    }
}

//Atualiza o placar :)
function atualizaPlacar(jogador){
    var placar = document.querySelector('#pontos-'+jogador)
    if(placar.textContent == "-"){
        var pontos = 0
    } else {
        var pontos = parseInt(placar.textContent)
    }
    pontos++
    placar.textContent = pontos;
}
//Reseta o placar
function resetPlacar(){
    document.querySelector('#pontos-x').textContent = "-"
    document.querySelector('#pontos-o').textContent = "-"
}

//Alterna o jogador atual
function changeJogadorAtivo(){
    if(jogadorAtivo == "X"){
        jogadorAtivo = "O";
        document.querySelector('#jogador-x').classList.remove('ativo');
        document.querySelector('#jogador-o').classList.add('ativo');
    } else {
        jogadorAtivo = "X";
        document.querySelector('#jogador-x').classList.add('ativo');
        document.querySelector('#jogador-o').classList.remove('ativo');
    }
}
//Funcao executada quanto o usuario clica no botao changeJogadorAtivo
function btnChangeJogadorAtivo(){
    if(can_changeJogadorAtivo){
        changeJogadorAtivo()
    }
}

//Reseta o tabuleiro (torna o condeuto de todas as casas == "")
function resetTabuleiro(){
    for(var i = 0; i <= 8; i++){
        document.querySelector('#btn-'+i).textContent = "";
    }
    unlockChangeJogadorAtivo()
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

    //procura por vitoria na vertical
    var vitoriaVertical = false
    for(var coluna = 0; coluna <= 2; coluna++){		
        var contadorVitoriaVertical = 0	
        for(var linha = 0; linha <= 2; linha++){
            if(tabuleiro[linha][coluna] == jogador){contadorVitoriaVertical++}
        }
        if(contadorVitoriaVertical == 3){vitoriaVertical = true}
    }

    //procura vitoria na diagonal
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

function jogadaBot(){
    var tabuleiro = [[document.querySelector('#btn-0'),document.querySelector('#btn-1'),document.querySelector('#btn-2')],
                  [document.querySelector('#btn-3'),document.querySelector('#btn-4'),document.querySelector('#btn-5')],
                  [document.querySelector('#btn-6'),document.querySelector('#btn-7'),document.querySelector('#btn-8')]]

    var posJogada = "";//coordenada da casa onde o bot vai jogar

    //Procura por jogadas terminais na horizontal
    for(var linha = 0; linha <= 2; linha++){
        if(tabuleiro[linha][0].textContent == "" && tabuleiro[linha][1].textContent == "X" && tabuleiro[linha][2].textContent == "X"){posJogada = tabuleiro[linha][0]}
        if(tabuleiro[linha][0].textContent == "X" && tabuleiro[linha][1].textContent == "" && tabuleiro[linha][2].textContent == "X"){posJogada = tabuleiro[linha][1]}
        if(tabuleiro[linha][0].textContent == "X" && tabuleiro[linha][1].textContent == "X" && tabuleiro[linha][2].textContent == ""){posJogada = tabuleiro[linha][2]}

        if(tabuleiro[linha][0].textContent == "" && tabuleiro[linha][1].textContent == "O" && tabuleiro[linha][2].textContent == "O"){posJogada = tabuleiro[linha][0]}
        if(tabuleiro[linha][0].textContent == "O" && tabuleiro[linha][1].textContent == "" && tabuleiro[linha][2].textContent == "O"){posJogada = tabuleiro[linha][1]}
        if(tabuleiro[linha][0].textContent == "O" && tabuleiro[linha][1].textContent == "O" && tabuleiro[linha][2].textContent == ""){posJogada = tabuleiro[linha][2]}
    }

    //Procura por jogadas terminais na vertical
    for(var coluna = 0; coluna <= 2; coluna++){
        if(tabuleiro[0][coluna].textContent == "" && tabuleiro[1][coluna].textContent == "X" && tabuleiro[2][coluna].textContent == "X"){posJogada = tabuleiro[0][coluna]}
        if(tabuleiro[0][coluna].textContent == "X" && tabuleiro[1][coluna].textContent == "" && tabuleiro[2][coluna].textContent == "X"){posJogada = tabuleiro[1][coluna]}
        if(tabuleiro[0][coluna].textContent == "X" && tabuleiro[1][coluna].textContent == "X" && tabuleiro[2][coluna].textContent == ""){posJogada = tabuleiro[2][coluna]}

        if(tabuleiro[0][coluna].textContent == "" && tabuleiro[1][coluna].textContent == "O" && tabuleiro[2][coluna].textContent == "O"){posJogada = tabuleiro[0][coluna]}
        if(tabuleiro[0][coluna].textContent == "O" && tabuleiro[1][coluna].textContent == "" && tabuleiro[2][coluna].textContent == "O"){posJogada = tabuleiro[1][coluna]}
        if(tabuleiro[0][coluna].textContent == "O" && tabuleiro[1][coluna].textContent == "O" && tabuleiro[2][coluna].textContent == ""){posJogada = tabuleiro[2][coluna]}
    }

    //Procura por jogadas terminais na diagonal
    if(tabuleiro[0][0].textContent == "" && tabuleiro[1][1].textContent == "X" && tabuleiro[2][2].textContent == "X"){posJogada = tabuleiro[0][0]}
    if(tabuleiro[0][0].textContent == "X" && tabuleiro[1][1].textContent == "" && tabuleiro[2][2].textContent == "X"){posJogada = tabuleiro[1][1]}
    if(tabuleiro[0][0].textContent == "X" && tabuleiro[1][1].textContent == "X" && tabuleiro[2][2].textContent == ""){posJogada = tabuleiro[2][2]}

    if(tabuleiro[0][2].textContent == "" && tabuleiro[1][1].textContent == "X" && tabuleiro[2][0].textContent == "X"){posJogada = tabuleiro[0][2]}
    if(tabuleiro[0][2].textContent == "X" && tabuleiro[1][1].textContent == "" && tabuleiro[2][0].textContent == "X"){posJogada = tabuleiro[1][1]}
    if(tabuleiro[0][2].textContent == "X" && tabuleiro[1][1].textContent == "X" && tabuleiro[2][0].textContent == ""){posJogada = tabuleiro[2][0]}

    if(tabuleiro[0][0].textContent == "" && tabuleiro[1][1].textContent == "O" && tabuleiro[2][2].textContent == "O"){posJogada = tabuleiro[0][0]}
    if(tabuleiro[0][0].textContent == "O" && tabuleiro[1][1].textContent == "" && tabuleiro[2][2].textContent == "O"){posJogada = tabuleiro[1][1]}
    if(tabuleiro[0][0].textContent == "O" && tabuleiro[1][1].textContent == "O" && tabuleiro[2][2].textContent == ""){posJogada = tabuleiro[2][2]}

    if(tabuleiro[0][2].textContent == "" && tabuleiro[1][1].textContent == "O" && tabuleiro[2][0].textContent == "O"){posJogada = tabuleiro[0][2]}
    if(tabuleiro[0][2].textContent == "O" && tabuleiro[1][1].textContent == "" && tabuleiro[2][0].textContent == "O"){posJogada = tabuleiro[1][1]}
    if(tabuleiro[0][2].textContent == "O" && tabuleiro[1][1].textContent == "O" && tabuleiro[2][0].textContent == ""){posJogada = tabuleiro[2][0]}

    //Se nao encontrar nenhuma jogada terminal, joga aleatorio msm :/
    if(posJogada == ""){
        var jogadasPossiveis = []
        for(var casa = 0; casa <= 8; casa++){
            if(document.querySelector('#btn-'+casa).textContent == ""){
                jogadasPossiveis.push(document.querySelector('#btn-'+casa))
            }
        }
        posJogada = jogadasPossiveis[Math.floor(Math.random() * jogadasPossiveis.length)]
    }
    
    clickBtn(posJogada.id)//simula um click de jogador
}

function modoJogo(modo){
    var modoAtual = document.querySelector('#modo-jogo-atual')
    if(modo != modoAtual.textContent){
        modoAtual.textContent = modo
        resetTabuleiro()
    }
}

//Bloqueia o botao changeJogadorAtivo
function lockChangeJogadorAtivo(){
    var btn = document.querySelector('#btn-change-jogador-ativo')
    btn.classList.add('block')
    can_changeJogadorAtivo = false
}
//Desloqueia o botao changeJogadorAtivo
function unlockChangeJogadorAtivo(){
    var btn = document.querySelector('#btn-change-jogador-ativo')
    btn.classList.remove('block')
    can_changeJogadorAtivo = true
}