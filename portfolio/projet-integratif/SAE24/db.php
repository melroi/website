<?php
$host = 'localhost';
$dbname = 'auth_db';
$user = 'root';
$pass = 'patate'; // par défaut, pas de mot de passe avec XAMPP

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    echo "";
} catch (PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
}
?>
