$p = 'projects.html'
$c = [System.IO.File]::ReadAllText($p)

$cards = @(
    @('images/project-1.jpg?v=2', 'Commercial Landscaping', '01'),
    @('images/project-2.jpg?v=2', 'Horticulture', '02'),
    @('images/project-3.jpg?v=2', 'Event Management', '03'),
    @('images/project-4.jpg?v=2', 'Housekeeping', '04'),
    @('images/project-5.jpg?v=2', 'Maintenance', '05'),
    @('images/project-6.jpg?v=2', 'Solar Solutions', '06')
)

foreach ($card in $cards) {
    $src = $card[0]; $title = $card[1]; $num = $card[2]

    $oldImg = '<img src="' + $src + '" alt="' + $title + '">'
    $newImg = '<img src="' + $src + '" alt="' + $title + '" loading="lazy" decoding="async">'
    if (-not $c.Contains($oldImg)) { Write-Error "NOT FOUND: $oldImg"; exit 1 }
    $c = $c.Replace($oldImg, $newImg)

    $oldSpan = '<span>' + $title + '</span><h3>' + $title + '</h3>'
    $newSpan = '<span>' + $num + '</span><h3>' + $title + '</h3>'
    if (-not $c.Contains($oldSpan)) { Write-Error "NOT FOUND: $oldSpan"; exit 1 }
    $c = $c.Replace($oldSpan, $newSpan)
}

[System.IO.File]::WriteAllText($p, $c, (New-Object System.Text.UTF8Encoding($false)))
Write-Output 'OK: 6 project cards updated'