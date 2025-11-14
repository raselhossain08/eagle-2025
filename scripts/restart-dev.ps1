# PowerShell script to restart Next.js dev server with clean cache
Write-Host "🧹 Cleaning Next.js cache..." -ForegroundColor Cyan

# Remove .next directory
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "✅ Removed .next directory" -ForegroundColor Green
}

# Clear Next.js cache
if (Test-Path ".next/cache") {
    Remove-Item -Recurse -Force ".next/cache"
    Write-Host "✅ Cleared .next/cache" -ForegroundColor Green
}

Write-Host ""
Write-Host "🚀 Starting development server..." -ForegroundColor Cyan
Write-Host "💡 Make sure your .env and .env.local files have NEXT_PUBLIC_PAYPAL_CLIENT_ID set" -ForegroundColor Yellow
Write-Host ""

# Start the dev server
npm run dev
