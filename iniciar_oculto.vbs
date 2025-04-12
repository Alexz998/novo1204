Set WshShell = CreateObject("WScript.Shell")

' Iniciar backend
WshShell.Run "node server.js", 0, False

' Iniciar frontend
WshShell.Run "cmd /c cd client && npm start", 0, False

' Mostrar mensagem de sucesso
WshShell.Popup "Sistema Financeiro iniciado!" & vbCrLf & _
                "Backend: http://localhost:5002" & vbCrLf & _
                "Frontend: http://localhost:3000", 5, "Sistema Financeiro", 64 