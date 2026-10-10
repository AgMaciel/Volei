import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  FileText,
  History,
  MapPin,
  Menu,
  Minus,
  Plus,
  Trophy,
  Upload,
  X,
  Maximize2,
  Minimize2,
} from "lucide-react";
import "./styles.css";

const slides = [
  {
    eyebrow: "ALDEIA DA SERRA OPEN • 10 OUT 2026",
    title: "A areia vai ferver em Luziânia.",
    copy: "Um dia inteiro de vôlei, torcida e encontros no Condomínio Aldeia da Serra.",
    image:
      "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1800&q=85",
  },
  {
    eyebrow: "CONDOMÍNIO ALDEIA DA SERRA",
    title: "Do primeiro saque à grande final.",
    copy: "Prepare sua dupla para um dia de competição e celebração em Luziânia.",
    image:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1800&q=85",
  },
  {
    eyebrow: "LUZIÂNIA • GOIÁS",
    title: "A aldeia é o nosso palco.",
    copy: "Vôlei de areia, música e encontros em um cenário especial.",
    image:
      "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=1800&q=85",
  },
  {
    eyebrow: "ALDEIA DA SERRA OPEN • CONVITE",
    title: "Veja a energia do Open.",
    copy: "Acompanhe os vídeos da arena e venha viver esse dia com a gente.",
    video: "/references/video1.mp4",
    poster:
      "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1800&q=85",
  },
  {
    eyebrow: "ALDEIA DA SERRA OPEN • CONVITE",
    title: "Veja a energia do Open.",
    copy: "Acompanhe os vídeos da arena e venha viver esse dia com a gente.",
    video: "/references/video2.mp4",
    poster:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1800&q=85",
  },
  {
    eyebrow: "ALDEIA DA SERRA OPEN • CONVITE",
    title: "Veja a energia do Open.",
    copy: "Acompanhe os vídeos da arena e venha viver esse dia com a gente.",
    video: "/references/video3.mp4",
    poster:
      "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=1800&q=85",
  },
];

const teams = [
  {
    name: "Amarelo",
    color: "#f6bd19",
    athletes: ["Gabriel", "Alessandro", "Júlia", "Lara"],
  },
  {
    name: "Azul",
    color: "#1564f5",
    athletes: ["Tarcio", "Ravi", "Márcia", "Mauricio"],
  },
  {
    name: "Branco",
    color: "#d8d8d3",
    athletes: ["Marcelo", "Katia", "Andréia", "Bia"],
  },
  {
    name: "Laranja",
    color: "#ed7438",
    athletes: ["Isac", "Pereira", "Lucilainy", "Marcela"],
  },
  {
    name: "Marrom / Azul-marinho",
    color: "#81563f",
    athletes: ["Fernando", "Pedro", "Roberta", "Maria Eduarda"],
  },
  {
    name: "Preto",
    color: "#20252c",
    athletes: ["Matheus Oliveira", "Aline", "Marília", "Matheus (Bia)"],
  },
  {
    name: "Rosa",
    color: "#e85d93",
    athletes: ["Agis", "Dirceu", "Rejane", "Fran"],
  },
  {
    name: "Roxo",
    color: "#7c52b6",
    athletes: ["Kayky", "SAN", "Michele", "Maira"],
  },
  {
    name: "Verde",
    color: "#2e9b67",
    athletes: ["Maycon", "Marize", "Elisio", "Isabelly"],
  },
  {
    name: "Vermelho",
    color: "#d44d45",
    athletes: ["Silvio", "Athur", "Nilma", "Ana Paula"],
  },
];

const tournamentGames = [
  { key: "J01", phase: "Chave A", group: "A", gameNumber: "01", time: "09:00", court: "Quadra 01", teamA: 1, teamB: 4 },
  { key: "J02", phase: "Chave A", group: "A", gameNumber: "02", time: "09:20", court: "Quadra 01", teamA: 2, teamB: 3 },
  { key: "J03", phase: "Chave A", group: "A", gameNumber: "03", time: "09:40", court: "Quadra 01", teamA: 0, teamB: 4 },
  { key: "J04", phase: "Chave A", group: "A", gameNumber: "04", time: "10:00", court: "Quadra 01", teamA: 1, teamB: 2 },
  { key: "J05", phase: "Chave B", group: "B", gameNumber: "05", time: "10:20", court: "Quadra 01", teamA: 5, teamB: 8 },
  { key: "J06", phase: "Chave A", group: "A", gameNumber: "06", time: "10:40", court: "Quadra 01", teamA: 0, teamB: 3 },
  { key: "J07", phase: "Chave A", group: "A", gameNumber: "07", time: "11:00", court: "Quadra 01", teamA: 4, teamB: 2 },
  { key: "J08", phase: "Chave A", group: "A", gameNumber: "08", time: "11:20", court: "Quadra 01", teamA: 0, teamB: 1 },
  { key: "J09", phase: "Chave A", group: "A", gameNumber: "09", time: "11:40", court: "Quadra 01", teamA: 3, teamB: 4, breakAfter: "ALMOÇO / INTERVALO — 12:00 ÀS 14:00" },
  { key: "J10", phase: "Chave B", group: "B", gameNumber: "10", time: "14:00", court: "Quadra 01", teamA: 6, teamB: 9 },
  { key: "J11", phase: "Chave B", group: "B", gameNumber: "11", time: "14:20", court: "Quadra 01", teamA: 7, teamB: 8 },
  { key: "J12", phase: "Chave B", group: "B", gameNumber: "12", time: "14:40", court: "Quadra 01", teamA: 5, teamB: 9 },
  { key: "J13", phase: "Chave A", group: "A", gameNumber: "13", time: "15:00", court: "Quadra 01", teamA: 0, teamB: 2 },
  { key: "J14", phase: "Chave B", group: "B", gameNumber: "14", time: "15:20", court: "Quadra 01", teamA: 6, teamB: 7 },
  { key: "J15", phase: "Chave B", group: "B", gameNumber: "15", time: "15:40", court: "Quadra 01", teamA: 9, teamB: 8 },
  { key: "J16", phase: "Chave B", group: "B", gameNumber: "16", time: "16:00", court: "Quadra 01", teamA: 5, teamB: 7 },
  { key: "J17", phase: "Chave A", group: "A", gameNumber: "17", time: "16:20", court: "Quadra 01", teamA: 3, teamB: 1 },
  { key: "J18", phase: "Chave B", group: "B", gameNumber: "18", time: "16:40", court: "Quadra 01", teamA: 8, teamB: 6 },
  { key: "J19", phase: "Chave B", group: "B", gameNumber: "19", time: "17:00", court: "Quadra 01", teamA: 9, teamB: 7 },
  { key: "J20", phase: "Chave B", group: "B", gameNumber: "20", time: "17:20", court: "Quadra 01", teamA: 5, teamB: 6 },
  { key: "J21", phase: "Semifinal", gameNumber: "21", time: "17:40", court: "Quadra 01", seedAGroup: "A", seedA: 1, seedBGroup: "B", seedB: 2 },
  { key: "J22", phase: "Semifinal", gameNumber: "22", time: "18:00", court: "Quadra 01", seedAGroup: "B", seedA: 1, seedBGroup: "A", seedB: 2 },
];

const resultForFixture = (records, key) => records.find((record) => record.fixture === key);

const getTournamentStandings = (registeredTeams, matchRecords) => {
  const teamsByName = registeredTeams.slice(0, 10).map((team, index) => ({
    ...team,
    seed: index + 1,
    group: index < 5 ? "A" : "B",
    played: 0,
    wins: 0,
    losses: 0,
    pointsFor: 0,
    pointsAgainst: 0,
    pointDiff: 0,
  }));
  const teamsByNameMap = new Map(teamsByName.map((team) => [team.name.toUpperCase(), team]));

  matchRecords
    .filter((record) => /^J(?:0[1-9]|1[0-9]|20)$/.test(record.fixture))
    .forEach((record) => {
      const set = record.sets?.[0];
      const teamA = teamsByNameMap.get(record.teamA);
      const teamB = teamsByNameMap.get(record.teamB);
      if (!set || !teamA || !teamB || teamA.group !== teamB.group) return;
      teamA.played += 1;
      teamB.played += 1;
      teamA.pointsFor += Number(set.a) || 0;
      teamA.pointsAgainst += Number(set.b) || 0;
      teamB.pointsFor += Number(set.b) || 0;
      teamB.pointsAgainst += Number(set.a) || 0;
      if (record.winner === record.teamA) {
        teamA.wins += 1;
        teamB.losses += 1;
      } else {
        teamB.wins += 1;
        teamA.losses += 1;
      }
    });

  teamsByName.forEach((team) => {
    team.pointDiff = team.pointsFor - team.pointsAgainst;
  });
  const compareResults = (left, right) =>
    right.pointDiff - left.pointDiff ||
    right.pointsFor - left.pointsFor ||
    left.seed - right.seed;
  const completedGames = new Set(
    matchRecords
      .filter((record) => /^J(?:0[1-9]|1[0-9]|20)$/.test(record.fixture))
      .map((record) => record.fixture),
  );
  const standings = ["A", "B"].flatMap((group) => {
    const groupTeams = teamsByName.filter((team) => team.group === group);
    const rankedTeams = [...groupTeams].sort((left, right) =>
      right.wins - left.wins ||
      compareResults(left, right),
    );
    const games = tournamentGames.filter((game) => game.group === group);
    const complete = games.every((game) => completedGames.has(game.key));
    return rankedTeams.map((team, index) => ({
      ...team,
      rank: index + 1,
      groupComplete: complete,
      qualified: complete ? index < 2 : null,
    }));
  });

  return standings;
};

const createTournamentSchedule = (registeredTeams, matchRecords, activeFixtureKey) => {
  const standings = getTournamentStandings(registeredTeams, matchRecords);
  const teamsByName = new Map(registeredTeams.map((team) => [team.name.toUpperCase(), team]));
  const standingsByGroupAndRank = new Map(standings.map((team) => [`${team.group}-${team.rank}`, team]));
  const matches = tournamentGames.map((game) => {
    let a;
    let b;
    let waiting = "";
    if (game.teamA !== undefined) {
      a = registeredTeams[game.teamA]?.name.toUpperCase() || `EQUIPE ${game.teamA + 1}`;
      b = registeredTeams[game.teamB]?.name.toUpperCase() || `EQUIPE ${game.teamB + 1}`;
    } else if (game.seedAGroup !== undefined) {
      const teamA = standingsByGroupAndRank.get(`${game.seedAGroup}-${game.seedA}`);
      const teamB = standingsByGroupAndRank.get(`${game.seedBGroup}-${game.seedB}`);
      a = teamA?.groupComplete ? teamA.name.toUpperCase() : null;
      b = teamB?.groupComplete ? teamB.name.toUpperCase() : null;
      waiting = "AGUARDANDO CLASSIFICAÇÃO DAS CHAVES";
    }

    const record = resultForFixture(matchRecords, game.key);
    const colorA = teamsByName.get(a)?.color || "#8a929a";
    const colorB = teamsByName.get(b)?.color || "#8a929a";
    const canPlay = registeredTeams.length === 10 && Boolean(a && b);

    return {
      ...game,
      a: a || (game.seedA ? `${game.seedA}º Chave ${game.seedAGroup}` : "A definir"),
      b: b || (game.seedB ? `${game.seedB}º Chave ${game.seedBGroup}` : "A definir"),
      category: game.phase,
      colorA,
      colorB,
      status: record
        ? "FINALIZADO"
        : game.key === activeFixtureKey
          ? "AO VIVO"
          : canPlay
            ? "A SEGUIR"
            : game.teamA !== undefined
              ? "AGUARDANDO 10 EQUIPES"
              : waiting,
      score: record?.sets?.map((set) => `${set.a} — ${set.b}`).join(" / ") || null,
      winner: record?.winner || null,
    };
  });

  return { matches, standings };
};

const getSetTarget = (setNumber = 1) => (setNumber === 3 ? 15 : 21);

const winnerAtScore = (currentScore, setNumber = 1) => {
  const target = getSetTarget(setNumber);
  if (currentScore.a >= target) return "a";
  if (currentScore.b >= target) return "b";
  return null;
};

const initialPosts = [
  {
    image:
      "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=700&q=80",
    label: "ALDEIA DA SERRA OPEN",
    text: "O sol já nasceu por aqui. Hoje tem muita bola no alto.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=700&q=80",
    label: "BASTIDORES",
    text: "Aquecimento liberado. Vem sentir essa energia com a gente.",
  },
];

const musicTracks = [
  { name: "Trilha 01 • YouTube", id: "wVoByiNNLq8" },
  { name: "Trilha 02 • YouTube", id: "4wCoOtbSaPc" },
  { name: "Trilha 03 • YouTube", id: "w2ZYhhQy-WQ" },
];

const initialUsers = [
  { id: "admin-inicial", name: "Administrador", username: "admin", password: "admin", role: "admin" },
];

const initialRegulation = `TORNEIO DE VÔLEI DE AREIA 4 x 4 — CONDOMÍNIO RESIDENCIAL ALDEIA DA SERRA

FORMATO DA PARTIDA
• Os jogos serão disputados em melhor de 3 sets, sendo dois sets de 21 pontos e o set de desempate de 15.
• Cada set tem limite fixo: os dois primeiros encerram quando uma equipe atinge 21 pontos e o terceiro quando uma equipe atinge 15, sem vantagem mínima.
• Ao fim de cada set não decisivo, o próximo começa automaticamente. A partida termina quando uma equipe vence dois sets.
• Cada equipe tem direito a um pedido de tempo por set e pode inscrever até 4 titulares e 2 reservas, conforme a súmula adaptada.

COMPETIÇÃO
• A fase classificatória será disputada em duas chaves de cinco equipes, seguindo a tabela oficial, sem sorteio.
• As duas melhores equipes de cada chave avançam às semifinais.
• A classificação de cada chave considera vitórias, saldo de pontos, pontos marcados e posição inicial na tabela.
• As semifinais são preenchidas automaticamente após o registro dos 20 resultados da fase de chaves.

CONDUTA E ARBITRAGEM
• A decisão da arbitragem prevalece. O mesário registra os pontos, os sets, os tempos, sanções e ocorrências.
• As equipes devem estar prontas no horário. Atrasos e ausência podem resultar em W.O., conforme decisão da organização.
• Casos omissos serão resolvidos pela organização do torneio.

Este regulamento pode ser atualizado pela organização. A versão publicada nesta página é a válida para a competição.`;

const emptyMatchSheet = {
  date: "2026-10-10",
  court: "Quadra 01",
  gameNumber: "",
  category: "Misto",
  phase: "Classificatória",
  captainA: "",
  captainB: "",
  firstServe: "",
  notes: "",
  officials: "",
  sets: {},
};

function App() {
  const storageKey = "aldeia-serra-open-tournament-v1";
  const hydratedRef = useRef(false);
  const [slide, setSlide] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminView, setAdminView] = useState("publish");
  const [login, setLogin] = useState(false);
  const [posts, setPosts] = useState(initialPosts);
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [score, setScore] = useState({ a: 0, b: 0 });
  const [sets, setSets] = useState({ a: 0, b: 0 });
  const [setNumber, setSetNumber] = useState(1);
  const [setResults, setSetResults] = useState([]);
  const [matchRecords, setMatchRecords] = useState([]);
  const [recordsOpen, setRecordsOpen] = useState(false);
  const [matchFinished, setMatchFinished] = useState(false);
  const [pendingSet, setPendingSet] = useState(null);
  const [resting, setResting] = useState(false);
  const [restingTeam, setRestingTeam] = useState(null);
  const [timeoutsUsed, setTimeoutsUsed] = useState({ a: false, b: false });
  const [matchStarted, setMatchStarted] = useState(false);
  const [matchStartedAt, setMatchStartedAt] = useState("");
  const [activeMatch, setActiveMatch] = useState({ a: "AMARELO", b: "AZUL" });
  const [serveAdvantage, setServeAdvantage] = useState("a");
  const [rallies, setRallies] = useState(28);
  const [activeStat, setActiveStat] = useState("PONTO");
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [rallyRecords, setRallyRecords] = useState([]);
  const [fullscreenScoreboard, setFullscreenScoreboard] = useState(false);
  const [adminTab, setAdminTab] = useState("publicar");
  const [scheduledMatches, setScheduledMatches] = useState(() => createTournamentSchedule(teams, [], null).matches);
  const [activeFixtureKey, setActiveFixtureKey] = useState("J01");
  const [selectedFixtureKey, setSelectedFixtureKey] = useState("J01");
  const [scoringRule, setScoringRule] = useState(
    "Vitória: 3 pontos • Derrota: 0 pontos • W.O.: -1 ponto",
  );
  const [draftScoringRule, setDraftScoringRule] = useState(
    "Vitória: 3 pontos • Derrota: 0 pontos • W.O.: -1 ponto",
  );
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicReady, setMusicReady] = useState(false);
  const musicFrameRef = useRef(null);
  const effectAudioRef = useRef(null);
  const [effectPlaying, setEffectPlaying] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const fileInput = useRef(null);
  const [registeredTeams, setRegisteredTeams] = useState(teams);
  const [users, setUsers] = useState(initialUsers);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginUsername, setLoginUsername] = useState("admin");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [regulation, setRegulation] = useState(initialRegulation);
  const [matchSheets, setMatchSheets] = useState({});
  const [newUser, setNewUser] = useState({ name: "", username: "", password: "", role: "mesario" });
  const [passwordChange, setPasswordChange] = useState({ current: "", next: "" });
  const [newTeam, setNewTeam] = useState({ name: "", color: "#1564f5", athletes: "" });

  const [simConfig, setSimConfig] = useState({
    pontuacaoBase: 21,
    teto: 21,
    tempoAlmoco: 120,
    numeroJogos: 22,
    simulacoes: 10000,
  });
  const [simResult, setSimResult] = useState(null);

  const minutosParaHorario = (minutos) => {
    const m = Math.round(minutos);
    const horas = Math.floor(m / 60);
    const mins = m % 60;
    return `${String(horas).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  };

  const runSimulation = () => {
    const HORARIO_INICIO = 9 * 60; // 09:00
    const HORARIO_LIMITE = 18 * 60; // 18:00

    const simularSet = (pontuacaoBase, teto) => {
      let pontos = pontuacaoBase;
      if (teto > pontuacaoBase && Math.random() < 0.20) {
        pontos = Math.floor(Math.random() * (teto - pontuacaoBase)) + pontuacaoBase + 1;
      }
      return pontos;
    };

    const estimarTempoSet = (pontos) => {
      const segundosPorPonto = 20 + Math.random() * 12; // 20 a 32
      return (pontos * segundosPorPonto) / 60;
    };

    const simularPartida = (pontuacaoBase, teto) => {
      const pontos = simularSet(pontuacaoBase, teto);
      const temposDosSets = [estimarTempoSet(pontos)];
      const quantidadeSetsJogados = 1;
      const tempoTotalSets = temposDosSets.reduce((a, b) => a + b, 0);
      const tempoTotalIntervalos = 0;
      const duracaoTotal = tempoTotalSets + tempoTotalIntervalos;

      return {
        quantidadeSetsJogados,
        temposDosSets,
        tempoTotalSets,
        tempoTotalIntervalos,
        duracaoTotal,
      };
    };

    const simularTorneio = (pontuacaoBase, teto, tempoAlmoco, numeroJogos) => {
      let tempoAtual = HORARIO_INICIO;
      const temposJogos = [];
      const detalhesJogos = [];
      let horarioAlmoco = null;
      const jogoAlmoco = 10;

      for (let jogo = 1; jogo <= numeroJogos; jogo++) {
        if (jogo === jogoAlmoco) {
          horarioAlmoco = tempoAtual;
          tempoAtual += tempoAlmoco;
        }

        const resultadoPartida = simularPartida(pontuacaoBase, teto);
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

    const finais = [];
    const duracoesPartidas = [];
    let sucessos = 0;

    for (let i = 0; i < simConfig.simulacoes; i++) {
      const resultado = simularTorneio(
        simConfig.pontuacaoBase,
        simConfig.teto,
        simConfig.tempoAlmoco,
        simConfig.numeroJogos
      );
      finais.push(resultado.horarioFinal);
      duracoesPartidas.push(...resultado.temposJogos);
      if (resultado.terminouNoPrazo) sucessos++;
    }

    const somaFinais = finais.reduce((a, b) => a + b, 0);
    const somaDuracoes = duracoesPartidas.reduce((a, b) => a + b, 0);

    setSimResult({
      probabilidade: (sucessos / simConfig.simulacoes) * 100,
      mediaFinal: somaFinais / finais.length,
      melhor: Math.min(...finais),
      pior: Math.max(...finais),
      duracaoMediaPartida: somaDuracoes / duracoesPartidas.length,
    });
  };
  useEffect(() => {
    if (posts.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setGalleryIndex((current) => (current + 1) % posts.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [posts.length]);

  const visiblePosts = Array.from({ length: Math.min(3, posts.length) }, (_, offset) => posts[(galleryIndex + offset) % posts.length]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (saved) {
        const savedTeams = (saved.registeredTeams || teams).map((team) =>
          team.name.toUpperCase() === "MARROM"
            ? { ...team, name: "Marrom / Azul-marinho" }
            : team,
        );
        const savedRecords = saved.matchRecords || [];
        const currentTournament = saved.tournamentVersion === 3;
        const firstFixture = createTournamentSchedule(savedTeams, savedRecords, "J01").matches[0];
        setRegisteredTeams(savedTeams);
        setMatchRecords(savedRecords);
        setScheduledMatches(createTournamentSchedule(
          savedTeams,
          savedRecords,
          currentTournament && saved.matchStarted ? saved.activeFixtureKey : null,
        ).matches);
        if (currentTournament) {
          if (saved.score) setScore(saved.score);
          if (saved.sets) setSets(saved.sets);
          if (saved.setNumber) setSetNumber(saved.setNumber);
          if (saved.setResults) setSetResults(saved.setResults);
          if (saved.matchFinished !== undefined) setMatchFinished(saved.matchFinished);
          if (saved.pendingSet) setPendingSet(saved.pendingSet);
          if (saved.resting !== undefined) setResting(saved.resting);
          if (saved.restingTeam) setRestingTeam(saved.restingTeam);
          if (saved.timeoutsUsed) setTimeoutsUsed(saved.timeoutsUsed);
          if (saved.matchStarted) setMatchStarted(true);
          if (saved.matchStartedAt) setMatchStartedAt(saved.matchStartedAt);
          if (saved.activeMatch) setActiveMatch(saved.activeMatch);
          if (saved.activeFixtureKey) setActiveFixtureKey(saved.activeFixtureKey);
          if (saved.selectedFixtureKey) setSelectedFixtureKey(saved.selectedFixtureKey);
        } else {
          setActiveFixtureKey(firstFixture.key);
          setSelectedFixtureKey(firstFixture.key);
          setActiveMatch({ a: firstFixture.a, b: firstFixture.b });
        }
        if (!currentTournament) setSetNumber(1);
        if (!currentTournament) setSetResults([]);
        if (!currentTournament) setMatchFinished(false);
        if (!currentTournament) setPendingSet(null);
        if (!currentTournament) setResting(false);
        if (!currentTournament) setMatchStarted(false);
        if (!currentTournament) setMatchStartedAt("");
        if (!currentTournament) setTimeoutsUsed({ a: false, b: false });
        if (saved.serveAdvantage !== undefined && currentTournament) setServeAdvantage(saved.serveAdvantage);
        if (saved.rallies !== undefined) setRallies(saved.rallies);
        if (saved.posts) setPosts(saved.posts);
        if (saved.users?.length) setUsers(saved.users);
        if (saved.regulation && !/Melhor de 3 sets|grupos sorteados|melhores perdedores|repescagem/i.test(saved.regulation)) setRegulation(saved.regulation);
        if (saved.matchSheets) setMatchSheets(saved.matchSheets);
        if (saved.scoringRule) {
          setScoringRule(saved.scoringRule);
          setDraftScoringRule(saved.scoringRule);
        }
      }
    } catch (error) {
      console.warn("Não foi possível restaurar a súmula salva.", error);
    } finally {
      hydratedRef.current = true;
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydratedRef.current || !isHydrated) return;
    localStorage.setItem(storageKey, JSON.stringify({
      tournamentVersion: 3,
      score, sets, setNumber, setResults, matchRecords, matchFinished, pendingSet, resting, restingTeam,
      timeoutsUsed, matchStarted, matchStartedAt,
      posts,
      registeredTeams, users, regulation, matchSheets,
      activeMatch, serveAdvantage, rallies, scheduledMatches,
      activeFixtureKey, selectedFixtureKey, scoringRule,
    }));
  }, [isHydrated, score, sets, setNumber, setResults, matchRecords, matchFinished, pendingSet, resting, restingTeam, timeoutsUsed, matchStarted, matchStartedAt, posts, registeredTeams, users, regulation, matchSheets, activeMatch, serveAdvantage, rallies, scheduledMatches, activeFixtureKey, selectedFixtureKey, scoringRule]);

  const activeTeamA = registeredTeams.find((team) => team.name.toUpperCase() === activeMatch.a) || registeredTeams[0] || teams[0];
  const activeTeamB = registeredTeams.find((team) => team.name.toUpperCase() === activeMatch.b) || registeredTeams[1] || teams[1];
  const standings = getTournamentStandings(registeredTeams, matchRecords);

  const nextSlide = () => setSlide((current) => (current + 1) % slides.length);
  const previousSlide = () =>
    setSlide((current) => (current - 1 + slides.length) % slides.length);
  const addPoint = (team) => {
    if (!matchStarted || matchFinished || resting || pendingSet || winnerAtScore(score, setNumber)) return;
    const nextScore = { ...score, [team]: score[team] + 1 };
    const winner = winnerAtScore(nextScore, setNumber);
    setScore(nextScore);
    setServeAdvantage(team);
    setRallies((current) => current + 1);
    if (winner) {
      const nextSetResults = [...setResults, { number: setNumber, winner, a: nextScore.a, b: nextScore.b }];
      const nextSets = { ...sets, [winner]: (sets[winner] || 0) + 1 };
      const endedAt = new Date().toISOString();
      const endedAtTime = new Date(endedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
      const hasMatchWinner = nextSets.a >= 2 || nextSets.b >= 2;
      setSetResults(nextSetResults);
      setSets(nextSets);
      setMatchSheets((current) => {
        const sheet = { ...emptyMatchSheet, ...current[activeFixtureKey] };
        const currentSet = sheet.sets[setNumber] || {};
        const nextSetNumber = setNumber + 1;
        return {
          ...current,
          [activeFixtureKey]: {
            ...sheet,
            sets: {
              ...sheet.sets,
              [setNumber]: {
                ...currentSet,
                start: currentSet.start || (setNumber === 1 && matchStartedAt
                  ? new Date(matchStartedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
                  : ""),
                end: endedAtTime,
                scoreA: String(nextScore.a),
                scoreB: String(nextScore.b),
                events: [timeoutsUsed.a ? `Tempo solicitado por ${activeMatch.a}` : "", timeoutsUsed.b ? `Tempo solicitado por ${activeMatch.b}` : ""].filter(Boolean).join("; "),
              },
              ...(!hasMatchWinner ? {
                [nextSetNumber]: {
                  ...sheet.sets[nextSetNumber],
                  start: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
                },
              } : {}),
            },
          },
        };
      });
      if (hasMatchWinner) {
        setPendingSet({ number: setNumber, winner, a: nextScore.a, b: nextScore.b, endedAt });
      } else {
        setPendingSet(null);
        setSetNumber((current) => current + 1);
        setScore({ a: 0, b: 0 });
      }
    }
  };
  const removePoint = (team) => {
    if (!matchStarted || matchFinished || resting) return;
    const nextScore = { ...score, [team]: Math.max(0, score[team] - 1) };
    const winner = winnerAtScore(nextScore, setNumber);
    setScore(nextScore);
    if (pendingSet && !winner) {
      setSetResults((current) => current.filter((result) => result.number !== pendingSet.number));
      setSets((current) => ({ ...current, [pendingSet.winner]: Math.max(0, current[pendingSet.winner] - 1) }));
      setPendingSet(null);
    } else if (pendingSet) {
      setPendingSet({ ...pendingSet, winner, a: nextScore.a, b: nextScore.b });
      setSetResults((current) => current.map((result) => result.number === pendingSet.number
        ? { ...result, winner, a: nextScore.a, b: nextScore.b }
        : result));
    }
  };
  const selectStat = (stat) => {
    setActiveStat(stat);
    setSelectedAthlete(null);
  };
  const confirmMatchFinish = () => {
    if (!pendingSet || !activeFixtureKey || matchFinished) return;
    const finishedAt = pendingSet.endedAt || new Date().toISOString();
    const winner = pendingSet.winner === "a" ? activeMatch.a : activeMatch.b;
    const fixture = scheduledMatches.find((match) => match.key === activeFixtureKey);
    const completedSets = [...setResults];
    if (!completedSets.some((setResult) => setResult.number === pendingSet.number)) {
      completedSets.push({ number: pendingSet.number, winner: pendingSet.winner, a: pendingSet.a, b: pendingSet.b });
    }
    const finalSets = {
      a: completedSets.filter((setResult) => setResult.winner === "a").length,
      b: completedSets.filter((setResult) => setResult.winner === "b").length,
    };
    const record = {
      id: `${activeFixtureKey}-${Date.now()}`,
      fixture: activeFixtureKey,
      recordedAt: new Date().toISOString(),
      startedAt: matchStartedAt || null,
      finishedAt,
      gameNumber: fixture?.gameNumber || "",
      scheduledTime: fixture?.time || "",
      group: fixture?.group || null,
      phase: fixture?.phase || "Classificatória",
      court: fixture?.court || "Quadra 01",
      category: fixture?.phase || "Classificatória",
      teamA: activeMatch.a,
      teamB: activeMatch.b,
      colorA: activeTeamA.color,
      colorB: activeTeamB.color,
      sets: completedSets,
      finalSets,
      winner,
      timeoutsUsed,
    };
    const nextRecords = [record, ...matchRecords];
    setMatchRecords(nextRecords);
    setScheduledMatches(createTournamentSchedule(registeredTeams, nextRecords, null).matches);
    setMatchSheets((current) => {
      const sheet = { ...emptyMatchSheet, ...current[activeFixtureKey] };
      const events = [
        timeoutsUsed.a ? `Tempo solicitado por ${activeMatch.a}` : "",
        timeoutsUsed.b ? `Tempo solicitado por ${activeMatch.b}` : "",
      ].filter(Boolean).join("; ");
      return {
        ...current,
        [activeFixtureKey]: {
          ...sheet,
          phase: fixture?.phase || sheet.phase,
          gameNumber: fixture?.gameNumber || sheet.gameNumber,
          court: fixture?.court || sheet.court,
          sets: {
            ...sheet.sets,
            [pendingSet.number]: {
              ...sheet.sets[pendingSet.number],
              start: matchStartedAt ? new Date(matchStartedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : sheet.sets[pendingSet.number]?.start || "",
              end: new Date(finishedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
              scoreA: String(pendingSet.a),
              scoreB: String(pendingSet.b),
              events,
            },
          },
        },
      };
    });
    setSets(finalSets);
    setSetResults(completedSets);
    setPendingSet(null);
    setMatchFinished(true);
    setMatchStarted(false);
    setResting(false);
    setRestingTeam(null);
  };
  const downloadRecords = (format) => {
    if (!matchRecords.length) return;
    const filename = `sumulas-aldeia-serra-open.${format}`;
    const content = format === "json"
      ? JSON.stringify(matchRecords, null, 2)
      : [
        "Data;Jogo;Horário;Quadra;Fase/Chave;Equipe A;Equipe B;Placar;Vencedor;Início;Término;Tempo A;Tempo B",
        ...matchRecords.map((record) => [
          new Date(record.recordedAt).toLocaleString("pt-BR"),
          record.gameNumber || record.fixture,
          record.scheduledTime || "",
          record.court,
          record.group ? `${record.phase} ${record.group}` : record.phase || record.category,
          record.teamA,
          record.teamB,
          record.sets.map((set) => `${set.a}x${set.b}`).join(" / "),
          record.winner,
          record.startedAt ? new Date(record.startedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "",
          record.finishedAt ? new Date(record.finishedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "",
          record.timeoutsUsed?.a ? "Sim" : "Não",
          record.timeoutsUsed?.b ? "Sim" : "Não",
        ].map((value) => `"${String(value).replaceAll('"', '""')}"`).join(";")),
      ].join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([content], { type: format === "json" ? "application/json" : "text/csv;charset=utf-8" }));
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };
  const loadMatch = (fixture) => {
    if (!fixture) return;
    if (matchStarted && !matchFinished && fixture.key === activeFixtureKey) return;
    if (!registeredTeams || registeredTeams.length !== 10) {
      window.alert("A tabela oficial exige exatamente 10 equipes cadastradas.");
      return;
    }
    if (!fixture.a || !fixture.b || fixture.status === "FINALIZADO" || fixture.status.startsWith("AGUARDANDO")) {
      window.alert("Este jogo ainda não está disponível para início.");
      return;
    }
    if (matchStarted && !matchFinished && fixture.key !== activeFixtureKey) {
      const confirmed = window.confirm("A partida atual ainda está em andamento. Deseja encerrá-la sem registrar o resultado e iniciar outro jogo?");
      if (!confirmed) return;
    }
    setScheduledMatches((current) => current.map((match) => {
      if (match.key === activeFixtureKey && match.status === "AO VIVO") return { ...match, status: "A SEGUIR" };
      if (match.key === fixture.key && match.status !== "FINALIZADO") return { ...match, status: "AO VIVO" };
      return match;
    }));
    setActiveMatch({ a: fixture.a.toUpperCase(), b: fixture.b.toUpperCase() });
    setActiveFixtureKey(fixture.key);
    setSelectedFixtureKey(fixture.key);
    setScore({ a: 0, b: 0 });
    setSets({ a: 0, b: 0 });
    setSetNumber(1);
    setSetResults([]);
    setPendingSet(null);
    setTimeoutsUsed({ a: false, b: false });
    setMatchStarted(true);
    setResting(false);
    setRestingTeam(null);
    setMatchFinished(false);
    setServeAdvantage("a");
    const startedAt = new Date().toISOString();
    setMatchStartedAt(startedAt);
    setMatchSheets((current) => {
      const sheet = { ...emptyMatchSheet, ...current[fixture.key] };
      return {
        ...current,
        [fixture.key]: {
          ...sheet,
          gameNumber: fixture.gameNumber,
          phase: fixture.phase,
          court: fixture.court,
          category: fixture.phase,
          sets: {
            ...sheet.sets,
            1: {
              ...sheet.sets[1],
              start: new Date(startedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
            },
          },
        },
      };
    });
  };
  const requestTimeout = (team) => {
    if (!matchStarted || matchFinished || resting || pendingSet || timeoutsUsed[team]) return;
    setTimeoutsUsed((current) => ({ ...current, [team]: true }));
    setResting(true);
    setRestingTeam(team);
  };
  const continueAfterRest = () => {
    setResting(false);
    setRestingTeam(null);
  };
  const selectFixture = (key) => {
    setSelectedFixtureKey(key);
    if (matchStarted && !matchFinished) return;
    const fixture = scheduledMatches.find((match) => match.key === key);
    if (!fixture) return;
    setActiveFixtureKey(key);
    setActiveMatch({ a: fixture.a.toUpperCase(), b: fixture.b.toUpperCase() });
    setScore({ a: 0, b: 0 });
    setSets({ a: 0, b: 0 });
    setSetResults([]);
    setPendingSet(null);
    setMatchFinished(false);
    setTimeoutsUsed({ a: false, b: false });
    setMatchStartedAt("");
  };
  const sendMusicCommand = (command) => {
    musicFrameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: command, args: [] }),
      "*",
    );
  };
  const toggleMusic = () => {
    if (!musicReady) return;
    sendMusicCommand(musicPlaying ? "pauseVideo" : "playVideo");
    setMusicPlaying((current) => !current);
  };
  const changeMusic = (event) => {
    setMusicIndex(Number(event.target.value));
    setMusicPlaying(false);
    setMusicReady(false);
  };
  const playArenaEffect = (effect) => {
    effectAudioRef.current?.pause();
    const audio = new Audio(`${import.meta.env.BASE_URL}references/${effect}.mp3`);
    effectAudioRef.current = audio;
    audio.volume = 1;
    audio.onended = () => setEffectPlaying(false);
    audio.play().then(() => setEffectPlaying(true)).catch(() => {
      setEffectPlaying(false);
      window.alert("Não foi possível reproduzir o áudio. Verifique se o arquivo está em public/references.");
    });
  };
  const toggleEffectAudio = () => {
    if (!effectAudioRef.current) return;
    if (effectPlaying) {
      effectAudioRef.current.pause();
      setEffectPlaying(false);
    } else {
      effectAudioRef.current.play().then(() => setEffectPlaying(true));
    }
  };
  const editScoringRule = () => {
    const nextRule = window.prompt(
      "Regra de pontuação do torneio:",
      scoringRule,
    );
    if (nextRule?.trim()) {
      setScoringRule(nextRule.trim());
      setDraftScoringRule(nextRule.trim());
    }
  };

  const openAdminPanel = () => {
    setAdminOpen(true);
    setAdminView("dashboard");
    setLogin(!currentUser);
    setLoginError("");
  };

  const authenticate = () => {
    const user = users.find((candidate) => candidate.username.toLowerCase() === loginUsername.trim().toLowerCase() && candidate.password === loginPassword);
    if (!user) {
      setLoginError("Usuário ou senha inválidos.");
      return;
    }
    setCurrentUser({ id: user.id, name: user.name, username: user.username, role: user.role });
    setAdminView(user.role === "organizador" ? "table" : user.role === "publicador" ? "photos" : "sheet");
    setLogin(false);
    setLoginPassword("");
    setLoginError("");
  };

  const logout = () => {
    setCurrentUser(null);
    setAdminOpen(false);
    setLogin(false);
  };

  const allowedAdminViews = currentUser?.role === "admin"
    ? ["sheet", "table", "regulation", "teams", "users", "photos", "simula"]
    : currentUser?.role === "mesario"
      ? ["sheet"]
      : currentUser?.role === "organizador"
        ? ["table", "regulation", "teams", "simula"]
        : currentUser?.role === "publicador"
          ? ["photos"]
          : [];

  const createUser = (event) => {
    event.preventDefault();
    const username = newUser.username.trim();
    if (!newUser.name.trim() || !username || !newUser.password) return;
    if (users.some((user) => user.username.toLowerCase() === username.toLowerCase())) {
      window.alert("Este usuário já existe.");
      return;
    }
    setUsers((current) => [...current, { ...newUser, id: `user-${Date.now()}`, name: newUser.name.trim(), username }]);
    setNewUser({ name: "", username: "", password: "", role: "mesario" });
  };

  const changeOwnPassword = (event) => {
    event.preventDefault();
    const user = users.find((candidate) => candidate.id === currentUser.id);
    if (!user || user.password !== passwordChange.current) {
      window.alert("A senha atual não confere.");
      return;
    }
    if (passwordChange.next.trim().length < 4) {
      window.alert("A nova senha precisa ter pelo menos 4 caracteres.");
      return;
    }
    setUsers((current) => current.map((candidate) => candidate.id === currentUser.id ? { ...candidate, password: passwordChange.next } : candidate));
    setPasswordChange({ current: "", next: "" });
    window.alert("Senha atualizada neste dispositivo.");
  };

  const createTeam = (event) => {
    event.preventDefault();
    const name = newTeam.name.trim();
    if (!name) return;
    if (matchStarted || matchRecords.length) {
      window.alert("O cadastro fica bloqueado após o início do primeiro jogo.");
      return;
    }
    if (registeredTeams.length >= 10) {
      window.alert("A tabela oficial tem exatamente 10 vagas para equipes.");
      return;
    }
    if (registeredTeams.some((team) => team.name.toLowerCase() === name.toLowerCase())) {
      window.alert("Já existe uma equipe com esse nome.");
      return;
    }
    const athletes = newTeam.athletes.split(/[\n,;]/).map((athlete) => athlete.trim()).filter(Boolean);
    const nextTeams = [...registeredTeams, { name, color: newTeam.color, athletes }];
    const nextSchedule = createTournamentSchedule(nextTeams, matchRecords, null).matches;
    setRegisteredTeams(nextTeams);
    setScheduledMatches(nextSchedule);
    setNewTeam({ name: "", color: "#1564f5", athletes: "" });
  };

  const removeTeam = (name) => {
    if (matchStarted || matchRecords.length) {
      window.alert("Não é possível alterar as equipes após o início do primeiro jogo.");
      return;
    }
    const nextTeams = registeredTeams.filter((team) => team.name !== name);
    const nextSchedule = createTournamentSchedule(nextTeams, [], null).matches;
    setRegisteredTeams(nextTeams);
    setScheduledMatches(nextSchedule);
    setActiveFixtureKey("C1");
    setSelectedFixtureKey("C1");
    setActiveMatch({ a: nextSchedule[0].a, b: nextSchedule[0].b });
    setMatchStarted(false);
    setMatchFinished(false);
    setScore({ a: 0, b: 0 });
  };

  const updateSheetField = (field, value) => {
    setMatchSheets((current) => ({
      ...current,
      [activeFixtureKey]: { ...emptyMatchSheet, ...current[activeFixtureKey], [field]: value },
    }));
  };

  const updateSheetSet = (setIndex, field, value) => {
    setMatchSheets((current) => {
      const sheet = { ...emptyMatchSheet, ...current[activeFixtureKey] };
      return {
        ...current,
        [activeFixtureKey]: {
          ...sheet,
          sets: { ...sheet.sets, [setIndex]: { ...sheet.sets[setIndex], [field]: value } },
        },
      };
    });
  };

  const copyLiveScoreToSheet = (setIndex) => {
    setMatchSheets((current) => {
      const sheet = { ...emptyMatchSheet, ...current[activeFixtureKey] };
      return {
        ...current,
        [activeFixtureKey]: {
          ...sheet,
          sets: { ...sheet.sets, [setIndex]: { ...sheet.sets[setIndex], scoreA: String(score.a), scoreB: String(score.b) } },
        },
      };
    });
  };

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFile({ file, url: URL.createObjectURL(file) });
  };

  const publishPost = () => {
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPosts((current) => [
        {
          image: reader.result,
          label: "PUBLICADO AGORA",
          text: caption || "Novo registro direto do Aldeia da Serra Open.",
        },
        ...current,
      ]);
      setSelectedFile(null);
      setCaption("");
      setAdminView("photos");
      if (fileInput.current) fileInput.current.value = "";
    };
    reader.readAsDataURL(selectedFile.file);
  };

  const activeFixture = scheduledMatches.find((match) => match.key === activeFixtureKey);
  const selectedFixture = scheduledMatches.find((match) => match.key === selectedFixtureKey);
  const currentSheet = {
    ...emptyMatchSheet,
    ...matchSheets[activeFixtureKey],
    gameNumber: matchSheets[activeFixtureKey]?.gameNumber || activeFixture?.gameNumber || "",
    court: matchSheets[activeFixtureKey]?.court || activeFixture?.court || emptyMatchSheet.court,
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <a
          className="brand"
          href="#inicio"
          aria-label="Aldeia da Serra Open início"
        >
          <span>ALDEIA DA</span>
          <strong>SERRA</strong>
          <i>OPEN</i>
        </a>
        <nav className="main-nav" aria-label="Navegação principal">
          <a href="#jogos">Jogos</a>
          <a href="#classificacao">Classificação</a>
          <a href="#regulamento">Regulamento</a>
          <a href="#galeria">Galeria</a>
        </nav>
        <div className="admin-actions">
          <button className="admin-trigger rules-trigger" onClick={openAdminPanel}>
            <Trophy size={16} /> Área administrativa
          </button>
        </div>
        <button className="menu-button" aria-label="Abrir menu">
          <Menu size={22} />
        </button>
      </header>

      <main id="inicio">
        <section
          className={`hero ${slides[slide].video ? "hero-video" : ""}`}
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(13, 22, 38, .78) 0%, rgba(13, 22, 38, .25) 56%, rgba(13, 22, 38, .08) 100%), url(${slides[slide].image || slides[slide].poster})`,
          }}
        >
          {slides[slide].video && (
            <video
              className="hero-media"
              src={slides[slide].video}
              poster={slides[slide].poster}
              autoPlay
              muted
              loop
              playsInline
            />
          )}
          <div className="hero-content">
            <p className="eyebrow">{slides[slide].eyebrow}</p>
            <h1>{slides[slide].title}</h1>
            <p className="hero-copy">{slides[slide].copy}</p>
            <div className="hero-actions">
              <a className="button button-yellow" href="#jogos">
                Ver programação <ArrowUpRight size={18} />
              </a>
              <a className="text-link" href="#galeria">
                Conheça a arena <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <div className="hero-bottom">
            <span>10 OUT 2026</span>
            <a
              className="hero-location location-link"
              href="https://loteamentoaldeiadaserra.com"
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={15} /> ALDEIA DA SERRA, LUZIÂNIA{" "}
              <ArrowUpRight size={13} />
            </a>
            <div className="slider-controls">
              <button onClick={previousSlide} aria-label="Banner anterior">
                <ChevronLeft size={20} />
              </button>
              <span>
                0{slide + 1} <em>/ 0{slides.length}</em>
              </span>
              <button onClick={nextSlide} aria-label="Próximo banner">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </section>

        <section className="ticker">
          <div className="ticker-label"><span className={`live-dot ${matchStarted && !matchFinished ? "" : "is-idle"}`} /> {matchStarted && !matchFinished ? "PARTIDA AO VIVO" : matchFinished ? "ÚLTIMO RESULTADO" : "PRÓXIMO JOGO"}</div>
          <div className="ticker-match"><strong>JOGO {activeFixture?.gameNumber || "01"} · {activeFixture?.group ? `CHAVE ${activeFixture.group}` : activeFixture?.phase || "CHAVE A"} · {activeFixture?.time || "09:00"}</strong><span>{activeMatch.a} <b>{score.a}</b></span><span className="ticker-vs">×</span><span>{activeMatch.b} <b>{score.b}</b></span></div>
          <a href="#sumula">Acompanhar partida <ArrowUpRight size={15} /></a>
        </section>

        <section className="section schedule-section" id="jogos">
          <div className="section-heading">
            <div><p className="section-kicker">TABELA DE JOGOS</p><h2>O próximo ponto<br /><i>começa agora.</i></h2></div>
              <div className="date-switcher"><button>‹</button><span><small>DATA DO TORNEIO</small> 10 OUT 2026</span><button>›</button></div>
          </div>
          <div className="match-list">
            {scheduledMatches.map((match) => (
              <div className="scheduled-game" key={match.key}>
                <article className="match-row">
                  <div className="match-time">
                    <strong>{match.time}</strong>
                    <span>
                      <Clock3 size={13} /> JOGO {match.gameNumber} · {match.court}
                    </span>
                  </div>
                  <div className="match-category">{match.phase === "Semifinal" ? match.phase : `CHAVE ${match.group}`}</div>
                  <div className="teams">
                    <span>
                      <i style={{ background: match.colorA }} />
                      {match.a}
                    </span>
                    <b>vs</b>
                    <span>
                      <i style={{ background: match.colorB }} />
                      {match.b}
                    </span>
                  </div>
                  <div
                    className={`match-status ${match.status === "AO VIVO" ? "is-live" : ""}`}
                  >
                    {match.status}
                    {match.key === activeFixtureKey && matchStarted && !matchFinished ? (
                      <strong>
                        {score.a} — {score.b}
                      </strong>
                    ) : (
                      match.score && <strong>{match.score}</strong>
                    )}
                  </div>
                  <a
                    className="row-arrow"
                    href="#sumula"
                    aria-label={`Detalhes do jogo ${match.gameNumber}: ${match.a} e ${match.b}`}
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </article>
                {match.breakAfter && <div className="schedule-break"><strong>🍽️ {match.breakAfter}</strong></div>}
              </div>
            ))}
          </div>
          <a className="under-link" href="#jogos">
            Ver tabela completa <ArrowUpRight size={15} />
          </a>
          <div className="tournament-standings">
            <div className="tournament-standings-heading">
              <div><p className="section-kicker">CLASSIFICAÇÃO</p><h3>Chaves e <i>semifinalistas.</i></h3></div>
              <span>{new Set(matchRecords.filter((record) => /^J(?:0[1-9]|1[0-9]|20)$/.test(record.fixture)).map((record) => record.fixture)).size}/20 jogos das chaves</span>
            </div>
            <div className="standings-table-wrap">
              <table className="standings-table">
                <thead><tr><th>Chave</th><th>Pos.</th><th>Equipe</th><th>J</th><th>V</th><th>D</th><th>Pontos</th><th>Saldo</th><th>Situação</th></tr></thead>
                <tbody>{standings.map((team) => (
                  <tr key={team.name} className={team.qualified ? "qualified-row" : ""}>
                    <td>{team.group}</td><td>{team.rank}</td>
                    <td><i style={{ background: team.color }} />{team.name.toUpperCase()}</td>
                    <td>{team.played}</td><td>{team.wins}</td><td>{team.losses}</td>
                    <td>{team.pointsFor}</td><td>{team.pointDiff > 0 ? "+" : ""}{team.pointDiff}</td>
                    <td>{team.qualified === null ? (team.wins ? `${team.rank}º · provisório` : "A jogar") : team.qualified ? "Classificado · semifinalista" : "Eliminado"}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
            <p className="standings-tiebreak-note">Classificação por chave: vitórias, saldo de pontos, pontos marcados e posição inicial na tabela.</p>
          </div>
        </section>

        <section className="section public-regulation" id="regulamento">
          <div className="section-heading">
            <div><p className="section-kicker">DOCUMENTO OFICIAL</p><h2>Regulamento<br /><i>da competição.</i></h2></div>
            <span className="regulation-status">VERSÃO VIGENTE</span>
          </div>
          <div className="regulation-copy">{regulation.split("\n").filter(Boolean).map((line, index) => line.startsWith("•")
            ? <p className="regulation-item" key={`${line}-${index}`}>{line.slice(1).trim()}</p>
            : <p className={line === line.toUpperCase() ? "regulation-subhead" : ""} key={`${line}-${index}`}>{line}</p>)}</div>
        </section>

        <section
          className={`operations-band ${fullscreenScoreboard ? "scoreboard-fullscreen" : ""}`}
          id="sumula"
        >
          <div className="section operations-inner">
            <div className="section-heading operations-heading">
              <div>
                <p className="section-kicker light">MESA • JOGO {activeFixture?.gameNumber || "01"}</p>
                <h2>
                  Súmula
                  <br />
                  <i>eletrônica.</i>
                </h2>
              </div>
              <div className="match-meta">
                <span className={`live-dot ${matchStarted && !matchFinished ? "" : "is-idle"}`} /> {matchStarted && !matchFinished ? "AO VIVO" : matchFinished ? "PARTIDA ENCERRADA" : "AGUARDANDO INÍCIO"}
                <small>JOGO {activeFixture?.gameNumber || "01"} · {activeFixture?.group ? `CHAVE ${activeFixture.group}` : activeFixture?.phase?.toUpperCase() || "CHAVE A"} · {activeFixture?.time || "09:00"} · {activeFixture?.court || "QUADRA 01"}</small>
              </div>
              <button className="records-button" onClick={() => setRecordsOpen(true)}>
                <History size={16} /> Histórico ({matchRecords.length})
              </button>
              <button
                className="fullscreen-button"
                onClick={() => setFullscreenScoreboard((current) => !current)}
              >
                {fullscreenScoreboard ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
                <span>{fullscreenScoreboard ? "Sair da tela cheia" : "Tela cheia"}</span>
              </button>
            </div>
            <div className="match-loader">
              <div><strong>CONTROLE DO MESÁRIO</strong><label htmlFor="match-select">SELECIONE O JOGO DA TABELA</label></div>
              <select id="match-select" value={selectedFixtureKey} onChange={(event) => selectFixture(event.target.value)}>
                {scheduledMatches.map((match) => <option value={match.key} key={match.key} disabled={match.status === "FINALIZADO" || match.status.startsWith("AGUARDANDO")}>{match.gameNumber} · {match.time} · {match.group ? `Chave ${match.group}` : match.phase} · {match.a} x {match.b} · {match.status}</option>)}
              </select>
              <button
                className="button button-yellow"
                onClick={() => loadMatch(selectedFixture)}
                disabled={!selectedFixture || selectedFixture.status === "FINALIZADO" || selectedFixture.status.startsWith("AGUARDANDO") || (matchStarted && selectedFixture.key === activeFixtureKey)}
              >
                {matchStarted && selectedFixture?.key === activeFixtureKey ? "Partida em andamento" : "Iniciar jogo"}
              </button>
            </div>
            <div className="scoreboard">
              <div className="scoreboard-team team-a">
                <span
                  className="team-chip"
                  style={{ background: activeTeamA.color, color: activeTeamA.name === "Preto" ? "white" : "#182536" }}
                >
                  A
                </span>
                <div>
                  <small>EQUIPE {activeMatch.a}</small>
                  <strong>{activeMatch.a}</strong>
                  <p>{activeTeamA.athletes.join(" • ")}</p>
                  <small className="team-timeout-status">TEMPO {timeoutsUsed.a ? "UTILIZADO" : "DISPONÍVEL"}</small>
                </div>
                <button
                  className={`serve-indicator ${serveAdvantage === "a" ? "is-serving" : ""}`}
                  onClick={() => setServeAdvantage("a")}
                  aria-label={`Definir vantagem no saque para ${activeMatch.a}`}
                >
                  <i /> <span>SAQUE</span>
                </button>
              </div>
              <div className="scoreboard-score">
                <div className="set-score">
                  <span>MELHOR DE 3 SETS • LIMITE 21/21/15</span>
                  {matchFinished && <b>{sets.a >= 2 ? activeMatch.a : activeMatch.b} VENCEU</b>}
                </div>
                <div className="point-score">
                  <strong>{score.a}</strong>
                  <span>:</span>
                  <strong>{score.b}</strong>
                </div>
                <small>{!matchStarted ? "AGUARDANDO INÍCIO" : matchFinished ? "PARTIDA ENCERRADA" : `SET ${setNumber}`}</small>
                <div className="set-history">
                  {setResults.map((result) => <span key={result.number}>RESULTADO: <b>{result.a} × {result.b}</b></span>)}
                </div>
              </div>
              <div className="scoreboard-team team-b">
                <div>
                  <small>EQUIPE {activeMatch.b}</small>
                  <strong>{activeMatch.b}</strong>
                  <p>{activeTeamB.athletes.join(" • ")}</p>
                  <small className="team-timeout-status">TEMPO {timeoutsUsed.b ? "UTILIZADO" : "DISPONÍVEL"}</small>
                </div>
                <span
                  className="team-chip"
                  style={{ background: activeTeamB.color, color: activeTeamB.name === "Preto" ? "white" : "#182536" }}
                >
                  B
                </span>
                <button
                  className={`serve-indicator ${serveAdvantage === "b" ? "is-serving" : ""}`}
                  onClick={() => setServeAdvantage("b")}
                  aria-label={`Definir vantagem no saque para ${activeMatch.b}`}
                >
                  <i /> <span>SAQUE</span>
                </button>
              </div>
            </div>
            <div className="score-actions">
              <div>
                <button
                  onClick={() => removePoint("a")}
                  aria-label={`Remover ponto do ${activeMatch.a}`}
                  disabled={!matchStarted || matchFinished || resting}
                >
                  <Minus size={16} />
                </button>
                <button
                  className="score-point"
                  style={{ background: activeTeamA.color, color: activeTeamA.name === "Preto" ? "white" : "#182536" }}
                  onClick={() => addPoint("a")}
                  disabled={!matchStarted || matchFinished || resting || Boolean(winnerAtScore(score, setNumber))}
                >
                  PONTO {activeMatch.a} <Plus size={16} />
                </button>
              </div>
              <div>
                <button
                  onClick={() => removePoint("b")}
                  aria-label={`Remover ponto do ${activeMatch.b}`}
                  disabled={!matchStarted || matchFinished || resting}
                >
                  <Minus size={16} />
                </button>
                <button
                  className="score-point"
                  style={{ background: activeTeamB.color, color: activeTeamB.name === "Preto" ? "white" : "#182536" }}
                  onClick={() => addPoint("b")}
                  disabled={!matchStarted || matchFinished || resting || Boolean(winnerAtScore(score, setNumber))}
                >
                  PONTO {activeMatch.b} <Plus size={16} />
                </button>
              </div>
            </div>
            <div className="stat-bar">
              <span>REGISTRAR RALI:</span>
              {["PONTO", "ACE", "ATAQUE", "BLOQUEIO", "SAQUE", "ERRO"].map((stat) => (
                <button
                  className={activeStat === stat ? "active" : ""}
                  onClick={() => selectStat(stat)}
                  key={stat}
                >
                  {stat}
                </button>
              ))}
              <b>ÚLTIMO: {activeStat}</b>
            </div>
            <div className="music-console">
              <div className="music-console-title"><strong>ÁUDIO DA ARENA</strong><span>Trilha e chamadas para a mesa</span></div>
              <div className="music-controls">
                <select value={musicIndex} onChange={changeMusic} aria-label="Selecionar música">
                  {musicTracks.map((track, index) => <option value={index} key={track.id}>{track.name}</option>)}
                </select>
                <button className="music-pause" onClick={toggleMusic} disabled={!musicReady}>{musicPlaying ? "Pausar" : "Tocar"}</button>
                <button className="effect-button monster" onClick={() => playArenaEffect("monster-block")}>MONSTER BLOCK</button>
                <button className="effect-button ace" onClick={() => playArenaEffect("ace-ace-volleyball")}>ACE</button>
                <button className="effect-pause" onClick={toggleEffectAudio} disabled={!effectAudioRef.current}>{effectPlaying ? "Pausar efeitos" : "Retomar efeitos"}</button>
              </div>
              <iframe
                ref={musicFrameRef}
                className="music-frame"
                title="Player de música da arena"
                src={`https://www.youtube.com/embed/${musicTracks[musicIndex].id}?enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}&playsinline=1&controls=0&loop=1&playlist=${musicTracks[musicIndex].id}`}
                onLoad={() => setMusicReady(true)}
                allow="autoplay; encrypted-media"
              />
            </div>
            <div className="set-controls">
              <strong className="timeout-label">PEDIDO DE TEMPO · 1 POR EQUIPE</strong>
              <button className="timeout-button" onClick={() => requestTimeout("a")} disabled={!matchStarted || matchFinished || resting || pendingSet || timeoutsUsed.a}>
                Tempo {activeMatch.a} · {timeoutsUsed.a ? "utilizado" : "disponível"}
              </button>
              <button className="timeout-button" onClick={() => requestTimeout("b")} disabled={!matchStarted || matchFinished || resting || pendingSet || timeoutsUsed.b}>
                Tempo {activeMatch.b} · {timeoutsUsed.b ? "utilizado" : "disponível"}
              </button>
              {pendingSet && (
                <div className="finish-confirmation" role="status">
                  <strong>{activeMatch[pendingSet.winner]} venceu a partida ({sets.a} — {sets.b} sets; {pendingSet.a} — {pendingSet.b} no set final).</strong>
                  <span>Confirme o resultado para registrar o encerramento.</span>
                  <button className="button button-yellow" onClick={confirmMatchFinish}>Confirmar encerramento</button>
                </div>
              )}
              {resting && (
                <div className="rest-notice">
                  <strong>TEMPO SOLICITADO · {activeMatch[restingTeam]}</strong>
                  <span>Placar pausado. A mesa pode retomar a partida quando estiver pronta.</span>
                  <button onClick={continueAfterRest}>Retomar partida</button>
                </div>
              )}
            </div>
            <div className="athlete-picker">
              <div className="athlete-picker-heading">
                <strong>ATLETA RESPONSÁVEL</strong>
                <span>{selectedAthlete ? `${activeStat} • ${selectedAthlete}` : `Selecione quem realizou ${activeStat.toLowerCase()}`}</span>
              </div>
              <div className="athlete-picker-groups">
                {[activeTeamA, activeTeamB].map((team) => (
                  <div className="athlete-picker-group" key={team.name}>
                    <small>{team.name.toUpperCase()}</small>
                    <div>
                      {team.athletes.map((athlete) => (
                        <button
                          className={selectedAthlete === athlete ? "selected" : ""}
                          onClick={() => setSelectedAthlete(athlete)}
                          key={athlete}
                        >
                          {athlete}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section roster-section" id="atletas">
          <div className="section-heading">
            <div>
              <p className="section-kicker">CADASTRO DE ATLETAS</p>
              <h2>
                {registeredTeams.length} equipes.
                <br />
                <i>Uma arena.</i>
              </h2>
            </div>
            <span className="roster-count">
              {registeredTeams.length} EQUIPES <b>•</b> {registeredTeams.reduce((total, team) => total + team.athletes.length, 0)} ATLETAS
            </span>
          </div>
          <div className="team-grid">
            {registeredTeams.map((team, index) => (
              <article className="team-card" key={team.name}>
                <div className="team-card-head">
                  <span
                    className="team-color"
                    style={{ background: team.color }}
                  />{" "}
                  <strong>{String(index + 1).padStart(2, "0")}</strong>
                  <h3>{team.name}</h3>
                  <button aria-label={`Editar equipe ${team.name}`}>
                    <ArrowUpRight size={16} />
                  </button>
                </div>
                <div className="athlete-list">
                  {team.athletes.map((athlete, athleteIndex) => (
                    <div className="athlete" key={athlete}>
                      <span>{athleteIndex + 1}</span>
                      {athlete}
                      <small>{athleteIndex === 0 ? "CAPITÃO" : "ATLETA"}</small>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="standings-band" id="classificacao">
          <div className="section standings-inner">
            <div>
              <p className="section-kicker light">RANKING DO CIRCUITO</p>
              <h2>
                Quem vai
                <br />
                <i>levar o troféu?</i>
              </h2>
              <p className="standings-copy">
                São duas chaves de cinco equipes. As duas melhores de cada
                grupo avançam às semifinais.
              </p>
              <div className="public-rule">
                <strong>CRITÉRIOS DE DESEMPATE</strong>
                <span>Vitórias · saldo de pontos · pontos marcados · ordem inicial da tabela</span>
              </div>
              <a className="button button-outline" href="#classificacao">
                Ver classificação <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="leaderboard">
              <div className="leaderboard-head">
                <span>POS.</span>
                <span>EQUIPE</span>
                <span>VIT.</span>
              </div>
              {standings.map((team) => (
                <div className="leaderboard-row" key={team.name}>
                  <strong>{team.group}{team.rank}</strong>
                  <span>
                    <i style={{ background: team.color }} />
                    {team.name.toUpperCase()}
                  </span>
                  <b>{team.wins}</b>
                  <ArrowUpRight size={15} />
                </div>
              ))}
            </div>
            <div className="trophy-mark">
              <Trophy size={92} strokeWidth={1} />
              <span>
                AS
                <br />
                26
              </span>
            </div>
          </div>
        </section>

        <section className="section gallery-section" id="galeria">
          <div className="section-heading gallery-heading">
            <div>
              <p className="section-kicker">DIÁRIO DA ARENA</p>
              <h2>
                Visão da <i>Arena</i>
              </h2>
            </div>
            <a className="under-link" href="#galeria">
              @arenapraiaopen <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="gallery-carousel">
            <div className="post-grid">
            {visiblePosts.map((post, index) => (
              <article
                className={`post-card post-${index}`}
                key={`${post.image}-${galleryIndex}-${index}`}
              >
                <img src={post.image} alt="Momento do torneio na areia" />
                <div className="post-overlay">
                  <span>{post.label}</span>
                  <p>{post.text}</p>
                </div>
              </article>
            ))}
            <article className="post-card quote-card">
              <div>
                <span className="quote-mark">“</span>
                <p>
                  O melhor lugar para competir é onde todo mundo vem para se
                  divertir.
                </p>
                <small>— LUCAS MENDES, ATLETA</small>
              </div>
            </article>
            </div>
            <div className="gallery-controls"><button onClick={() => setGalleryIndex((current) => (current - 1 + posts.length) % posts.length)} aria-label="Fotos anteriores"><ChevronLeft size={17} /></button><span>{String((galleryIndex % posts.length) + 1).padStart(2, "0")} / {String(posts.length).padStart(2, "0")}</span><button onClick={() => setGalleryIndex((current) => (current + 1) % posts.length)} aria-label="Próximas fotos"><ChevronRight size={17} /></button></div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="brand footer-brand">
          <span>ALDEIA DA</span>
          <strong>SERRA</strong>
          <i>OPEN</i>
        </div>
        <p>Vôlei de areia com alma brasileira.</p>
        <div className="footer-meta">
          Copyright © 2026 Agis Maciel <span>•</span> Aldeia da Serra Open <span>•</span> Luziânia, GO
        </div>
      </footer>

      {adminOpen && !currentUser && (
        <div className="modal-backdrop" onClick={() => setAdminOpen(false)}>
          <section
            className="admin-modal"
            onClick={(event) => event.stopPropagation()}
          >
            {login || !currentUser ? (
              <>
                <button
                  className="close-modal"
                  onClick={() => setAdminOpen(false)}
                >
                  <X size={20} />
                </button>
                <p className="section-kicker">PAINEL RESTRITO</p>
                <h2>
                  Entrar no
                  <br />
                  <i>painel.</i>
                </h2>
                <label>
                  Usuário
                  <input value={loginUsername} onChange={(event) => setLoginUsername(event.target.value)} autoComplete="username" />
                </label>
                <label>
                  Senha
                  <input type="password" value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} autoComplete="current-password" onKeyDown={(event) => { if (event.key === "Enter") authenticate(); }} />
                </label>
                {loginError && <p className="form-error" role="alert">{loginError}</p>}
                <button
                  className="button button-dark"
                  onClick={authenticate}
                >
                  Entrar <ArrowUpRight size={17} />
                </button>
                <button className="modal-back" onClick={() => setAdminOpen(false)}>
                  Voltar ao site
                </button>
              </>
            ) : adminView === "photos" ? (
              <>
                <button className="close-modal" onClick={() => setAdminOpen(false)}><X size={20} /></button>
                <div className="admin-tabs"><button onClick={() => setAdminView("publish")}>PUBLICAR FOTO</button><button className="active">FOTOS PUBLICADAS</button></div>
                <p className="section-kicker">ÁLBUM DO EVENTO</p>
                <h2>Fotos<br /><i>publicadas.</i></h2>
                <div className="admin-photo-grid">{posts.map((post, index) => <article key={`${post.image}-${index}`}><img src={post.image} alt="Foto publicada do evento" /><div><strong>{post.label}</strong><span>{post.text}</span></div></article>)}</div>
                <button className="button button-dark" onClick={() => setAdminView("publish")}><Camera size={17} /> Publicar nova foto</button>
              </>
            ) : (
              <>
                <button
                  className="close-modal"
                  onClick={() => setAdminOpen(false)}
                >
                  <X size={20} />
                </button>
                <div className="admin-tabs"><button className="active">PUBLICAR FOTO</button><button onClick={() => setAdminView("photos")}>FOTOS PUBLICADAS</button></div>
                <p className="section-kicker">PUBLICAÇÃO RÁPIDA</p>
                <h2>
                  Mostre o que
                  <br />
                  <i>está rolando.</i>
                </h2>
                <p className="modal-copy">
                  Registre um momento da arena pelo celular e publique na
                  galeria em segundos.
                </p>
                {selectedFile ? (
                  <div className="upload-preview">
                    <img
                      src={selectedFile.url}
                      alt="Prévia da foto selecionada"
                    />
                    <button
                      onClick={() => setSelectedFile(null)}
                      aria-label="Remover foto"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    className="upload-zone"
                    onClick={() => fileInput.current?.click()}
                  >
                    <Camera size={28} />
                    <strong>Tirar foto ou escolher arquivo</strong>
                    <span>JPG, PNG até 10 MB</span>
                  </button>
                )}
                <input
                  ref={fileInput}
                  className="visually-hidden"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFile}
                />
                {selectedFile && (
                  <>
                    <label>
                      Legenda
                      <input
                        value={caption}
                        onChange={(event) => setCaption(event.target.value)}
                        placeholder="Escreva uma legenda..."
                      />
                    </label>
                    <button
                      className="button button-dark publish-button"
                      onClick={publishPost}
                    >
                      <Upload size={17} /> Publicar na galeria
                    </button>
                  </>
                )}
                <div className="admin-divider">
                  <span>ou</span>
                </div>
                <button className="login-link" onClick={() => setLogin(true)}>
                  Entrar como administrador <ArrowUpRight size={16} />
                </button>
              </>
            )}
          </section>
        </div>
      )}

      {adminOpen && currentUser && (
        <div className="modal-backdrop admin-console-backdrop" onClick={() => setAdminOpen(false)}>
          <section className="admin-console" onClick={(event) => event.stopPropagation()}>
            <header className="admin-console-header">
              <div><p className="section-kicker">ADMINISTRAÇÃO DO TORNEIO</p><h2>Painel <i>da arena.</i></h2></div>
              <div className="admin-user-tools"><span>{currentUser.name} · {currentUser.role}</span><button onClick={logout}>Sair</button><button className="close-modal" onClick={() => setAdminOpen(false)} aria-label="Fechar painel"><X size={20} /></button></div>
            </header>
            <nav className="console-tabs" aria-label="Seções administrativas">
              {allowedAdminViews.map((view) => <button className={adminView === view ? "active" : ""} key={view} onClick={() => setAdminView(view)}>{({ sheet: "Súmula", table: "Tabela", regulation: "Regulamento", teams: "Equipes", users: "Usuários", photos: "Publicações", simula: "Simulação" })[view]}</button>)}
            </nav>

            {adminView === "sheet" && allowedAdminViews.includes("sheet") && (
              <div className="console-content">
                <div className="console-title"><div><p className="section-kicker">SÚMULA OFICIAL · JOGO {activeFixture?.gameNumber || "01"}</p><h3>{activeMatch.a} <i>×</i> {activeMatch.b}</h3><p className="sheet-fixture-meta">{activeFixture?.group ? `CHAVE ${activeFixture.group}` : activeFixture?.phase} · {activeFixture?.time} · {activeFixture?.status}</p></div><label>Selecionar jogo<select value={selectedFixtureKey} onChange={(event) => selectFixture(event.target.value)}>{scheduledMatches.map((match) => <option value={match.key} key={match.key} disabled={match.status === "FINALIZADO" || match.status.startsWith("AGUARDANDO")}>{match.gameNumber} · {match.time} · {match.group ? `Chave ${match.group}` : match.phase} · {match.a} x {match.b} · {match.status}</option>)}</select><button className="button button-dark" type="button" onClick={() => loadMatch(selectedFixture)} disabled={!selectedFixture || selectedFixture.status === "FINALIZADO" || selectedFixture.status.startsWith("AGUARDANDO") || (matchStarted && selectedFixture.key === activeFixtureKey)}>Iniciar jogo selecionado</button></label></div>
                <div className="sheet-grid">
                  <label>Data<input type="date" value={currentSheet.date} onChange={(event) => updateSheetField("date", event.target.value)} /></label>
                  <label>Quadra<input value={currentSheet.court || activeFixture?.court || "Quadra 01"} onChange={(event) => updateSheetField("court", event.target.value)} /></label>
                  <label>Número do jogo<input value={currentSheet.gameNumber} onChange={(event) => updateSheetField("gameNumber", event.target.value)} placeholder="Ex.: 01" /></label>
                  <label>Chave / fase<input value={activeFixture?.group ? `Chave ${activeFixture.group}` : activeFixture?.phase || currentSheet.phase} readOnly /></label>
                  <label>Horário previsto<input type="time" value={activeFixture?.time || ""} readOnly /></label>
                  <label>Capitão {activeMatch.a}<input value={currentSheet.captainA} onChange={(event) => updateSheetField("captainA", event.target.value)} /></label>
                  <label>Capitão {activeMatch.b}<input value={currentSheet.captainB} onChange={(event) => updateSheetField("captainB", event.target.value)} /></label>
                  <label>Primeiro saque<select value={currentSheet.firstServe} onChange={(event) => updateSheetField("firstServe", event.target.value)}><option value="">Selecione</option><option value="a">{activeMatch.a}</option><option value="b">{activeMatch.b}</option></select></label>
                </div>
                <div className="sheet-set-list"><h4>CONTROLE DOS SETS • 2X21 • DESEMPATE 15</h4>{[1, 2, 3].map((setIndex) => {
                  const set = currentSheet.sets[setIndex] || {};
                  return <fieldset className="sheet-set" key={setIndex}><legend>{setIndex === 3 ? "3º set" : `Set ${setIndex}`}</legend><label>Início<input type="time" value={set.start || ""} onChange={(event) => updateSheetSet(setIndex, "start", event.target.value)} /></label><label>Término<input type="time" value={set.end || ""} onChange={(event) => updateSheetSet(setIndex, "end", event.target.value)} /></label><label>{activeMatch.a}<input type="number" min="0" max="30" value={set.scoreA ?? ""} onChange={(event) => updateSheetSet(setIndex, "scoreA", event.target.value)} /></label><label>{activeMatch.b}<input type="number" min="0" max="30" value={set.scoreB ?? ""} onChange={(event) => updateSheetSet(setIndex, "scoreB", event.target.value)} /></label><label>Tempos / ocorrências<input value={set.events || ""} onChange={(event) => updateSheetSet(setIndex, "events", event.target.value)} placeholder="Ex.: tempo da equipe A; ocorrência" /></label><button type="button" onClick={() => copyLiveScoreToSheet(setIndex)}>Usar placar ao vivo</button></fieldset>;
                })}</div>
                <div className="sheet-grid sheet-extra"><label>Oficiais<input value={currentSheet.officials} onChange={(event) => updateSheetField("officials", event.target.value)} placeholder="Árbitro, apontador(a)" /></label><label className="sheet-notes">Ocorrências e observações<textarea value={currentSheet.notes} onChange={(event) => updateSheetField("notes", event.target.value)} rows="3" /></label></div>
                <p className="autosave-note">Preenchimento salvo automaticamente neste dispositivo.</p>
              </div>
            )}

            {adminView === "table" && allowedAdminViews.includes("table") && (
              <div className="console-content">
                <div className="console-title"><div><p className="section-kicker">TABELA OFICIAL · 22 JOGOS</p><h3>Fases do <i>campeonato.</i></h3></div><span>{new Set(matchRecords.filter((record) => /^J(?:0[1-9]|1[0-9]|2[0-2])$/.test(record.fixture)).map((record) => record.fixture)).size} resultados registrados</span></div>
                <p className="modal-copy">20 jogos classificatórios em duas chaves, seguidos por duas semifinais. Os confrontos das semifinais são preenchidos após a conclusão das duas chaves.</p>
                {registeredTeams.length !== 10 && <p className="form-error" role="alert">Cadastre exatamente 10 equipes para iniciar a tabela oficial. No momento: {registeredTeams.length}.</p>}
                <div className="admin-fixture-list">
                  {scheduledMatches.map((match) => <div className="admin-scheduled-game" key={match.key}>
                    <p><b>{match.gameNumber} · {match.time} · {match.phase}{match.group ? ` · CHAVE ${match.group}` : ""}</b><span>{match.a} × {match.b} · {match.status}{match.score ? ` · ${match.score}` : ""}</span></p>
                    {match.breakAfter && <div className="schedule-break"><strong>🍽️ {match.breakAfter}</strong></div>}
                  </div>)}
                </div>
                <div className="tournament-standings admin-standings">
                  <h4>CLASSIFICAÇÃO POR CHAVE · DUAS VAGAS PARA CADA SEMIFINAL</h4>
                  <div className="standings-table-wrap"><table className="standings-table">
                    <thead><tr><th>Chave</th><th>Pos.</th><th>Equipe</th><th>J</th><th>V</th><th>D</th><th>Pontos</th><th>Saldo</th><th>Classificação</th></tr></thead>
                    <tbody>{standings.map((team) => <tr key={team.name} className={team.qualified ? "qualified-row" : ""}><td>{team.group}</td><td>{team.rank}</td><td><i style={{ background: team.color }} />{team.name.toUpperCase()}</td><td>{team.played}</td><td>{team.wins}</td><td>{team.losses}</td><td>{team.pointsFor}</td><td>{team.pointDiff > 0 ? "+" : ""}{team.pointDiff}</td><td>{team.qualified === null ? (team.wins ? `${team.rank}º · provisório` : "A jogar") : team.qualified ? "Semifinalista" : "Eliminado"}</td></tr>)}</tbody>
                  </table></div>
                </div>
              </div>
            )}

            {adminView === "regulation" && allowedAdminViews.includes("regulation") && (
              <div className="console-content"><div className="console-title"><div><p className="section-kicker">DOCUMENTO PÚBLICO</p><h3>Regulamento da <i>competição.</i></h3></div><span className="autosave-note">Publicado na página principal</span></div><label className="regulation-editor">Texto do regulamento<textarea rows="18" value={regulation} onChange={(event) => setRegulation(event.target.value)} /></label></div>
            )}

            {adminView === "teams" && allowedAdminViews.includes("teams") && (
              <div className="console-content"><div className="console-title"><div><p className="section-kicker">CADASTRO</p><h3>Equipes <i>inscritas.</i></h3></div><span>{registeredTeams.length}/10 equipes</span></div><form className="team-create-form" onSubmit={createTeam}><label>Nome da equipe<input required value={newTeam.name} onChange={(event) => setNewTeam({ ...newTeam, name: event.target.value })} /></label><label>Cor<input type="color" value={newTeam.color} onChange={(event) => setNewTeam({ ...newTeam, color: event.target.value })} /></label><label>Atletas (separe por vírgula ou linha)<input value={newTeam.athletes} onChange={(event) => setNewTeam({ ...newTeam, athletes: event.target.value })} /></label><button className="button button-dark" type="submit" disabled={registeredTeams.length >= 10 || matchStarted || matchRecords.length > 0}>Adicionar equipe</button></form><div className="admin-team-list">{registeredTeams.map((team) => <article key={team.name}><i style={{ background: team.color }} /><div><strong>{team.name}</strong><span>{team.athletes.join(" · ") || "Atletas não informados"}</span></div><button disabled={matchStarted || matchRecords.length > 0} onClick={() => removeTeam(team.name)} aria-label={`Remover equipe ${team.name}`}>Remover</button></article>)}</div></div>
            )}

            {adminView === "users" && currentUser.role === "admin" && (
              <div className="console-content"><div className="console-title"><div><p className="section-kicker">ACESSO AO PAINEL</p><h3>Usuários e <i>permissões.</i></h3></div></div><form className="user-create-form" onSubmit={createUser}><label>Nome<input required value={newUser.name} onChange={(event) => setNewUser({ ...newUser, name: event.target.value })} /></label><label>Usuário<input required autoComplete="off" value={newUser.username} onChange={(event) => setNewUser({ ...newUser, username: event.target.value })} /></label><label>Senha<input required type="password" autoComplete="new-password" value={newUser.password} onChange={(event) => setNewUser({ ...newUser, password: event.target.value })} /></label><label>Nível de acesso<select value={newUser.role} onChange={(event) => setNewUser({ ...newUser, role: event.target.value })}><option value="mesario">Mesário · súmula</option><option value="organizador">Organizador · tabela, equipes e regulamento</option><option value="publicador">Publicador · fotos</option><option value="admin">Administrador · acesso total</option></select></label><button className="button button-dark" type="submit">Criar usuário</button></form><form className="password-change-form" onSubmit={changeOwnPassword}><strong>ALTERAR MINHA SENHA</strong><label>Senha atual<input required type="password" value={passwordChange.current} onChange={(event) => setPasswordChange({ ...passwordChange, current: event.target.value })} /></label><label>Nova senha<input required minLength="4" type="password" value={passwordChange.next} onChange={(event) => setPasswordChange({ ...passwordChange, next: event.target.value })} /></label><button type="submit">Atualizar senha</button></form><div className="admin-user-list">{users.map((user) => <article key={user.id}><div><strong>{user.name}</strong><span>{user.username} · {({ admin: "Administrador", mesario: "Mesário", organizador: "Organizador", publicador: "Publicador" })[user.role]}</span></div><button disabled={user.id === currentUser.id || user.id === "admin-inicial"} onClick={() => setUsers((current) => current.filter((item) => item.id !== user.id))}>Remover</button></article>)}</div><p className="security-note">As contas e senhas ficam armazenadas neste navegador. Esta autenticação local não oferece proteção segura para produção.</p></div>
            )}

            {adminView === "photos" && allowedAdminViews.includes("photos") && (
              <div className="console-content"><div className="console-title"><div><p className="section-kicker">ÁLBUM DO EVENTO</p><h3>Publicações da <i>arena.</i></h3></div></div>{selectedFile ? <div className="upload-preview"><img src={selectedFile.url} alt="Prévia da foto selecionada" /><button onClick={() => setSelectedFile(null)} aria-label="Remover foto"><X size={16} /></button></div> : <button className="upload-zone" onClick={() => fileInput.current?.click()}><Camera size={28} /><strong>Tirar foto ou escolher arquivo</strong><span>JPG, PNG até 10 MB</span></button>}<input ref={fileInput} className="visually-hidden" type="file" accept="image/*" capture="environment" onChange={handleFile} />{selectedFile && <div className="photo-publish-controls"><label>Legenda<input value={caption} onChange={(event) => setCaption(event.target.value)} placeholder="Escreva uma legenda..." /></label><button className="button button-dark" onClick={publishPost}><Upload size={16} /> Publicar na galeria</button></div>}<div className="admin-photo-grid">{posts.map((post, index) => <article key={`${post.image}-${index}`}><img src={post.image} alt="Foto publicada do evento" /><div><strong>{post.label}</strong><span>{post.text}</span></div></article>)}</div></div>
            )}

            {adminView === "simula" && allowedAdminViews.includes("simula") && (
              <div className="console-content">
                <div className="console-title">
                  <div><p className="section-kicker">MONTE CARLO</p><h3>Simulação <i>de tempo.</i></h3></div>
                </div>
                <p className="modal-copy">Preveja o horário de término do torneio com base em variáveis e histórico de pontuação.</p>
                <div className="sheet-grid" style={{ marginBottom: "1.5rem" }}>
                  <label>Pontuação base<input type="number" value="21" readOnly /></label>
                  <label>Teto de pontos<input type="number" min="15" max="21" value={simConfig.teto} onChange={(e) => setSimConfig({...simConfig, teto: Math.min(21, Math.max(15, Number(e.target.value)))})} /></label>
                  <label>Sets por partida<input type="number" value="1" readOnly /></label>
                  <label>Qtd. de jogos no dia<input type="number" min="1" value={simConfig.numeroJogos} onChange={(e) => setSimConfig({...simConfig, numeroJogos: Number(e.target.value)})} /></label>
                  <label>Tempo de almoço (min)<input type="number" min="0" value={simConfig.tempoAlmoco} onChange={(e) => setSimConfig({...simConfig, tempoAlmoco: Number(e.target.value)})} /></label>
                  <label>Nº de simulações<input type="number" min="100" step="100" value={simConfig.simulacoes} onChange={(e) => setSimConfig({...simConfig, simulacoes: Number(e.target.value)})} /></label>
                </div>
                <button className="button button-dark" onClick={runSimulation}>
                  Rodar Simulação
                </button>
                {simResult && (
                  <div className="draw-result" style={{ marginTop: '1.5rem' }}>
                    <div className="draw-result-head">
                      <strong>RESULTADOS DA SIMULAÇÃO</strong>
                      <small>{simConfig.simulacoes.toLocaleString("pt-BR")} cenários testados</small>
                    </div>
                    <div className="fixture-preview" style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <span><b>Probabilidade de terminar até 18:00:</b> {simResult.probabilidade.toFixed(2)}%</span>
                      <span><b>Duração média por partida:</b> {simResult.duracaoMediaPartida.toFixed(1)} min</span>
                      <span><b>Horário médio de término:</b> {minutosParaHorario(simResult.mediaFinal)}</span>
                      <span><b>Melhor cenário (mais cedo):</b> {minutosParaHorario(simResult.melhor)}</span>
                      <span><b>Pior cenário (mais tarde):</b> {minutosParaHorario(simResult.pior)}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      )}

      {recordsOpen && (
        <div className="modal-backdrop" onClick={() => setRecordsOpen(false)}>
          <section className="records-modal" onClick={(event) => event.stopPropagation()}>
            <button className="close-modal" onClick={() => setRecordsOpen(false)} aria-label="Fechar histórico">
              <X size={20} />
            </button>
            <p className="section-kicker">ARQUIVO DA ARENA</p>
            <h2>Histórico<br /><i>das súmulas.</i></h2>
            <div className="records-actions">
              <button className="button button-dark" onClick={() => downloadRecords("json")} disabled={!matchRecords.length}>
                <Download size={16} /> Baixar JSON
              </button>
              <button className="button button-outline" onClick={() => downloadRecords("csv")} disabled={!matchRecords.length}>
                <FileText size={16} /> Baixar CSV
              </button>
            </div>
            {matchRecords.length ? (
              <div className="records-list">
                {matchRecords.map((record) => (
                  <article className="record-card" key={record.id}>
                    <div className="record-card-head">
                      <div>
                        <strong>{record.teamA} <span>×</span> {record.teamB}</strong>
                        <small>JOGO {record.gameNumber || record.fixture} · {record.scheduledTime || "--:--"} · {record.group ? `CHAVE ${record.group}` : record.phase} · {record.court}</small>
                        <small>Realizado em {new Date(record.recordedAt).toLocaleString("pt-BR")} · início {record.startedAt ? new Date(record.startedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "--:--"} · término {record.finishedAt ? new Date(record.finishedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "--:--"}</small>
                      </div>
                      <b>{record.winner}</b>
                    </div>
                    <div className="record-card-sets">
                      {record.sets.map((set) => <span key={set.number}>SET {set.number} <b>{set.a} — {set.b}</b></span>)}
                      <span>TEMPO {record.teamA}: <b>{record.timeoutsUsed?.a ? "SIM" : "NÃO"}</b></span>
                      <span>TEMPO {record.teamB}: <b>{record.timeoutsUsed?.b ? "SIM" : "NÃO"}</b></span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="records-empty">Nenhuma partida encerrada foi registrada ainda.</div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default App;

createRoot(document.getElementById("root")).render(<App />);
