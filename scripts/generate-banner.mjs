import fs from 'node:fs'
import sharp from 'sharp'

const source = ''
const svg = `
<svg width="1600" height="900" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#10263c"/><stop offset=".62" stop-color="#1767b9"/><stop offset="1" stop-color="#0e304d"/></linearGradient>
    <linearGradient id="sand" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#f1b71c"/><stop offset="1" stop-color="#ffd75a"/></linearGradient>
    <filter id="shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="18" stdDeviation="20" flood-color="#061321" flood-opacity=".38"/></filter>
    <clipPath id="screen"><rect x="430" y="188" width="670" height="382" rx="5"/></clipPath>
    <clipPath id="tabletScreen"><rect x="1140" y="385" width="268" height="360" rx="4"/></clipPath>
    <clipPath id="phoneScreen"><rect x="210" y="485" width="150" height="285" rx="10"/></clipPath>
  </defs>
  <rect width="1600" height="900" fill="url(#bg)"/>
  <circle cx="1370" cy="70" r="300" fill="#2c89d4" opacity=".2"/>
  <path d="M0 760 Q420 610 760 760 T1600 680 V900 H0Z" fill="#0b2843" opacity=".6"/>
  <path d="M0 820 Q400 700 800 820 T1600 760" fill="none" stroke="#f3bd22" stroke-width="3" opacity=".6"/>
  <text x="82" y="104" fill="#f5c321" font-family="Arial,sans-serif" font-size="25" font-weight="700" letter-spacing="5">ALDEIA DA SERRA OPEN</text>
  <text x="80" y="225" fill="white" font-family="Arial,sans-serif" font-size="72" font-weight="900">O TORNEIO</text>
  <text x="80" y="301" fill="#f5c321" font-family="Arial,sans-serif" font-size="76" font-weight="900">ESTÁ CHEGANDO.</text>
  <rect x="80" y="340" width="485" height="7" fill="url(#sand)"/>
  <text x="80" y="397" fill="white" font-family="Arial,sans-serif" font-size="28" font-weight="700">10 DE OUTUBRO DE 2026</text>
  <text x="80" y="438" fill="#d9e8f4" font-family="Arial,sans-serif" font-size="22">Condomínio Aldeia da Serra • Luziânia, GO</text>
  <rect x="80" y="490" width="430" height="78" rx="2" fill="#f5c321"/>
  <text x="108" y="540" fill="#13263c" font-family="Arial,sans-serif" font-size="27" font-weight="900">VÔLEI • AREIA • AMIGOS</text>
  <text x="80" y="650" fill="#b7d5ea" font-family="Arial,sans-serif" font-size="17" font-weight="700" letter-spacing="2">ACESSE E ACOMPANHE</text>
  <text x="80" y="682" fill="white" font-family="Arial,sans-serif" font-size="24" font-weight="700">agmaciel.github.io/Volei</text>

  <g filter="url(#shadow)">
    <rect x="400" y="150" width="730" height="455" rx="12" fill="#152331"/>
    <rect x="430" y="188" width="670" height="382" fill="#f5f3ee"/>
    <image href="data:image/jpeg;base64,${source}" x="430" y="188" width="670" height="382" preserveAspectRatio="xMidYMid slice" opacity=".35" clip-path="url(#screen)"/>
    <rect x="430" y="188" width="670" height="382" fill="#10263c" opacity=".82"/>
    <text x="470" y="240" fill="#f5c321" font-family="Arial,sans-serif" font-size="16" font-weight="700">ALDEIA DA SERRA OPEN</text>
    <text x="470" y="310" fill="white" font-family="Arial,sans-serif" font-size="38" font-weight="900">A areia vai ferver</text>
    <text x="470" y="351" fill="#f5c321" font-family="Arial,sans-serif" font-size="38" font-weight="900">em Luziânia.</text>
    <rect x="470" y="397" width="185" height="43" fill="#f5c321"/>
    <text x="490" y="425" fill="#13263c" font-family="Arial,sans-serif" font-size="14" font-weight="700">VER PROGRAMAÇÃO</text>
    <rect x="470" y="482" width="220" height="8" fill="#f5c321"/><rect x="704" y="482" width="180" height="8" fill="#3b83cf"/><rect x="898" y="482" width="150" height="8" fill="#e76e3d"/>
    <rect x="710" y="605" width="110" height="18" rx="9" fill="#152331"/>
  </g>
  <g filter="url(#shadow)">
    <rect x="1120" y="350" width="308" height="440" rx="19" fill="#172430"/>
    <rect x="1140" y="385" width="268" height="360" fill="#f5f3ee"/>
    <image href="data:image/jpeg;base64,${source}" x="1140" y="385" width="268" height="360" preserveAspectRatio="xMidYMid slice" opacity=".22" clip-path="url(#tabletScreen)"/>
    <rect x="1140" y="385" width="268" height="360" fill="#1564f5" opacity=".88"/>
    <text x="1162" y="425" fill="#f5c321" font-family="Arial,sans-serif" font-size="12" font-weight="700">ARENA OPEN</text>
    <text x="1162" y="478" fill="white" font-family="Arial,sans-serif" font-size="27" font-weight="900">PRÓXIMO</text>
    <text x="1162" y="507" fill="#f5c321" font-family="Arial,sans-serif" font-size="27" font-weight="900">PONTO.</text>
    <rect x="1162" y="552" width="215" height="1" fill="#ffffff" opacity=".4"/><text x="1162" y="590" fill="white" font-family="Arial,sans-serif" font-size="15" font-weight="700">AMARELO  15  —  13  AZUL</text><rect x="1162" y="625" width="120" height="32" fill="#f5c321"/><text x="1177" y="646" fill="#13263c" font-family="Arial,sans-serif" font-size="11" font-weight="700">ACOMPANHAR</text>
  </g>
  <g filter="url(#shadow)">
    <rect x="185" y="450" width="200" height="370" rx="26" fill="#152331"/><rect x="210" y="485" width="150" height="285" fill="#f5f3ee"/>
    <image href="data:image/jpeg;base64,${source}" x="210" y="485" width="150" height="285" preserveAspectRatio="xMidYMid slice" opacity=".18" clip-path="url(#phoneScreen)"/>
    <rect x="210" y="485" width="150" height="285" fill="#f5c321" opacity=".94"/>
    <text x="230" y="535" fill="#13263c" font-family="Arial,sans-serif" font-size="12" font-weight="900">10 OUT</text><text x="230" y="566" fill="#13263c" font-family="Arial,sans-serif" font-size="23" font-weight="900">ALDEIA</text><text x="230" y="591" fill="#1564f5" font-family="Arial,sans-serif" font-size="23" font-weight="900">OPEN</text><rect x="230" y="625" width="104" height="2" fill="#13263c"/><text x="230" y="662" fill="#13263c" font-family="Arial,sans-serif" font-size="12" font-weight="700">INSCREVA-SE</text><text x="230" y="684" fill="#13263c" font-family="Arial,sans-serif" font-size="10">LUZIÂNIA • GO</text>
  </g>
  <text x="1460" y="840" fill="#d9e8f4" font-family="Arial,sans-serif" font-size="14" text-anchor="end">COMPARTILHE NO WHATSAPP</text>
</svg>`

await sharp(Buffer.from(svg)).jpeg({ quality: 92, chromaSubsampling: '4:4:4' }).toFile('references/banner.jpg')
await sharp(Buffer.from(svg)).jpeg({ quality: 92, chromaSubsampling: '4:4:4' }).toFile('public/references/banner.jpg')
console.log('Banner criado em references/banner.jpg e public/references/banner.jpg')
