$root = "c:\Vibecoding\Anna_Juranova1\Muj_web1"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8000/")
$listener.Start()
Write-Output "Serving $root on http://localhost:8000/"

$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css"
  ".js"   = "application/javascript"
  ".svg"  = "image/svg+xml"
  ".avif" = "image/avif"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".png"  = "image/png"
  ".xml"  = "application/xml"
  ".txt"  = "text/plain"
  ".json" = "application/json"
}

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $req = $context.Request
  $res = $context.Response
  try {
    $path = [System.Uri]::UnescapeDataString($req.Url.AbsolutePath)
    if ($path -eq "/") { $path = "/index.html" }
    $filePath = Join-Path $root ($path.TrimStart('/'))
    if (-not (Test-Path $filePath -PathType Leaf) -and [System.IO.Path]::GetExtension($filePath) -eq "") {
      $htmlCandidate = "$filePath.html"
      if (Test-Path $htmlCandidate -PathType Leaf) { $filePath = $htmlCandidate }
    }
    if (Test-Path $filePath -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
      $contentType = $mime[$ext]
      if (-not $contentType) { $contentType = "application/octet-stream" }
      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      $res.ContentType = $contentType
      $res.ContentLength64 = $bytes.Length
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $res.StatusCode = 404
      $notFoundPath = Join-Path $root "404.html"
      if (Test-Path $notFoundPath) {
        $bytes = [System.IO.File]::ReadAllBytes($notFoundPath)
        $res.ContentType = "text/html; charset=utf-8"
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
      }
    }
  } catch {
  } finally {
    $res.OutputStream.Close()
  }
}
