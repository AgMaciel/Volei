# Sistema de Gestão de Torneios de Vôlei de Areia

## 1. Objetivo {#1-objetivo}

Este documento define a especificação funcional de um sistema para
**cadastro, organização, sorteio, operação, arbitragem, mesa e placar
eletrônico de torneios de vôlei de areia**.

O sistema deve permitir que a organização registre atletas e equipes,
defina cores e identidade visual, monte a tabela de jogos, realize
sorteios, acompanhe cada partida em tempo real e disponibilize o placar
eletrônico para exibição ao público.

> **Referência normativa:** as regras esportivas deste documento devem
> ser parametrizadas com base nas **Official Beach Volleyball Rules
> 2025--2028 da FIVB**, vigentes para competições a partir de 1º de
> janeiro de 2025. Regulamentos específicos da competição podem alterar
> formatos administrativos ou de competição.

------------------------------------------------------------------------

# 2. Conceito geral do sistema {#2-conceito-geral-do-sistema}

O sistema será dividido em cinco grandes áreas:

1.  **Cadastro e configuração do torneio**
2.  **Cadastro de atletas e equipes**
3.  **Tabela, sorteio e programação dos jogos**
4.  **Mesa/mesário e súmula eletrônica**
5.  **Placar eletrônico e acompanhamento público**

### Fluxo principal

``` text
TORNEIO
   │
   ├── Categorias
   │      ├── Masculino
   │      ├── Feminino
   │      ├── Misto
   │      └── Outras categorias
   │
   ├── Equipes
   │      └── 2 atletas por equipe
   │
   ├── Sorteio
   │      └── Chaveamento / grupos / partidas
   │
   ├── Partida
   │      ├── Sorteio inicial
   │      ├── Set 1
   │      ├── Set 2
   │      └── Set 3, se necessário
   │
   ├── Mesário
   │      ├── Pontos
   │      ├── Saque
   │      ├── Rali
   │      ├── Aces
   │      ├── Ataques
   │      ├── Bloqueios
   │      ├── Erros
   │      ├── Time-outs
   │      ├── Sanções
   │      └── Tempo
   │
   └── Placar eletrônico
          ├── Equipes
          ├── Pontuação
          ├── Sets
          ├── Sacador
          ├── Tempo
          └── Resultado
```

------------------------------------------------------------------------

# 3. Cadastro do torneio {#3-cadastro-do-torneio}

## 3.1 Dados gerais {#31-dados-gerais}

-   Nome do torneio
-   Edição
-   Data de início
-   Data de término
-   Local
-   Cidade
-   Estado
-   Organizador
-   Responsável técnico
-   Responsável pela arbitragem
-   Número de quadras
-   Número de equipes
-   Categoria
-   Regulamento específico
-   Premiação
-   Patrocinadores
-   Logo do evento
-   Status do torneio

### Status

-   Planejado
-   Inscrições abertas
-   Inscrições encerradas
-   Sorteio realizado
-   Em andamento
-   Finalizado
-   Cancelado

------------------------------------------------------------------------

# 4. Categorias {#4-categorias}

O sistema deve permitir múltiplas categorias.

Exemplos:

-   Masculino
-   Feminino
-   Misto
-   Sub-18
-   Sub-16
-   Sub-14
-   Recreativo
-   Profissional
-   Amador

Cada categoria deve possuir configuração própria.

### Parâmetros por categoria

-   Quantidade de equipes
-   Quantidade de atletas por equipe
-   Formato da competição
-   Quantidade de grupos
-   Sistema de classificação
-   Número de sets
-   Pontuação dos sets
-   Critérios de desempate
-   Horários
-   Quadras disponíveis

------------------------------------------------------------------------

# 5. Cadastro de atletas {#5-cadastro-de-atletas}

## 5.1 Dados pessoais {#51-dados-pessoais}

-   ID do atleta
-   Nome completo
-   Nome esportivo
-   Data de nascimento
-   Sexo
-   CPF ou documento, se necessário pelo regulamento
-   Cidade
-   Estado
-   País
-   Foto
-   Telefone
-   E-mail
-   Status da inscrição

## 5.2 Dados esportivos {#52-dados-esportivos}

-   Número do atleta
-   Categoria
-   Equipe
-   Capitão
-   Ranking
-   Posição/função preferencial
-   Mão dominante
-   Altura
-   Observações técnicas

> No vôlei de areia padrão, a equipe é formada por **dois atletas**, e
> ambos permanecem em quadra durante a partida. Não há substituições no
> formato oficial FIVB.

## 5.3 Histórico {#53-histórico}

-   Jogos disputados
-   Vitórias
-   Derrotas
-   Sets ganhos
-   Sets perdidos
-   Pontos marcados
-   Pontos sofridos
-   Aces
-   Bloqueios
-   Ataques vencedores
-   Erros de saque
-   Erros de ataque
-   Cartões
-   Time-outs
-   Ranking no torneio

------------------------------------------------------------------------

# 6. Cadastro das equipes {#6-cadastro-das-equipes}

## 6.1 Identificação {#61-identificação}

-   ID da equipe
-   Nome da equipe
-   Nome curto
-   Sigla
-   Categoria
-   Cidade
-   Estado
-   País
-   Logo
-   Cor principal
-   Cor secundária
-   Cor do texto
-   Número da camisa
-   Status

## 6.2 Atletas {#62-atletas}

Cada equipe deverá possuir:

-   Atleta 1
-   Atleta 2
-   Capitão

### Regra

``` text
Equipe
 ├── Atleta 1
 └── Atleta 2
```

O sistema deve impedir a publicação de uma equipe oficial sem os dois
atletas obrigatórios, salvo regras específicas da competição.

------------------------------------------------------------------------

# 7. Identidade visual das equipes {#7-identidade-visual-das-equipes}

O sistema deve permitir configurar:

``` text
Nome: Praia Azul
Sigla: PAZ
Cor principal: Azul
Cor secundária: Branco
Cor do texto: Branco
Logo: arquivo de imagem
```

### Aplicação das cores

As cores deverão aparecer em:

-   Placar eletrônico
-   Tabela de jogos
-   Chaveamento
-   Ranking
-   Tela da partida
-   Relatórios
-   Súmula
-   Painel público
-   Estatísticas

### Contraste

O sistema deve verificar automaticamente se a cor do texto apresenta
contraste suficiente sobre a cor de fundo.

------------------------------------------------------------------------

# 8. Quantidade de equipes {#8-quantidade-de-equipes}

O administrador deve informar:

``` text
Número de equipes: 16
```

O sistema deverá gerar automaticamente:

-   Lista de equipes
-   Número de confrontos
-   Fases
-   Rodadas
-   Quadras
-   Horários
-   Chaveamento
-   Jogos previstos

### Exemplos

#### 4 equipes {#4-equipes}

``` text
Semifinal 1
Semifinal 2
      ↓
Final
```

#### 8 equipes {#8-equipes}

``` text
Quartas
  ↓
Semifinais
  ↓
Final
```

#### 16 equipes {#16-equipes}

``` text
Oitavas
   ↓
Quartas
   ↓
Semifinais
   ↓
Final
```

Para formato de grupos/pool play, o sistema deve permitir configurar
grupos e critérios de classificação.

------------------------------------------------------------------------

# 9. Sorteio das equipes {#9-sorteio-das-equipes}

## 9.1 Sorteio manual {#91-sorteio-manual}

O administrador seleciona:

-   Equipe
-   Grupo
-   Posição

## 9.2 Sorteio automático {#92-sorteio-automático}

O sistema gera aleatoriamente:

``` text
Equipe 01 → Grupo A
Equipe 02 → Grupo C
Equipe 03 → Grupo B
Equipe 04 → Grupo A
...
```

## 9.3 Regras de sorteio {#93-regras-de-sorteio}

O algoritmo poderá considerar:

-   Cabeças de chave
-   Ranking
-   Cidade
-   Clube
-   Equipes previamente classificadas
-   Restrições definidas pelo regulamento
-   Separação de equipes
-   Distribuição equilibrada

### Registro do sorteio

O sistema deve guardar:

-   Data
-   Hora
-   Usuário responsável
-   Algoritmo utilizado
-   Resultado
-   Seed aleatória, quando aplicável
-   Alterações posteriores

------------------------------------------------------------------------

# 10. Tabela de jogos {#10-tabela-de-jogos}

Cada jogo deve possuir:

-   ID
-   Fase
-   Rodada
-   Grupo
-   Quadra
-   Data
-   Hora prevista
-   Hora real de início
-   Hora real de término
-   Equipe A
-   Equipe B
-   Árbitro
-   Segundo árbitro
-   Mesário
-   Juízes de linha
-   Status
-   Resultado

### Status da partida

-   Agendada
-   Em preparação
-   Aquecimento
-   Em andamento
-   Intervalo
-   Time-out
-   Suspensa
-   Finalizada
-   Cancelada
-   W.O.

------------------------------------------------------------------------

# 11. Tela da partida para o mesário {#11-tela-da-partida-para-o-mesário}

A tela do mesário é o núcleo operacional do sistema.

Deve apresentar:

``` text
┌─────────────────────────────────────────────┐
│ TORNEIO                     PARTIDA 12      │
├─────────────────────────────────────────────┤
│ EQUIPE A                 EQUIPE B           │
│ 🔵 PRAIA AZUL            🟠 AREIA LARANJA   │
│                                             │
│ ATLETA 1                  ATLETA 1          │
│ ATLETA 2                  ATLETA 2          │
├─────────────────────────────────────────────┤
│ SET 1                                      │
│        12                 10                │
├─────────────────────────────────────────────┤
│ SETS     1                  0                │
├─────────────────────────────────────────────┤
│ SACADOR: A1                                │
├─────────────────────────────────────────────┤
│ [ A PONTO ]             [ B PONTO ]         │
├─────────────────────────────────────────────┤
│ ACE A: 2                 ACE B: 1           │
│ BLOQUEIO A: 1            BLOQUEIO B: 2      │
│ ATAQUE A: 7              ATAQUE B: 5        │
└─────────────────────────────────────────────┘
```

------------------------------------------------------------------------

# 12. Registro de cada rali {#12-registro-de-cada-rali}

Cada rali deve possuir um registro individual.

## 12.1 Dados do rali {#121-dados-do-rali}

-   Número do rali
-   Set
-   Pontuação antes do rali
-   Equipe sacadora
-   Atleta sacador
-   Hora de início
-   Hora de término
-   Duração do rali
-   Equipe vencedora do rali
-   Motivo do ponto
-   Tipo de finalização
-   Observação

### Motivos possíveis

-   Ace
-   Ataque vencedor
-   Bloqueio vencedor
-   Erro de saque
-   Erro de recepção
-   Erro de levantamento
-   Erro de ataque
-   Bola fora
-   Bola na rede
-   Falta de toque
-   Quatro toques
-   Dois toques
-   Falta no bloqueio
-   Falta de rede
-   Falta de invasão
-   Falta de ordem de saque
-   Penalidade
-   W.O.
-   Outro

------------------------------------------------------------------------

# 13. Registro do saque {#13-registro-do-saque}

Para cada saque:

-   Sacador
-   Equipe
-   Número do saque
-   Ace
-   Saque válido
-   Erro de saque
-   Saque recebido
-   Saque direcionado
-   Resultado do saque
-   Velocidade, se houver sensor
-   Observação

## Indicadores

``` text
Total de saques
Aces
Erros
Saques válidos
Aces %
Erros %
```

### Fórmulas

``` text
Ace % = Aces / Total de saques × 100

Erro de saque % = Erros de saque / Total de saques × 100
```

------------------------------------------------------------------------

# 14. Registro de ataque {#14-registro-de-ataque}

Para cada ataque:

-   Atleta
-   Equipe
-   Ataque vencedor
-   Ataque defendido
-   Ataque bloqueado
-   Ataque fora
-   Ataque na rede
-   Tipo de ataque
-   Observação

### Estatísticas

``` text
Ataques totais
Ataques vencedores
Erros
Bloqueados
Eficiência de ataque
```

------------------------------------------------------------------------

# 15. Registro de bloqueio {#15-registro-de-bloqueio}

Para cada bloqueio:

-   Atleta
-   Equipe
-   Bloqueio vencedor
-   Bloqueio com toque
-   Tentativa de bloqueio
-   Falta de bloqueio
-   Observação

### Estatísticas

``` text
Bloqueios vencedores
Toques de bloqueio
Tentativas
Erros
```

------------------------------------------------------------------------

# 16. Registro de defesa {#16-registro-de-defesa}

O sistema pode registrar:

-   Defesa positiva
-   Defesa que mantém o rali
-   Defesa excepcional
-   Defesa que gera contra-ataque
-   Erro de defesa
-   Atleta responsável

------------------------------------------------------------------------

# 17. Registro de pontos {#17-registro-de-pontos}

Todo ponto deve possuir uma classificação.

### Estrutura

``` text
PONTO
 ├── Equipe beneficiada
 ├── Set
 ├── Placar anterior
 ├── Novo placar
 ├── Rali
 ├── Sacador
 ├── Atleta responsável
 ├── Tipo de ponto
 ├── Horário
 └── Observação
```

------------------------------------------------------------------------

# 18. Placar eletrônico {#18-placar-eletrônico}

O placar deve ser atualizado imediatamente após a confirmação do ponto
pelo mesário.

## Informações principais

``` text
┌─────────────────────────────────────────────┐
│             FINAL DO TORNEIO                │
│                                             │
│ 🔵 PRAIA AZUL         🟠 AREIA LARANJA      │
│                                             │
│       18                    17               │
│                                             │
│ SETS   1                    1                │
│                                             │
│ SACANDO: PRAIA AZUL - ATLETA 2             │
│                                             │
│ RALI: 27                                    │
└─────────────────────────────────────────────┘
```

### Atualização

O ponto só deve ser enviado ao placar após:

``` text
Árbitro confirma
      ↓
Mesário registra
      ↓
Sistema valida
      ↓
Pontuação atualizada
      ↓
Placar eletrônico atualizado
```

------------------------------------------------------------------------

# 19. Controle do placar {#19-controle-do-placar}

O mesário deverá possuir:

-   Ponto equipe A
-   Ponto equipe B
-   Desfazer ponto
-   Confirmar ponto
-   Corrigir ponto
-   Trocar sacador
-   Registrar time-out
-   Registrar sanção
-   Encerrar set
-   Encerrar partida

### Segurança

O botão de desfazer deve exigir confirmação.

Exemplo:

``` text
Deseja desfazer o último ponto?

[ CANCELAR ] [ DESFAZER ]
```

Todas as alterações devem gerar log.

------------------------------------------------------------------------

# 20. Sets {#20-sets}

## Set 1 e Set 2

-   Primeiro a atingir 21 pontos
-   Obrigatoriamente com vantagem mínima de 2
-   20 x 20 → continua
-   21 x 20 → continua
-   22 x 20 → encerra

## Set 3

-   Primeiro a atingir 15 pontos
-   Obrigatoriamente com vantagem mínima de 2
-   14 x 14 → continua
-   15 x 14 → continua
-   16 x 14 → encerra

A partida é vencida pela equipe que conquistar dois sets.

------------------------------------------------------------------------

# 21. Troca de lado {#21-troca-de-lado}

O sistema deve alertar o mesário para troca de lado:

### Sets 1 e 2

A cada **7 pontos disputados pela soma das duas equipes**.

Exemplos:

``` text
4 x 3 → troca
8 x 6 → troca
12 x 9 → troca
```

### Set 3

A cada **5 pontos disputados pela soma das duas equipes**.

Exemplos:

``` text
3 x 2 → troca
6 x 4 → troca
8 x 7 → troca
```

O placar não é alterado durante a troca.

------------------------------------------------------------------------

# 22. Time-out {#22-time-out}

Cada equipe pode solicitar:

-   1 time-out por set
-   Duração normal: 30 segundos

O sistema deve registrar:

-   Equipe
-   Set
-   Placar
-   Horário de início
-   Horário de término
-   Duração
-   Solicitante

Em competições FIVB World e Official, existe ainda um **Technical
Time-Out automático de 30 segundos nos sets 1 e 2 quando a soma dos
pontos chega a 21**. No terceiro set não há Technical Time-Out.
Regulamentos da competição podem ajustar esse procedimento.

------------------------------------------------------------------------

# 23. Tempo da partida {#23-tempo-da-partida}

O sistema deve registrar:

-   Hora prevista
-   Hora de chamada
-   Início do aquecimento
-   Início da partida
-   Início de cada set
-   Fim de cada set
-   Time-outs
-   Intervalos
-   Interrupções
-   Recuperação médica
-   Suspensões
-   Fim da partida
-   Duração total

### Métricas

``` text
Duração total
Duração do Set 1
Duração do Set 2
Duração do Set 3
Tempo médio de rali
Maior rali
Menor rali
Tempo total de interrupções
```

> O tempo de duração da partida pode ser registrado como estatística do
> sistema. Ele não determina, por si só, o vencedor.

------------------------------------------------------------------------

# 24. Rali {#24-rali}

O sistema deverá tratar cada sequência entre o saque e o fim do ponto
como um **rali**.

### Dados do rali {#dados-do-rali}

``` text
Rali 001
Set: 1
Sacador: A1
Placar inicial: 0 x 0
Placar final: 1 x 0
Duração: 08,4 s
Vencedor: Equipe A
Tipo: Ace
```

### Estatísticas

-   Quantidade de ralis
-   Média de duração
-   Maior rali
-   Menor rali
-   Pontos por rali
-   Ralis vencidos no saque
-   Ralis vencidos no recebimento

------------------------------------------------------------------------

# 25. Vantagens {#25-vantagens}

Como o vôlei de areia utiliza pontuação por rali e os sets exigem
vantagem mínima de dois pontos, o sistema deve tratar a situação de
vantagem como um estado estatístico.

Exemplo:

``` text
20 x 20
↓
21 x 20
↓
22 x 20 → set encerrado
```

No terceiro set:

``` text
14 x 14
↓
15 x 14
↓
16 x 14 → set encerrado
```

O sistema deve mostrar:

-   Equipe em vantagem
-   Diferença de pontos
-   Ponto necessário para fechamento
-   Necessidade de vantagem de 2

------------------------------------------------------------------------

# 26. Sacador {#26-sacador}

O sistema deve sempre saber quem é o próximo sacador.

### Regra

Se a equipe que sacou vence o rali:

``` text
mesmo atleta continua sacando
```

Se a equipe que recebeu vence o rali:

``` text
ganha o direito de sacar
+
o outro atleta da dupla passa a sacar
```

O sistema deve bloquear a confirmação de um saque realizado pelo atleta
incorreto.

------------------------------------------------------------------------

# 27. Ordem de saque {#27-ordem-de-saque}

Para cada equipe:

``` text
Atleta 1
Atleta 2
```

O sistema deve controlar automaticamente:

``` text
A1 → saque
A1 → saque
A2 → saque
A2 → saque
A1 → saque
...
```

A ordem deve ser reiniciada conforme as regras aplicáveis a cada novo
set.

------------------------------------------------------------------------

# 28. Regras básicas de toque {#28-regras-básicas-de-toque}

A equipe possui até **três toques para devolver a bola**, considerando o
toque de bloqueio como toque de equipe.

O sistema deve permitir registrar:

-   1º toque
-   2º toque
-   3º toque
-   Bloqueio
-   Toque duplo
-   Quatro toques
-   Condução/bola presa
-   Falta de ataque
-   Falta de bloqueio

------------------------------------------------------------------------

# 29. Bloqueio {#29-bloqueio}

O bloqueio conta como toque da equipe.

Após um bloqueio:

``` text
Bloqueio
+
2 toques restantes
```

O bloqueio do saque adversário é proibido.

------------------------------------------------------------------------

# 30. Saque {#30-saque}

O saque:

-   inicia o rali;
-   deve ser executado pelo jogador correto;
-   ocorre dentro da zona de saque;
-   possui uma única tentativa;
-   pode tocar na rede e continuar em jogo, desde que atravesse
    corretamente e caia dentro das regras.

O sistema deve registrar especialmente:

``` text
Saque
├── Ace
├── Válido
├── Erro
├── Recepção positiva
└── Recepção negativa
```

------------------------------------------------------------------------

# 31. Bola dentro e fora {#31-bola-dentro-e-fora}

Registrar:

-   Bola dentro
-   Bola fora
-   Toque antes de sair
-   Toque no bloqueio
-   Bola na antena
-   Bola fora do espaço de passagem
-   Bola na rede

------------------------------------------------------------------------

# 32. Falhas de rede {#32-falhas-de-rede}

Registrar:

-   Toque na rede durante ação de jogar
-   Toque na antena
-   Interferência
-   Invasão
-   Apoio na rede
-   Interferência no adversário

O contato com a rede fora das condições que caracterizam falta não deve
ser automaticamente classificado como falta.

------------------------------------------------------------------------

# 33. Sanções disciplinares {#33-sanções-disciplinares}

O sistema deve possuir registro de:

-   Advertência verbal
-   Cartão amarelo
-   Penalidade
-   Expulsão
-   Desqualificação
-   Delay warning
-   Delay penalty

### Registro

``` text
Atleta
Equipe
Set
Placar
Horário
Tipo
Motivo
Árbitro
Observação
```

------------------------------------------------------------------------

# 34. W.O. e equipe incompleta {#34-wo-e-equipe-incompleta}

Registrar:

-   Equipe
-   Motivo
-   Horário
-   Árbitro responsável
-   Resultado
-   Observação

O regulamento oficial prevê consequências específicas para equipe que
não comparece ou fica incompleta. O sistema deve permitir parametrizar
regras específicas da competição.

------------------------------------------------------------------------

# 35. Lesão ou interrupção médica {#35-lesão-ou-interrupção-médica}

Registrar:

-   Atleta
-   Equipe
-   Set
-   Placar
-   Hora
-   Início da recuperação
-   Fim da recuperação
-   Duração
-   Atendimento
-   Retorno
-   Resultado

Nas regras FIVB, o tempo de recuperação para atleta lesionado/enfermo é
limitado a 5 minutos conforme o procedimento oficial.

------------------------------------------------------------------------

# 36. Estatísticas individuais {#36-estatísticas-individuais}

Ao final da partida:

### Atleta

``` text
Pontos
Aces
Bloqueios
Ataques vencedores
Erros de saque
Erros de ataque
Erros de recepção
Pontos por set
Tempo em quadra
```

### Atleta destaque

O sistema pode calcular:

``` text
Maior pontuador
Maior número de aces
Maior número de bloqueios
Maior número de ataques vencedores
Melhor eficiência
```

> A classificação de \"melhor jogador\" deve ser apresentada como
> estatística do sistema, salvo se houver critério oficial de premiação
> definido pelo regulamento.

------------------------------------------------------------------------

# 37. Estatísticas da equipe {#37-estatísticas-da-equipe}

``` text
Pontos
Sets vencidos
Sets perdidos
Aces
Bloqueios
Ataques
Erros
Pontos de saque
Pontos de ataque
Pontos de bloqueio
Pontos por erro adversário
Ralis vencidos
Ralis perdidos
```

------------------------------------------------------------------------

# 38. Súmula eletrônica {#38-súmula-eletrônica}

A súmula deve armazenar:

## Identificação {#identificação}

-   Torneio
-   Categoria
-   Fase
-   Partida
-   Quadra
-   Data
-   Horário

## Equipes {#equipes}

-   Nome
-   Cor
-   Atletas
-   Capitão

## Arbitragem

-   1º árbitro
-   2º árbitro
-   Mesário
-   Juízes de linha
-   Outros oficiais

## Partida

-   Sorteio
-   Ordem de saque
-   Placar por set
-   Time-outs
-   Sanções
-   Interrupções
-   Resultado final

## Assinaturas

-   Mesário
-   Capitão A
-   Capitão B
-   Árbitro

------------------------------------------------------------------------

# 39. Auditoria {#39-auditoria}

Toda alteração crítica deve gerar:

``` text
ID do evento
Data/hora
Usuário
Ação
Valor anterior
Novo valor
Motivo
Partida
Rali
Set
```

Exemplo:

``` text
09:42:18
Usuário: MESARIO01
Ação: CORREÇÃO_DE_PONTO
Anterior: 17 x 16
Novo: 16 x 16
Motivo: ponto lançado para equipe incorreta
```

------------------------------------------------------------------------

# 40. Arquitetura do placar eletrônico {#40-arquitetura-do-placar-eletrônico}

Recomenda-se separar:

``` text
Aplicação do Mesário
        │
        ▼
Servidor / API
        │
        ├── Estado da partida
        ├── Eventos
        ├── Estatísticas
        └── Auditoria
        │
        ▼
WebSocket / Realtime
        │
        ▼
Placar eletrônico
```

O placar deve receber eventos em tempo real.

### Evento de ponto

``` json
{
  "event": "POINT_SCORED",
  "matchId": "MATCH-001",
  "set": 2,
  "team": "A",
  "score": {
    "A": 18,
    "B": 17
  },
  "server": "A2",
  "rally": 37
}
```

------------------------------------------------------------------------

# 41. Modo operador {#41-modo-operador}

O operador do placar poderá:

-   Selecionar partida
-   Ativar placar
-   Ocultar placar
-   Mostrar patrocinador
-   Mostrar estatísticas
-   Mostrar próximo jogo
-   Mostrar resultado
-   Mostrar ranking
-   Corrigir conexão
-   Colocar tela em modo intervalo

------------------------------------------------------------------------

# 42. Telas do placar eletrônico {#42-telas-do-placar-eletrônico}

## Tela principal

``` text
EQUIPE A                    EQUIPE B

PRAIA AZUL                  AREIA LARANJA

       18             17

SETS   1              1

SACADOR: A2

RALI 37
```

## Tela de estatísticas

``` text
                 A        B

Pontos            18       17
Aces               3        2
Bloqueios          2        3
Ataques            9        7
Erros              4        5
Ralis              37       37
```

## Tela de destaque

``` text
🏆 DESTAQUE DA PARTIDA

ATLETA 2 - PRAIA AZUL

12 PONTOS
3 ACES
2 BLOQUEIOS
```

------------------------------------------------------------------------

# 43. Agenda automática {#43-agenda-automática}

O sistema deve possuir agenda de partidas.

### Dados

-   Partida
-   Quadra
-   Horário
-   Equipes
-   Fase
-   Status

### Recursos

-   Arrastar e reorganizar partidas
-   Trocar quadra
-   Alterar horário
-   Detectar conflito
-   Detectar equipe com jogos muito próximos
-   Alertar atraso
-   Recalcular horários seguintes

------------------------------------------------------------------------

# 44. Controle de atraso {#44-controle-de-atraso}

Se uma partida atrasar:

``` text
Partida 10
Prevista: 14:00
Início: 14:17
Atraso: +17 min
```

O sistema deve permitir:

-   Registrar atraso
-   Informar motivo
-   Atualizar agenda
-   Notificar operador
-   Atualizar tela pública

------------------------------------------------------------------------

# 45. Relatórios {#45-relatórios}

## Relatório da partida

-   Resultado
-   Sets
-   Pontos
-   Ralis
-   Tempo
-   Aces
-   Bloqueios
-   Ataques
-   Erros
-   Time-outs
-   Sanções

## Relatório do atleta

-   Jogos
-   Vitórias
-   Derrotas
-   Pontos
-   Aces
-   Bloqueios
-   Ataques
-   Eficiência

## Relatório do torneio

-   Equipes
-   Jogos
-   Pontos
-   Sets
-   Classificação
-   Ranking
-   Estatísticas
-   Público, se houver integração

------------------------------------------------------------------------

# 46. Banco de dados conceitual {#46-banco-de-dados-conceitual}

``` text
TORNEIO
  │
  ├── CATEGORIA
  │      │
  │      ├── EQUIPE
  │      │      ├── ATLETA
  │      │      └── ATLETA
  │      │
  │      └── PARTIDA
  │             │
  │             ├── SET
  │             │    └── RALI
  │             │          ├── SAQUE
  │             │          ├── ATAQUE
  │             │          ├── BLOQUEIO
  │             │          └── PONTO
  │             │
  │             ├── TIME-OUT
  │             ├── SANÇÃO
  │             └── INTERRUPÇÃO
  │
  └── USUÁRIOS
```

------------------------------------------------------------------------

# 47. Entidades principais {#47-entidades-principais}

## Tournament

``` text
id
name
edition
startDate
endDate
location
status
logo
```

## Category

``` text
id
tournamentId
name
gender
format
teamCount
```

## Team

``` text
id
categoryId
name
shortName
primaryColor
secondaryColor
textColor
logo
seed
status
```

## Athlete

``` text
id
name
sportName
birthDate
photo
city
state
ranking
status
```

## TeamAthlete

``` text
teamId
athleteId
number
captain
```

## Match

``` text
id
categoryId
court
round
scheduledAt
startedAt
endedAt
teamA
teamB
status
winner
```

## Set

``` text
id
matchId
number
scoreA
scoreB
winner
duration
```

## Rally

``` text
id
setId
number
server
winningTeam
startTime
endTime
duration
pointType
```

## PointEvent

``` text
id
rallyId
team
athlete
type
scoreBefore
scoreAfter
timestamp
```

## Timeout

``` text
id
matchId
team
set
startTime
endTime
```

## Sanction

``` text
id
matchId
team
athlete
set
type
reason
timestamp
```

------------------------------------------------------------------------

# 48. Tipos de evento {#48-tipos-de-evento}

Recomenda-se padronizar os eventos:

``` text
MATCH_CREATED
MATCH_STARTED
SET_STARTED
POINT_SCORED
POINT_UNDONE
POINT_CORRECTED
ACE
ATTACK_POINT
BLOCK_POINT
SERVICE_ERROR
ATTACK_ERROR
RECEPTION_ERROR
TIMEOUT_STARTED
TIMEOUT_ENDED
TECHNICAL_TIMEOUT
COURT_SWITCH
SET_ENDED
MATCH_ENDED
SANCTION
INJURY
MEDICAL_TIMEOUT
MATCH_SUSPENDED
MATCH_RESUMED
```

Isso permitirá alimentar simultaneamente:

-   Súmula
-   Estatísticas
-   Placar
-   Relatórios
-   Auditoria
-   Transmissão
-   Histórico do torneio

------------------------------------------------------------------------

# 49. Regras oficiais que devem ser parametrizadas {#49-regras-oficiais-que-devem-ser-parametrizadas}

O sistema deve possuir um módulo de regras para não deixar valores
importantes fixos no código.

### Parâmetros padrão FIVB 2025--2028

``` text
Jogadores por equipe: 2
Dimensão da quadra: 16 x 8 m
Set normal: 21
Set decisivo: 15
Vantagem mínima: 2
Sets necessários para vencer: 2
Time-out por equipe/set: 1
Duração do time-out: 30 s
Troca de lado - sets 1/2: a cada 7 pontos
Troca de lado - set 3: a cada 5 pontos
Technical Time-Out: sets 1/2, quando soma chega a 21
Technical Time-Out no set 3: não
Substituições: não
```

------------------------------------------------------------------------

# 50. Regras técnicas essenciais do vôlei de areia {#50-regras-técnicas-essenciais-do-vôlei-de-areia}

O sistema deve contemplar pelo menos:

-   Rally Point System
-   Saque
-   Ordem de saque
-   Rotação de saque
-   Três toques
-   Bloqueio contado como toque
-   Ataque
-   Bola dentro
-   Bola fora
-   Bola na rede
-   Toque na rede
-   Invasão
-   Antena
-   Falta de posição
-   Falta de ordem de saque
-   Falta de saque
-   Falta de ataque
-   Falta de bloqueio
-   Duplo contato
-   Bola conduzida
-   Quatro toques
-   Bloqueio de saque
-   Time-out
-   Technical Time-Out
-   Troca de lado
-   Intervalos
-   Lesões
-   Interferências externas
-   Atrasos
-   Conduta antidesportiva
-   Penalidade
-   Expulsão
-   Desqualificação
-   W.O.
-   Equipe incompleta

------------------------------------------------------------------------

# 51. Regra importante: sistema não substitui o árbitro {#51-regra-importante-sistema-não-substitui-o-árbitro}

O sistema deve ser tratado como **ferramenta de apoio à arbitragem**.

A autoridade para determinar:

-   ponto;
-   falta;
-   repetição do rali;
-   sanção;
-   interrupção;
-   resultado;

permanece com a arbitragem conforme o regulamento da competição.

O mesário registra a decisão e o sistema a transforma em dado
operacional.

------------------------------------------------------------------------

# 52. Protocolo operacional do mesário {#52-protocolo-operacional-do-mesário}

## Antes da partida

1.  Abrir a partida.
2.  Conferir equipes.
3.  Conferir atletas.
4.  Conferir cores.
5.  Conferir capitães.
6.  Conferir ordem de saque.
7.  Conferir árbitros.
8.  Conferir quadra.
9.  Conferir placar eletrônico.
10. Conferir horário.
11. Registrar sorteio.

## Durante a partida

Para cada rali:

``` text
Árbitro encerra o rali
       ↓
Mesário identifica vencedor
       ↓
Registra ponto
       ↓
Seleciona motivo
       ↓
Confirma
       ↓
Sistema atualiza placar
       ↓
Sistema atualiza estatísticas
       ↓
Placar eletrônico recebe evento
```

## Ao final de cada set

-   Confirmar placar
-   Confirmar vencedor
-   Registrar duração
-   Registrar troca de lado
-   Registrar intervalo
-   Preparar próximo set

## Ao final da partida

-   Confirmar resultado
-   Registrar duração total
-   Conferir estatísticas
-   Registrar observações
-   Fechar súmula
-   Assinaturas
-   Publicar resultado

------------------------------------------------------------------------

# 53. Requisitos de usabilidade para o mesário {#53-requisitos-de-usabilidade-para-o-mesário}

A interface deve ser extremamente rápida.

### Princípios

-   Botões grandes
-   Poucos campos por tela
-   Alto contraste
-   Feedback visual imediato
-   Feedback sonoro opcional
-   Atalhos de teclado
-   Operação com tablet
-   Operação com notebook
-   Modo offline
-   Sincronização posterior
-   Desfazer ponto
-   Histórico dos últimos eventos

### Regra operacional

O mesário não deve precisar navegar por múltiplas telas para registrar
um ponto.

Idealmente:

``` text
1 toque → equipe marcou ponto
2 toques → classifica o ponto
```

------------------------------------------------------------------------

# 54. Segurança contra erro humano {#54-segurança-contra-erro-humano}

O sistema deve implementar:

### Confirmação de evento crítico

-   Encerrar set
-   Encerrar partida
-   Corrigir ponto
-   Desfazer ponto
-   Alterar resultado
-   Alterar atleta
-   Alterar ordem de saque

### Proteção

-   Log de auditoria
-   Histórico
-   Controle de usuário
-   Permissões
-   Backup
-   Sincronização
-   Recuperação de sessão

------------------------------------------------------------------------

# 55. Perfis de usuário {#55-perfis-de-usuário}

## Administrador

Acesso total.

## Organizador

-   Torneio
-   Equipes
-   Agenda
-   Sorteio
-   Resultados

## Árbitro

-   Consulta
-   Controle da partida
-   Sanções
-   Interrupções

## Mesário

-   Súmula
-   Pontos
-   Ralis
-   Estatísticas
-   Tempo
-   Time-outs

## Operador do placar

-   Placar
-   Exibição
-   Publicidade
-   Estatísticas

## Público

-   Somente leitura

------------------------------------------------------------------------

# 56. Funcionamento offline {#56-funcionamento-offline}

O sistema deve continuar funcionando mesmo sem internet durante a
partida.

Arquitetura recomendada:

``` text
MESÁRIO
   ↓
Banco local
   ↓
Fila de eventos
   ↓
Sincronização
   ↓
Servidor
   ↓
Placar / Público
```

Se a conexão cair:

``` text
Internet OFFLINE
      ↓
Partida continua
      ↓
Eventos ficam armazenados localmente
      ↓
Internet retorna
      ↓
Eventos sincronizados
```

------------------------------------------------------------------------

# 57. Requisito crítico de consistência {#57-requisito-crítico-de-consistência}

O sistema deve considerar o **evento de ponto como unidade principal da
partida**.

Em vez de armazenar somente:

``` text
Placar = 18 x 17
```

deve armazenar:

``` text
Rali 37
Equipe A venceu
Motivo: ACE
Sacador: A2
Placar anterior: 17 x 17
Placar posterior: 18 x 17
Horário: 15:42:18
```

Isso permite reconstruir a partida.

------------------------------------------------------------------------

# 58. Reconstrução da partida {#58-reconstrução-da-partida}

Se houver erro ou falha do sistema:

``` text
Eventos 1...37
       ↓
Reprocessamento
       ↓
Placar
       ↓
Estatísticas
       ↓
Resultado
```

Essa arquitetura é especialmente importante para auditoria e transmissão
ao vivo.

------------------------------------------------------------------------

# 59. Indicadores finais da partida {#59-indicadores-finais-da-partida}

O sistema deverá apresentar:

### Resultado

-   Vencedor
-   Perdedor
-   Sets
-   Placar de cada set
-   Tempo total

### Pontuação

-   Pontos totais
-   Pontos de ataque
-   Pontos de bloqueio
-   Aces
-   Pontos por erro adversário
-   Penalidades

### Rali {#rali}

-   Total de ralis
-   Média de duração
-   Maior rali
-   Menor rali

### Saque {#saque}

-   Total
-   Aces
-   Erros
-   Eficiência

### Atletas {#atletas}

-   Maior pontuador
-   Mais aces
-   Mais bloqueios
-   Mais ataques vencedores

------------------------------------------------------------------------

# 60. Recomendação de implementação {#60-recomendação-de-implementação}

A melhor arquitetura para esse sistema é separar claramente:

``` text
REGRAS DO ESPORTE
        ↓
MOTOR DA PARTIDA
        ↓
EVENTOS
        ↓
ESTATÍSTICAS
        ↓
INTERFACES
```

O **motor da partida** deve ser responsável por validar:

-   pontuação;
-   set;
-   vantagem;
-   troca de lado;
-   saque;
-   encerramento;
-   time-outs;
-   regras configuradas.

A interface do mesário apenas envia ações.

Isso reduz drasticamente o risco de o sistema registrar um resultado
impossível.

------------------------------------------------------------------------

# 61. Referência oficial das regras {#61-referência-oficial-das-regras}

As regras esportivas devem ser sempre conferidas na versão vigente da
FIVB.

**FIVB -- Official Beach Volleyball Rules 2025--2028**

<https://www.fivb.com/beach-volleyball/the-game/official-rules-of-the-games/>

Documento oficial:

<https://www.fivb.com/wp-content/uploads/2025/02/FIVB-BeachVolleyball_Rules2025_2028-EN-v01.pdf>

As regras específicas do torneio devem ser configuradas separadamente
das regras gerais da FIVB, permitindo adaptações para competições
locais, categorias de base e formatos recreativos.

------------------------------------------------------------------------

# 62. Próxima etapa de desenvolvimento {#62-próxima-etapa-de-desenvolvimento}

A partir deste documento, o projeto pode ser dividido em módulos:

``` text
01 - Cadastro do torneio
02 - Cadastro de categorias
03 - Cadastro de atletas
04 - Cadastro de equipes
05 - Identidade visual
06 - Sorteio
07 - Chaveamento
08 - Agenda
09 - Partida
10 - Motor de regras
11 - Mesa do mesário
12 - Súmula eletrônica
13 - Estatísticas
14 - Placar eletrônico
15 - Transmissão em tempo real
16 - Ranking
17 - Relatórios
18 - Auditoria
19 - Usuários e permissões
20 - Backup e sincronização
```

## Prioridade recomendada

### Fase 1 --- Núcleo {#fase-1--núcleo}

-   Torneio
-   Categoria
-   Atletas
-   Equipes
-   Partidas
-   Sets
-   Pontos
-   Ralis
-   Motor de regras

### Fase 2 --- Operação {#fase-2--operação}

-   Mesário
-   Súmula
-   Cronômetro
-   Time-outs
-   Sanções
-   Troca de lado
-   Estatísticas

### Fase 3 --- Experiência pública {#fase-3--experiência-pública}

-   Placar eletrônico
-   Chaveamento
-   Resultados
-   Ranking
-   Estatísticas ao vivo

### Fase 4 --- Inteligência {#fase-4--inteligência}

-   Análise de desempenho
-   Ranking automático
-   Destaques
-   Comparação de atletas
-   Histórico
-   Indicadores avançados
-   Exportação de dados

------------------------------------------------------------------------

## Resultado esperado

Ao final, o sistema deverá transformar uma partida de vôlei de areia em
uma sequência estruturada de eventos:

``` text
ATLETA
   ↓
EQUIPE
   ↓
PARTIDA
   ↓
SET
   ↓
RALI
   ↓
SAQUE
   ↓
AÇÃO
   ↓
PONTO
   ↓
PLACAR
   ↓
ESTATÍSTICA
   ↓
SÚMULA
   ↓
RESULTADO
```

Esse modelo permite que o mesmo dado alimentado pelo mesário seja
utilizado simultaneamente para **placar eletrônico, súmula,
estatísticas, transmissão, ranking, relatórios e histórico do atleta**.
