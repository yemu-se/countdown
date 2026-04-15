# 1. Unlock the terminal for this session
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process

# 2. Add Git from your Downloads folder
$env:Path += ";C:\Users\yemanc6505\Downloads\PortableGit\bin"
$env:Path += ";C:\Users\yemanc6505\Downloads\PortableGit\cmd"

# 3. Add Node from your Desktop
$env:Path += ";C:\Users\yemanc6505\Desktop\node-v24.13.1-win-x64\node-v24.13.1-win-x64"

# 4. Check versions to confirm it worked  write in the termnal to see the host . .\go.ps1
Write-Host "--- Setup Complete ---" -ForegroundColor Cyan
git --version
node -v