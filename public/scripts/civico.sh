#!/bin/bash
# ==============================================================================
# Script de Configuração e Otimização - Colégio Cívico Militar
# Autor: Lucas Mercer Leniar — Educação Digital & Programação
# Ambiente: GNU/Linux Debian / Ubuntu / Linux Mint
# ==============================================================================

set -e

echo -e "\e[36m[+] Iniciando configuração do ambiente Cívico-Militar...\e[0m"

# 1. Verificação de privilégios de root
if [ "$EUID" -ne 0 ]; then
  echo -e "\e[31m[!] Execute este script como root ou utilizando sudo.\e[0m"
  exit 1
fi

# 2. Atualização dos repositórios locais
echo "[-] Atualizando lista de pacotes apt..."
apt-get update -y && apt-get upgrade -y

# 3. Instalação de utilitários e softwares pedagógicos
echo "[-] Instalando navegadores, compiladores e editores..."
apt-get install -y \
  curl \
  wget \
  git \
  build-essential \
  python3 \
  python3-pip \
  vlc \
  gimp \
  htop \
  net-tools

# 4. Configuração de NTP e Fuso Horário
echo "[-] Ajustando timezone para America/Sao_Paulo..."
timedatectl set-timezone America/Sao_Paulo
systemctl restart systemd-timesyncd 2>/dev/null || true

# 5. Criação da estrutura de pastas de aula
mkdir -p /home/aluno/Documentos/Projetos
chown -R aluno:aluno /home/aluno/Documentos/Projetos 2>/dev/null || true

echo -e "\e[32m[✓] Configuração do civico.sh concluída com sucesso!\e[0m"
