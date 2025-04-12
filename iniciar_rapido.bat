@echo off
echo ============================================
echo    SISTEMA FINANCEIRO - INICIALIZACAO RAPIDA
echo ============================================

echo [1/3] Iniciando backend...
powershell -WindowStyle Hidden -Command "node server.js"

echo [2/3] Iniciando frontend...
cd client
start /B npm start
cd ..

echo [3/3] Sistema iniciado!
echo Backend: http://localhost:5002
echo Frontend: http://localhost:3000
echo.
echo Pressione qualquer tecla para fechar esta janela...
pause > nul 