@echo off
SET BITS=32
findstr "amd64" "%JAVA_HOME%\release"
if %ERRORLEVEL% EQU 0 SET BITS=64
call C:\Environment\Sonar\sonarqube\bin\windows-x86-%BITS%\StartSonar.bat
pause
