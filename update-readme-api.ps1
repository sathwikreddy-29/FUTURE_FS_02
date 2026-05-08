$repoUrl = "https://api.github.com/repos/sathwikreddy-29/FUTURE_FS_01/contents/README.md"
$token = "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"
$headers = @{
    "Authorization" = "token $token"
    "Accept" = "application/vnd.github+json"
    "X-GitHub-Api-Version" = "2022-11-28"
}

# Read the local README content
$localReadme = Get-Content "c:\Users\pranathi reddy\OneDrive\Desktop\sathwik\README.md" -Raw
$base64Content = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($localReadme))

# Get current file SHA
$currentFile = Invoke-RestMethod -Uri $repoUrl -Headers $headers -Method Get
$currentSha = $currentFile.sha

# Prepare update payload
$body = @{
    message = "Update README with complete project documentation"
    content = $base64Content
    sha = $currentSha
} | ConvertTo-Json

# Update file
$response = Invoke-RestMethod -Uri $repoUrl -Headers $headers -Method Put -Body $body -ContentType "application/json"

Write-Host "README updated successfully!"
Write-Host "Commit SHA: $($response.commit.sha)"
Write-Host "GitHub URL: https://github.com/sathwikreddy-29/FUTURE_FS_01/blob/main/README.md"
