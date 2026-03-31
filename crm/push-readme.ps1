#!/usr/bin/env powershell

Set-Location "c:\Users\pranathi reddy\OneDrive\Desktop\sathwik"

# Store credentials
$token = "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"
$username = "sathwikreddy-29"

# Configure git
git config user.name "sathwikreddy-29"
git config user.email "sathwikreddy@gmail.com"

# Store credential in git config
git credential fill | @"
protocol=https
host=github.com
username=$username
password=$token
"@ | git credential approve

# Force push
Write-Host "Pushing to GitHub..."
git push origin main --force

Write-Host "Push completed!"
Write-Host "Remote status:"
git branch -vv
