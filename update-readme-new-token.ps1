$repoUrl = "https://api.github.com/repos/sathwikreddy-29/FUTURE_FS_01/contents/README.md"
$token = "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"
$headers = @{
    "Authorization" = "token $token"
    "Accept" = "application/vnd.github+json"
    "X-GitHub-Api-Version" = "2022-11-28"
}

Write-Host "Fetching current file info..."
try {
    $currentFile = Invoke-RestMethod -Uri $repoUrl -Headers $headers -Method Get
    $currentSha = $currentFile.sha
    Write-Host "Current SHA: $currentSha"
} catch {
    Write-Host "Error fetching file: $_"
    exit 1
}

# Read the local README content
$localReadme = Get-Content "c:\Users\pranathi reddy\OneDrive\Desktop\sathwik\README.md" -Raw
$base64Content = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($localReadme))

Write-Host "Local README size: $($localReadme.Length) bytes"
Write-Host "Base64 content length: $($base64Content.Length) characters"

# Prepare update payload
$body = @{
    message = "Update README with complete project documentation"
    content = $base64Content
    sha = $currentSha
} | ConvertTo-Json

Write-Host "Sending update to GitHub..."
try {
    $response = Invoke-RestMethod -Uri $repoUrl -Headers $headers -Method Put -Body $body -ContentType "application/json"
    Write-Host "✅ README updated successfully!"
    Write-Host "New Commit SHA: $($response.commit.sha)"
    Write-Host "View at: https://github.com/sathwikreddy-29/FUTURE_FS_01/blob/main/README.md"
} catch {
    Write-Host "❌ Error updating README: $_"
    $errorResponse = $_.ErrorDetails.Message
    Write-Host "Details: $errorResponse"
}
