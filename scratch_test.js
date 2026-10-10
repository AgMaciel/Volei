const HORARIO_INICIO = 8 * 60; // 08:00
const HORARIO_LIMITE = 18 * 60; // 18:00

const simularSet = (pontuacaoBase, teto) => {
  let pontos = pontuacaoBase;
  if (Math.random() < 0.20) {
    pontos = Math.floor(Math.random() * (teto - pontuacaoBase)) + pontuacaoBase + 1;
  }
  return pontos;
};

const estimarTempoSet = (pontos) => {
  const segundosPorPonto = 20 + Math.random() * 12; // 20 a 32
  return (pontos * segundosPorPonto) / 60;
};

const simularPartida = (pontuacaoBase, teto, quantidadeSets) => {
  const setsNecessarios = Math.ceil(quantidadeSets / 2);
  let setsVencedor = 0;
  let setsPerdedor = 0;
  const temposDosSets = [];

  while (setsVencedor < setsNecessarios && setsPerdedor < setsNecessarios) {
    const pontos = simularSet(pontuacaoBase, teto);
    const tempoSet = estimarTempoSet(pontos);
    temposDosSets.push(tempoSet);

    if (Math.random() < 0.5) setsVencedor++;
    else setsPerdedor++;
  }

  const quantidadeSetsJogados = temposDosSets.length;
  const tempoTotalSets = temposDosSets.reduce((a, b) => a + b, 0);
  const quantidadeIntervalos = Math.max(0, quantidadeSetsJogados - 1);
  const tempoTotalIntervalos = quantidadeIntervalos * 5; // TEMPO_INTERVALO_ENTRE_SETS = 5
  const duracaoTotal = tempoTotalSets + tempoTotalIntervalos;

  return {
    quantidadeSetsJogados,
    temposDosSets,
    tempoTotalSets,
    tempoTotalIntervalos,
    duracaoTotal,
  };
};

const simularTorneio = (pontuacaoBase, teto, tempoAlmoco, quantidadeSets, numeroJogos) => {
  let tempoAtual = HORARIO_INICIO;
  const temposJogos = [];
  const detalhesJogos = [];
  let horarioAlmoco = null;
  const jogoAlmoco = 7;

  for (let jogo = 1; jogo <= numeroJogos; jogo++) {
    if (jogo === jogoAlmoco) {
      horarioAlmoco = tempoAtual;
      tempoAtual += tempoAlmoco;
    }

    const resultadoPartida = simularPartida(pontuacaoBase, teto, quantidadeSets);
    const duracao = Math.round(resultadoPartida.duracaoTotal);
    temposJogos.push(duracao);
    detalhesJogos.push(resultadoPartida);
    tempoAtual += duracao;

    if (jogo < numeroJogos) {
      tempoAtual += 5; // TEMPO_INTERVALO_ENTRE_JOGOS = 5
    }
  }

  return {
    horarioFinal: tempoAtual,
    terminouNoPrazo: tempoAtual <= HORARIO_LIMITE,
    temposJogos,
    detalhesJogos,
    horarioAlmoco,
  };
};

console.time("sim");
let sucessos = 0;
for (let i = 0; i < 10000; i++) {
  if (simularTorneio(21, 27, 120, 3, 13).terminouNoPrazo) sucessos++;
}
console.timeEnd("sim");
console.log(sucessos);
