@echo off

call C:\Environment\Sonar\sonar-runner\bin\sonar-runner -Dsonar.analysis.mode=preview -Dsonar.issuesReport.html.enable=true

echo DONE

pause