@echo off
echo ============================================
echo    INSTALADOR DO SISTEMA FINANCEIRO
echo ============================================

echo [1/4] Verificando Node.js...
node --version > nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js nao encontrado!
    echo Por favor, instale o Node.js em: https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js encontrado!

echo [2/4] Verificando MongoDB...
sc query MongoDB > nul 2>&1
if %errorlevel% neq 0 (
    echo MongoDB nao encontrado!
    echo Por favor, instale o MongoDB em: https://www.mongodb.com/try/download/community
    pause
    exit /b 1
)
echo MongoDB encontrado!

echo [3/4] Instalando dependencias do backend...
call npm install
if %errorlevel% neq 0 (
    echo Erro ao instalar dependencias do backend!
    pause
    exit /b 1
)
echo Dependencias do backend instaladas!

echo [4/4] Instalando dependencias do frontend...
cd client
call npm install
if %errorlevel% neq 0 (
    echo Erro ao instalar dependencias do frontend!
    pause
    exit /b 1
)
cd ..
echo Dependencias do frontend instaladas!

echo.
echo Instalacao concluida com sucesso!
echo.
echo Para iniciar o sistema, use o arquivo iniciar_oculto.vbs
echo.
echo Pressione qualquer tecla para fechar...
pause > nul 