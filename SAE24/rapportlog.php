<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Compte rendu projet</title>
  <link rel="stylesheet" href="styles.css">
</head>


  <header>
    <img src="logo.png" class="zoom">
        <div class="seco">
      <a href="logout.php" class="bindex">Se déconnecter</a>
    </div>
    <div class="haut">
    <h1>Compte-rendu projet</h1>
    <p>QUENET Noa - LAFILOLIE Lilian - HADROT Melchior - SALIEGE Tom - ASSSAILLY Allan</p>
    </div>
  </header>
  
<body>
<nav>
    <section class="navigation">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="navigation">
            <nav id="navmenu">
              <ul>
                <li class="active"><a href="dashboard.php">ACCUEIL</a></li>
                <li><a href="client.html">CLIENT</a></li>
                <li><a href="#">RAPPORT ▼</a>
                  <ul>
                    <li><a href="infra.html">INFRASTRUCTURE</a></li>
                    <li><a href="switch.html">SWITCH</a></li>
                    <li><a href="routeur.html">ROUTEUR</a></li>
                    <li><a href="#">SERVEUR LINUX ▶</a>
                      <ul>
                        <li><a href="dhcp.html">DHCP</a></li>
                        <li><a href="apache.html">APACHE</a></li>
                        <li><a href="ssh.html">SSH</a></li>
                        <li><a href="rsync.html">RSYNC</a></li>
                        <li><a href="swap.html">MEMOIRE SWAP</a></li>
                        <li><a href="ftp.html">FTP</a></li>
                        <li><a href="mail.html">MAIL</a></li>
                        <li><a href="fail.html">FAIL2BAN</a></li>
                      </ul>
                    </li>
                    <li><a href="#">SERVEUR WINDOWS ▶</a>
                      <ul>
                        <li><a href="dns.html">DNS</a></li>
                        <li><a href="ad.html">USERS / GROUPS</a></li>
                      </ul>
                    </li>
                    <li><a href="wifi.html">AP WIFI</a></li>
                    <li><a href="#">TELEPHONIE ▶</a>
                      <ul>
                        <li><a href="call.html">CALL SERVER</a></li>
                        <li><a href="tel.html">TELEPHONES</a></li>
                      </ul>
                    </li>
                    <li><a href="pf.html">PARE-FEU</a></li>                    
                  </ul>
                </li>
                <li><a href="#">ATTAQUES / MESURES ▼</a>
                  <ul>
                    <li><a href="dhcpss.html">DHCP</a></li>
                    <li><a href="public.html">VLAN PUBLIC</a></li>
                    <li><a href="parefeu.html">PARE-FEU</a></li>
                  </ul>
                </li>
                <li><a href="#">LOGS ▼</a>
                  <ul>
                    <li><a href="config.html">CONFIGURATION</a></li>
                    <li><a href="">RAPPORT DE LOGS ▶</a>
		       <ul>
			  <li><a href="rl.php">LOG DHCP</a></li>
			  <li><a href="rapportlog.php">DETECTION</a></li>
		       </ul>
		    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </section>

</nav>


    <main>
    <section class="content">
<?php
$logFile = '/var/www/patate/logs/dhcp.log';

if (!file_exists($logFile)) {
    echo "Fichier de log introuvable.";
    exit;
}

$contenu = file($logFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

$macCounts = [];
$timeWindow = 60; // secondes
$requests = [];

foreach ($contenu as $ligne) {
    // Supposons que les lignes ressemblent à : "2025-06-19 14:03:01 DHCPDISCOVER from 00:11:22:33:44:55"
    if (preg_match('/(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}).*DHCPDISCOVER from ([0-9a-f:]{17})/i', $ligne, $matches)) {
        $timestamp = strtotime($matches[1]);
        $mac = strtolower($matches[2]);
        $requests[] = ['time' => $timestamp, 'mac' => $mac];
    }
}

// Analyse sur une fenêtre glissante
$possibleAttack = false;
$threshold = 30; // seuil de MAC différentes en moins de $timeWindow secondes

for ($i = 0; $i < count($requests); $i++) {
    $startTime = $requests[$i]['time'];
    $macs = [];

    for ($j = $i; $j < count($requests); $j++) {
        if ($requests[$j]['time'] - $startTime > $timeWindow) break;
        $macs[$requests[$j]['mac']] = true;
    }

    if (count($macs) >= $threshold) {
        $possibleAttack = true;
        echo "<p>⚠️ Suspicion d'attaque DHCP Starvation détectée entre " .
             date('H:i:s', $startTime) . " et " . 
             date('H:i:s', $requests[$j - 1]['time']) . 
             " avec " . count($macs) . " adresses MAC différentes.</p>";
        break;
    }
}

if (!$possibleAttack) {
    echo "<p>Aucune activité suspecte détectée dans le fichier de log.</p>";
}
?>
    </section>
 <br>
 <br>
 <br>
 <br>
 <br>
 <br>
 <br>
 <br>
 <br>
 <br>
 <br>
 <br>
 <br>
 <br>
 <br>
 <br>
 <br>
 <br>
 <br>
 <br>
 <br>
 <br>
 <br>
  </main>

  <footer>
    <p>&copy; 2025 - Réseaux & CO. Tous droits réservés.</p>
  </footer>

</body>
</html>

