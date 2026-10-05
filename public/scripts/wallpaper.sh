#!/bin/bash
# ==============================================================================
# Script de Padronização de Papel de Parede (Wallpaper)
# Autor: Lucas Mercer Leniar — Educação Digital & Programação
# Ambientes Suportados: GNOME, XFCE, Cinnamon, MATE
# ==============================================================================

WALLPAPER_URL="https://www.lucasleniar.com.br/assets/wallpaper-padrao.jpg"
DEST_PATH="/usr/share/backgrounds/lucasleniar-wallpaper.jpg"

echo -e "\e[36m[+] Baixando papel de parede institucional...\e[0m"

# 1. Download da imagem com curl ou wget
if command -v curl >/dev/null 2>&1; then
    sudo curl -fsSL "$WALLPAPER_URL" -o "$DEST_PATH"
elif command -v wget >/dev/null 2>&1; then
    sudo wget -q "$WALLPAPER_URL" -O "$DEST_PATH"
else
    echo "Erro: curl ou wget não encontrados."
    exit 1
fi

# 2. Aplicação para o ambiente de desktop atual do usuário
DESKTOP_ENV=$(echo "$XDG_CURRENT_DESKTOP" | tr '[:upper:]' '[:lower:]')

echo "[-] Detectando ambiente gráfico ($DESKTOP_ENV) e aplicando..."

# GNOME / Unity
if command -v gsettings >/dev/null 2>&1; then
    gsettings set org.gnome.desktop.background picture-uri "file://$DEST_PATH"
    gsettings set org.gnome.desktop.background picture-uri-dark "file://$DEST_PATH"
    gsettings set org.gnome.desktop.background picture-options 'zoom'
fi

# XFCE
if command -v xfconf-query >/dev/null 2>&1; then
    for prop in $(xfconf-query -c xfce4-desktop -l | grep last-image); do
        xfconf-query -c xfce4-desktop -p "$prop" -s "$DEST_PATH"
    done
fi

# Cinnamon
if command -v gsettings >/dev/null 2>&1 && [ "$DESKTOP_ENV" = "x-cinnamon" ]; then
    gsettings set org.cinnamon.desktop.background picture-uri "file://$DEST_PATH"
fi

echo -e "\e[32m[✓] Papel de parede configurado com sucesso!\e[0m"
