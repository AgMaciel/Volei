import random
import statistics
from math import ceil


# ============================================================
# 1. CONFIGURAÇÃO DO TORNEIO
# ============================================================

NUMERO_EQUIPES = 10
NUMERO_GRUPOS = 2
EQUIPES_POR_GRUPO = 5
NUMERO_JOGOS = 13

HORARIO_INICIO = "08:00"
HORARIO_LIMITE = "18:00"

PONTUACAO_SET = 21
TETO_PONTOS = 27

TEMPO_ALMOCO = 120                 # minutos
TEMPO_INTERVALO_ENTRE_SETS = 5     # minutos
TEMPO_INTERVALO_ENTRE_JOGOS = 5    # minutos

# O usuário informa este valor durante a execução.
NUMERO_SETS = None

NUMERO_SIMULACOES = 10_000


# ============================================================
# 2. CONVERSÃO E ENTRADA DE DADOS
# ============================================================

def horario_para_minutos(horario):
    """Converte HH:MM para minutos desde 00:00."""
    horas, minutos = map(int, horario.split(":"))
    if not (0 <= horas <= 23 and 0 <= minutos <= 59):
        raise ValueError("O horário deve estar no formato HH:MM válido.")
    return horas * 60 + minutos


def minutos_para_horario(minutos):
    """Converte minutos desde 00:00 para HH:MM, sem reiniciar após 24h."""
    minutos = round(minutos)
    horas = minutos // 60
    mins = minutos % 60
    return f"{horas:02d}:{mins:02d}"


def ler_quantidade_sets():
    """Solicita ao usuário a quantidade de sets da partida."""
    while True:
        try:
            quantidade = int(input("Informe a quantidade de sets da partida: "))
            if quantidade < 1:
                raise ValueError
            return quantidade
        except ValueError:
            print("Digite um número inteiro maior ou igual a 1.")


inicio = horario_para_minutos(HORARIO_INICIO)
limite = horario_para_minutos(HORARIO_LIMITE)


# ============================================================
# 3. MODELO DE DURAÇÃO DE UM SET
# ============================================================

def simular_set(pontuacao_base, teto):
    """Simula a quantidade de pontos necessários para encerrar um set."""
    pontos = pontuacao_base

    # Em 20% dos casos o set é equilibrado e chega mais perto do teto.
    if random.random() < 0.20:
        pontos = random.randint(pontuacao_base + 1, teto)

    return pontos


def estimar_tempo_set(pontos):
    """Estima a duração de um set, em minutos, com base nos pontos."""
    # Hipótese ajustável: cada rally/ponto dura entre 20 e 32 segundos.
    segundos_por_ponto = random.uniform(20, 32)
    tempo_em_minutos = (pontos * segundos_por_ponto) / 60
    return tempo_em_minutos


# ============================================================
# 4. SIMULAÇÃO DE UMA PARTIDA
# ============================================================

def simular_partida(pontuacao_base, teto, quantidade_sets):
    """
    Simula uma partida até que um dos lados alcance a maioria dos sets.

    Exemplos:
      - 3 sets: vence quem ganhar 2 (melhor de 3);
      - 5 sets: vence quem ganhar 3 (melhor de 5).

    A função retorna separadamente o tempo dos sets, os intervalos
    e o tempo total da partida.
    """
    sets_necessarios = ceil(quantidade_sets / 2)
    sets_vencedor = 0
    sets_perdedor = 0
    tempos_dos_sets = []

    while sets_vencedor < sets_necessarios and sets_perdedor < sets_necessarios:
        pontos = simular_set(pontuacao_base, teto)
        tempo_set = estimar_tempo_set(pontos)
        tempos_dos_sets.append(tempo_set)

        if random.random() < 0.5:
            sets_vencedor += 1
        else:
            sets_perdedor += 1

    quantidade_sets_jogados = len(tempos_dos_sets)
    tempo_total_sets = sum(tempos_dos_sets)
    quantidade_intervalos = max(0, quantidade_sets_jogados - 1)
    tempo_total_intervalos = (
        quantidade_intervalos * TEMPO_INTERVALO_ENTRE_SETS
    )
    duracao_total = tempo_total_sets + tempo_total_intervalos

    return {
        "quantidade_sets_jogados": quantidade_sets_jogados,
        "tempos_dos_sets": tempos_dos_sets,
        "tempo_total_sets": tempo_total_sets,
        "tempo_total_intervalos": tempo_total_intervalos,
        "duracao_total": duracao_total,
    }


# ============================================================
# 5. SIMULAÇÃO DE UM TORNEIO
# ============================================================

def simular_torneio(
    pontuacao_base,
    teto,
    tempo_almoco,
    quantidade_sets,
):
    tempo_atual = inicio
    tempos_jogos = []
    detalhes_jogos = []
    horario_almoco = None

    # Para simplificar a demonstração, o almoço começa antes do jogo 7.
    jogo_almoco = 7

    for jogo in range(1, NUMERO_JOGOS + 1):
        if jogo == jogo_almoco:
            horario_almoco = tempo_atual
            tempo_atual += tempo_almoco

        resultado_partida = simular_partida(
            pontuacao_base,
            teto,
            quantidade_sets,
        )

        duracao = round(resultado_partida["duracao_total"])
        tempos_jogos.append(duracao)
        detalhes_jogos.append(resultado_partida)
        tempo_atual += duracao

        if jogo < NUMERO_JOGOS:
            tempo_atual += TEMPO_INTERVALO_ENTRE_JOGOS

    return {
        "horario_final": tempo_atual,
        "terminou_no_prazo": tempo_atual <= limite,
        "tempos_jogos": tempos_jogos,
        "detalhes_jogos": detalhes_jogos,
        "horario_almoco": horario_almoco,
    }


# ============================================================
# 6. MONTE CARLO
# ============================================================

def monte_carlo(
    pontuacao_base,
    teto,
    tempo_almoco,
    quantidade_sets,
    simulacoes,
):
    finais = []
    duracoes_partidas = []
    sucessos = 0

    for _ in range(simulacoes):
        resultado = simular_torneio(
            pontuacao_base,
            teto,
            tempo_almoco,
            quantidade_sets,
        )

        finais.append(resultado["horario_final"])
        duracoes_partidas.extend(resultado["tempos_jogos"])

        if resultado["terminou_no_prazo"]:
            sucessos += 1

    return {
        "probabilidade": (sucessos / simulacoes) * 100,
        "media_final": statistics.mean(finais),
        "melhor": min(finais),
        "pior": max(finais),
        "duracao_media_partida": statistics.mean(duracoes_partidas),
    }


# ============================================================
# 7. EXECUÇÃO
# ============================================================

if __name__ == "__main__":
    NUMERO_SETS = ler_quantidade_sets()

    resultado = simular_torneio(
        PONTUACAO_SET,
        TETO_PONTOS,
        TEMPO_ALMOCO,
        NUMERO_SETS,
    )

    print("\n========================================")
    print("SIMULAÇÃO DE UM TORNEIO")
    print("========================================")
    print(f"Início: {HORARIO_INICIO}")
    print(f"Quantidade configurada de sets: {NUMERO_SETS}")
    print(f"Sets necessários para vencer: {ceil(NUMERO_SETS / 2)}")
    print(f"Almoço: {TEMPO_ALMOCO} minutos")
    print(f"Limite: {HORARIO_LIMITE}")
    print(f"Pontuação-base por set: {PONTUACAO_SET}")
    print(f"Teto de pontos: {TETO_PONTOS}")

    print("\nDuração das partidas:")
    for i, (tempo, detalhes) in enumerate(
        zip(resultado["tempos_jogos"], resultado["detalhes_jogos"]),
        start=1,
    ):
        print(
            f"Jogo {i:02d}: {tempo} minutos | "
            f"sets jogados: {detalhes['quantidade_sets_jogados']} | "
            f"tempo dos sets: {detalhes['tempo_total_sets']:.2f} min | "
            f"intervalos: {detalhes['tempo_total_intervalos']:.2f} min"
        )

    print("\nHorário final:", minutos_para_horario(resultado["horario_final"]))

    if resultado["terminou_no_prazo"]:
        print(f"STATUS: TERMINOU ATÉ {HORARIO_LIMITE}")
    else:
        atraso = resultado["horario_final"] - limite
        print(f"STATUS: ATRASOU {atraso} minutos")

    resultado_mc = monte_carlo(
        PONTUACAO_SET,
        TETO_PONTOS,
        TEMPO_ALMOCO,
        NUMERO_SETS,
        NUMERO_SIMULACOES,
    )

    print("\n========================================")
    print("SIMULAÇÃO MONTE CARLO")
    print("========================================")
    print(f"Simulações: {NUMERO_SIMULACOES:,}")
    print(f"Quantidade de sets usada: {NUMERO_SETS}")
    print(
        f"Probabilidade de terminar até {HORARIO_LIMITE}: "
        f"{resultado_mc['probabilidade']:.2f}%"
    )
    print(
        "Duração média de uma partida:",
        f"{resultado_mc['duracao_media_partida']:.2f} minutos",
    )
    print(
        "Horário médio de término:",
        minutos_para_horario(resultado_mc["media_final"]),
    )
    print("Melhor cenário:", minutos_para_horario(resultado_mc["melhor"]))
    print("Pior cenário:", minutos_para_horario(resultado_mc["pior"]))
