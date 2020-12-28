var can_changeJogadorAtivo = true//variavel que dita se pode ou nao mudar o jogador ativo
var can_deixarBotComecar = true//variavel que dita se pode ou nao deixar o bot comecar
var jogadorAtivo = "X"//variavel que guarda o jogador que esta na vez
var modoJogoAtual = "Singleplayer"
var usuario_podeJogar = true//fica falso para evitar que o usuario faca uma jogada quando nao deve
var bot_podejogar = false//guarda a informacao de que o bot pode comecar a proxima partida quando necessario

//Funcao do botao quando clicado pelo usuario
function clickBtn(id){
    if(document.querySelector('#'+id).textContent == ""){
        lockChangeJogadorAtivo()
        lockDeixarBotComecar()
        if(modoJogoAtual == "Singleplayer"){
            if(usuario_podeJogar){//se o usuario estiver na vez (impede que o usuario jogue duas ou mais vezes seguidas)
                jogada(id)//executa a jogada do usuario
                if(posJogada() == "null"){//se o usuario nao ganhou o jogo e nao empatou o jogo
                    usuario_podeJogar = false//usuario nao pode jogar, pois agora e a vez do bot
                    setTimeout(function () {//pequeno delay antes do bot jogar
                        jogadaBot()//bot faz a sua jogada
                        if(vitoria("X") || vitoria("O") || tabuleiroFull()){//se o bot ganhou a partida ou empatou a partida
                            bot_podejogar = true//guarda a informacao de que o bot pode comecar a proxima partida
                            posJogada()
                        } else {
                            changeJogadorAtivo()
                        }
                        usuario_podeJogar = true//agora o usuario pode jogar
                    }, 500);
                }
            }
        } else {
            jogada(id)
            posJogada()
        }
    }
}

//Executa uma jogada no tabuleiro
function jogada(id){
    if(!vitoria("X") && !vitoria("O") && !tabuleiroFull()){
        var botao = document.querySelector('#'+id);
        if(botao.textContent == ""){
            botao.textContent = jogadorAtivo;
            document.querySelector('#col-btn-resetar-tabuleiro').classList.remove('d-none')
        }
    }
}

const posFim = {//Essa variavel vai guardar a funcao q sera executada depois do fim de um jogo
    delay: 400,//Delay antes de executar a funcao posFim
    funcao: function(){}//Funcao posFim
}
//Procedimentos padroes executados apos uma jogada
function posJogada(){
    var delay = 200
    if(vitoria("X")){
        setTimeout(function () {
            msgFimJogo("X Vencedor!")
            posFim.funcao = function(){
                setTimeout(function(){
                    resetTabuleiro();
                    atualizaPlacar("x")
                }, posFim.delay)
            }
            return "vitoriax"
        }, delay);
    } else if(vitoria("O")){
        setTimeout(function () {
            msgFimJogo("O Vencedor!")
            posFim.funcao = function(){
                setTimeout(function(){
                    resetTabuleiro();
                    atualizaPlacar("o")
                }, posFim.delay)
            }
            return "vitoriao"
        }, delay);
    } else if(tabuleiroFull()){
        setTimeout(function () {
            msgFimJogo("Empate!")
            posFim.funcao = function(){
                setTimeout(function(){
                    resetTabuleiro();
                }, posFim.delay)
            }
            return "empate"
        }, delay);
    } else {
        changeJogadorAtivo()
        return "null"
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
    document.querySelector('#col-btn-resetar-placar').classList.remove('d-none')
}
//Reseta o placar
function resetPlacar(){
    document.querySelector('#pontos-x').textContent = "-"
    document.querySelector('#pontos-o').textContent = "-"
    document.querySelector('#col-btn-resetar-placar').classList.add('d-none')
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
    unlockDeixarBotComecar()
    document.querySelector('#col-btn-resetar-tabuleiro').classList.add('d-none')

    setTimeout(function () {//Se o bot tiver ganho ou empatado a partida passada, ele pode comecar essa partida
        if(bot_podejogar){
            jogadaBot()
            changeJogadorAtivo()
            lockChangeJogadorAtivo()
            lockDeixarBotComecar()
            bot_podejogar = false
        }
    }, 200);
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

//Ao chamar essa funcao, um bot vai executar uma jogada
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
    
    jogada(posJogada.id)//simula um click de jogador
}


function changeModoJogo(modo){
    var modoAtual = document.querySelector('#modo-jogo-atual')
    if(modo != modoAtual.textContent){
        modoAtual.textContent = modo
        modoJogoAtual = modo
        if(modo == "Singleplayer"){
            document.querySelector('#col-deixar-bot-comecar').classList.remove('d-none')
        } else{
            document.querySelector('#col-deixar-bot-comecar').classList.add('d-none')
        }
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

//Bloqueia o botao deixarBotComecar
function lockDeixarBotComecar(){
    var btn = document.querySelector('#deixar-bot-comecar')
    btn.classList.add('block')
    can_deixarBotComecar = false
}
//Desloqueia o botao deixarBotComecar
function unlockDeixarBotComecar(){
    var btn = document.querySelector('#deixar-bot-comecar')
    btn.classList.remove('block')
    can_deixarBotComecar = true
}

function deixarBotComecar(){
    if(can_deixarBotComecar){
        lockDeixarBotComecar()
        jogadaBot()
        changeJogadorAtivo()
    }
}

//Mostra uma mensagem de fim de jogo
function msgFimJogo(msg, botVenceu = false){

    document.querySelector('#msg-vencedor').textContent = msg

    //mostra o modal
    $(document).ready(function(){
        $("#modal-msgFimJogo").modal();
    });
}