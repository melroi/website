# Script PowerShell pour ajouter
# Ajoute <meta name="robots" content="noindex, nofollow"> dans la section <head>
# pour tous les fichiers .html sous portfolio\projet-integratif s'il n'existe pas déjà.

$scriptRoot = $PSScriptRoot
$targetPath = Join-Path $scriptRoot "..\portfolio\projet-integratif"
try {
    $target = (Resolve-Path $targetPath).ProviderPath
} catch {
    Write-Error "Chemin introuvable: $targetPath"
    exit 1
}

Write-Output "Recherche des fichiers HTML sous: $target"

$files = Get-ChildItem -Path $target -Recurse -Filter *.html -File -ErrorAction SilentlyContinue

foreach ($f in $files) {
    $path = $f.FullName
    try {
        $text = Get-Content -Raw -Encoding UTF8 -ErrorAction Stop $path
    } catch {
        Write-Warning "Impossible de lire $path : $_"
        continue
    }

    # Vérifie si une balise robots existe déjà (insensible à la casse)
    # On cherche simplement le mot "robots" dans une balise meta pour éviter les problèmes d'échappement
    if ($text -match '(?i)<meta[^>]*\brobots\b') {
        Write-Output "Déjà présent : $path"
        continue
    }

    if ($text -match "(?i)<head\b[^>]*>") {
    # Prépare la chaîne à insérer (utilise des quotes simples dans l'attribut pour simplifier)
    $insert = "`r`n    <meta name='robots' content='noindex, nofollow'>"
        $replacement = '$1' + $insert
        try {
            $newText = [regex]::Replace($text, '(?i)(<head\b[^>]*>)', $replacement)
            Set-Content -Encoding UTF8 -Value $newText -Path $path -ErrorAction Stop
            Write-Output "Mise à jour : $path"
        } catch {
            Write-Warning "Erreur écriture $path : $_"
        }
    } else {
        Write-Warning "Pas de <head> trouvé dans $path - ignoré"
    }
}

Write-Output "Opération terminée."
