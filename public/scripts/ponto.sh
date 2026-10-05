#!/bin/bash
# ==============================================================================
# Script de Registro de Ponto e Log de Presença em Laboratório
# Autor: Lucas Mercer Leniar — Educação Digital & Programação
# ==============================================================================

LOG_FILE="$HOME/.registro_ponto.log"
HORA_ATUAL=$(date "+%Y-%m-%d %H:%M:%S")
USUARIO=$(whoami)
HOSTNAME=$(hostname)
IP_LOCAL=$(hostname -I | awk '{print $1}')

echo "=============================================="
echo " REGISTRO DE PONTO / PRESENÇA DE LABORATÓRIO"
echo "=============================================="
echo "Data/Hora: $HORA_ATUAL"
echo "Usuário:   $USUARIO"
echo "Máquina:   $HOSTNAME ($IP_LOCAL)"
echo "----------------------------------------------"

# Gravação de log com assinatura de timestamp
echo "[$HORA_ATUAL] | USUARIO: $USUARIO | HOST: $HOSTNAME | IP: $IP_LOCAL | EVENTO: REGISTRO_OK" >> "$LOG_FILE"

echo -e "\e[32m[✓] Ponto registrado com sucesso em $LOG_FILE\e[0m"
echo ""
echo "Últimos registros gravados:"
tail -n 5 "$LOG_FILE" 2>/dev/null || echo "Primeiro registro gerado com sucesso."
