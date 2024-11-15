<?php
$host = 'localhost';
$dbname = 'ADM';
$username = 'postgres';
$password = 'admin';

try {
    $conn = new PDO("pgsql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexión exitosa"; 
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
    exit();
}
?>