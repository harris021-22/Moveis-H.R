@echo off
chcp 65001 > nul
title Atualizador de Catálogo - Móveis RJ
color 0B

echo =========================================================================
echo               ATUALIZADOR DE CATÁLOGO - RUFER MÓVEIS
echo               Margem aplicada: +35%% | WhatsApp: (21) 96455-1053
echo =========================================================================
echo.
echo Conectando ao site da Rufer e coletando produtos atualizados...
echo Aguarde alguns instantes...
echo.

node scraper.js

if %ERRORLEVEL% EQU 0 (
    echo.
    echo =========================================================================
    echo   [SUCESSO] Catálogo atualizado com sucesso!
    echo   Os novos produtos e preços de venda já estão prontos.
    echo =========================================================================
) else (
    echo.
    echo =========================================================================
    echo   [AVISO] Ocorreu uma instabilidade ao atualizar. Verifique a internet.
    echo =========================================================================
)

echo.
pause
