# Portal de Eventos Esportivos de Areia

## Especificação funcional, regras de negócio e arquitetura inicial

**Versão:** 2.0\
**Data:** 13/10/2026\
**Escopo inicial:** Beach Vôlei, Beach Tennis e Beach Soccer

------------------------------------------------------------------------

## 1. Objetivo do projeto

Este documento define os requisitos de um **Portal de Eventos
Esportivos** para divulgação, organização, inscrição, operação e
acompanhamento de competições. O portal atenderá inicialmente às
modalidades:

1.  **Beach Vôlei** (requisitos existentes a preservar e reorganizar);
2.  **Beach Tennis**;
3.  **Beach Soccer**.

O sistema deverá apoiar organizadores, atletas, equipes, árbitros,
mesários, operadores de placar, patrocinadores e público. A solução deve
permitir que cada evento tenha suas próprias categorias, regulamento,
formato de competição, agenda, quadras/campos, inscrições, resultados e
identidade visual.

O sistema é uma ferramenta de gestão e apoio operacional. **A decisão
oficial sobre lances, faltas, sanções e resultados permanece com a
arbitragem**, conforme o regulamento aplicável.

## 2. Princípio central da arquitetura

O portal deve separar funcionalidades compartilhadas das regras próprias
de cada esporte.

``` text
PORTAL DE EVENTOS ESPORTIVOS
│
├── Núcleo comum do portal
│   ├── Usuários e permissões
│   ├── Organizações e organizadores
│   ├── Eventos e inscrições
│   ├── Atletas e equipes
│   ├── Categorias e regulamentos
│   ├── Sorteios, grupos e chaveamentos
│   ├── Agenda e instalações esportivas
│   ├── Resultados, rankings e relatórios
│   ├── Patrocinadores e divulgação
│   └── Auditoria, notificações e integrações
│
└── Motor de regras por modalidade
    ├── Beach Vôlei
    ├── Beach Tennis
    └── Beach Soccer
```

### 2.1 Regra de projeto

Não codificar regras esportivas específicas diretamente nas telas
compartilhadas. A interface deve consultar o motor da modalidade
vinculada à partida. Isso evita, por exemplo, que um campo de placar em
sets seja usado indevidamente para um esporte controlado por gols e
períodos.

### 2.2 Terminologia

-   **Portal:** ambiente público e administrativo do sistema.
-   **Organização:** entidade responsável por promover eventos.
-   **Evento:** competição, festival, circuito ou torneio.
-   **Modalidade:** esporte praticado no evento.
-   **Categoria:** divisão por gênero, idade, nível técnico ou formato.
-   **Inscrição:** registro de atleta ou equipe em uma categoria.
-   **Equipe/dupla:** participantes que competem juntos, conforme a
    modalidade.
-   **Partida:** confronto esportivo agendado.
-   **Motor de regras:** componente que valida a pontuação e a
    progressão da partida.
-   **Súmula:** registro oficial ou operacional da partida.
-   **Placar público:** visualização de leitura para espectadores.

## 3. Perfis de usuário e permissões

### 3.1 Administrador da plataforma

-   Gerenciar configurações globais, modalidades disponíveis e
    permissões.
-   Administrar organizações, usuários, auditoria e parâmetros de
    segurança.
-   Consultar indicadores gerais da plataforma.

### 3.2 Organizador de evento

-   Criar e editar eventos sob sua responsabilidade.
-   Definir modalidades, categorias, regulamentos, inscrições, taxas e
    premiação.
-   Aprovar inscrições, cadastrar equipes e configurar sorteios.
-   Criar agenda, distribuir partidas entre quadras/campos e publicar
    resultados.
-   Gerenciar patrocinadores e materiais de divulgação.

### 3.3 Diretor técnico ou coordenador esportivo

-   Configurar formato de competição e critérios de classificação.
-   Validar regulamento e chaveamentos.
-   Acompanhar a execução do evento e aprovar alterações operacionais
    autorizadas.

### 3.4 Árbitro

-   Consultar partidas designadas.
-   Registrar ou confirmar decisões permitidas pelo regulamento.
-   Registrar faltas, sanções, interrupções e ocorrências.
-   Confirmar o encerramento da partida, conforme o fluxo definido pelo
    evento.

### 3.5 Mesário ou operador da partida

-   Operar o placar e a súmula da modalidade.
-   Registrar eventos de jogo, tempo, substituições e ocorrências quando
    aplicáveis.
-   Corrigir lançamentos mediante justificativa e permissão.

### 3.6 Operador de placar/transmissão

-   Selecionar partida, ativar o placar público e exibir resultados,
    próximos jogos, patrocinadores e estatísticas.
-   Não pode alterar resultado oficial sem permissão específica.

### 3.7 Atleta ou responsável pela equipe

-   Criar ou atualizar perfil.
-   Solicitar inscrição e acompanhar seu status.
-   Consultar agenda, chaveamento, resultados, classificação e
    regulamento.
-   Receber notificações sobre horários e alterações.

### 3.8 Público

-   Consultar eventos, inscrições abertas, agenda, chaveamentos,
    resultados, rankings e placares publicados.
-   Acesso somente de leitura, respeitando as regras de privacidade.

Toda permissão deverá ser validada no servidor, e não apenas ocultada na
interface.

## 4. Portal público

O portal deve oferecer:

-   Página inicial com eventos em destaque e inscrições abertas.
-   Pesquisa por modalidade, cidade, estado, data, categoria e
    organizador.
-   Página detalhada de cada evento.
-   Calendário de eventos.
-   Página de cada modalidade e categoria.
-   Inscrição ou encaminhamento para inscrição.
-   Agenda de partidas, quadras/campos e horários.
-   Chaveamento, grupos e classificação.
-   Resultados ao vivo e placares públicos quando habilitados.
-   Perfil público de atleta/equipe, conforme consentimento e política
    de privacidade.
-   Galeria de fotos, notícias, patrocinadores e regulamentos.
-   Histórico de eventos e resultados.
-   Layout responsivo para celular, tablet, notebook e telões.

O organizador deve poder definir quais informações são públicas e em que
momento serão publicadas.

## 5. Cadastro de organização e evento

### 5.1 Organização

Campos sugeridos: - ID; - nome e nome público; - CNPJ ou identificação
pertinente, quando necessário; - descrição; - logotipo e identidade
visual; - contatos institucionais; - cidade/UF/país; - responsáveis; -
status; - documentos e políticas aplicáveis.

### 5.2 Evento

Campos mínimos: - ID e nome; - edição; - descrição; - organização
responsável; - modalidades incluídas; - data/hora de início e término; -
local, endereço, cidade, estado e país; - fuso horário; - instalações e
número de quadras/campos; - categorias; - capacidade de participantes; -
período de inscrição; - taxa e forma de pagamento, se houver
integração; - regulamento geral e regulamentos por
modalidade/categoria; - premiação; - patrocinadores; - logo, imagens e
cores; - contatos; - política de cancelamento; - status.

### 5.3 Status do evento

-   Rascunho;
-   Planejado;
-   Inscrições abertas;
-   Inscrições encerradas;
-   Em preparação;
-   Em andamento;
-   Suspenso;
-   Finalizado;
-   Cancelado;
-   Arquivado.

Transições de status devem ser validadas. Por exemplo, um evento não
pode ser publicado sem modalidade, datas, local, responsável e
regulamento ou regras mínimas configuradas.

## 6. Modalidades e regras configuráveis

A modalidade deve ser uma entidade de primeiro nível, e não apenas um
texto livre. Cada modalidade terá: - identificador e nome; - versão do
conjunto de regras; - formatos de partida suportados; - composição de
equipes; - tipos de pontuação; - eventos estatísticos disponíveis; -
campos de súmula; - regras de tempo e interrupção; - requisitos de
arbitragem; - formatos de classificação; - parâmetros padrão; - origem e
data de revisão do regulamento.

As configurações padrão devem ser versionadas. Uma alteração futura no
regulamento não pode modificar retroativamente partidas já realizadas.

## 7. Categorias e formatos de competição

O sistema deve permitir categorias como: - Masculino, feminino e
misto; - Sub-14, Sub-16, Sub-18 e outras faixas etárias; - Amador,
intermediário, avançado e profissional; - Recreativo; - Duplas, equipes
ou outros formatos permitidos pela modalidade.

A disponibilidade de cada categoria deve ser configurada por evento e
modalidade.

### 7.1 Parâmetros de categoria

-   número mínimo e máximo de inscrições;
-   quantidade e composição de atletas por equipe;
-   formato da competição;
-   número de grupos;
-   quantidade de classificados por grupo;
-   critérios de classificação e desempate;
-   configuração das partidas;
-   quadras/campos disponíveis;
-   duração estimada;
-   intervalo mínimo entre partidas do mesmo participante;
-   limites de idade e documentos exigidos;
-   regulamento específico.

### 7.2 Formatos suportados pelo núcleo comum

-   Eliminatória simples;
-   Eliminatória dupla, se habilitada;
-   Grupos todos contra todos;
-   Grupos seguidos de eliminatória;
-   Liga/pontos corridos;
-   Fase classificatória e finais;
-   Festival ou formato personalizado configurado pelo organizador.

O gerador de tabela deve informar previamente o número estimado de
partidas, a duração prevista, a distribuição por instalação e possíveis
conflitos. A geração deve ser validada antes da publicação.

## 8. Atletas, duplas e equipes

### 8.1 Perfil de atleta

-   ID;
-   nome completo e nome esportivo;
-   data de nascimento, quando necessária;
-   foto opcional;
-   cidade/estado/país;
-   contatos;
-   documentos estritamente necessários ao evento;
-   perfil esportivo e histórico;
-   preferências de privacidade;
-   status do cadastro.

Dados pessoais devem ser coletados na medida necessária, com acesso
restrito e política de retenção compatível com a LGPD. CPF e dados
sensíveis não devem ser públicos.

### 8.2 Composição esportiva

A composição depende da modalidade e do formato: - Beach Vôlei:
normalmente dupla no formato padrão de areia; formatos recreativos ou
alternativos podem ser definidos pelo regulamento. - Beach Tennis:
normalmente dupla, com possibilidade de categorias de simples se
habilitadas pelo evento. - Beach Soccer: equipe com vários atletas,
escalação inicial, reservas e substituições conforme o regulamento
escolhido.

Não usar uma regra global fixa de "dois atletas por equipe". A validação
deve consultar a modalidade, categoria e regulamento da competição.

### 8.3 Cadastro de equipe

-   ID;
-   nome, nome curto e sigla;
-   modalidade e categoria;
-   cidade/clube;
-   logo;
-   cores principal, secundária e do texto;
-   atletas vinculados;
-   capitão ou responsável;
-   numeração de atletas quando aplicável;
-   escalação e reservas quando aplicável;
-   status da inscrição.

O sistema deve impedir a confirmação de uma inscrição com composição
inválida para a categoria. Deve também evitar que o mesmo atleta seja
inscrito em equipes incompatíveis dentro da mesma categoria, conforme a
regra do evento.

## 9. Inscrições e credenciamento

Fluxo recomendado: 1. Organizador publica o evento e abre inscrições. 2.
Atleta/responsável seleciona modalidade e categoria. 3. Informa ou
seleciona a dupla/equipe. 4. Aceita o regulamento e os termos
aplicáveis. 5. Envia os dados/documentos exigidos. 6. Realiza pagamento,
se houver. 7. Sistema registra a solicitação. 8. Organizador aprova,
rejeita ou solicita correção. 9. Sistema confirma a inscrição e
disponibiliza comprovante. 10. Lista de participantes é congelada
conforme o prazo e as regras do evento.

Estados da inscrição: - Iniciada; - Aguardando dados; - Aguardando
pagamento; - Em análise; - Confirmada; - Pendente de correção; - Lista
de espera; - Cancelada; - Reembolsada, quando aplicável.

Alterações após o sorteio devem ser auditadas e podem exigir autorização
do organizador.

## 10. Sorteios, grupos e chaveamentos

O sistema deve permitir: - sorteio manual e automático; - distribuição
por ranking/cabeças de chave; - separação de atletas do mesmo clube ou
cidade, quando definida; - restrições específicas do regulamento; -
geração de grupos equilibrados; - geração de chaveamento; - edição
manual com registro de justificativa; - simulação antes da publicação; -
exportação e publicação da tabela.

Cada sorteio deve registrar data/hora, responsável, participantes
considerados, parâmetros, algoritmo/versão, resultado e alterações
posteriores. Quando houver aleatoriedade, guardar uma semente (seed) ou
mecanismo equivalente que permita auditoria/reprodução.

O sistema deve validar: - ausência de equipes duplicadas; - número
correto de participantes; - compatibilidade entre categoria e
inscrição; - consistência de classificados; - ausência de confrontos
impossíveis; - regras de avanço e bye; - integridade do chaveamento após
desistências ou W.O.

## 11. Agenda e gestão de instalações

Cada partida deve conter: - ID; - evento, modalidade e categoria; - fase
e rodada; - grupo ou posição no chaveamento; - quadra/campo; - data e
horário previstos; - horário real de início e término; -
participantes; - árbitros e oficiais; - mesário/operador; - status; -
resultado; - observações.

### 11.1 Recursos da agenda

-   visualização diária, semanal e por instalação;
-   arrastar e reorganizar partidas com validação;
-   alteração de horário e instalação;
-   detecção de sobreposição;
-   intervalo mínimo entre partidas do mesmo atleta/equipe;
-   alerta de atraso;
-   recálculo dos horários seguintes;
-   bloqueio de quadras/campos por manutenção;
-   notificações de alteração;
-   exportação e impressão.

O algoritmo deve considerar duração média configurada por modalidade,
intervalo entre jogos, aquecimento, troca de equipes, pausas e margens
de segurança. A duração é uma estimativa operacional, não uma regra para
encerrar partidas.

## 12. Partida, eventos e auditoria

### 12.1 Estados gerais da partida

-   Agendada;
-   Chamada;
-   Em preparação;
-   Aquecimento;
-   Em andamento;
-   Interrompida;
-   Suspensa;
-   Aguardando confirmação;
-   Finalizada;
-   Cancelada;
-   W.O.

Cada modalidade pode acrescentar estados próprios, sem quebrar o ciclo
geral.

### 12.2 Registro por eventos

A partida deve ser reconstruível a partir de eventos registrados, e não
apenas do placar final. Exemplos: - partida
criada/iniciada/finalizada; - período, set, game ou tie-break
iniciado/encerrado; - ponto, gol ou game registrado; - evento corrigido
ou desfeito; - falta, cartão, sanção ou penalidade; - substituição; -
timeout ou interrupção; - alteração de escalação; -
suspensão/retomada; - confirmação do resultado.

Cada evento deve conter ID, partida, sequência, data/hora, usuário,
tipo, dados relevantes, estado anterior/posterior quando aplicável e
justificativa para correções.

### 12.3 Correção e integridade

-   Corrigir ou desfazer evento exige permissão.
-   A interface deve solicitar confirmação em operações críticas.
-   O histórico não deve ser apagado silenciosamente.
-   Uma correção deve recalcular placar, estatísticas e classificação
    dependentes.
-   O resultado só é oficializado após o fluxo de confirmação definido
    para o evento.
-   Em caso de divergência, deve ser possível consultar a trilha de
    auditoria.

## 13. Motor de regras por modalidade

O motor recebe ações da interface, valida a ação com base no regulamento
e produz eventos e estado atualizado. A interface não deve decidir
sozinha se um set, game, período ou partida terminou.

``` text
Ação do operador/árbitro
        ↓
Validação de permissão
        ↓
Motor da modalidade + versão do regulamento
        ↓
Evento validado
        ↓
Estado da partida atualizado
        ├── Placar
        ├── Súmula
        ├── Estatísticas
        ├── Classificação
        └── Placar público/transmissão
```

Cada motor deve implementar, conforme aplicável: - validação de
pontuação; - condição de encerramento de unidade de jogo; - condição de
vitória; - tempo e interrupções; - eventos estatísticos; - sanções e
ocorrências; - correções e reprocessamento; - validação de encerramento.

O regulamento de cada evento poderá configurar parâmetros autorizados,
sem permitir combinações contraditórias ou inválidas. Regras oficiais e
adaptações locais devem ser identificadas separadamente.

## 14. Módulo de Beach Vôlei

O documento anterior contém requisitos detalhados de vôlei de areia que
devem ser preservados como base: saque e ordem de saque, ralis, pontos,
sets, troca de lado, time-outs, bloqueios, ataques, erros, sanções,
lesões, súmula, estatísticas, placar e auditoria.

### 14.1 Dados e eventos específicos

-   equipe sacadora e atleta sacador;
-   número do rali;
-   placar antes/depois do rali;
-   equipe vencedora do rali;
-   motivo do ponto;
-   ace, erro de saque, ataque vencedor, bloqueio vencedor e outros
    eventos;
-   duração do rali;
-   troca de lado;
-   time-out, interrupção médica e sanção;
-   estatísticas individuais e da dupla.

### 14.2 Configuração de partida

Os parâmetros --- pontos dos sets, vantagem mínima, quantidade de sets,
time-outs, troca de lado e demais condições --- devem estar no
regulamento versionado da partida. Para competições que adotem regras
FIVB, usar a versão oficial selecionada no evento.

**Correção necessária em relação ao documento anterior:** há trechos
contraditórios que dizem tanto que existe vantagem mínima de dois pontos
quanto que o set termina sem essa vantagem. O sistema não deve manter as
duas regras simultaneamente. A configuração escolhida precisa ser
validada, exibida no regulamento e congelada para a partida.

A implementação também deve revisar a ordem de saque, as trocas de lado,
os time-outs e os critérios de encerramento contra o regulamento oficial
adotado. Exemplos de placar no documento não substituem a fonte
normativa.

### 14.3 Tela operacional

A tela deve mostrar equipes, atletas, placar atual, sets, sacador,
eventos recentes e botões grandes para registrar ponto,
corrigir/desfazer, timeout, sanção e encerramento. Os controles devem
ser adaptados para tablet e notebook.

## 15. Módulo de Beach Tennis

Beach Tennis terá um motor independente, pois sua pontuação e progressão
de jogo não são as mesmas do Beach Vôlei.

### 15.1 Cadastro e composição

-   modalidade e categoria;
-   simples ou duplas, quando habilitado;
-   atletas da dupla;
-   lado/posição inicial quando aplicável;
-   responsável/capitão, se usado pelo evento;
-   ranking ou cabeça de chave;
-   restrições de inscrição.

### 15.2 Dados operacionais

Conforme o regulamento adotado, a partida poderá registrar: - sets; -
games; - pontos dentro do game; - tie-break ou formato decisivo
equivalente; - equipe/jogador sacador; - sequência de saque; - lado de
quadra; - troca de lado; - ponto vencedor e tipo de erro; -
interrupções, atendimento médico e sanções; - início, término e duração.

### 15.3 Regras configuráveis

O motor deve suportar os formatos habilitados pelo evento, incluindo
variações de quantidade de sets, games por set, tie-break e método de
pontuação. Não assumir que todos os torneios usam o mesmo formato.

### 15.4 Estatísticas possíveis

-   partidas, sets e games ganhos/perdidos;
-   pontos vencidos;
-   aces, quando o regulamento e a metodologia estatística os definirem;
-   erros de saque;
-   erros não forçados, se houver registro padronizado;
-   desempenho no tie-break;
-   duração da partida.

Estatísticas opcionais devem ser identificadas como tal e não podem
alterar o resultado oficial.

### 15.5 Placar

A tela deve exibir participantes, sets, games e pontos do game atual,
sacador quando controlado, status da partida e eventos recentes. O
placar público não deve exibir campos próprios do vôlei ou do futebol de
areia.

## 16. Módulo de Beach Soccer

Beach Soccer precisa tratar partidas por gols e períodos, com gestão de
escalação, substituições e disciplina.

### 16.1 Cadastro de equipe e escalação

-   elenco de atletas;
-   número de camisa;
-   goleiro e funções;
-   escalação inicial;
-   reservas;
-   capitão;
-   substituições e histórico;
-   jogadores indisponíveis, quando necessário;
-   comissão técnica, se incluída no escopo.

A quantidade de atletas, substituições e demais parâmetros deve seguir o
regulamento da competição selecionada.

### 16.2 Eventos de partida

-   início e fim de período;
-   gol;
-   autoria do gol e assistência, se coletada;
-   gol contra;
-   cobrança de pênalti e resultado;
-   faltas;
-   cartões e sanções;
-   substituição;
-   timeout, quando permitido;
-   lesão e interrupção;
-   acréscimos;
-   suspensão e retomada;
-   encerramento e eventual procedimento de desempate.

### 16.3 Relógio e placar

O motor deve controlar relógio de jogo e períodos segundo o regulamento
escolhido. Deve distinguir tempo corrido, tempo parado e acréscimos
quando aplicáveis. O operador deve poder pausar/retomar o relógio
conforme as permissões e registrar o motivo.

O placar público deve apresentar: - nomes, siglas, escudos e cores das
equipes; - gols; - período atual; - relógio; - faltas/cartões e demais
indicadores habilitados; - status da partida; - resultado final e
desempate, se houver.

### 16.4 Estatísticas possíveis

-   gols e gols contra;
-   finalizações, quando registradas;
-   faltas;
-   cartões;
-   defesas do goleiro, se houver metodologia;
-   substituições;
-   tempo em campo, se tecnicamente disponível;
-   desempenho por período.

## 17. Súmula eletrônica

A súmula deve variar conforme a modalidade e conter os campos comuns: -
evento, categoria, fase, partida, instalação, data e horários; -
participantes e identificação da equipe; - árbitros e oficiais; -
escalação/duplas; - placar e resultado; - ocorrências, sanções e
interrupções; - confirmação e assinaturas eletrônicas ou registro de
aceite; - versão do regulamento; - usuário responsável e histórico de
alterações.

Campos específicos de cada modalidade serão fornecidos por seu motor.
Deve ser possível exportar a súmula para PDF e consultar seu histórico.

## 18. Placar eletrônico, tempo real e modo público

O placar deve ser uma interface de leitura alimentada por eventos
validados. A atualização deve ocorrer em tempo real quando houver
conexão.

### 18.1 Recursos

-   seleção da partida;
-   ativação e ocultação do placar;
-   modo intervalo;
-   próximo jogo;
-   resultado final;
-   classificação e ranking;
-   estatísticas;
-   patrocinadores e publicidade;
-   mensagens do organizador;
-   indicação de conexão ou atraso de atualização.

### 18.2 Confiabilidade

-   A interface pública não altera a partida.
-   Eventos devem ter identificadores únicos e sequência para evitar
    duplicação.
-   Reconexão deve recuperar o estado mais recente.
-   Se houver atraso ou desconexão, a tela deve indicar que os dados
    podem estar desatualizados.
-   A transmissão de placar deve respeitar permissões e publicação
    autorizada.

## 19. Funcionamento offline e sincronização

A operação de uma partida deve continuar quando a instalação perder
temporariamente a conexão, se o dispositivo e a modalidade estiverem
preparados para isso.

Requisitos: - armazenamento local dos eventos; - identificação única de
cada evento; - fila de sincronização; - indicação visível do estado
offline; - sincronização idempotente; - detecção de conflito; -
preservação da sequência dos eventos; - confirmação de sincronização; -
recuperação após reinicialização; - procedimento de reconciliação para
alterações concorrentes.

Não permitir que dois dispositivos controlem simultaneamente a mesma
partida como autoridade primária sem protocolo explícito de bloqueio ou
resolução de conflito.

## 20. Relatórios e indicadores

### 20.1 Evento

-   inscrições confirmadas e pendentes;
-   número de participantes por modalidade/categoria;
-   partidas previstas, em andamento e concluídas;
-   atrasos e utilização das instalações;
-   classificação final;
-   premiações;
-   dados de público, apenas se houver fonte/integracão apropriada.

### 20.2 Organizador

-   quantidade de eventos;
-   inscrições por período;
-   taxa de comparecimento;
-   partidas e ocorrências;
-   custos e receitas apenas se houver módulo financeiro;
-   engajamento das páginas, quando houver medição.

### 20.3 Modalidade e atleta

As métricas devem ser específicas ao esporte. Não criar uma estatística
universal que compare diretamente gols, pontos de vôlei e games de Beach
Tennis.

## 21. Banco de dados conceitual

Entidades sugeridas para o núcleo: - `User` - `Role` - `Permission` -
`Organization` - `Event` - `EventSport` - `Venue` - `Court` -
`Category` - `RuleSet` - `RuleSetVersion` - `Athlete` - `Team` -
`TeamMember` - `Registration` - `CompetitionStage` - `Group` - `Draw` -
`Match` - `MatchParticipant` - `MatchPeriod` - `MatchEvent` -
`MatchOfficial` - `MatchReport` - `Standing` - `Ranking` - `Sponsor` -
`Notification` - `AuditLog` - `MediaAsset`

### 21.1 Extensões por modalidade

Não criar colunas universais para todo campo esportivo. Usar estruturas
especializadas, relacionadas à partida, por exemplo: -
`VolleyballMatchState`, `VolleyballRallyEvent`; -
`BeachTennisMatchState`, `BeachTennisPointEvent`; -
`BeachSoccerMatchState`, `BeachSoccerGoalEvent`,
`BeachSoccerDisciplinaryEvent`.

Uma alternativa é armazenar eventos tipados com esquema validado por
modalidade, mantendo consultas e integridade referencial. A escolha
final depende do banco e do padrão de implementação.

### 21.2 Integridade

-   chaves primárias e estrangeiras;
-   restrições de unicidade;
-   validação de composição de equipes;
-   vínculo de partida a uma única modalidade/categoria;
-   versionamento de regulamentos;
-   transações para eventos críticos;
-   proteção contra pontos/gols duplicados;
-   trilha de auditoria;
-   índices para agenda, resultados e consultas públicas.

## 22. Requisitos não funcionais

### Segurança e privacidade

-   autenticação segura;
-   autorização por função e organização;
-   proteção de dados pessoais;
-   coleta mínima necessária;
-   consentimento e transparência quando aplicáveis;
-   registros de acesso e alterações críticas;
-   backups e política de retenção;
-   proteção contra abuso, automação indevida e acesso não autorizado.

### Desempenho

-   telas operacionais com resposta rápida;
-   atualização de placar com baixa latência;
-   paginação em listas extensas;
-   cache de conteúdo público;
-   consultas indexadas;
-   monitoramento de falhas e tempo de resposta.

### Usabilidade e acessibilidade

-   responsividade;
-   contraste adequado;
-   operação por teclado quando viável;
-   botões grandes na mesa;
-   feedback imediato;
-   prevenção de erros;
-   linguagem clara;
-   compatibilidade com leitores de tela nas áreas públicas e
    administrativas.

### Disponibilidade e recuperação

-   backup automatizado;
-   testes de restauração;
-   monitoramento;
-   registro de erros;
-   plano de recuperação;
-   operação offline planejada para a mesa;
-   tratamento explícito de falhas de sincronização.

## 23. Regras de negócio transversais

1.  Um evento pode conter uma ou mais modalidades.
2.  Cada inscrição pertence a um evento, modalidade e categoria válidos.
3.  A composição de atletas é validada conforme modalidade, categoria e
    regulamento.
4.  Toda partida pertence a uma categoria e utiliza uma versão definida
    do regulamento.
5.  Não publicar tabela com participantes inválidos ou confrontos
    inconsistentes.
6.  Uma partida não pode ser encerrada automaticamente apenas porque
    atingiu uma duração estimada.
7.  Resultado final deve ter estado e responsável pela confirmação.
8.  Correções críticas precisam de justificativa e auditoria.
9.  A classificação deve ser recalculada a partir de resultados
    confirmados.
10. Estatísticas não oficiais não podem modificar placar ou resultado.
11. Regras oficiais e adaptações locais devem ser identificadas
    claramente.
12. Alterar o regulamento de um evento não modifica partidas já
    iniciadas ou finalizadas.
13. Horários devem ser armazenados com fuso horário definido e exibidos
    no fuso do evento.
14. Informações pessoais não necessárias não devem ser exibidas no
    portal público.
15. O sistema deve distinguir cancelamento, suspensão, W.O. e partida
    finalizada.

## 24. Critérios de aceitação principais

### Núcleo do portal

-   É possível criar uma organização e publicar um evento com uma ou
    mais modalidades.
-   É possível abrir inscrições por categoria e controlar seus estados.
-   É possível gerar, revisar e publicar sorteios, grupos e tabelas.
-   A agenda identifica conflitos de horário e de instalação.
-   O público consulta evento, agenda, classificação e resultados
    autorizados.

### Beach Vôlei

-   O motor valida a pontuação conforme a versão do regulamento
    selecionada.
-   É possível registrar ralis, saque, pontos, sets, interrupções e
    estatísticas.
-   Correções geram auditoria e recalculam o estado da partida.

### Beach Tennis

-   O motor representa pontos, games, sets e formato decisivo conforme a
    configuração.
-   O placar exibe a estrutura de pontuação própria da modalidade.
-   O sistema não usa regras de sets e saque do vôlei por engano.

### Beach Soccer

-   O motor registra gols, períodos, relógio, escalações, substituições
    e disciplina.
-   O placar exibe gols e período/tempo, e não sets ou games.
-   O resultado e os procedimentos de desempate seguem o regulamento
    selecionado.

### Segurança e recuperação

-   Um usuário sem permissão não consegue alterar uma partida.
-   Eventos duplicados não duplicam pontos ou gols.
-   O sistema consegue reconstruir o estado da partida a partir do
    histórico de eventos.
-   A operação offline sinaliza pendências e sincroniza sem duplicar
    eventos.

## 25. Estratégia de implementação

### Fase 1 --- Fundação do portal

-   autenticação e permissões;
-   organizações;
-   eventos e modalidades;
-   categorias e regulamentos;
-   atletas, equipes e inscrições;
-   portal público básico.

### Fase 2 --- Competição e agenda

-   sorteios e chaveamentos;
-   grupos e classificação;
-   instalações;
-   agenda automática;
-   notificações e publicação.

### Fase 3 --- Motor Beach Vôlei

-   migrar e revisar os requisitos existentes;
-   resolver inconsistências de regra;
-   partida, ralis, sets, súmula e placar;
-   auditoria e estatísticas.

### Fase 4 --- Motor Beach Tennis

-   estados de partida;
-   pontos, games, sets e tie-break;
-   súmula, placar e estatísticas;
-   validação dos formatos de competição.

### Fase 5 --- Motor Beach Soccer

-   períodos, relógio e gols;
-   escalações e substituições;
-   faltas, cartões e ocorrências;
-   súmula, placar e estatísticas.

### Fase 6 --- Operação avançada

-   offline e sincronização;
-   transmissão em tempo real;
-   relatórios;
-   rankings históricos;
-   patrocinadores e mídia;
-   testes de carga, segurança e recuperação.

## 26. Documentos técnicos derivados

Recomenda-se manter documentos separados para facilitar o trabalho de
desenvolvimento: - `README.md` --- visão geral, instalação e execução; -
`PRODUCT_SCOPE.md` --- escopo do portal e público-alvo; -
`FUNCTIONAL_REQUIREMENTS.md` --- requisitos funcionais; -
`NON_FUNCTIONAL_REQUIREMENTS.md` --- segurança, desempenho,
acessibilidade e disponibilidade; - `BUSINESS_RULES.md` --- regras
gerais de negócio; - `SPORTS_RULES_BEACH_VOLLEY.md` --- regras e estados
do Beach Vôlei; - `SPORTS_RULES_BEACH_TENNIS.md` --- regras e estados do
Beach Tennis; - `SPORTS_RULES_BEACH_SOCCER.md` --- regras e estados do
Beach Soccer; - `DATABASE.md` --- entidades, relacionamentos, chaves e
restrições; - `MATCH_ENGINE.md` --- arquitetura do motor de partidas e
eventos; - `API_SPEC.md` --- contratos de API; - `SECURITY_PRIVACY.md`
--- permissões, dados pessoais, auditoria e retenção; - `TEST_PLAN.md`
--- cenários e critérios de aceitação; - `DEPLOYMENT.md` --- ambientes,
publicação, monitoramento e recuperação.

## 27. Referências normativas e validação

As regras detalhadas devem ser validadas com as entidades oficiais e o
regulamento efetivamente adotado por cada competição. O sistema deve
guardar a fonte, a versão, a data de revisão e as adaptações locais.

Para Beach Vôlei, o documento anterior indica como referência as regras
oficiais FIVB 2025--2028. Antes de colocar o motor em produção, revisar
cada parâmetro com o documento oficial e corrigir as contradições
identificadas na especificação antiga.

Para Beach Tennis e Beach Soccer, selecionar as entidades e versões
normativas correspondentes ao evento. Não presumir que uma regra única
vale para todos os circuitos, categorias ou formatos.

------------------------------------------------------------------------

## Decisão arquitetural final

O projeto deixa de ser apenas um sistema de operação de torneios de
vôlei e passa a ser um **portal multiesportivo de eventos**, com um
núcleo compartilhado e motores independentes por modalidade.

A regra mais importante para a manutenção do projeto é:

> **O portal administra eventos; cada motor administra a lógica
> esportiva da sua modalidade; o histórico de eventos é a fonte
> auditável para placares, estatísticas e resultados.**
