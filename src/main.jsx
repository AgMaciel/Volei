import { useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowUpRight, Camera, ChevronLeft, ChevronRight, Clock3, MapPin, Menu, Minus, Plus, Trophy, Upload, X } from 'lucide-react'
import './styles.css'

const slides = [
  {
    eyebrow: 'ALDEIA DA SERRA OPEN • 10 OUT 2026',
    title: 'A areia vai ferver em Luziânia.',
    copy: 'Um dia inteiro de vôlei, torcida e encontros no Condomínio Aldeia da Serra.',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1800&q=85',
  },
  {
    eyebrow: 'CONDOMÍNIO ALDEIA DA SERRA',
    title: 'Do primeiro saque à grande final.',
    copy: 'Prepare sua dupla para um dia de competição e celebração em Luziânia.',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1800&q=85',
  },
  {
    eyebrow: 'LUZIÂNIA • GOIÁS',
    title: 'A aldeia é o nosso palco.',
    copy: 'Vôlei de areia, música e encontros em um cenário especial.',
    image: 'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=1800&q=85',
  },
  { eyebrow: 'ALDEIA DA SERRA OPEN • CONVITE', title: 'Veja a energia do Open.', copy: 'Acompanhe os vídeos da arena e venha viver esse dia com a gente.', video: '/references/video1.mp4', poster: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1800&q=85' },
  { eyebrow: 'ALDEIA DA SERRA OPEN • CONVITE', title: 'Veja a energia do Open.', copy: 'Acompanhe os vídeos da arena e venha viver esse dia com a gente.', video: '/references/video2.mp4', poster: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1800&q=85' },
  { eyebrow: 'ALDEIA DA SERRA OPEN • CONVITE', title: 'Veja a energia do Open.', copy: 'Acompanhe os vídeos da arena e venha viver esse dia com a gente.', video: '/references/video3.mp4', poster: 'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=1800&q=85' },
]

const teams = [
  { name: 'Amarelo', color: '#f6bd19', athletes: ['Gabriel', 'Alessandro', 'Júlia', 'Lara'] },
  { name: 'Azul', color: '#1564f5', athletes: ['Tarcio', 'Ravi', 'Márcia', 'Mauricio'] },
  { name: 'Branco', color: '#d8d8d3', athletes: ['Marcelo', 'Katia', 'Andréia', 'Bia'] },
  { name: 'Laranja', color: '#ed7438', athletes: ['Isac', 'Pereira', 'Lucilainy', 'Marcela'] },
  { name: 'Marrom', color: '#81563f', athletes: ['Fernando', 'Pedro', 'Roberta', 'Maria Eduarda'] },
  { name: 'Preto', color: '#20252c', athletes: ['Matheus Oliveira', 'Aline', 'Marília', 'Matheus (Bia)'] },
  { name: 'Rosa', color: '#e85d93', athletes: ['Agis', 'Dirceu', 'Rejane', 'Fran'] },
  { name: 'Roxo', color: '#7c52b6', athletes: ['Kayky', 'SAN', 'Michele', 'Maira'] },
  { name: 'Verde', color: '#2e9b67', athletes: ['Maycon', 'Marize', 'Elisio', 'Isabelly'] },
  { name: 'Vermelho', color: '#d44d45', athletes: ['Silvio', 'Athur', 'Nilma', 'Ana Paula'] },
]

const matches = [
  { time: '09:00', court: 'Quadra 01', category: 'FASE DE GRUPOS', a: 'AMARELO', b: 'AZUL', colorA: '#f6bd19', colorB: '#1564f5', status: 'AO VIVO', score: '15 — 13' },
  { time: '10:30', court: 'Quadra 02', category: 'FASE DE GRUPOS', a: 'BRANCO', b: 'LARANJA', colorA: '#d8d8d3', colorB: '#ed7438', status: 'EM 40 MIN', score: null },
  { time: '12:00', court: 'Quadra 01', category: 'FASE DE GRUPOS', a: 'MARROM', b: 'PRETO', colorA: '#81563f', colorB: '#20252c', status: 'A SEGUIR', score: null },
]

const initialPosts = [
  { image: 'https://images.unsplash.com/photo-1592656094267-764a45160876?auto=format&fit=crop&w=700&q=80', label: 'ALDEIA DA SERRA OPEN', text: 'O sol já nasceu por aqui. Hoje tem muita bola no alto.' },
  { image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=700&q=80', label: 'BASTIDORES', text: 'Aquecimento liberado. Vem sentir essa energia com a gente.' },
]

function App() {
  const [slide, setSlide] = useState(0)
  const [adminOpen, setAdminOpen] = useState(false)
  const [drawOpen, setDrawOpen] = useState(false)
  const [login, setLogin] = useState(false)
  const [posts, setPosts] = useState(initialPosts)
  const [selectedFile, setSelectedFile] = useState(null)
  const [caption, setCaption] = useState('')
  const [score, setScore] = useState({ a: 15, b: 13 })
  const [sets, setSets] = useState({ a: 1, b: 0 })
  const [rallies, setRallies] = useState(28)
  const [activeStat, setActiveStat] = useState('PONTO')
  const [adminTab, setAdminTab] = useState('publicar')
  const [drawState, setDrawState] = useState(null)
  const fileInput = useRef(null)

  const nextSlide = () => setSlide((current) => (current + 1) % slides.length)
  const previousSlide = () => setSlide((current) => (current - 1 + slides.length) % slides.length)
  const addPoint = (team) => {
    setScore((current) => ({ ...current, [team]: current[team] + 1 }))
    setRallies((current) => current + 1)
  }
  const removePoint = (team) => setScore((current) => ({ ...current, [team]: Math.max(0, current[team] - 1) }))
  const runDraw = () => {
    const shuffled = [...teams].sort(() => Math.random() - 0.5)
    const groups = { A: shuffled.slice(0, 5), B: shuffled.slice(5, 10) }
    const fixtures = Object.values(groups).flatMap((group, groupIndex) => group.flatMap((team, index) => group.slice(index + 1).map((opponent) => ({ group: groupIndex === 0 ? 'A' : 'B', a: team.name, b: opponent.name }))))
    setDrawState({ groups, fixtures, generatedAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) })
  }

  const handleFile = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setSelectedFile({ file, url: URL.createObjectURL(file) })
  }

  const publishPost = () => {
    if (!selectedFile) return
    setPosts((current) => [{ image: selectedFile.url, label: 'PUBLICADO AGORA', text: caption || 'Novo registro direto do Aldeia da Serra Open.' }, ...current])
    setSelectedFile(null)
    setCaption('')
    if (fileInput.current) fileInput.current.value = ''
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Aldeia da Serra Open início"><span>ALDEIA DA</span><strong>SERRA</strong><i>OPEN</i></a>
        <nav className="main-nav" aria-label="Navegação principal">
          <a href="#jogos">Jogos</a><a href="#classificacao">Classificação</a><a href="#galeria">Galeria</a>
        </nav>
        <div className="admin-actions"><button className="admin-trigger" onClick={() => setAdminOpen(true)}><Camera size={16} /> Publicar</button><button className="admin-trigger draw-trigger" onClick={() => setDrawOpen(true)}><Trophy size={16} /> Sorteio</button></div>
        <button className="menu-button" aria-label="Abrir menu"><Menu size={22} /></button>
      </header>

      <main id="inicio">
        <section className={`hero ${slides[slide].video ? 'hero-video' : ''}`} style={{ backgroundImage: `linear-gradient(90deg, rgba(13, 22, 38, .78) 0%, rgba(13, 22, 38, .25) 56%, rgba(13, 22, 38, .08) 100%), url(${slides[slide].image || slides[slide].poster})` }}>
          {slides[slide].video && <video className="hero-media" src={slides[slide].video} poster={slides[slide].poster} autoPlay muted loop playsInline />}
          <div className="hero-content">
            <p className="eyebrow">{slides[slide].eyebrow}</p>
            <h1>{slides[slide].title}</h1>
            <p className="hero-copy">{slides[slide].copy}</p>
            <div className="hero-actions"><a className="button button-yellow" href="#jogos">Ver programação <ArrowUpRight size={18} /></a><a className="text-link" href="#galeria">Conheça a arena <ArrowUpRight size={16} /></a></div>
          </div>
          <div className="hero-bottom"><span>10 OUT 2026</span><span className="hero-location"><MapPin size={15} /> ALDEIA DA SERRA, LUZIÂNIA</span><div className="slider-controls"><button onClick={previousSlide} aria-label="Banner anterior"><ChevronLeft size={20} /></button><span>0{slide + 1} <em>/ 0{slides.length}</em></span><button onClick={nextSlide} aria-label="Próximo banner"><ChevronRight size={20} /></button></div></div>
        </section>

        <section className="ticker"><div className="ticker-label"><span className="live-dot" /> AGORA NA ARENA</div><div className="ticker-match"><strong>QUADRA 01</strong><span>Amarelo <b>{score.a}</b></span><span className="ticker-vs">—</span><span>Azul <b>{score.b}</b></span></div><a href="#sumula">Acompanhar partida <ArrowUpRight size={15} /></a></section>

        <section className="section schedule-section" id="jogos">
          <div className="section-heading"><div><p className="section-kicker">TABELA DE JOGOS</p><h2>O próximo ponto<br /><i>começa agora.</i></h2></div><div className="date-switcher"><button>‹</button><span><small>HOJE</small> SÁB, 18 OUT</span><button>›</button></div></div>
          <div className="match-list">{matches.map((match, index) => <article className="match-row" key={match.time}><div className="match-time"><strong>{match.time}</strong><span><Clock3 size={13} /> {match.court}</span></div><div className="match-category">{match.category}</div><div className="teams"><span><i style={{ background: match.colorA }} />{match.a}</span><b>vs</b><span><i style={{ background: match.colorB }} />{match.b}</span></div><div className={`match-status ${match.status === 'AO VIVO' ? 'is-live' : ''}`}>{match.status}{index === 0 ? <strong>{score.a} — {score.b}</strong> : match.score && <strong>{match.score}</strong>}</div><a className="row-arrow" href={index === 0 ? '#sumula' : '#jogos'} aria-label={`Detalhes de ${match.a}`}><ArrowUpRight size={18} /></a></article>)}</div>
          <a className="under-link" href="#jogos">Ver tabela completa <ArrowUpRight size={15} /></a>
        </section>

        <section className="operations-band" id="sumula"><div className="section operations-inner"><div className="section-heading operations-heading"><div><p className="section-kicker light">MESA • PARTIDA 01</p><h2>Súmula<br /><i>eletrônica.</i></h2></div><div className="match-meta"><span className="live-dot" /> AO VIVO <small>QUADRA 01 • FASE DE GRUPOS</small></div></div><div className="scoreboard"><div className="scoreboard-team team-a"><span className="team-chip" style={{ background: teams[0].color, color: '#182536' }}>A</span><div><small>EQUIPE AMARELO</small><strong>AMARELO</strong><p>{teams[0].athletes.slice(0, 2).join(' • ')}</p></div></div><div className="scoreboard-score"><div className="set-score"><span>SETS</span><b>{sets.a}</b><em>—</em><b>{sets.b}</b></div><div className="point-score"><strong>{score.a}</strong><span>:</span><strong>{score.b}</strong></div><small>RALI {rallies}</small></div><div className="scoreboard-team team-b"><div><small>EQUIPE AZUL</small><strong>AZUL</strong><p>{teams[1].athletes.slice(0, 2).join(' • ')}</p></div><span className="team-chip" style={{ background: teams[1].color }}>B</span></div></div><div className="score-actions"><div><button onClick={() => removePoint('a')} aria-label="Remover ponto do Amarelo"><Minus size={16} /></button><button className="score-point yellow" onClick={() => addPoint('a')}>PONTO AMARELO <Plus size={16} /></button></div><div><button onClick={() => removePoint('b')} aria-label="Remover ponto do Azul"><Minus size={16} /></button><button className="score-point blue" onClick={() => addPoint('b')}>PONTO AZUL <Plus size={16} /></button></div></div><div className="stat-bar"><span>REGISTRAR RALI:</span>{['PONTO', 'ACE', 'ATAQUE', 'BLOQUEIO', 'ERRO'].map((stat) => <button className={activeStat === stat ? 'active' : ''} onClick={() => setActiveStat(stat)} key={stat}>{stat}</button>)}<b>ÚLTIMO: {activeStat}</b></div></div></section>

        <section className="section roster-section" id="atletas"><div className="section-heading"><div><p className="section-kicker">CADASTRO DE ATLETAS</p><h2>Dez equipes.<br /><i>Uma arena.</i></h2></div><span className="roster-count">10 EQUIPES <b>•</b> 40 ATLETAS</span></div><div className="team-grid">{teams.map((team, index) => <article className="team-card" key={team.name}><div className="team-card-head"><span className="team-color" style={{ background: team.color }} /> <strong>{String(index + 1).padStart(2, '0')}</strong><h3>{team.name}</h3><button aria-label={`Editar equipe ${team.name}`}><ArrowUpRight size={16} /></button></div><div className="athlete-list">{team.athletes.map((athlete, athleteIndex) => <div className="athlete" key={athlete}><span>{athleteIndex + 1}</span>{athlete}<small>{athleteIndex === 0 ? 'CAPITÃO' : 'ATLETA'}</small></div>)}</div></article>)}</div></section>

        <section className="standings-band" id="classificacao"><div className="section standings-inner"><div><p className="section-kicker light">RANKING DO CIRCUITO</p><h2>Quem vai<br /><i>levar o troféu?</i></h2><p className="standings-copy">Acompanhe a classificação em tempo real e descubra quem está subindo na corrida pelo pódio.</p><a className="button button-outline" href="#classificacao">Ver classificação <ArrowUpRight size={17} /></a></div><div className="leaderboard"><div className="leaderboard-head"><span>POS.</span><span>DUPLA</span><span>PTS</span></div>{[['01', 'PRAIA AZUL', '420'], ['02', 'SOL NASCENTE', '385'], ['03', 'VENTO SUL', '340'], ['04', 'MARÉ ALTA', '312']].map(([position, team, points]) => <div className="leaderboard-row" key={position}><strong>{position}</strong><span>{team}</span><b>{points}</b><ArrowUpRight size={15} /></div>)}</div><div className="trophy-mark"><Trophy size={92} strokeWidth={1} /><span>AP<br />25</span></div></div></section>

        <section className="section gallery-section" id="galeria"><div className="section-heading gallery-heading"><div><p className="section-kicker">DIÁRIO DA ARENA</p><h2>Visto da <i>areia.</i></h2></div><a className="under-link" href="#galeria">@arenapraiaopen <ArrowUpRight size={16} /></a></div><div className="post-grid">{posts.map((post, index) => <article className={`post-card post-${index}`} key={`${post.image}-${index}`}><img src={post.image} alt="Momento do torneio na areia" /><div className="post-overlay"><span>{post.label}</span><p>{post.text}</p></div></article>)}<article className="post-card quote-card"><div><span className="quote-mark">“</span><p>O melhor lugar para competir é onde todo mundo vem para se divertir.</p><small>— LUCAS MENDES, ATLETA</small></div></article></div></section>
      </main>

      <footer className="footer"><div className="brand footer-brand"><span>ALDEIA DA</span><strong>SERRA</strong><i>OPEN</i></div><p>Vôlei de areia com alma brasileira.</p><div className="footer-meta">© 2026 Aldeia da Serra Open <span>•</span> Luziânia, GO</div></footer>

      {drawOpen && <div className="modal-backdrop" onClick={() => setDrawOpen(false)}><section className="draw-modal" onClick={(event) => event.stopPropagation()}><button className="close-modal" onClick={() => setDrawOpen(false)}><X size={20} /></button><div className="admin-tabs"><button className="active">SORTEIO</button><button onClick={() => { setDrawOpen(false); setAdminOpen(true) }}>PUBLICAR</button></div><p className="section-kicker">PAINEL DO ORGANIZADOR</p><h2>Sorteio<br /><i>das fases.</i></h2><p className="modal-copy">Distribua as 10 equipes em dois grupos e gere os confrontos da classificatória.</p><div className="draw-rule"><strong>REGRA ATIVA</strong><span>2 grupos de 5 • todos contra todos • 4 classificados diretos + 4 vagas de repescagem para a fase final.</span></div><button className="button button-dark draw-button" onClick={runDraw}><Trophy size={17} /> {drawState ? 'Refazer sorteio' : 'Sortear grupos e jogos'}</button>{drawState && <div className="draw-result"><div className="draw-result-head"><strong>RESULTADO DO SORTEIO</strong><small>Gerado às {drawState.generatedAt}</small></div><div className="draw-groups">{Object.entries(drawState.groups).map(([group, groupTeams]) => <div className="draw-group" key={group}><h3>GRUPO {group}</h3>{groupTeams.map((team, index) => <div className="draw-team" key={team.name}><span>{index + 1}</span><i style={{ background: team.color }} />{team.name}</div>)}</div>)}</div><div className="draw-next"><strong>FASE FINAL • REPESCAGEM</strong><p>As equipes que terminarem fora do top 2 de cada grupo entram no ranking de repescagem. As 4 melhores completam as quartas de final.</p><div className="knockout-slots"><span>QF 01<br /><b>1º A × REP 04</b></span><span>QF 02<br /><b>1º B × REP 03</b></span><span>QF 03<br /><b>2º A × REP 02</b></span><span>QF 04<br /><b>2º B × REP 01</b></span></div></div><div className="fixture-preview"><strong>PRIMEIROS CONFRONTOS</strong>{drawState.fixtures.slice(0, 4).map((fixture) => <span key={`${fixture.group}-${fixture.a}-${fixture.b}`}><b>GRUPO {fixture.group}</b> {fixture.a} <em>×</em> {fixture.b}</span>)}</div></div>}</section></div>}

      {adminOpen && <div className="modal-backdrop" onClick={() => setAdminOpen(false)}><section className="admin-modal" onClick={(event) => event.stopPropagation()}>{login ? <><button className="close-modal" onClick={() => setAdminOpen(false)}><X size={20} /></button><p className="section-kicker">PAINEL RESTRITO</p><h2>Entrar no<br /><i>painel.</i></h2><label>E-mail<input type="email" placeholder="admin@arenapraia.com" /></label><label>Senha<input type="password" placeholder="••••••••" /></label><button className="button button-dark" onClick={() => setLogin(false)}>Entrar <ArrowUpRight size={17} /></button><button className="modal-back" onClick={() => setLogin(false)}>Voltar para publicação</button></> : <><button className="close-modal" onClick={() => setAdminOpen(false)}><X size={20} /></button><p className="section-kicker">PUBLICAÇÃO RÁPIDA</p><h2>Mostre o que<br /><i>está rolando.</i></h2><p className="modal-copy">Registre um momento da arena pelo celular e publique na galeria em segundos.</p>{selectedFile ? <div className="upload-preview"><img src={selectedFile.url} alt="Prévia da foto selecionada" /><button onClick={() => setSelectedFile(null)} aria-label="Remover foto"><X size={16} /></button></div> : <button className="upload-zone" onClick={() => fileInput.current?.click()}><Camera size={28} /><strong>Tirar foto ou escolher arquivo</strong><span>JPG, PNG até 10 MB</span></button>}<input ref={fileInput} className="visually-hidden" type="file" accept="image/*" capture="environment" onChange={handleFile} />{selectedFile && <><label>Legenda<input value={caption} onChange={(event) => setCaption(event.target.value)} placeholder="Escreva uma legenda..." /></label><button className="button button-dark publish-button" onClick={publishPost}><Upload size={17} /> Publicar na galeria</button></>}<div className="admin-divider"><span>ou</span></div><button className="login-link" onClick={() => setLogin(true)}>Entrar como administrador <ArrowUpRight size={16} /></button></>}</section></div>}
    </div>
  )
}

export default App

createRoot(document.getElementById('root')).render(<App />)
