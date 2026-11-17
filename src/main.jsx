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
    eyebrow: "ALDEIA DA SERRA OPEN 40+ • 20 NOV 2026",
    title: "A areia vai ferver em Luziânia.",
    copy: "Sexta-feira, 20 de novembro: vôlei, torcida e encontros no Condomínio Aldeia da Serra.",
    image: `${import.meta.env.BASE_URL}references/arena.jpeg?v=20261120`,
  },
  {
    eyebrow: "TORNEIO 40+ • SEXTA-FEIRA",
    title: "Do primeiro saque à grande final.",
    copy: "Uma nova competição de vôlei de areia espera por você em Luziânia.",
    image: `${import.meta.env.BASE_URL}references/Equipe_preta.jpeg?v=20261120`,
  },
  {
    eyebrow: "20 DE NOVEMBRO • LUZIÂNIA",
    title: "Uma nova rodada de histórias na areia.",
    copy: "O torneio 40+ chega à Aldeia da Serra para mais um dia de vôlei de areia.",
    image: `${import.meta.env.BASE_URL}references/campeões.jpeg?v=20261120`,
  },
  {
    eyebrow: "ALDEIA DA SERRA OPEN 40+ • CONVITE",
    title: "Veja a energia do Open.",
    copy: "Acompanhe os vídeos da arena e venha viver esse dia com a gente.",
    video: "/references/video1.mp4",
    poster: `${import.meta.env.BASE_URL}references/arena.jpeg`,
  },
  {
    eyebrow: "ALDEIA DA SERRA OPEN 40+ • CONVITE",
    title: "Veja a energia do Open.",
    copy: "Acompanhe os vídeos da arena e venha viver esse dia com a gente.",
    video: "/references/video2.mp4",
    poster: `${import.meta.env.BASE_URL}references/Equipe_preta.jpeg`,
  },
  {
    eyebrow: "ALDEIA DA SERRA OPEN 40+ • CONVITE",
    title: "Veja a energia do Open.",
    copy: "Acompanhe os vídeos da arena e venha viver esse dia com a gente.",
    video: "/references/video3.mp4",
    poster: `${import.meta.env.BASE_URL}references/campeões.jpeg`,
  },
];

const additionalSports = [
  {
    name: "Beach Tennis",
    description: "Uma modalidade de raquete com progressão própria de pontos, games e sets.",
    format: "Simples ou duplas, conforme as categorias habilitadas no evento.",
    scoreboard: "Pontos do game, games, sets e tie-break ou formato decisivo configurado.",
    matchData: "Sacador e sequência de saque, lado de quadra, trocas, interrupções e sanções.",
    stats: "Sets, games e pontos ganhos/perdidos; aces e erros podem ser registrados como estatísticas opcionais.",
    accent: "tennis",
  },
  {
    name: "Beach Soccer",
    description: "Uma modalidade de equipe com partidas organizadas por gols e períodos.",
    format: "Elenco, escalação inicial, reservas, numeração e substituições segundo o regulamento.",
    scoreboard: "Gols, período e relógio; tempo corrido, pausas e acréscimos conforme a regra adotada.",
    matchData: "Gols, gols contra, pênaltis, faltas, cartões, substituições e interrupções.",
    stats: "Gols, faltas, cartões e substituições; demais indicadores dependem do registro disponível.",
    accent: "soccer",
  },
];

const tournamentGames = [
  { key: "J01", phase: "Fase classificatória", group: "A", gameNumber: "01", time: "08:30", court: "Quadra 01", teamA: 0, teamB: 1 },
  { key: "J02", phase: "Fase classificatória", group: "B", gameNumber: "02", time: "08:50", court: "Quadra 01", teamA: 4, teamB: 5 },
  { key: "J03", phase: "Fase classificatória", group: "A", gameNumber: "03", time: "09:10", court: "Quadra 01", teamA: 2, teamB: 3 },
  { key: "J04", phase: "Fase classificatória", group: "B", gameNumber: "04", time: "09:30", court: "Quadra 01", teamA: 6, teamB: 7 },
  { key: "J05", phase: "Fase classificatória", group: "A", gameNumber: "05", time: "09:50", court: "Quadra 01", teamA: 0, teamB: 2 },
  { key: "J06", phase: "Fase classificatória", group: "B", gameNumber: "06", time: "10:10", court: "Quadra 01", teamA: 4, teamB: 6 },
  { key: "J07", phase: "Fase classificatória", group: "A", gameNumber: "07", time: "10:30", court: "Quadra 01", teamA: 1, teamB: 3 },
  { key: "J08", phase: "Fase classificatória", group: "B", gameNumber: "08", time: "10:50", court: "Quadra 01", teamA: 5, teamB: 7 },
  { key: "J09", phase: "Fase classificatória", group: "A", gameNumber: "09", time: "11:10", court: "Quadra 01", teamA: 0, teamB: 3 },
  { key: "J10", phase: "Fase classificatória", group: "B", gameNumber: "10", time: "11:30", court: "Quadra 01", teamA: 4, teamB: 7 },
  { key: "J11", phase: "Fase classificatória", group: "A", gameNumber: "11", time: "11:50", court: "Quadra 01", teamA: 1, teamB: 2 },
  { key: "J12", phase: "Fase classificatória", group: "B", gameNumber: "12", time: "12:10", court: "Quadra 01", teamA: 5, teamB: 6 },
  { key: "J13", phase: "1ª semifinal", gameNumber: "13", time: "12:50", court: "Quadra 01", seedAGroup: "A", seedA: 1, seedBGroup: "B", seedB: 2 },
  { key: "J14", phase: "2ª semifinal", gameNumber: "14", time: "13:10", court: "Quadra 01", seedAGroup: "A", seedA: 2, seedBGroup: "B", seedB: 1 },
  { key: "J15", phase: "Disputa do 3º lugar", gameNumber: "15", time: "13:30", court: "Quadra 01", loserOf: ["J13", "J14"] },
  { key: "J16", phase: "Final", gameNumber: "16", time: "13:50", court: "Quadra 01", winnerOf: ["J13", "J14"] },
];

const resultForFixture = (records, key) => records.find((record) => record.fixture === key);

const hasCompleteTeamRegistration = (registeredTeams) =>
  registeredTeams.length === 8
  && registeredTeams.every((team) => Array.isArray(team.athletes) && team.athletes.length >= 4);

const getTournamentStandings = (registeredTeams, matchRecords) => {
  const teamsByName = registeredTeams.slice(0, 8).map((team, index) => ({
    ...team,
    seed: index + 1,
    group: index < 4 ? "A" : "B",
    played: 0,
    wins: 0,
    losses: 0,
    pointsFor: 0,
    pointsAgainst: 0,
    pointDiff: 0,
  }));
  const teamsByNameMap = new Map(teamsByName.map((team) => [team.name.toUpperCase(), team]));

  matchRecords
    .filter((record) => /^J(?:0[1-9]|1[0-2])$/.test(record.fixture))
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
    left.seed - right.seed;
  const completedGames = new Set(
    matchRecords
      .filter((record) => /^J(?:0[1-9]|1[0-2])$/.test(record.fixture))
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
  if (!hasCompleteTeamRegistration(registeredTeams)) return { matches: [], standings: [] };
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
    } else if (game.loserOf) {
      const semifinalRecords = game.loserOf
        .map((fixture) => resultForFixture(matchRecords, fixture))
        .filter(Boolean);
      a = semifinalRecords[0]?.loser?.toUpperCase() || null;
      b = semifinalRecords[1]?.loser?.toUpperCase() || null;
      waiting = "AGUARDANDO OS RESULTADOS DAS SEMIFINAIS";
    } else if (game.winnerOf) {
      const semifinalRecords = game.winnerOf
        .map((fixture) => resultForFixture(matchRecords, fixture))
        .filter(Boolean);
      a = semifinalRecords[0]?.winner?.toUpperCase() || null;
      b = semifinalRecords[1]?.winner?.toUpperCase() || null;
      waiting = "AGUARDANDO OS RESULTADOS DAS SEMIFINAIS";
    }

    const record = resultForFixture(matchRecords, game.key);
    const colorA = teamsByName.get(a)?.color || "#8a929a";
    const colorB = teamsByName.get(b)?.color || "#8a929a";
    const canPlay = registeredTeams.length === 8 && Boolean(a && b);

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
              ? "AGUARDANDO 8 EQUIPES"
              : waiting,
      score: record?.sets?.map((set) => `${set.a} — ${set.b}`).join(" / ") || null,
      winner: record?.winner || null,
    };
  });

  return { matches, standings };
};

const getSetTarget = () => 15;

const winnerAtScore = (currentScore, setNumber = 1) => {
  const target = getSetTarget(setNumber);
  if (currentScore.a >= target) return "a";
  if (currentScore.b >= target) return "b";
  return null;
};

const initialPosts = [
  {
    image: `${import.meta.env.BASE_URL}references/arena.jpeg`,
    label: "ALDEIA DA SERRA OPEN",
    text: "Vôlei de areia, competição e torcida na Aldeia da Serra.",
  },
  {
    image: `${import.meta.env.BASE_URL}references/campeões.jpeg`,
    label: "PÓDIO NA AREIA",
    text: "Uma lembrança da competição que já aconteceu.",
  },
  {
    image: `${import.meta.env.BASE_URL}references/Equipe_preta.jpeg`,
    label: "EQUIPE NA AREIA",
    text: "Vôlei de areia no Condomínio Aldeia da Serra.",
  },
];

const legacyGalleryImages = new Map([
  [
    "https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=700&q=80",
    initialPosts[0].image,
  ],
  [
    "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=700&q=80",
    initialPosts[1].image,
  ],
]);

const previousTournaments = [
  {
    name: "Aldeia da Serra Open",
    category: "Vôlei de areia 4x4",
    date: "10 OUT 2026",
    image: `${import.meta.env.BASE_URL}references/campeões.jpeg`,
  },
];

const musicTracks = [
  { name: "Trilha 01 • YouTube", id: "wVoByiNNLq8" },
  { name: "Trilha 02 • YouTube", id: "4wCoOtbSaPc" },
  { name: "Trilha 03 • YouTube", id: "w2ZYhhQy-WQ" },
];

const initialUsers = [
  { id: "admin-inicial", name: "Administrador", username: "admin", password: "admin", role: "admin", mustChangePassword: true },
];

const passwordSecurityKey = "aldeia-serra-open-password-security-v1";

const validateStrongPassword = (password) =>
  password.length >= 10
  && /[A-Z]/.test(password)
  && /[a-z]/.test(password)
  && /\d/.test(password)
  && /[^A-Za-z0-9]/.test(password);

const hashPassword = async (password, salt) => {
  const actualSalt = salt || Array.from(window.crypto.getRandomValues(new Uint8Array(16)))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  const encoder = new TextEncoder();
  const key = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await window.crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: encoder.encode(actualSalt),
      iterations: 120000,
      hash: "SHA-256",
    },
    key,
    256,
  );
  return {
    salt: actualSalt,
    hash: Array.from(new Uint8Array(bits)).map((byte) => byte.toString(16).padStart(2, "0")).join(""),
  };
};

const initialTeams40Plus = [
  { name: "TIME A", color: "#1564f5", athletes: ["Fred", "Cícero", "Michele Alvarenga", "Andresa"] },
  { name: "TIME B", color: "#ef4444", athletes: ["Flávio Batata", "Marcelo", "Aline Carneiro", "Andrea"] },
  { name: "TIME C", color: "#22c55e", athletes: ["Anderson", "Tárcio", "Elisângela", "Fran"] },
  { name: "TIME D", color: "#f59e0b", athletes: ["Regy", "Ricardo Carneiro", "Lucilainy", "Michele Caldrone"] },
  { name: "TIME E", color: "#8b5cf6", athletes: ["André", "Janilson", "Marília", "Maíra"] },
  { name: "TIME F", color: "#06b6d4", athletes: ["Alessandro", "William", "Aline", "Márcia"] },
  { name: "TIME G", color: "#ec4899", athletes: ["Agis", "Kátia", "Gil", "Ana Paula"] },
  { name: "TIME H", color: "#111827", athletes: ["Heraldo", "Stela", "Elísio", "Roberta"] },
];

const initialRegulation = `1º CAMPEONATO • QUARTETOS MISTOS • VÔLEI DE AREIA 40+
Condomínio Aldeia da Serra • início às 8h • todos os atletas presentes às 8h

COMPOSIÇÃO DAS EQUIPES
• Oito equipes em dois grupos de quatro.
• Cada quarteto deve ter dois homens e duas mulheres.

FORMATO DA COMPETIÇÃO
• Fase classificatória: todos jogam entre si no grupo. Cada jogo será em melhor de três sets de 15 pontos.
• Os dois melhores de cada grupo avançam às semifinais.
• 13º jogo: 1º do Grupo 1 × 2º do Grupo 2.
• 14º jogo: 2º do Grupo 1 × 1º do Grupo 2.
• 15º jogo: disputa do 3º lugar entre os perdedores das semifinais.
• 16º jogo: final entre os vencedores das semifinais.
• Semifinais, disputa do 3º lugar e final serão em melhor de três sets de 15 pontos.

CRITÉRIOS DE DESEMPATE
• 1º maior número de vitórias.
• 2º maior saldo de pontos.
• 3º confronto direto.

REGRAS DOS JOGOS
• Aplicam-se as regras do vôlei de quadra.
• Como não há linha central, a invasão por baixo só será marcada se atrapalhar ou impedir a ação da equipe adversária.
• Rodízio de saque obrigatório e rodízio de posições dispensado.
• Cada equipe tem direito a um tempo de um minuto por partida.
• Troca de lado a cada sete pontos somados no placar.

ESTRUTURA E ORGANIZAÇÃO
• Haverá uma única quadra e os grupos serão alternados na fase classificatória.
• As equipes devem acompanhar a ordem dos jogos.
• Aquecimento de rede e saque somente antes da primeira partida de cada equipe.
• Poderá haver jogos sob sol ou chuva, conforme as condições de segurança.

LOCAL E HORÁRIO
• Condomínio Aldeia da Serra.
• Todos os atletas deverão estar presentes às 8h.

PREMIAÇÃO
• Medalhas de ouro, prata e bronze para o 1º, 2º e 3º lugares.

Este regulamento pode ser atualizado pela organização. A versão publicada nesta página é a válida para a competição.`;

const emptyMatchSheet = {
  date: "2026-11-20",
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
  const [reportType, setReportType] = useState("championship");
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
  const [timeoutLog, setTimeoutLog] = useState([]);
  const [pausedDurationMs, setPausedDurationMs] = useState(0);
  const [pauseStartedAt, setPauseStartedAt] = useState("");
  const [matchStarted, setMatchStarted] = useState(false);
  const [matchStartedAt, setMatchStartedAt] = useState("");
  const [matchFinishedAt, setMatchFinishedAt] = useState("");
  const [timerNow, setTimerNow] = useState(Date.now());
  const [activeMatch, setActiveMatch] = useState({ a: "A DEFINIR", b: "A DEFINIR" });
  const [serveAdvantage, setServeAdvantage] = useState("a");
  const [rallies, setRallies] = useState(28);
  const [activeStat, setActiveStat] = useState("PONTO");
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [rallyRecords, setRallyRecords] = useState([]);
  const [fullscreenScoreboard, setFullscreenScoreboard] = useState(false);
  const [adminTab, setAdminTab] = useState("publicar");
  const [scheduledMatches, setScheduledMatches] = useState([]);
  const [schedulePublished, setSchedulePublished] = useState(false);
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
  const [registeredTeams, setRegisteredTeams] = useState(initialTeams40Plus);
  const [users, setUsers] = useState(initialUsers);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginUsername, setLoginUsername] = useState("admin");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginFailedCount, setLoginFailedCount] = useState(() => {
    try {
      return Number(JSON.parse(localStorage.getItem(passwordSecurityKey) || "{}").failedCount) || 0;
    } catch {
      return 0;
    }
  });
  const [loginLockUntil, setLoginLockUntil] = useState(() => {
    try {
      return Number(JSON.parse(localStorage.getItem(passwordSecurityKey) || "{}").lockUntil) || 0;
    } catch {
      return 0;
    }
  });
  const [regulation, setRegulation] = useState(initialRegulation);
  const [matchSheets, setMatchSheets] = useState({});
  const [newUser, setNewUser] = useState({ name: "", username: "", password: "", role: "mesario" });
  const [passwordChange, setPasswordChange] = useState({ current: "", next: "" });
  const [forcePasswordChange, setForcePasswordChange] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: "", color: "#1564f5", athletes: "" });
  const [newAthlete, setNewAthlete] = useState({ name: "", team: "" });

  const [simConfig, setSimConfig] = useState({
    pontuacaoBase: 15,
    teto: 15,
    setsPorPartida: 3,
    pontuacaoSetDecisivo: 15,
    intervaloEntreSets: 3,
    intervaloEntreJogos: 5,
    jogoAlmoco: 10,
    tempoAlmoco: 120,
    numeroJogos: 16,
    horarioInicio: "08:30",
    horarioLimite: "18:00",
    segundosPorPontoMin: 20,
    segundosPorPontoMax: 32,
    chanceSetEstendido: 20,
    simulacoes: 10000,
  });
  const [simResult, setSimResult] = useState(null);
  const [simError, setSimError] = useState("");

  const formatElapsedTime = (durationMs) => {
    const totalSeconds = Math.max(0, Math.floor(durationMs / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const minutosParaHorario = (minutos) => {
    const m = Math.round(minutos);
    const horas = Math.floor(m / 60);
    const mins = m % 60;
    return `${String(horas).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  };

  const updateSimulationConfig = (field, value) => {
    setSimConfig((current) => ({ ...current, [field]: value }));
    setSimResult(null);
    setSimError("");
  };

  const runSimulation = () => {
    const inicio = simConfig.horarioInicio.split(":").map(Number);
    const limite = simConfig.horarioLimite.split(":").map(Number);
    const validTime = (parts) => parts.length === 2 && parts.every(Number.isInteger)
      && parts[0] >= 0 && parts[0] <= 23 && parts[1] >= 0 && parts[1] <= 59;
    const validConfig = validTime(inicio)
      && validTime(limite)
      && inicio[0] * 60 + inicio[1] < limite[0] * 60 + limite[1]
      && Number.isInteger(simConfig.pontuacaoBase) && simConfig.pontuacaoBase > 0
      && Number.isInteger(simConfig.teto) && simConfig.teto >= simConfig.pontuacaoBase
      && Number.isInteger(simConfig.setsPorPartida) && simConfig.setsPorPartida > 0 && simConfig.setsPorPartida <= 5 && simConfig.setsPorPartida % 2 === 1
      && Number.isInteger(simConfig.pontuacaoSetDecisivo) && simConfig.pontuacaoSetDecisivo > 0
      && Number.isInteger(simConfig.intervaloEntreSets) && simConfig.intervaloEntreSets >= 0
      && Number.isInteger(simConfig.intervaloEntreJogos) && simConfig.intervaloEntreJogos >= 0
      && Number.isInteger(simConfig.jogoAlmoco) && simConfig.jogoAlmoco >= 0
      && (simConfig.jogoAlmoco === 0 || simConfig.jogoAlmoco <= simConfig.numeroJogos)
      && Number.isInteger(simConfig.tempoAlmoco) && simConfig.tempoAlmoco >= 0
      && Number.isInteger(simConfig.numeroJogos) && simConfig.numeroJogos > 0
      && Number.isFinite(simConfig.segundosPorPontoMin) && simConfig.segundosPorPontoMin > 0
      && Number.isFinite(simConfig.segundosPorPontoMax) && simConfig.segundosPorPontoMax >= simConfig.segundosPorPontoMin
      && Number.isFinite(simConfig.chanceSetEstendido) && simConfig.chanceSetEstendido >= 0 && simConfig.chanceSetEstendido <= 100
      && Number.isInteger(simConfig.simulacoes) && simConfig.simulacoes >= 100 && simConfig.simulacoes <= 100000;
    if (!validConfig) {
      setSimError("Revise os parâmetros: horários, limites e quantidades precisam ser válidos (100 a 100.000 simulações).");
      setSimResult(null);
      return;
    }
    setSimError("");

    const horarioInicio = inicio[0] * 60 + inicio[1];
    const horarioLimite = limite[0] * 60 + limite[1];
    const simularSet = (pontuacaoBase, teto) => {
      let pontos = pontuacaoBase;
      if (teto > pontuacaoBase && Math.random() * 100 < simConfig.chanceSetEstendido) {
        pontos = Math.floor(Math.random() * (teto - pontuacaoBase)) + pontuacaoBase + 1;
      }
      return pontos;
    };

    const estimarTempoSet = (pontos) => {
      const segundosPorPonto = simConfig.segundosPorPontoMin
        + Math.random() * (simConfig.segundosPorPontoMax - simConfig.segundosPorPontoMin);
      return (pontos * segundosPorPonto) / 60;
    };

    const simularPartida = () => {
      let setsA = 0;
      let setsB = 0;
      let duracaoTotal = 0;
      const setsNecessarios = Math.ceil(simConfig.setsPorPartida / 2);
      while (setsA < setsNecessarios && setsB < setsNecessarios) {
        const isDecidingSet = setsA === setsNecessarios - 1 && setsB === setsNecessarios - 1;
        const pontuacaoBase = isDecidingSet
          ? simConfig.pontuacaoSetDecisivo
          : simConfig.pontuacaoBase;
        duracaoTotal += estimarTempoSet(simularSet(pontuacaoBase, simConfig.teto));
        if (Math.random() < 0.5) setsA++;
        else setsB++;
        if (setsA < setsNecessarios && setsB < setsNecessarios) {
          duracaoTotal += simConfig.intervaloEntreSets;
        }
      }
      return duracaoTotal;
    };

    const simularTorneio = () => {
      let tempoAtual = horarioInicio;
      let totalDuracaoJogos = 0;
      let horarioAlmoco = null;

      for (let jogo = 1; jogo <= simConfig.numeroJogos; jogo++) {
        if (simConfig.jogoAlmoco > 0 && jogo === simConfig.jogoAlmoco) {
          horarioAlmoco = tempoAtual;
          tempoAtual += simConfig.tempoAlmoco;
        }

        const duracao = Math.round(simularPartida());
        totalDuracaoJogos += duracao;
        tempoAtual += duracao;

        if (jogo < simConfig.numeroJogos) {
          tempoAtual += simConfig.intervaloEntreJogos;
        }
      }

      return {
        horarioFinal: tempoAtual,
        terminouNoPrazo: tempoAtual <= horarioLimite,
        totalDuracaoJogos,
        horarioAlmoco,
      };
    };

    let melhor = Number.POSITIVE_INFINITY;
    let pior = Number.NEGATIVE_INFINITY;
    let somaFinais = 0;
    let somaDuracoes = 0;
    let sucessos = 0;

    for (let i = 0; i < simConfig.simulacoes; i++) {
      const resultado = simularTorneio();
      somaFinais += resultado.horarioFinal;
      somaDuracoes += resultado.totalDuracaoJogos;
      melhor = Math.min(melhor, resultado.horarioFinal);
      pior = Math.max(pior, resultado.horarioFinal);
      if (resultado.terminouNoPrazo) sucessos++;
    }

    setSimResult({
      probabilidade: (sucessos / simConfig.simulacoes) * 100,
      mediaFinal: somaFinais / simConfig.simulacoes,
      melhor,
      pior,
      duracaoMediaPartida: somaDuracoes / (simConfig.numeroJogos * simConfig.simulacoes),
    });
  };
  useEffect(() => {
    if (posts.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setGalleryIndex((current) => (current + 1) % posts.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [posts.length]);

  useEffect(() => {
    if (!matchStarted || matchFinished) return undefined;
    const timer = window.setInterval(() => setTimerNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [matchStarted, matchFinished]);

  const visiblePosts = Array.from({ length: Math.min(3, posts.length) }, (_, offset) => posts[(galleryIndex + offset) % posts.length]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (saved) {
        const storedTeams = Array.isArray(saved.registeredTeams) ? saved.registeredTeams : [];
        const savedTeams = (storedTeams.length === 8 ? storedTeams : initialTeams40Plus).map((team) => ({
          ...team,
          ...(team.name.toUpperCase() === "MARROM" ? { name: "Marrom / Azul-marinho" } : {}),
          athletes: Array.isArray(team.athletes) ? team.athletes : [],
        }));
        const savedRecords = saved.matchRecords || [];
        const shouldRestoreSchedule = saved.tournamentVersion >= 4 && saved.schedulePublished === true;
        const currentTournament = shouldRestoreSchedule;
        const savedSchedule = shouldRestoreSchedule
          ? createTournamentSchedule(
            savedTeams,
            savedRecords,
            currentTournament && saved.matchStarted ? saved.activeFixtureKey : null,
          ).matches
          : [];
        const firstFixture = savedSchedule[0];
        setRegisteredTeams(savedTeams);
        setMatchRecords(savedRecords);
        setScheduledMatches(savedSchedule);
        setSchedulePublished(shouldRestoreSchedule && savedSchedule.length > 0);
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
          if (saved.timeoutLog) setTimeoutLog(saved.timeoutLog);
          if (saved.pausedDurationMs !== undefined) setPausedDurationMs(saved.pausedDurationMs);
          if (saved.pauseStartedAt) setPauseStartedAt(saved.pauseStartedAt);
          if (saved.matchStarted) setMatchStarted(true);
          if (saved.matchStartedAt) setMatchStartedAt(saved.matchStartedAt);
          if (saved.matchFinishedAt) setMatchFinishedAt(saved.matchFinishedAt);
          if (saved.activeMatch) setActiveMatch(saved.activeMatch);
          if (saved.activeFixtureKey) setActiveFixtureKey(saved.activeFixtureKey);
          if (saved.selectedFixtureKey) setSelectedFixtureKey(saved.selectedFixtureKey);
        } else {
          setActiveMatch({ a: "A DEFINIR", b: "A DEFINIR" });
          if (firstFixture) {
            setActiveFixtureKey(firstFixture.key);
            setSelectedFixtureKey(firstFixture.key);
            setActiveMatch({ a: firstFixture.a, b: firstFixture.b });
          }
        }
        if (!currentTournament) setSetNumber(1);
        if (!currentTournament) setSetResults([]);
        if (!currentTournament) setMatchFinished(false);
        if (!currentTournament) setPendingSet(null);
        if (!currentTournament) setResting(false);
        if (!currentTournament) setMatchStarted(false);
        if (!currentTournament) setMatchStartedAt("");
        if (!currentTournament) setMatchFinishedAt("");
        if (!currentTournament) setTimeoutsUsed({ a: false, b: false });
        if (!currentTournament) setTimeoutLog([]);
        if (!currentTournament) setPausedDurationMs(0);
        if (!currentTournament) setPauseStartedAt("");
        if (saved.serveAdvantage !== undefined && currentTournament) setServeAdvantage(saved.serveAdvantage);
        if (saved.rallies !== undefined) setRallies(saved.rallies);
        if (Array.isArray(saved.posts)) {
          setPosts(saved.posts.map((post) => ({
            ...post,
            image: legacyGalleryImages.get(post.image) || post.image,
          })));
        }
        if (saved.users?.length) setUsers(saved.users.map((user) =>
          user.id === "admin-inicial"
            ? { ...user, mustChangePassword: user.password === "admin" || user.mustChangePassword }
            : user,
        ));
        if (saved.regulation && !/set único|Melhor de 3 sets.*21|grupos sorteados|melhores perdedores|repescagem/i.test(saved.regulation)) setRegulation(saved.regulation);
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
      tournamentVersion: 4,
      score, sets, setNumber, setResults, matchRecords, matchFinished, pendingSet, resting, restingTeam,
      timeoutsUsed, timeoutLog, pausedDurationMs, pauseStartedAt, matchStarted, matchStartedAt, matchFinishedAt,
      posts,
      registeredTeams, users, regulation, matchSheets,
      schedulePublished,
      activeMatch, serveAdvantage, rallies, scheduledMatches,
      activeFixtureKey, selectedFixtureKey, scoringRule,
    }));
  }, [isHydrated, score, sets, setNumber, setResults, matchRecords, matchFinished, pendingSet, resting, restingTeam, timeoutsUsed, timeoutLog, pausedDurationMs, pauseStartedAt, matchStarted, matchStartedAt, matchFinishedAt, posts, registeredTeams, users, regulation, matchSheets, schedulePublished, activeMatch, serveAdvantage, rallies, scheduledMatches, activeFixtureKey, selectedFixtureKey, scoringRule]);

  const activeTeamA = registeredTeams.find((team) => team.name.toUpperCase() === activeMatch.a) || {
    name: activeMatch.a,
    color: "#8a929a",
    athletes: [],
  };
  const activeTeamB = registeredTeams.find((team) => team.name.toUpperCase() === activeMatch.b) || {
    name: activeMatch.b,
    color: "#8a929a",
    athletes: [],
  };
  const standings = getTournamentStandings(registeredTeams, matchRecords);
  const reportTeamStats = registeredTeams.map((team) => {
    const teamName = team.name.toUpperCase();
    const teamMatches = matchRecords.filter((record) =>
      record.teamA === teamName || record.teamB === teamName,
    );
    let pointsFor = 0;
    let pointsAgainst = 0;
    let wins = 0;
    let losses = 0;
    let durationMs = 0;
    teamMatches.forEach((record) => {
      const isTeamA = record.teamA === teamName;
      (record.sets || []).forEach((set) => {
        pointsFor += Number(isTeamA ? set.a : set.b) || 0;
        pointsAgainst += Number(isTeamA ? set.b : set.a) || 0;
      });
      if (record.winner === teamName) wins += 1;
      else if (record.loser === teamName || record.teamA === teamName || record.teamB === teamName) losses += 1;
      durationMs += Number(record.durationMs) || 0;
    });
    return {
      ...team,
      nameUpper: teamName,
      played: teamMatches.length,
      wins,
      losses,
      pointsFor,
      pointsAgainst,
      pointDiff: pointsFor - pointsAgainst,
      durationMs,
    };
  }).sort((left, right) =>
    right.wins - left.wins ||
    right.pointDiff - left.pointDiff ||
    right.pointsFor - left.pointsFor ||
    left.name.localeCompare(right.name),
  );
  const recordedMatchDurations = matchRecords
    .filter((record) => Number(record.durationMs) > 0)
    .map((record) => ({ ...record, durationMs: Number(record.durationMs) }));
  const shortestMatch = recordedMatchDurations.length
    ? recordedMatchDurations.reduce((best, record) => record.durationMs < best.durationMs ? record : best)
    : null;
  const longestMatch = recordedMatchDurations.length
    ? recordedMatchDurations.reduce((best, record) => record.durationMs > best.durationMs ? record : best)
    : null;
  const maxTeamPoints = reportTeamStats.reduce((best, team) =>
    team.pointsFor > (best?.pointsFor || -1) ? team : best,
  null);
  const maxTeamPointsValue = maxTeamPoints?.pointsFor || 0;
  const formatReportDuration = (durationMs) => {
    const totalMinutes = Math.max(0, Math.floor((durationMs || 0) / 60000));
    const seconds = Math.max(0, Math.floor(((durationMs || 0) % 60000) / 1000));
    return `${String(totalMinutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };
  const activeMatchRecord = matchRecords.find((record) => record.fixture === activeFixtureKey);
  const matchStartedTimestamp = matchStartedAt ? Date.parse(matchStartedAt) : null;
  const activePauseStartedTimestamp = pauseStartedAt ? Date.parse(pauseStartedAt) : null;
  const timerEndTimestamp = matchFinishedAt
    ? Date.parse(matchFinishedAt)
    : matchFinished && activeMatchRecord?.finishedAt
      ? Date.parse(activeMatchRecord.finishedAt)
    : pendingSet?.endedAt
      ? Date.parse(pendingSet.endedAt)
      : resting && activePauseStartedTimestamp
        ? activePauseStartedTimestamp
        : timerNow;
  const currentPauseDurationMs = resting && activePauseStartedTimestamp
    ? Math.max(0, timerNow - activePauseStartedTimestamp)
    : 0;
  const matchElapsedMs = matchFinished && activeMatchRecord?.durationMs !== undefined
    ? activeMatchRecord.durationMs
    : matchStartedTimestamp
      ? Math.max(0, timerEndTimestamp - matchStartedTimestamp - pausedDurationMs)
      : 0;
  const totalPausedMs = matchFinished && activeMatchRecord?.pausedDurationMs !== undefined
    ? activeMatchRecord.pausedDurationMs
    : pausedDurationMs + currentPauseDurationMs;

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
    const loser = pendingSet.winner === "a" ? activeMatch.b : activeMatch.a;
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
      durationMs: matchStartedAt
        ? Math.max(0, Date.parse(finishedAt) - Date.parse(matchStartedAt) - pausedDurationMs)
        : 0,
      pausedDurationMs,
      timeoutLog,
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
      loser,
      timeoutsUsed,
    };
    const nextRecords = [record, ...matchRecords];
    setMatchRecords(nextRecords);
    setScheduledMatches(schedulePublished
      ? createTournamentSchedule(registeredTeams, nextRecords, null).matches
      : []);
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
    setMatchFinishedAt(finishedAt);
    setResting(false);
    setRestingTeam(null);
  };
  const downloadRecords = (format) => {
    if (!matchRecords.length) return;
    const filename = `sumulas-aldeia-serra-open.${format}`;
    const content = format === "json"
      ? JSON.stringify(matchRecords, null, 2)
      : [
        "Data;Jogo;Horário;Quadra;Fase/Chave;Equipe A;Equipe B;Placar;Vencedor;Início;Término;Duração da partida;Duração das pausas;Pedidos de tempo;Tempo A;Tempo B",
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
          formatElapsedTime(record.durationMs || 0),
          formatElapsedTime(record.pausedDurationMs || 0),
          (record.timeoutLog || []).map((timeout) => `${timeout.team}: ${formatElapsedTime(timeout.durationMs || 0)}`).join(", "),
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
    if (!registeredTeams || registeredTeams.length !== 8) {
      window.alert("A tabela oficial exige exatamente 8 equipes cadastradas.");
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
    setTimeoutLog([]);
    setPausedDurationMs(0);
    setPauseStartedAt("");
    setMatchStarted(true);
    setResting(false);
    setRestingTeam(null);
    setMatchFinished(false);
    setServeAdvantage("a");
    const startedAt = new Date().toISOString();
    setMatchStartedAt(startedAt);
    setMatchFinishedAt("");
    setTimerNow(Date.parse(startedAt));
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
    const startedAt = new Date().toISOString();
    setTimeoutsUsed((current) => ({ ...current, [team]: true }));
    setPauseStartedAt(startedAt);
    setTimeoutLog((current) => [...current, { team: activeMatch[team], startedAt, endedAt: null, durationMs: null }]);
    setResting(true);
    setRestingTeam(team);
  };
  const continueAfterRest = () => {
    if (pauseStartedAt) {
      const endedAt = new Date().toISOString();
      const durationMs = Math.max(0, Date.parse(endedAt) - Date.parse(pauseStartedAt));
      setPausedDurationMs((current) => current + durationMs);
      setTimeoutLog((current) => current.map((timeout, index) => (
        index === current.length - 1 && !timeout.endedAt
          ? { ...timeout, endedAt, durationMs }
          : timeout
      )));
      setPauseStartedAt("");
    }
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
    setTimeoutLog([]);
    setPausedDurationMs(0);
    setPauseStartedAt("");
    setMatchStartedAt("");
    setMatchFinishedAt("");
    setTimerNow(Date.now());
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

  const authenticate = async () => {
    if (loginLockUntil > Date.now()) {
      const remainingMinutes = Math.ceil((loginLockUntil - Date.now()) / 60000);
      setLoginError(`Acesso temporariamente bloqueado por ${remainingMinutes} minuto(s).`);
      return;
    }
    const user = users.find((candidate) =>
      candidate.username.toLowerCase() === loginUsername.trim().toLowerCase(),
    );
    let authenticated = false;
    if (user?.passwordHash && user?.passwordSalt) {
      const derived = await hashPassword(loginPassword, user.passwordSalt);
      authenticated = derived.hash === user.passwordHash;
    } else if (user) {
      authenticated = user.password === loginPassword;
    }
    if (!authenticated) {
      const nextFailedCount = loginFailedCount + 1;
      const lockUntil = nextFailedCount >= 5 ? Date.now() + 15 * 60 * 1000 : 0;
      setLoginFailedCount(nextFailedCount);
      setLoginLockUntil(lockUntil);
      localStorage.setItem(passwordSecurityKey, JSON.stringify({
        failedCount: nextFailedCount,
        lockUntil,
      }));
      setLoginError(lockUntil
        ? "Acesso bloqueado por 15 minutos após 5 tentativas inválidas."
        : "Usuário ou senha inválidos.");
      return;
    }
    let securedUser = user;
    if (!user.passwordHash || !user.passwordSalt) {
      const securedPassword = await hashPassword(loginPassword);
      securedUser = {
        ...user,
        passwordHash: securedPassword.hash,
        passwordSalt: securedPassword.salt,
        passwordHistory: [securedPassword.hash],
        password: undefined,
      };
      setUsers((current) => current.map((candidate) =>
        candidate.id === user.id ? securedUser : candidate,
      ));
    }
    setLoginFailedCount(0);
    setLoginLockUntil(0);
    localStorage.setItem(passwordSecurityKey, JSON.stringify({ failedCount: 0, lockUntil: 0 }));
    setCurrentUser({ id: securedUser.id, name: securedUser.name, username: securedUser.username, role: securedUser.role });
    setForcePasswordChange(Boolean(securedUser.mustChangePassword));
    setAdminView(securedUser.role === "organizador" ? "table" : securedUser.role === "publicador" ? "photos" : securedUser.role === "admin" ? "users" : "sheet");
    setLogin(false);
    setLoginPassword("");
    setLoginError("");
  };

  const logout = () => {
    setCurrentUser(null);
    setAdminOpen(false);
    setLogin(false);
    setForcePasswordChange(false);
    setPasswordChange({ current: "", next: "" });
  };

  useEffect(() => {
    if (!currentUser) return undefined;
    const inactivityLimitMs = 30 * 60 * 1000;
    let inactivityTimer = window.setTimeout(() => logout(), inactivityLimitMs);
    const resetInactivityTimer = () => {
      window.clearTimeout(inactivityTimer);
      inactivityTimer = window.setTimeout(() => logout(), inactivityLimitMs);
    };
    ["mousemove", "keydown", "pointerdown", "touchstart"].forEach((eventName) =>
      window.addEventListener(eventName, resetInactivityTimer),
    );
    return () => {
      window.clearTimeout(inactivityTimer);
      ["mousemove", "keydown", "pointerdown", "touchstart"].forEach((eventName) =>
        window.removeEventListener(eventName, resetInactivityTimer),
      );
    };
  }, [currentUser]);

  const allowedAdminViews = currentUser?.role === "admin"
    ? ["sheet", "table", "regulation", "teams", "users", "photos", "simula", "reports"]
    : currentUser?.role === "mesario"
      ? ["sheet"]
      : currentUser?.role === "organizador"
        ? ["table", "regulation", "teams", "simula", "reports"]
        : currentUser?.role === "publicador"
          ? ["photos"]
          : [];

  const createUser = async (event) => {
    event.preventDefault();
    const username = newUser.username.trim();
    if (!newUser.name.trim() || !username || !newUser.password) return;
    if (users.some((user) => user.username.toLowerCase() === username.toLowerCase())) {
      window.alert("Este usuário já existe.");
      return;
    }
    if (!validateStrongPassword(newUser.password)) {
      window.alert("A senha deve ter 10 caracteres, com maiúscula, minúscula, número e símbolo.");
      return;
    }
    const securedPassword = await hashPassword(newUser.password);
    setUsers((current) => [...current, {
      id: `user-${Date.now()}`,
      name: newUser.name.trim(),
      username,
      role: newUser.role,
      passwordHash: securedPassword.hash,
      passwordSalt: securedPassword.salt,
      passwordHistory: [securedPassword.hash],
    }]);
    setNewUser({ name: "", username: "", password: "", role: "mesario" });
  };

  const changeOwnPassword = async (event) => {
    event.preventDefault();
    const user = users.find((candidate) => candidate.id === currentUser.id);
    let currentPasswordMatches = user?.password === passwordChange.current;
    if (user?.passwordHash && user?.passwordSalt) {
      const derived = await hashPassword(passwordChange.current, user.passwordSalt);
      currentPasswordMatches = derived.hash === user.passwordHash;
    }
    if (!user || !currentPasswordMatches) {
      window.alert("A senha atual não confere.");
      return;
    }
    if (!validateStrongPassword(passwordChange.next)) {
      window.alert("A nova senha deve ter 10 caracteres, com maiúscula, minúscula, número e símbolo.");
      return;
    }
    const securedPassword = await hashPassword(passwordChange.next);
    const history = [...(user.passwordHistory || (user.passwordHash ? [user.passwordHash] : []))];
    if (history.includes(securedPassword.hash)) {
      window.alert("Esta senha já foi utilizada. Escolha uma senha diferente.");
      return;
    }
    setUsers((current) => current.map((candidate) => candidate.id === currentUser.id ? {
      ...candidate,
      password: undefined,
      passwordHash: securedPassword.hash,
      passwordSalt: securedPassword.salt,
      passwordHistory: [...history, securedPassword.hash].slice(-5),
      mustChangePassword: false,
    } : candidate));
    setPasswordChange({ current: "", next: "" });
    setForcePasswordChange(false);
    window.alert("Senha atualizada com sucesso.");
  };

  const createTeam = (event) => {
    event.preventDefault();
    const name = newTeam.name.trim();
    if (!name) return;
    if (matchStarted || matchRecords.length) {
      window.alert("O cadastro fica bloqueado após o início do primeiro jogo.");
      return;
    }
    if (registeredTeams.length >= 8) {
      window.alert("A tabela oficial tem exatamente 8 vagas para equipes.");
      return;
    }
    if (registeredTeams.some((team) => team.name.toLowerCase() === name.toLowerCase())) {
      window.alert("Já existe uma equipe com esse nome.");
      return;
    }
    const athletes = newTeam.athletes.split(/[\n,;]/).map((athlete) => athlete.trim()).filter(Boolean);
    if (athletes.length > 6) {
      window.alert("Cada equipe pode cadastrar até 6 atletas.");
      return;
    }
    if (new Set(athletes.map((athlete) => athlete.toLocaleLowerCase("pt-BR"))).size !== athletes.length) {
      window.alert("Não é possível repetir atletas na mesma equipe.");
      return;
    }
    const nextTeams = [...registeredTeams, { name, color: newTeam.color, athletes }];
    const nextSchedule = schedulePublished
      ? createTournamentSchedule(nextTeams, matchRecords, null).matches
      : [];
    setRegisteredTeams(nextTeams);
    setScheduledMatches(nextSchedule);
    if (!matchStarted && !matchRecords.length && nextSchedule.length) {
      const firstFixture = nextSchedule[0];
      setActiveFixtureKey(firstFixture.key);
      setSelectedFixtureKey(firstFixture.key);
      setActiveMatch({ a: firstFixture.a.toUpperCase(), b: firstFixture.b.toUpperCase() });
    } else if (!nextSchedule.length) {
      setActiveMatch({ a: "A DEFINIR", b: "A DEFINIR" });
    }
    setNewTeam({ name: "", color: "#1564f5", athletes: "" });
  };

  const removeTeam = (name) => {
    if (matchStarted || matchRecords.length) {
      window.alert("Não é possível alterar as equipes após o início do primeiro jogo.");
      return;
    }
    const nextTeams = registeredTeams.filter((team) => team.name !== name);
    const nextSchedule = [];
    const firstFixture = nextSchedule[0];
    setRegisteredTeams(nextTeams);
    setScheduledMatches(nextSchedule);
    setSchedulePublished(false);
    if (firstFixture) {
      setActiveFixtureKey(firstFixture.key);
      setSelectedFixtureKey(firstFixture.key);
      setActiveMatch({ a: firstFixture.a.toUpperCase(), b: firstFixture.b.toUpperCase() });
    } else {
      setActiveFixtureKey("J01");
      setSelectedFixtureKey("J01");
      setActiveMatch({ a: "A DEFINIR", b: "A DEFINIR" });
    }
    setNewAthlete((current) => current.team === name ? { ...current, team: nextTeams[0]?.name || "" } : current);
  };

  const updateTeam = (teamName, changes) => {
    if (matchStarted || matchRecords.length) {
      window.alert("A cor e o nome das equipes ficam bloqueados durante o torneio.");
      return;
    }
    const nextTeams = registeredTeams.map((team) =>
      team.name === teamName ? { ...team, ...changes } : team,
    );
    setRegisteredTeams(nextTeams);
    setNewAthlete((current) =>
      current.team === teamName ? { ...current, team: changes.name || teamName } : current,
    );
    if (schedulePublished) {
      setScheduledMatches(createTournamentSchedule(nextTeams, matchRecords, null).matches);
    }
  };

  const createAthlete = (event) => {
    event.preventDefault();
    const name = newAthlete.name.trim();
    const teamName = newAthlete.team || registeredTeams[0]?.name;
    if (!name || !teamName) return;
    if (matchStarted || matchRecords.length) {
      window.alert("O cadastro de atletas fica bloqueado durante o torneio. Prepare o próximo torneio para alterar os cadastros.");
      return;
    }
    const team = registeredTeams.find((item) => item.name === teamName);
    if (!team) {
      window.alert("Selecione uma equipe válida.");
      return;
    }
    if (team.athletes.length >= 6) {
      window.alert("Cada equipe pode cadastrar até 6 atletas.");
      return;
    }
    if (team.athletes.some((athlete) => athlete.toLocaleLowerCase("pt-BR") === name.toLocaleLowerCase("pt-BR"))) {
      window.alert("Este atleta já está cadastrado nessa equipe.");
      return;
    }
    const nextTeams = registeredTeams.map((item) => item.name === teamName
      ? { ...item, athletes: [...item.athletes, name] }
      : item);
    const nextSchedule = schedulePublished
      ? createTournamentSchedule(nextTeams, matchRecords, null).matches
      : [];
    setRegisteredTeams(nextTeams);
    setScheduledMatches(nextSchedule);
    if (nextSchedule.length) {
      setActiveFixtureKey(nextSchedule[0].key);
      setSelectedFixtureKey(nextSchedule[0].key);
      setActiveMatch({ a: nextSchedule[0].a.toUpperCase(), b: nextSchedule[0].b.toUpperCase() });
    }
    setNewAthlete({ name: "", team: teamName });
  };

  const removeAthlete = (teamName, athleteName) => {
    if (matchStarted || matchRecords.length) {
      window.alert("O cadastro de atletas fica bloqueado durante o torneio. Prepare o próximo torneio para alterar os cadastros.");
      return;
    }
    const nextTeams = registeredTeams.map((team) => team.name === teamName
      ? { ...team, athletes: team.athletes.filter((athlete) => athlete !== athleteName) }
      : team);
    const nextSchedule = schedulePublished
      ? createTournamentSchedule(nextTeams, matchRecords, null).matches
      : [];
    if (!nextSchedule.length) setSchedulePublished(false);
    setRegisteredTeams(nextTeams);
    setScheduledMatches(nextSchedule);
    if (!nextSchedule.length) {
      setActiveFixtureKey("J01");
      setSelectedFixtureKey("J01");
      setActiveMatch({ a: "A DEFINIR", b: "A DEFINIR" });
    }
  };

  const publishTournamentSchedule = () => {
    if (matchStarted || matchRecords.length) {
      window.alert("A tabela não pode ser alterada depois do início do torneio.");
      return;
    }
    if (!hasCompleteTeamRegistration(registeredTeams)) {
      window.alert("Cadastre 8 equipes e pelo menos 4 atletas em cada uma antes de gerar a tabela.");
      return;
    }
    const nextSchedule = createTournamentSchedule(registeredTeams, [], null).matches;
    if (!nextSchedule.length) {
      window.alert("Não foi possível gerar a tabela com os cadastros atuais.");
      return;
    }
    setSchedulePublished(true);
    setScheduledMatches(nextSchedule);
    setActiveFixtureKey(nextSchedule[0].key);
    setSelectedFixtureKey(nextSchedule[0].key);
    setActiveMatch({ a: nextSchedule[0].a.toUpperCase(), b: nextSchedule[0].b.toUpperCase() });
    setScore({ a: 0, b: 0 });
    setSets({ a: 0, b: 0 });
    setSetNumber(1);
    setSetResults([]);
    setMatchFinished(false);
    setMatchFinishedAt("");
    setPendingSet(null);
  };

  const prepareNextTournament = () => {
    const confirmed = window.confirm(
      "Isso apagará as equipes, atletas, resultados, histórico de partidas e súmulas deste torneio. Usuários, publicações e regulamento serão mantidos. Deseja continuar?",
    );
    if (!confirmed) return;
    const emptySchedule = createTournamentSchedule([], [], null).matches;
    setRegisteredTeams([]);
    setMatchRecords([]);
    setScheduledMatches(emptySchedule);
    setSchedulePublished(false);
    setMatchSheets({});
    setActiveFixtureKey("J01");
    setSelectedFixtureKey("J01");
    setActiveMatch({ a: "A DEFINIR", b: "A DEFINIR" });
    setScore({ a: 0, b: 0 });
    setSets({ a: 0, b: 0 });
    setSetNumber(1);
    setSetResults([]);
    setMatchFinished(false);
    setPendingSet(null);
    setResting(false);
    setRestingTeam(null);
    setTimeoutsUsed({ a: false, b: false });
    setMatchStarted(false);
    setMatchStartedAt("");
    setMatchFinishedAt("");
    setTimeoutLog([]);
    setPausedDurationMs(0);
    setPauseStartedAt("");
    setServeAdvantage("a");
    setRallies(0);
    setRallyRecords([]);
    setSelectedAthlete(null);
    setNewTeam({ name: "", color: "#1564f5", athletes: "" });
    setNewAthlete({ name: "", team: "" });
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
          <a href="#torneios-anteriores">Torneios anteriores</a>
          <a href="#modalidades">Modalidades</a>
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
            <span>SEX 20 NOV 2026</span>
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
          <div className="ticker-label"><span className={`live-dot ${matchStarted && !matchFinished ? "" : "is-idle"}`} /> {matchStarted && !matchFinished ? "PARTIDA AO VIVO" : matchFinished ? "ÚLTIMO RESULTADO" : "PRÓXIMO EVENTO"}</div>
          {activeFixture ? (
            <div className="ticker-match"><strong>JOGO {activeFixture.gameNumber} · {activeFixture.group ? `CHAVE ${activeFixture.group}` : activeFixture.phase} · {activeFixture.time}</strong><span>{activeMatch.a} <b>{score.a}</b></span><span className="ticker-vs">×</span><span>{activeMatch.b} <b>{score.b}</b></span></div>
          ) : <div className="ticker-match"><strong>TORNEIO 40+ · SEXTA-FEIRA, 20 DE NOVEMBRO DE 2026</strong></div>}
          <a href="#sumula">Acompanhar partida <ArrowUpRight size={15} /></a>
        </section>

        <section className="section schedule-section" id="jogos">
          <div className="section-heading">
            <div><p className="section-kicker">TABELA DE JOGOS</p><h2>O próximo ponto<br /><i>começa agora.</i></h2></div>
              <div className="date-switcher"><button>‹</button><span><small>TORNEIO 40+</small> 20 NOV 2026</span><button>›</button></div>
          </div>
          {scheduledMatches.length ? <div className="match-list">
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
          </div> : <div className="schedule-empty-state">A tabela será disponibilizada após o cadastro de 8 equipes com pelo menos 4 atletas cada e a geração pelo painel administrativo.</div>}
          {scheduledMatches.length > 0 && <a className="under-link" href="#jogos">
            Ver tabela completa <ArrowUpRight size={15} />
          </a>}
          <div className="tournament-standings">
            <div className="tournament-standings-heading">
              <div><p className="section-kicker">CLASSIFICAÇÃO</p><h3>Chaves e <i>semifinalistas.</i></h3></div>
              <span>{new Set(matchRecords.filter((record) => /^J(?:0[1-9]|1[0-2])$/.test(record.fixture)).map((record) => record.fixture)).size}/12 jogos das chaves</span>
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
                <span className={`live-dot ${matchStarted && !matchFinished ? "" : "is-idle"}`} /> {resting ? "TEMPO PEDIDO" : matchStarted && !matchFinished ? "AO VIVO" : matchFinished ? "PARTIDA ENCERRADA" : "AGUARDANDO INÍCIO"}
                <small>JOGO {activeFixture?.gameNumber || "01"} · {activeFixture?.group ? `CHAVE ${activeFixture.group}` : activeFixture?.phase?.toUpperCase() || "CHAVE A"} · {activeFixture?.time || "08:30"} · {activeFixture?.court || "QUADRA 01"}</small>
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
            <div className={`match-clock ${resting ? "is-paused" : ""}`} role="timer" aria-live="off">
              <div>
                <span>{resting ? "PARTIDA PAUSADA · PEDIDO DE TEMPO" : matchStarted ? "TEMPO DE PARTIDA" : matchFinished ? "DURAÇÃO DA PARTIDA" : "CRONÔMETRO"}</span>
                <strong>{formatElapsedTime(matchElapsedMs)}</strong>
              </div>
              <div className="match-clock-pauses">
                <span>TEMPO TOTAL DE PAUSAS</span>
                <strong>{formatElapsedTime(totalPausedMs)}</strong>
                <small>{timeoutLog.length} {timeoutLog.length === 1 ? "pedido de tempo" : "pedidos de tempo"}</small>
              </div>
              {matchFinishedAt && <small className="match-clock-finished">ENCERRADA ÀS {new Date(matchFinishedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</small>}
            </div>
            {timeoutLog.length > 0 && (
              <div className="timeout-history" aria-label="Histórico dos pedidos de tempo">
                {timeoutLog.map((timeout, index) => (
                  <span key={`${timeout.startedAt}-${index}`}>
                    TEMPO {timeout.team} · {timeout.durationMs === null
                      ? `EM ANDAMENTO ${formatElapsedTime(currentPauseDurationMs)}`
                      : formatElapsedTime(timeout.durationMs)}
                  </span>
                ))}
              </div>
            )}
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
                  <span>MELHOR DE 3 SETS • TODOS OS SETS EM 15 PONTOS</span>
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
                Solicitar tempo {activeMatch.a} · {timeoutsUsed.a ? "utilizado" : "disponível"}
              </button>
              <button className="timeout-button" onClick={() => requestTimeout("b")} disabled={!matchStarted || matchFinished || resting || pendingSet || timeoutsUsed.b}>
                Solicitar tempo {activeMatch.b} · {timeoutsUsed.b ? "utilizado" : "disponível"}
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
                  <span>Cronômetro da partida pausado · tempo solicitado: {formatElapsedTime(currentPauseDurationMs)}.</span>
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
                {[[activeTeamA, "a"], [activeTeamB, "b"]].map(([team, side]) => (
                  <div className="athlete-picker-group" key={side}>
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
            {!registeredTeams.length && <p className="roster-empty-state">As equipes e os atletas cadastrados pela organização aparecerão aqui.</p>}
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
                São dois grupos de quatro equipes. Os dois melhores de cada
                grupo avançam às semifinais.
              </p>
              <div className="public-rule">
                <strong>CRITÉRIOS DE DESEMPATE</strong>
                <span>Vitórias · saldo de pontos · confronto direto · posição inicial</span>
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

        <section className="section previous-tournaments" id="torneios-anteriores">
          <div className="section-heading">
            <div>
              <p className="section-kicker">MEMÓRIAS DA AREIA</p>
              <h2>Torneios<br /><i>anteriores.</i></h2>
            </div>
            <p className="previous-tournaments-intro">
              Relembre as competições que já passaram pela Aldeia da Serra.
            </p>
          </div>
          <div className="previous-tournament-grid">
            {previousTournaments.map((tournament) => (
              <article className="previous-tournament-card" key={tournament.name}>
                <img src={tournament.image} alt="Equipe campeã de vôlei de areia na Aldeia da Serra" />
                <div className="previous-tournament-content">
                  <span>{tournament.date} · {tournament.category}</span>
                  <h3>{tournament.name}</h3>
                  <p>Competição realizada no Condomínio Aldeia da Serra, em Luziânia.</p>
                  <a className="under-link" href="#galeria">
                    Ver registros do evento <ArrowUpRight size={15} />
                  </a>
                </div>
              </article>
            ))}
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

        <section className="section sports-section" id="modalidades">
          <div className="section-heading">
            <div>
              <p className="section-kicker">NOVAS MODALIDADES</p>
              <h2>Mais esportes,<br /><i>regras próprias.</i></h2>
            </div>
            <p className="sports-intro">
              Cada modalidade tem composição, pontuação e súmula específicas. Os formatos
              são definidos pelo regulamento de cada evento.
            </p>
          </div>
          <div className="sports-grid">
            {additionalSports.map((sport, index) => (
              <article className={`sport-card sport-card-${sport.accent}`} key={sport.name}>
                <div className="sport-card-heading">
                  <span>0{index + 1} / MODALIDADE</span>
                  <strong>{sport.name}</strong>
                  <p>{sport.description}</p>
                </div>
                <dl className="sport-details">
                  <div><dt>Formato e composição</dt><dd>{sport.format}</dd></div>
                  <div><dt>Placar</dt><dd>{sport.scoreboard}</dd></div>
                  <div><dt>Dados da partida</dt><dd>{sport.matchData}</dd></div>
                  <div><dt>Estatísticas</dt><dd>{sport.stats}</dd></div>
                </dl>
              </article>
            ))}
          </div>
          <p className="sports-note">
            Os parâmetros de jogo variam conforme o regulamento selecionado para cada evento;
            esta apresentação não altera a operação atual das partidas de vôlei.
          </p>
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
                  Registre e publique momentos de competições de vôlei de areia,
                  beach tennis ou beach soccer.
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
                    <span>JPG ou PNG até 10 MB · somente competições de vôlei de areia, beach tennis ou beach soccer</span>
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
              {allowedAdminViews.map((view) => <button className={adminView === view ? "active" : ""} key={view} onClick={() => setAdminView(view)}>{({ sheet: "Súmula", table: "Tabela", regulation: "Regulamento", teams: "Equipes", users: "Usuários", photos: "Publicações", simula: "Simulação", reports: "Relatórios" })[view]}</button>)}
            </nav>

            {forcePasswordChange && (
              <div className="console-content force-password-panel">
                <div className="console-title">
                  <div><p className="section-kicker">POLÍTICA DE SEGURANÇA</p><h3>Troque a senha <i>obrigatoriamente.</i></h3></div>
                </div>
                <p className="modal-copy">Use pelo menos 10 caracteres, incluindo maiúscula, minúscula, número e símbolo. A senha não pode repetir uma das últimas 5 utilizadas.</p>
                <form className="password-change-form" onSubmit={changeOwnPassword}>
                  <strong>PRIMEIRO ACESSO</strong>
                  <label>Senha atual<input required type="password" value={passwordChange.current} onChange={(event) => setPasswordChange({ ...passwordChange, current: event.target.value })} /></label>
                  <label>Nova senha<input required type="password" minLength="10" value={passwordChange.next} onChange={(event) => setPasswordChange({ ...passwordChange, next: event.target.value })} /></label>
                  <button type="submit">Ativar nova senha</button>
                </form>
              </div>
            )}

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
                <div className="sheet-set-list"><h4>CONTROLE DOS SETS • TODOS OS SETS ATÉ 15 PONTOS</h4>{[1, 2, 3].map((setIndex) => {
                  const set = currentSheet.sets[setIndex] || {};
                  return <fieldset className="sheet-set" key={setIndex}><legend>{setIndex === 3 ? "3º set" : `Set ${setIndex}`}</legend><label>Início<input type="time" value={set.start || ""} onChange={(event) => updateSheetSet(setIndex, "start", event.target.value)} /></label><label>Término<input type="time" value={set.end || ""} onChange={(event) => updateSheetSet(setIndex, "end", event.target.value)} /></label><label>{activeMatch.a}<input type="number" min="0" max="30" value={set.scoreA ?? ""} onChange={(event) => updateSheetSet(setIndex, "scoreA", event.target.value)} /></label><label>{activeMatch.b}<input type="number" min="0" max="30" value={set.scoreB ?? ""} onChange={(event) => updateSheetSet(setIndex, "scoreB", event.target.value)} /></label><label>Tempos / ocorrências<input value={set.events || ""} onChange={(event) => updateSheetSet(setIndex, "events", event.target.value)} placeholder="Ex.: tempo da equipe A; ocorrência" /></label><button type="button" onClick={() => copyLiveScoreToSheet(setIndex)}>Usar placar ao vivo</button></fieldset>;
                })}</div>
                <div className="sheet-grid sheet-extra"><label>Oficiais<input value={currentSheet.officials} onChange={(event) => updateSheetField("officials", event.target.value)} placeholder="Árbitro, apontador(a)" /></label><label className="sheet-notes">Ocorrências e observações<textarea value={currentSheet.notes} onChange={(event) => updateSheetField("notes", event.target.value)} rows="3" /></label></div>
                <p className="autosave-note">Preenchimento salvo automaticamente neste dispositivo.</p>
              </div>
            )}

            {adminView === "table" && allowedAdminViews.includes("table") && (
              <div className="console-content">
                <div className="console-title"><div><p className="section-kicker">TABELA OFICIAL · 16 JOGOS</p><h3>Fases do <i>campeonato.</i></h3></div><span>{matchRecords.length} resultados registrados</span></div>
                <p className="modal-copy">12 jogos classificatórios em dois grupos alternados na única quadra, seguidos por duas semifinais, disputa do 3º lugar e final.</p>
                {!hasCompleteTeamRegistration(registeredTeams) && <p className="schedule-empty-state" role="status">A tabela será liberada quando houver 8 equipes cadastradas, cada uma com pelo menos 4 atletas. Agora: {registeredTeams.length}/8 equipes completas.</p>}
                {hasCompleteTeamRegistration(registeredTeams) && !schedulePublished && <div className="schedule-publish-actions"><span>As inscrições estão completas. Gere a tabela para disponibilizar os 16 jogos no placar e no site.</span><button type="button" className="button button-dark" onClick={publishTournamentSchedule} disabled={matchStarted || matchRecords.length > 0}>Gerar tabela de jogos</button></div>}
                <div className="admin-fixture-list">
                  {scheduledMatches.map((match) => <div className="admin-scheduled-game" key={match.key}>
                    <p><b>{match.gameNumber} · {match.time} · {match.phase}{match.group ? ` · CHAVE ${match.group}` : ""}</b><span>{match.a} × {match.b} · {match.status}{match.score ? ` · ${match.score}` : ""}</span></p>
                    {match.breakAfter && <div className="schedule-break"><strong>🍽️ {match.breakAfter}</strong></div>}
                  </div>)}
                </div>
                {scheduledMatches.length > 0 && <div className="tournament-standings admin-standings">
                  <h4>CLASSIFICAÇÃO POR CHAVE · DUAS VAGAS PARA CADA SEMIFINAL</h4>
                  <div className="standings-table-wrap"><table className="standings-table">
                    <thead><tr><th>Chave</th><th>Pos.</th><th>Equipe</th><th>J</th><th>V</th><th>D</th><th>Pontos</th><th>Saldo</th><th>Classificação</th></tr></thead>
                    <tbody>{standings.map((team) => <tr key={team.name} className={team.qualified ? "qualified-row" : ""}><td>{team.group}</td><td>{team.rank}</td><td><i style={{ background: team.color }} />{team.name.toUpperCase()}</td><td>{team.played}</td><td>{team.wins}</td><td>{team.losses}</td><td>{team.pointsFor}</td><td>{team.pointDiff > 0 ? "+" : ""}{team.pointDiff}</td><td>{team.qualified === null ? (team.wins ? `${team.rank}º · provisório` : "A jogar") : team.qualified ? "Semifinalista" : "Eliminado"}</td></tr>)}</tbody>
                  </table></div>
                </div>}
              </div>
            )}

            {adminView === "regulation" && allowedAdminViews.includes("regulation") && (
              <div className="console-content"><div className="console-title"><div><p className="section-kicker">DOCUMENTO PÚBLICO</p><h3>Regulamento da <i>competição.</i></h3></div><span className="autosave-note">Publicado na página principal</span></div><label className="regulation-editor">Texto do regulamento<textarea rows="18" value={regulation} onChange={(event) => setRegulation(event.target.value)} /></label></div>
            )}

            {adminView === "teams" && allowedAdminViews.includes("teams") && (
              <div className="console-content">
                <div className="console-title">
                  <div><p className="section-kicker">CADASTRO DO TORNEIO</p><h3>Equipes e <i>atletas.</i></h3></div>
                  <span>{registeredTeams.length}/8 equipes · {registeredTeams.reduce((total, team) => total + team.athletes.length, 0)} atletas</span>
                </div>
                <p className="autosave-note">A tabela será preenchida quando as 8 equipes tiverem pelo menos 4 atletas cadastrados. Cada equipe pode inscrever até 6 atletas.</p>
                <div className="next-tournament-actions">
                  <p>Finalize ou arquive o torneio atual antes de alterar cadastros. Os dados do próximo torneio aparecem automaticamente no placar e na página pública.</p>
                  <button type="button" onClick={prepareNextTournament} disabled={!registeredTeams.length && !matchRecords.length && !matchStarted}>Preparar próximo torneio</button>
                </div>
                <form className="team-create-form" onSubmit={createTeam}>
                  <label>Nome da equipe<input required value={newTeam.name} onChange={(event) => setNewTeam({ ...newTeam, name: event.target.value })} /></label>
                  <label>Cor<input type="color" value={newTeam.color} onChange={(event) => setNewTeam({ ...newTeam, color: event.target.value })} /></label>
                  <label>Atletas (opcional; separados por vírgula ou linha)<input value={newTeam.athletes} onChange={(event) => setNewTeam({ ...newTeam, athletes: event.target.value })} /></label>
                  <button className="button button-dark" type="submit" disabled={registeredTeams.length >= 8 || matchStarted || matchRecords.length > 0}>Cadastrar equipe</button>
                </form>
                <form className="athlete-create-form" onSubmit={createAthlete}>
                  <label>Nome do atleta<input required value={newAthlete.name} onChange={(event) => setNewAthlete({ ...newAthlete, name: event.target.value })} /></label>
                  <label>Equipe<select required value={newAthlete.team || registeredTeams[0]?.name || ""} onChange={(event) => setNewAthlete({ ...newAthlete, team: event.target.value })}><option value="" disabled>Cadastre uma equipe primeiro</option>{registeredTeams.map((team) => <option value={team.name} key={team.name}>{team.name}</option>)}</select></label>
                  <button className="button button-dark" type="submit" disabled={!registeredTeams.length || matchStarted || matchRecords.length > 0}>Cadastrar atleta</button>
                </form>
                <div className="schedule-publish-actions">
                  <span>{schedulePublished ? "Tabela de 16 jogos publicada." : hasCompleteTeamRegistration(registeredTeams) ? "Cadastros completos. Gere a tabela para publicá-la no placar e no site." : "Para liberar a tabela: 8 equipes com pelo menos 4 atletas cada."}</span>
                  <button type="button" className="button button-dark" onClick={publishTournamentSchedule} disabled={!hasCompleteTeamRegistration(registeredTeams) || schedulePublished || matchStarted || matchRecords.length > 0}>Gerar tabela de jogos</button>
                </div>
                {(matchStarted || matchRecords.length > 0) && <p className="autosave-note">Os cadastros estão bloqueados durante o torneio. Use “Preparar próximo torneio” para limpar os resultados e iniciar novos cadastros.</p>}
                <div className="admin-team-list">
                  {registeredTeams.map((team) => (
                    <article className="admin-team-card" key={team.name}>
                      <div>
                        <label>Nome da equipe<input value={team.name} disabled={matchStarted || matchRecords.length > 0} onChange={(event) => updateTeam(team.name, { name: event.target.value })} /></label>
                        <label>Cor da equipe<input type="color" value={team.color} disabled={matchStarted || matchRecords.length > 0} onChange={(event) => updateTeam(team.name, { color: event.target.value })} /></label>
                        <span>{team.athletes.length}/6 atletas cadastrados</span>
                        <div className="admin-team-athletes">
                          {team.athletes.length
                            ? team.athletes.map((athlete) => <span key={athlete}>{athlete}<button type="button" disabled={matchStarted || matchRecords.length > 0} onClick={() => removeAthlete(team.name, athlete)} aria-label={`Remover atleta ${athlete} da equipe ${team.name}`}>×</button></span>)
                            : <span>Atletas não informados</span>}
                        </div>
                      </div>
                      <button disabled={matchStarted || matchRecords.length > 0} onClick={() => removeTeam(team.name)} aria-label={`Remover equipe ${team.name}`}>Remover equipe</button>
                    </article>
                  ))}
                  {!registeredTeams.length && <p className="records-empty">Área limpa para o próximo torneio. Cadastre as equipes e depois os atletas.</p>}
                </div>
              </div>
            )}

            {adminView === "reports" && allowedAdminViews.includes("reports") && (
              <div className="console-content reports-console">
                <div className="console-title">
                  <div><p className="section-kicker">IMPRESSÃO E ANÁLISE</p><h3>Relatórios do <i>torneio.</i></h3></div>
                  <button type="button" className="button button-dark" onClick={() => window.print()}>Imprimir relatório</button>
                </div>
                <div className="report-tabs" role="tablist" aria-label="Tipo de relatório">
                  <button type="button" className={reportType === "championship" ? "active" : ""} onClick={() => setReportType("championship")}>Campeonato completo</button>
                  <button type="button" className={reportType === "games" ? "active" : ""} onClick={() => setReportType("games")}>Relação dos jogos</button>
                  <button type="button" className={reportType === "matchSheets" ? "active" : ""} onClick={() => setReportType("matchSheets")}>Súmulas individuais</button>
                  <button type="button" className={reportType === "match" ? "active" : ""} onClick={() => setReportType("match")}>Resumo da partida</button>
                  <button type="button" className={reportType === "general" ? "active" : ""} onClick={() => setReportType("general")}>Estatística geral</button>
                  <button type="button" className={reportType === "classification" ? "active" : ""} onClick={() => setReportType("classification")}>Classificação</button>
                </div>

                <div className="reports-print-area">
                  {reportType === "championship" && (
                    <div className="report-section championship-report">
                      <section className="championship-cover">
                        <p>1º CAMPEONATO • QUARTETOS MISTOS</p>
                        <h4>Vôlei de areia 40+</h4>
                        <strong>Condomínio Aldeia da Serra</strong>
                        <span>Início às 8h • Todos os atletas presentes às 8h</span>
                        <div>CAMPEONATO GERAL</div>
                      </section>

                      <section className="championship-page">
                        <p className="report-print-kicker">DOCUMENTO OFICIAL</p>
                        <h4>Regulamento do campeonato</h4>
                        <div className="championship-regulation">
                          {regulation.split("\n").filter(Boolean).map((line, index) =>
                            line.startsWith("•")
                              ? <p key={`${line}-${index}`}>• {line.slice(1).trim()}</p>
                              : <h5 key={`${line}-${index}`}>{line}</h5>,
                          )}
                        </div>
                      </section>

                      <section className="championship-page">
                        <p className="report-print-kicker">COMPOSIÇÃO</p>
                        <h4>Relação das equipes</h4>
                        <table className="report-table championship-teams">
                          <thead><tr><th>Equipe</th><th>Grupo</th><th>Atletas</th></tr></thead>
                          <tbody>{registeredTeams.map((team, index) => <tr key={team.name}>
                            <td><i className="report-team-dot" style={{ background: team.color }} />{team.name}</td>
                            <td>{index < 4 ? "Grupo 1" : "Grupo 2"}</td>
                            <td>{team.athletes.length ? team.athletes.join(" • ") : "Não informado"}</td>
                          </tr>)}</tbody>
                        </table>
                      </section>

                      <section className="championship-page">
                        <p className="report-print-kicker">PROGRAMAÇÃO</p>
                        <h4>Relação dos jogos</h4>
                        <table className="report-table">
                          <thead><tr><th>Jogo</th><th>Horário</th><th>Fase</th><th>Equipe A</th><th>Equipe B</th></tr></thead>
                          <tbody>{scheduledMatches.map((match) => <tr key={match.key}>
                            <td>{match.gameNumber}</td><td>{match.time}</td>
                            <td>{match.phase}{match.group ? ` • Grupo ${match.group}` : ""}</td>
                            <td>{match.a}</td><td>{match.b}</td>
                          </tr>)}</tbody>
                        </table>
                      </section>

                      <section className="championship-page">
                        <p className="report-print-kicker">CLASSIFICAÇÃO</p>
                        <h4>Método de classificação</h4>
                        <p className="report-rule">Os dois melhores de cada grupo avançam. O desempate seguirá: 1º maior número de vitórias; 2º maior saldo de pontos; 3º confronto direto.</p>
                        {["A", "B"].map((group) => (
                          <div className="report-classification-group" key={group}>
                            <h5>Grupo {group}</h5>
                            <table className="report-table">
                              <thead><tr><th>Pos.</th><th>Equipe</th><th>J</th><th>V</th><th>D</th><th>Pontos</th><th>Saldo</th><th>Situação</th></tr></thead>
                              <tbody>{standings.filter((team) => team.group === group).map((team) => <tr key={team.name}>
                                <td>{team.rank}</td><td>{team.name.toUpperCase()}</td><td>{team.played}</td><td>{team.wins}</td><td>{team.losses}</td><td>{team.pointsFor}</td><td>{team.pointDiff > 0 ? "+" : ""}{team.pointDiff}</td><td>{team.qualified === null ? "A aguardar" : team.qualified ? "Classificado" : "Eliminado"}</td>
                              </tr>)}</tbody>
                            </table>
                          </div>
                        ))}
                        <h5>Semifinais e decisões</h5>
                        <ul className="championship-playoffs">
                          <li>13º jogo — 1º do Grupo 1 × 2º do Grupo 2</li>
                          <li>14º jogo — 2º do Grupo 1 × 1º do Grupo 2</li>
                          <li>15º jogo — disputa do 3º lugar entre os perdedores das semifinais</li>
                          <li>16º jogo — final entre os vencedores das semifinais</li>
                        </ul>
                      </section>
                    </div>
                  )}

                  {reportType === "games" && (
                    <div className="report-section">
                      <p className="report-print-kicker">ALDEIA DA SERRA • VÔLEI DE AREIA 40+</p>
                      <h4>Relação oficial dos jogos</h4>
                      <table className="report-table">
                        <thead><tr><th>Jogo</th><th>Horário</th><th>Fase / chave</th><th>Quadra</th><th>Equipe A</th><th>Equipe B</th><th>Status</th><th>Placar</th></tr></thead>
                        <tbody>{scheduledMatches.map((match) => <tr key={match.key}>
                          <td>{match.gameNumber}</td><td>{match.time}</td>
                          <td>{match.phase}{match.group ? ` • Grupo ${match.group}` : ""}</td>
                          <td>{match.court}</td><td>{match.a}</td><td>{match.b}</td>
                          <td>{match.status}</td><td>{match.score || "—"}</td>
                        </tr>)}</tbody>
                      </table>
                      {!scheduledMatches.length && <p className="report-empty">A tabela ainda não foi publicada.</p>}
                    </div>
                  )}

                  {reportType === "matchSheets" && (
                    <div className="report-section match-sheets-report">
                      {(scheduledMatches.length ? scheduledMatches : Array.from({ length: 16 }, (_, index) => ({
                        key: `J${String(index + 1).padStart(2, "0")}`,
                        gameNumber: String(index + 1).padStart(2, "0"),
                        time: "",
                        court: "Quadra 01",
                        phase: "A definir",
                        group: null,
                        a: "________________",
                        b: "________________",
                      }))).map((match) => {
                        const teamA = registeredTeams.find((team) => team.name.toUpperCase() === match.a);
                        const teamB = registeredTeams.find((team) => team.name.toUpperCase() === match.b);
                        return <article className="match-sheet-page" key={match.key}>
                          <header>
                            <p>SÚMULA OFICIAL — VÔLEI DE AREIA 40+</p>
                            <strong>JOGO {match.gameNumber}</strong>
                          </header>
                          <table className="report-table match-sheet-table">
                            <tbody>
                              <tr><th>Nº JOGO</th><td>{match.gameNumber}</td><th>DATA</th><td>___/___/2026</td><th>HORÁRIO</th><td>{match.time || "_______"}</td></tr>
                              <tr><th>QUADRA</th><td>{match.court}</td><th>FASE</th><td>{match.phase}</td><th>GRUPO</th><td>{match.group || "—"}</td></tr>
                              <tr><th>EQUIPE A</th><td colSpan="2">{match.a}</td><th>EQUIPE B</th><td colSpan="2">{match.b}</td></tr>
                              <tr><th>ÁRBITRO</th><td colSpan="2">________________</td><th>MESÁRIO</th><td colSpan="2">________________</td></tr>
                            </tbody>
                          </table>

                          <h5>Identificação dos atletas</h5>
                          <table className="report-table">
                            <thead><tr><th>Equipe</th><th>Atleta 1</th><th>Atleta 2</th><th>Atleta 3</th><th>Atleta 4</th></tr></thead>
                            <tbody>
                              <tr><td>{match.a}</td>{(teamA?.athletes || ["", "", "", ""]).map((athlete, index) => <td key={index}>{athlete || "____________"}</td>)}</tr>
                              <tr><td>{match.b}</td>{(teamB?.athletes || ["", "", "", ""]).map((athlete, index) => <td key={index}>{athlete || "____________"}</td>)}</tr>
                            </tbody>
                          </table>

                          <h5>Controle dos sets • todos até 15 pontos</h5>
                          <table className="report-table">
                            <thead><tr><th>Set</th><th>{match.a}</th><th>{match.b}</th><th>Vencedor</th><th>Início</th><th>Término</th></tr></thead>
                            <tbody>{[1, 2, 3].map((setNumber) => <tr key={setNumber}>
                              <td>{setNumber}º SET</td><td></td><td></td><td></td><td></td><td></td>
                            </tr>)}</tbody>
                          </table>

                          <div className="match-sheet-result">
                            <span><b>Resultado final:</b> ______ × ______</span>
                            <span><b>Equipe vencedora:</b> __________________</span>
                          </div>

                          <h5>Estatísticas técnicas consolidadas</h5>
                          <table className="report-table">
                            <thead><tr><th>Indicador</th><th>{match.a}</th><th>{match.b}</th></tr></thead>
                            <tbody>
                              <tr><td>Pontos de saque</td><td></td><td></td></tr>
                              <tr><td>Pontos de ataque</td><td></td><td></td></tr>
                              <tr><td>Pontos de bloqueio</td><td></td><td></td></tr>
                              <tr><td>Erros de saque</td><td></td><td></td></tr>
                              <tr><td>Erros de ataque</td><td></td><td></td></tr>
                              <tr><td>Pedidos de tempo</td><td></td><td></td></tr>
                            </tbody>
                          </table>

                          <h5>Ocorrências e observações</h5>
                          <table className="report-table">
                            <thead><tr><th>Horário</th><th>Set</th><th>Equipe / atleta</th><th>Tipo de ocorrência</th><th>Descrição / providência</th></tr></thead>
                            <tbody>{[1, 2, 3, 4, 5].map((index) => <tr key={index}>
                              <td>&nbsp;<br />&nbsp;</td><td></td><td></td><td></td><td></td>
                            </tr>)}</tbody>
                          </table>

                          <div className="match-sheet-signatures">
                            <span>Mesário: __________________________</span>
                            <span>Árbitro: __________________________</span>
                            <span>Equipe A: _________________________</span>
                            <span>Equipe B: _________________________</span>
                          </div>
                        </article>;
                      })}
                    </div>
                  )}

                  {reportType === "match" && (
                    <div className="report-section">
                      <p className="report-print-kicker">ALDEIA DA SERRA • VÔLEI DE AREIA 40+</p>
                      <h4>Resumo das partidas</h4>
                      {matchRecords.length ? matchRecords.map((record) => {
                        const sheet = matchSheets[record.fixture] || {};
                        return <article className="match-report-card" key={record.id}>
                          <div className="match-report-title"><strong>Jogo {record.gameNumber} • {record.phase}</strong><span>{record.court}</span></div>
                          <div className="match-report-score">
                            <span>{record.teamA}</span><b>{record.finalSets?.a || 0} × {record.finalSets?.b || 0}</b><span>{record.teamB}</span>
                          </div>
                          <dl className="match-report-meta">
                            <div><dt>Início</dt><dd>{record.startedAt ? new Date(record.startedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "—"}</dd></div>
                            <div><dt>Término</dt><dd>{record.finishedAt ? new Date(record.finishedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "—"}</dd></div>
                            <div><dt>Duração</dt><dd>{formatReportDuration(record.durationMs)}</dd></div>
                            <div><dt>Vencedor</dt><dd>{record.winner}</dd></div>
                            <div><dt>Oficiais</dt><dd>{sheet.officials || "—"}</dd></div>
                          </dl>
                          <table className="report-table match-set-table">
                            <thead><tr><th>Set</th><th>{record.teamA}</th><th>{record.teamB}</th><th>Início</th><th>Término</th><th>Observações</th></tr></thead>
                            <tbody>{(record.sets || []).map((set) => {
                              const sheetSet = sheet.sets?.[set.number] || {};
                              return <tr key={set.number}><td>{set.number}</td><td>{set.a}</td><td>{set.b}</td><td>{sheetSet.start || "—"}</td><td>{sheetSet.end || "—"}</td><td>{sheetSet.events || "—"}</td></tr>;
                            })}</tbody>
                          </table>
                          <p className="match-report-notes"><strong>Observações:</strong> {sheet.notes || "Nenhuma observação registrada."}</p>
                        </article>;
                      }) : <p className="report-empty">Nenhuma partida foi finalizada.</p>}
                    </div>
                  )}

                  {reportType === "general" && (
                    <div className="report-section">
                      <p className="report-print-kicker">ALDEIA DA SERRA • VÔLEI DE AREIA 40+</p>
                      <h4>Estatística geral do torneio</h4>
                      <div className="report-highlight-grid">
                        <article><span>Equipe que marcou mais pontos</span><strong>{maxTeamPoints?.nameUpper || "—"}</strong><b>{maxTeamPointsValue} pontos</b></article>
                        <article><span>Partida mais curta</span><strong>{shortestMatch ? `${shortestMatch.teamA} × ${shortestMatch.teamB}` : "—"}</strong><b>{shortestMatch ? formatReportDuration(shortestMatch.durationMs) : "—"}</b></article>
                        <article><span>Partida mais longa</span><strong>{longestMatch ? `${longestMatch.teamA} × ${longestMatch.teamB}` : "—"}</strong><b>{longestMatch ? formatReportDuration(longestMatch.durationMs) : "—"}</b></article>
                      </div>
                      <h5>Performance por equipe — pontos marcados</h5>
                      <div className="report-chart" aria-label="Gráfico de pontos por equipe">
                        {reportTeamStats.map((team) => (
                          <div className="report-chart-row" key={team.name}>
                            <span>{team.nameUpper}</span>
                            <div><i style={{ width: `${maxTeamPointsValue ? (team.pointsFor / maxTeamPointsValue) * 100 : 0}%`, background: team.color }} /></div>
                            <b>{team.pointsFor}</b>
                          </div>
                        ))}
                      </div>
                      <table className="report-table report-team-table">
                        <thead><tr><th>Equipe</th><th>Partidas</th><th>Vitórias</th><th>Derrotas</th><th>Pontos a favor</th><th>Pontos contra</th><th>Saldo</th><th>Tempo em quadra</th></tr></thead>
                        <tbody>{reportTeamStats.map((team) => <tr key={team.name}>
                          <td><i className="report-team-dot" style={{ background: team.color }} />{team.nameUpper}</td><td>{team.played}</td><td>{team.wins}</td><td>{team.losses}</td><td>{team.pointsFor}</td><td>{team.pointsAgainst}</td><td>{team.pointDiff > 0 ? "+" : ""}{team.pointDiff}</td><td>{formatReportDuration(team.durationMs)}</td>
                        </tr>)}</tbody>
                      </table>
                    </div>
                  )}

                  {reportType === "classification" && (
                    <div className="report-section">
                      <p className="report-print-kicker">ALDEIA DA SERRA • VÔLEI DE AREIA 40+</p>
                      <h4>Relatório de classificação por rendimento</h4>
                      <p className="report-rule">Critério oficial: maior número de vitórias; saldo de pontos; confronto direto; posição inicial.</p>
                      {["A", "B"].map((group) => (
                        <div className="report-classification-group" key={group}>
                          <h5>Grupo {group}</h5>
                          <table className="report-table">
                            <thead><tr><th>Pos.</th><th>Equipe</th><th>J</th><th>V</th><th>D</th><th>Pontos</th><th>Saldo</th><th>Situação</th></tr></thead>
                            <tbody>{standings.filter((team) => team.group === group).map((team) => <tr key={team.name}>
                              <td>{team.rank}</td><td><i className="report-team-dot" style={{ background: team.color }} />{team.name.toUpperCase()}</td><td>{team.played}</td><td>{team.wins}</td><td>{team.losses}</td><td>{team.pointsFor}</td><td>{team.pointDiff > 0 ? "+" : ""}{team.pointDiff}</td><td>{team.qualified === null ? "A aguardar" : team.qualified ? "Classificado" : "Eliminado"}</td>
                            </tr>)}</tbody>
                          </table>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {adminView === "users" && currentUser.role === "admin" && (
              <div className="console-content"><div className="console-title"><div><p className="section-kicker">ACESSO AO PAINEL</p><h3>Usuários e <i>permissões.</i></h3></div></div><form className="user-create-form" onSubmit={createUser}><label>Nome<input required value={newUser.name} onChange={(event) => setNewUser({ ...newUser, name: event.target.value })} /></label><label>Usuário<input required autoComplete="off" value={newUser.username} onChange={(event) => setNewUser({ ...newUser, username: event.target.value })} /></label><label>Senha<input required type="password" minLength="10" autoComplete="new-password" value={newUser.password} onChange={(event) => setNewUser({ ...newUser, password: event.target.value })} /></label><label>Nível de acesso<select value={newUser.role} onChange={(event) => setNewUser({ ...newUser, role: event.target.value })}><option value="mesario">Mesário · súmula</option><option value="organizador">Organizador · tabela, equipes e regulamento</option><option value="publicador">Publicador · fotos</option><option value="admin">Administrador · acesso total</option></select></label><button className="button button-dark" type="submit">Criar usuário</button></form><form className="password-change-form" onSubmit={changeOwnPassword}><strong>ALTERAR MINHA SENHA</strong><label>Senha atual<input required type="password" value={passwordChange.current} onChange={(event) => setPasswordChange({ ...passwordChange, current: event.target.value })} /></label><label>Nova senha<input required minLength="10" type="password" value={passwordChange.next} onChange={(event) => setPasswordChange({ ...passwordChange, next: event.target.value })} /></label><button type="submit">Atualizar senha</button></form><div className="admin-user-list">{users.map((user) => <article key={user.id}><div><strong>{user.name}</strong><span>{user.username} · {({ admin: "Administrador", mesario: "Mesário", organizador: "Organizador", publicador: "Publicador" })[user.role]}</span></div><button disabled={user.id === currentUser.id || user.id === "admin-inicial"} onClick={() => setUsers((current) => current.filter((item) => item.id !== user.id))}>Remover</button></article>)}</div><p className="security-note">POLÍTICA LOCAL: senha com 10 caracteres, maiúscula, minúscula, número e símbolo; bloqueio por 15 minutos após 5 tentativas; sessão expira após 30 minutos sem atividade; não reutilizar as últimas 5 senhas. Os dados permanecem neste navegador e não substituem autenticação de servidor.</p></div>
            )}

            {adminView === "photos" && allowedAdminViews.includes("photos") && (
              <div className="console-content"><div className="console-title"><div><p className="section-kicker">ÁLBUM DO EVENTO</p><h3>Publicações da <i>arena.</i></h3></div></div>{selectedFile ? <div className="upload-preview"><img src={selectedFile.url} alt="Prévia da foto selecionada" /><button onClick={() => setSelectedFile(null)} aria-label="Remover foto"><X size={16} /></button></div> : <button className="upload-zone" onClick={() => fileInput.current?.click()}><Camera size={28} /><strong>Tirar foto ou escolher arquivo</strong><span>JPG ou PNG até 10 MB · somente competições de vôlei de areia, beach tennis ou beach soccer</span></button>}<input ref={fileInput} className="visually-hidden" type="file" accept="image/*" capture="environment" onChange={handleFile} />{selectedFile && <div className="photo-publish-controls"><label>Legenda<input value={caption} onChange={(event) => setCaption(event.target.value)} placeholder="Escreva uma legenda..." /></label><button className="button button-dark" onClick={publishPost}><Upload size={16} /> Publicar na galeria</button></div>}<div className="admin-photo-grid">{posts.map((post, index) => <article key={`${post.image}-${index}`}><img src={post.image} alt="Foto publicada do evento" /><div><strong>{post.label}</strong><span>{post.text}</span></div></article>)}</div></div>
            )}

            {adminView === "simula" && allowedAdminViews.includes("simula") && (
              <div className="console-content">
                <div className="console-title">
                  <div><p className="section-kicker">MONTE CARLO</p><h3>Simulação <i>de tempo.</i></h3></div>
                </div>
                <p className="modal-copy">Ajuste todos os parâmetros do torneio; cada alteração será aplicada na próxima simulação.</p>
                <div className="sheet-grid" style={{ marginBottom: "1.5rem" }}>
                  <label>Pontuação base<input type="number" min="1" value={simConfig.pontuacaoBase} onChange={(event) => updateSimulationConfig("pontuacaoBase", Number(event.target.value))} /></label>
                  <label>Teto de pontos<input type="number" min="1" value={simConfig.teto} onChange={(event) => updateSimulationConfig("teto", Number(event.target.value))} /></label>
                  <label>Sets por partida (melhor de)<input type="number" min="1" max="5" step="2" value={simConfig.setsPorPartida} onChange={(event) => updateSimulationConfig("setsPorPartida", Number(event.target.value))} /></label>
                  <label>Pontos do set decisivo<input type="number" min="1" value={simConfig.pontuacaoSetDecisivo} onChange={(event) => updateSimulationConfig("pontuacaoSetDecisivo", Number(event.target.value))} /></label>
                  <label>Jogos no torneio<input type="number" min="1" value={simConfig.numeroJogos} onChange={(event) => updateSimulationConfig("numeroJogos", Number(event.target.value))} /></label>
                  <label>Jogo antes do almoço (0 desativa)<input type="number" min="0" value={simConfig.jogoAlmoco} onChange={(event) => updateSimulationConfig("jogoAlmoco", Number(event.target.value))} /></label>
                  <label>Intervalo de almoço (min)<input type="number" min="0" value={simConfig.tempoAlmoco} onChange={(event) => updateSimulationConfig("tempoAlmoco", Number(event.target.value))} /></label>
                  <label>Intervalo entre partidas (min)<input type="number" min="0" value={simConfig.intervaloEntreJogos} onChange={(event) => updateSimulationConfig("intervaloEntreJogos", Number(event.target.value))} /></label>
                  <label>Intervalo entre sets (min)<input type="number" min="0" value={simConfig.intervaloEntreSets} onChange={(event) => updateSimulationConfig("intervaloEntreSets", Number(event.target.value))} /></label>
                  <label>Início do torneio<input type="time" value={simConfig.horarioInicio} onChange={(event) => updateSimulationConfig("horarioInicio", event.target.value)} /></label>
                  <label>Horário limite<input type="time" value={simConfig.horarioLimite} onChange={(event) => updateSimulationConfig("horarioLimite", event.target.value)} /></label>
                  <label>Segundos por ponto (mín.)<input type="number" min="1" step="0.5" value={simConfig.segundosPorPontoMin} onChange={(event) => updateSimulationConfig("segundosPorPontoMin", Number(event.target.value))} /></label>
                  <label>Segundos por ponto (máx.)<input type="number" min="1" step="0.5" value={simConfig.segundosPorPontoMax} onChange={(event) => updateSimulationConfig("segundosPorPontoMax", Number(event.target.value))} /></label>
                  <label>Chance de set estendido (%)<input type="number" min="0" max="100" step="1" value={simConfig.chanceSetEstendido} onChange={(event) => updateSimulationConfig("chanceSetEstendido", Number(event.target.value))} /></label>
                  <label>Nº de simulações (100–100.000)<input type="number" min="100" max="100000" step="100" value={simConfig.simulacoes} onChange={(event) => updateSimulationConfig("simulacoes", Number(event.target.value))} /></label>
                </div>
                {simError && <p className="form-error" role="alert">{simError}</p>}
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
                      <span><b>Probabilidade de terminar até {simConfig.horarioLimite}:</b> {simResult.probabilidade.toFixed(2)}%</span>
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
                        <small>Realizado em {new Date(record.recordedAt).toLocaleString("pt-BR")} · início {record.startedAt ? new Date(record.startedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "--:--"} · término {record.finishedAt ? new Date(record.finishedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) : "--:--"}</small>
                        <small>Duração da partida: {formatElapsedTime(record.durationMs || 0)} · tempo total de pausa: {formatElapsedTime(record.pausedDurationMs || 0)}</small>
                      </div>
                      <b>{record.winner}</b>
                    </div>
                    <div className="record-card-sets">
                      {record.sets.map((set) => <span key={set.number}>SET {set.number} <b>{set.a} — {set.b}</b></span>)}
                      <span>TEMPO {record.teamA}: <b>{record.timeoutsUsed?.a ? "SIM" : "NÃO"}</b></span>
                      <span>TEMPO {record.teamB}: <b>{record.timeoutsUsed?.b ? "SIM" : "NÃO"}</b></span>
                      {(record.timeoutLog || []).map((timeout, index) => (
                        <span key={`${timeout.startedAt}-${index}`}>PAUSA {timeout.team}: <b>{formatElapsedTime(timeout.durationMs || 0)}</b></span>
                      ))}
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
