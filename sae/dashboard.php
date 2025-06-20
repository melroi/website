

<!--Serveur linux-->
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
    <p>QUENET Noa - LAFILOLIE Lilian - HADROT Melchior - SALIEGE Tom - ASSAILLY Allan</p>
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
      <?php
session_start();
if (!isset($_SESSION['username'])) {
    header("Location: index.html");
    exit;
}
?>
    <br>
    <section class="content">
    <h2>Bienvenue, <?php echo htmlspecialchars($_SESSION['username']); ?> !</h2>
    </section>
    <br>
      <section class="content">
      <h2>Notre objectif :</h2>
      <br>
      <p>Conception et mise en place d'une infrastructure correspondant au réseau de votre entreprise constituée de plusieurs services : finance, RH, technique avec </p>
      <br>
      <ul>
        <li>Quelques postes clients ayant accès à Internet</li>
        <li>Des serveurs hébergeant les services réseaux (partage de fichier FTP, dhcp, web…)</li>
      </ul>
      <br>
      <p>Il faudra être en mesure de vérifier le bon fonctionnement du service dhcp</p>
      <br>
      <ul>
        <li>Faire un suivi des logs permettant un suivi de l’activité du serveur</li>
        <li>Faire en sorte que les attaques sur le service dhcp soient détectées et empêchées :</li>
          <div class="indent">
          <ul>
            <li>Empêcher les rogues DHCP (DHCP spoofing)</li>
            <li>Empêcher les DHCP starvation</li>
          </ul>
        </div>
      </ul>
    </section>
  <br>
  <br>
  </main>

  <footer>
    <p>&copy; 2025 - Réseaux & CO. Tous droits réservés.</p>
  </footer>

</body>
</html>

