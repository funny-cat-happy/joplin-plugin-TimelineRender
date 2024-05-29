# 停止 Joplin 进程
Get-Process -Name "Joplin" -ErrorAction SilentlyContinue | Stop-Process -Force

# 等待几秒钟以确保进程完全停止
Start-Sleep -Seconds 2

# 启动 Joplin 应用程序
Start-Process -FilePath "C:\Program Files\Joplin\Joplin.exe"