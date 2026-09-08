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
    name: "Marrom",
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

const matches = [
  {
    time: "09:00",
    court: "Quadra 01",
    category: "FASE DE GRUPOS",
    a: "AMARELO",
    b: "AZUL",
    colorA: "#f6bd19",
    colorB: "#1564f5",
    status: "AO VIVO",
    score: "15 — 13",
  },
  {
    time: "10:30",
    court: "Quadra 02",
    category: "FASE DE GRUPOS",
    a: "BRANCO",
    b: "LARANJA",
    colorA: "#d8d8d3",
    colorB: "#ed7438",
    status: "EM 40 MIN",
    score: null,
  },
  {
    time: "12:00",
    court: "Quadra 01",
    category: "FASE DE GRUPOS",
    a: "MARROM",
    b: "PRETO",
    colorA: "#81563f",
    colorB: "#20252c",
    status: "A SEGUIR",
    score: null,
  },
];

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

function App() {
  const storageKey = "aldeia-serra-open-tournament-v1";
  const hydratedRef = useRef(false);
  const [slide, setSlide] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminView, setAdminView] = useState("publish");
  const [drawOpen, setDrawOpen] = useState(false);
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
  const [activeMatch, setActiveMatch] = useState({ a: "AMARELO", b: "AZUL" });
  const [serveAdvantage, setServeAdvantage] = useState("a");
  const [rallies, setRallies] = useState(28);
  const [activeStat, setActiveStat] = useState("PONTO");
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [rallyRecords, setRallyRecords] = useState([]);
  const [fullscreenScoreboard, setFullscreenScoreboard] = useState(false);
  const [adminTab, setAdminTab] = useState("publicar");
  const [drawState, setDrawState] = useState(null);
  const [scheduledMatches, setScheduledMatches] = useState(() => matches.map((match) => ({ ...match, key: `${match.a}-${match.b}` })));
  const [activeFixtureKey, setActiveFixtureKey] = useState("AMARELO-AZUL");
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
        if (saved.score) setScore(saved.score);
        if (saved.sets) setSets(saved.sets);
        if (saved.setNumber) setSetNumber(saved.setNumber);
        if (saved.setResults) setSetResults(saved.setResults);
        if (saved.matchRecords) setMatchRecords(saved.matchRecords);
        if (saved.matchFinished !== undefined) setMatchFinished(saved.matchFinished);
        if (saved.pendingSet) setPendingSet(saved.pendingSet);
        if (saved.resting !== undefined) setResting(saved.resting);
        if (saved.activeMatch) setActiveMatch(saved.activeMatch);
        if (saved.serveAdvantage !== undefined) setServeAdvantage(saved.serveAdvantage);
        if (saved.rallies !== undefined) setRallies(saved.rallies);
        if (saved.posts) setPosts(saved.posts);
        if (saved.drawState) setDrawState(saved.drawState);
        if (saved.scheduledMatches) setScheduledMatches(saved.scheduledMatches);
        if (saved.activeFixtureKey) setActiveFixtureKey(saved.activeFixtureKey);
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
      score, sets, setNumber, setResults, matchRecords, matchFinished, pendingSet, resting,
      posts,
      activeMatch, serveAdvantage, rallies, drawState, scheduledMatches,
      activeFixtureKey, scoringRule,
    }));
  }, [isHydrated, score, sets, setNumber, setResults, matchRecords, matchFinished, pendingSet, resting, posts, activeMatch, serveAdvantage, rallies, drawState, scheduledMatches, activeFixtureKey, scoringRule]);

  const activeTeamA = teams.find((team) => team.name.toUpperCase() === activeMatch.a) || teams[0];
  const activeTeamB = teams.find((team) => team.name.toUpperCase() === activeMatch.b) || teams[1];

  const nextSlide = () => setSlide((current) => (current + 1) % slides.length);
  const previousSlide = () =>
    setSlide((current) => (current - 1 + slides.length) % slides.length);
  const addPoint = (team) => {
    if (matchFinished || pendingSet) return;
    const target = setNumber === 3 ? 15 : 21;
    const nextScore = { ...score, [team]: score[team] + 1 };
    const otherTeam = team === "a" ? "b" : "a";
    const setWon = nextScore[team] >= target && nextScore[team] - nextScore[otherTeam] >= 2;
    setScore(nextScore);
    setServeAdvantage(team);
    setRallies((current) => current + 1);
    if (setWon) finishSet(team, nextScore);
  };
  const removePoint = (team) =>
    !matchFinished && setScore((current) => ({
      ...current,
      [team]: Math.max(0, current[team] - 1),
    }));
  const selectStat = (stat) => {
    setActiveStat(stat);
    setSelectedAthlete(null);
  };
  const finishSet = (team, finalScore = score) => {
    if (pendingSet || matchFinished) return;
    const target = setNumber === 3 ? 15 : 21;
    const winnerScore = finalScore[team];
    const opponentScore = finalScore[team === "a" ? "b" : "a"];
    if (winnerScore < target || winnerScore - opponentScore < 2) {
      window.alert(`O Set ${setNumber} só pode ser encerrado com ${target} pontos e 2 de vantagem.`);
      return;
    }
    const winner = team === "a" ? activeMatch.a : activeMatch.b;
    window.alert(`${winner} venceu o Set ${setNumber} por ${finalScore.a} x ${finalScore.b}.`);
    setPendingSet({ number: setNumber, winner: team, a: finalScore.a, b: finalScore.b });
  };
  const saveSetHistory = () => {
    if (!pendingSet) return;
    const nextSets = { ...sets, [pendingSet.winner]: sets[pendingSet.winner] + 1 };
    const nextHistory = [...setResults, pendingSet];
    setSets(nextSets);
    setSetResults(nextHistory);
    setPendingSet(null);
    if (nextSets[pendingSet.winner] === 2 || pendingSet.number === 3) {
      const winner = pendingSet.winner === "a" ? activeMatch.a : activeMatch.b;
      const fixture = scheduledMatches.find((match) => match.key === activeFixtureKey);
      setMatchRecords((current) => [
        {
          id: `${activeFixtureKey}-${Date.now()}`,
          recordedAt: new Date().toISOString(),
          fixture: activeFixtureKey,
          court: fixture?.court || "Quadra 01",
          category: fixture?.category || "FASE DE GRUPOS",
          teamA: activeMatch.a,
          teamB: activeMatch.b,
          colorA: activeTeamA.color,
          colorB: activeTeamB.color,
          sets: nextHistory,
          finalSets: nextSets,
          winner,
        },
        ...current,
      ]);
      window.alert(`${pendingSet.winner === "a" ? activeMatch.a : activeMatch.b} venceu a partida!`);
      const resultScore = `${nextHistory.map((result) => `${result.a} — ${result.b}`).join(" / ")}`;
      setScheduledMatches((current) => current.map((fixture) => fixture.key === activeFixtureKey ? { ...fixture, status: "FINALIZADO", score: resultScore } : fixture));
      setDrawState((current) => current ? { ...current, fixtures: current.fixtures.map((fixture) => fixture.key === activeFixtureKey ? { ...fixture, status: "FINALIZADO", score: resultScore } : fixture) } : current);
      const nextFixture = drawState?.fixtures?.find((fixture) => fixture.key !== activeFixtureKey && fixture.status !== "FINALIZADO");
      if (nextFixture) {
        loadMatch(nextFixture);
      } else {
        setMatchFinished(true);
      }
      return;
    }
    setResting(true);
    setSetNumber((current) => current + 1);
    setScore({ a: 0, b: 0 });
    setServeAdvantage(null);
  };
  const downloadRecords = (format) => {
    if (!matchRecords.length) return;
    const filename = `sumulas-aldeia-serra-open.${format}`;
    const content = format === "json"
      ? JSON.stringify(matchRecords, null, 2)
      : [
        "Data;Jogo;Quadra;Categoria;Equipe A;Equipe B;Sets;Vencedor",
        ...matchRecords.map((record) => [
          new Date(record.recordedAt).toLocaleString("pt-BR"),
          record.fixture,
          record.court,
          record.category,
          record.teamA,
          record.teamB,
          record.sets.map((set) => `${set.a}x${set.b}`).join(" / "),
          record.winner,
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
    setScheduledMatches((current) => current.map((match) => {
      if (match.key === activeFixtureKey && match.status === "AO VIVO") return { ...match, status: "A SEGUIR" };
      if (match.key === fixture.key && match.status !== "FINALIZADO") return { ...match, status: "AO VIVO" };
      return match;
    }));
    setActiveMatch({ a: fixture.a.toUpperCase(), b: fixture.b.toUpperCase() });
    setActiveFixtureKey(fixture.key);
    setScore({ a: 0, b: 0 });
    setSets({ a: 0, b: 0 });
    setSetNumber(1);
    setSetResults([]);
    setPendingSet(null);
    setResting(false);
    setMatchFinished(false);
    setServeAdvantage("a");
  };
  const continueAfterRest = () => {
    setResting(false);
    setServeAdvantage(null);
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
  const runDraw = () => {
    const shuffled = [...teams].sort(() => Math.random() - 0.5);
    const groups = { A: shuffled.slice(0, 5), B: shuffled.slice(5, 10) };
    const fixtures = Object.values(groups).flatMap((group, groupIndex) =>
      group.flatMap((team, index) =>
        group
          .slice(index + 1)
          .map((opponent) => ({
            group: groupIndex === 0 ? "A" : "B",
            a: team.name,
            b: opponent.name,
          })),
      ),
    );
    const generatedFixtures = fixtures.map((fixture, index) => ({
      ...fixture,
      key: `${fixture.a}-${fixture.b}`,
      time: `${String(9 + Math.floor(index / 2)).padStart(2, "0")}:${index % 2 ? "30" : "00"}`,
      court: `Quadra ${String((index % 2) + 1).padStart(2, "0")}`,
      category: `GRUPO ${fixture.group}`,
      status: index === 0 ? "AO VIVO" : "A SEGUIR",
      score: null,
    }));
    setDrawState({
      groups,
      fixtures: generatedFixtures,
      generatedAt: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
    setScheduledMatches(generatedFixtures);
    const firstFixture = generatedFixtures[0];
    if (firstFixture) {
      loadMatch(firstFixture);
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
          <a href="#galeria">Galeria</a>
        </nav>
        <div className="admin-actions">
          <button className="admin-trigger" onClick={() => { setAdminView("publish"); setAdminOpen(true); }}>
            <Camera size={16} /> Publicar
          </button>
          <button
            className="admin-trigger draw-trigger"
            onClick={() => setDrawOpen(true)}
          >
            <Trophy size={16} /> Sorteio
          </button>
          <button
            className="admin-trigger rules-trigger"
            onClick={editScoringRule}
          >
            Regras
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
          <div className="ticker-label"><span className="live-dot" /> AGORA NA ARENA</div>
          <div className="ticker-match"><strong>QUADRA 01</strong><span>{activeMatch.a} <b>{score.a}</b></span><span className="ticker-vs">—</span><span>{activeMatch.b} <b>{score.b}</b></span></div>
          <a href="#sumula">Acompanhar partida <ArrowUpRight size={15} /></a>
        </section>

        <section className="section schedule-section" id="jogos">
          <div className="section-heading">
            <div><p className="section-kicker">TABELA DE JOGOS</p><h2>O próximo ponto<br /><i>começa agora.</i></h2></div>
              <div className="date-switcher"><button>‹</button><span><small>DATA DO TORNEIO</small> 10 OUT 2026</span><button>›</button></div>
          </div>
          <div className="match-list">
            {scheduledMatches.map((match, index) => (
              <article className="match-row" key={match.time}>
                <div className="match-time">
                  <strong>{match.time}</strong>
                  <span>
                    <Clock3 size={13} /> {match.court}
                  </span>
                </div>
                <div className="match-category">{match.category}</div>
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
                  {match.key === activeFixtureKey && !match.score ? (
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
                  aria-label={`Detalhes de ${match.a}`}
                >
                  <ArrowUpRight size={18} />
                </a>
              </article>
            ))}
          </div>
          <a className="under-link" href="#jogos">
            Ver tabela completa <ArrowUpRight size={15} />
          </a>
        </section>

        <section
          className={`operations-band ${fullscreenScoreboard ? "scoreboard-fullscreen" : ""}`}
          id="sumula"
        >
          <div className="section operations-inner">
            <div className="section-heading operations-heading">
              <div>
                <p className="section-kicker light">MESA • PARTIDA 01</p>
                <h2>
                  Súmula
                  <br />
                  <i>eletrônica.</i>
                </h2>
              </div>
              <div className="match-meta">
                <span className="live-dot" /> AO VIVO{" "}
                <small>QUADRA 01 • FASE DE GRUPOS</small>
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
              <div><strong>CONTROLE DO MESÁRIO</strong><label htmlFor="match-select">SELECIONAR PRÓXIMO JOGO</label></div>
              <select id="match-select" value={activeFixtureKey} onChange={(event) => loadMatch(scheduledMatches.find((match) => match.key === event.target.value))}>
                {scheduledMatches.map((match) => <option value={match.key} key={match.key} disabled={match.status === "FINALIZADO"}>{match.time || "--:--"} • {match.a} x {match.b} • {match.status}</option>)}
              </select>
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
                  <span>SETS {sets.a} — {sets.b}</span>
                  <b>{sets.a}</b>
                  <em>—</em>
                  <b>{sets.b}</b>
                </div>
                <div className="point-score">
                  <strong>{score.a}</strong>
                  <span>:</span>
                  <strong>{score.b}</strong>
                </div>
                <small>{matchFinished ? "PARTIDA ENCERRADA" : `SET ${setNumber}`}</small>
                <div className="set-history">
                  {setResults.map((result) => <span key={result.number}>SET {result.number}: <b>{result.a} × {result.b}</b></span>)}
                </div>
              </div>
              <div className="scoreboard-team team-b">
                <div>
                  <small>EQUIPE {activeMatch.b}</small>
                  <strong>{activeMatch.b}</strong>
                  <p>{activeTeamB.athletes.join(" • ")}</p>
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
                >
                  <Minus size={16} />
                </button>
                <button
                  className="score-point"
                  style={{ background: activeTeamA.color, color: activeTeamA.name === "Preto" ? "white" : "#182536" }}
                  onClick={() => addPoint("a")}
                >
                  PONTO {activeMatch.a} <Plus size={16} />
                </button>
              </div>
              <div>
                <button
                  onClick={() => removePoint("b")}
                  aria-label={`Remover ponto do ${activeMatch.b}`}
                >
                  <Minus size={16} />
                </button>
                <button
                  className="score-point"
                  style={{ background: activeTeamB.color, color: activeTeamB.name === "Preto" ? "white" : "#182536" }}
                  onClick={() => addPoint("b")}
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
              <button
                className="button button-yellow"
                onClick={() => finishSet(score.a > score.b ? "a" : "b")}
                disabled={score.a === score.b || pendingSet || matchFinished}
              >
                Encerrar Set {setNumber}
              </button>
              {pendingSet && (
                <button className="button button-outline" onClick={saveSetHistory}>
                  Salvar histórico do Set {pendingSet.number}
                </button>
              )}
              {resting && (
                <div className="rest-notice">
                  <strong>DESCANSO DE 5 MINUTOS</strong>
                  <span>O próximo set pode começar antes, quando a mesa estiver pronta.</span>
                  <button onClick={continueAfterRest}>Iniciar próximo set</button>
                </div>
              )}
            </div>
            <div className="athlete-picker">
              <div className="athlete-picker-heading">
                <strong>ATLETA RESPONSÁVEL</strong>
                <span>{selectedAthlete ? `${activeStat} • ${selectedAthlete}` : `Selecione quem realizou ${activeStat.toLowerCase()}`}</span>
              </div>
              <div className="athlete-picker-groups">
                {teams.slice(0, 2).map((team) => (
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
                Dez equipes.
                <br />
                <i>Uma arena.</i>
              </h2>
            </div>
            <span className="roster-count">
              10 EQUIPES <b>•</b> 40 ATLETAS
            </span>
          </div>
          <div className="team-grid">
            {teams.map((team, index) => (
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
                As dez equipes começam com pontuação zerada. A classificação
                será atualizada pela súmula conforme os resultados.
              </p>
              <div className="public-rule">
                <strong>REGRA DE PONTUAÇÃO</strong>
                <span>{scoringRule}</span>
              </div>
              <a className="button button-outline" href="#classificacao">
                Ver classificação <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="leaderboard">
              <div className="leaderboard-head">
                <span>POS.</span>
                <span>EQUIPE</span>
                <span>PTS</span>
              </div>
              {teams.map((team, index) => (
                <div className="leaderboard-row" key={team.name}>
                  <strong>{String(index + 1).padStart(2, "0")}</strong>
                  <span>
                    <i style={{ background: team.color }} />
                    {team.name.toUpperCase()}
                  </span>
                  <b>0</b>
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
                Visão da <i>Areia</i>
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

      {drawOpen && (
        <div className="modal-backdrop" onClick={() => setDrawOpen(false)}>
          <section
            className="draw-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="close-modal" onClick={() => setDrawOpen(false)}>
              <X size={20} />
            </button>
            <div className="admin-tabs">
              <button className="active">SORTEIO</button>
              <button
                onClick={() => {
                  setDrawOpen(false);
                  setAdminOpen(true);
                }}
              >
                PUBLICAR
              </button>
            </div>
            <p className="section-kicker">PAINEL DO ORGANIZADOR</p>
            <h2>
              Sorteio
              <br />
              <i>das fases.</i>
            </h2>
            <p className="modal-copy">
              Distribua as 10 equipes em dois grupos e gere os confrontos da
              classificatória.
            </p>
            <div className="draw-rule">
              <strong>REGRA ATIVA</strong>
              <span>
                2 grupos de 5 • todos contra todos • 4 classificados diretos + 4
                vagas de repescagem para a fase final.
              </span>
            </div>
            <button
              className="button button-dark draw-button"
              onClick={runDraw}
            >
              <Trophy size={17} />{" "}
              {drawState ? "Refazer sorteio" : "Sortear grupos e jogos"}
            </button>
            {drawState && (
              <div className="draw-result">
                <div className="draw-result-head">
                  <strong>RESULTADO DO SORTEIO</strong>
                  <small>Gerado às {drawState.generatedAt}</small>
                </div>
                <div className="draw-groups">
                  {Object.entries(drawState.groups).map(
                    ([group, groupTeams]) => (
                      <div className="draw-group" key={group}>
                        <h3>GRUPO {group}</h3>
                        {groupTeams.map((team, index) => (
                          <div className="draw-team" key={team.name}>
                            <span>{index + 1}</span>
                            <i style={{ background: team.color }} />
                            {team.name}
                          </div>
                        ))}
                      </div>
                    ),
                  )}
                </div>
                <div className="draw-next">
                  <strong>FASE FINAL • REPESCAGEM</strong>
                  <p>
                    As equipes que terminarem fora do top 2 de cada grupo entram
                    no ranking de repescagem. As 4 melhores completam as quartas
                    de final.
                  </p>
                  <div className="knockout-slots">
                    <span>
                      QF 01
                      <br />
                      <b>1º A × REP 04</b>
                    </span>
                    <span>
                      QF 02
                      <br />
                      <b>1º B × REP 03</b>
                    </span>
                    <span>
                      QF 03
                      <br />
                      <b>2º A × REP 02</b>
                    </span>
                    <span>
                      QF 04
                      <br />
                      <b>2º B × REP 01</b>
                    </span>
                  </div>
                </div>
                <div className="fixture-preview">
                  <strong>PRIMEIROS CONFRONTOS</strong>
                  {drawState.fixtures.slice(0, 4).map((fixture) => (
                    <span key={`${fixture.group}-${fixture.a}-${fixture.b}`}>
                      <b>GRUPO {fixture.group}</b> {fixture.a} <em>×</em>{" "}
                      {fixture.b}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      )}

      {adminOpen && (
        <div className="modal-backdrop" onClick={() => setAdminOpen(false)}>
          <section
            className="admin-modal"
            onClick={(event) => event.stopPropagation()}
          >
            {login ? (
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
                  E-mail
                  <input type="email" placeholder="agismaciel@gmail.com" />
                </label>
                <label>
                  Senha
                  <input type="password" placeholder="••••••••" />
                </label>
                <button
                  className="button button-dark"
                  onClick={() => setLogin(false)}
                >
                  Entrar <ArrowUpRight size={17} />
                </button>
                <button className="modal-back" onClick={() => setLogin(false)}>
                  Voltar para publicação
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
                        <small>{new Date(record.recordedAt).toLocaleString("pt-BR")} • {record.court}</small>
                      </div>
                      <b>{record.winner}</b>
                    </div>
                    <div className="record-card-sets">
                      {record.sets.map((set) => <span key={set.number}>SET {set.number} <b>{set.a} — {set.b}</b></span>)}
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
