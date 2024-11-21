<?php
header("Access-Control-Allow-Origin: https://localhost:3000"); // Cambia por tu dominio
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');
include 'conexion.php';
include 'middleware.php';

// Validar límite de solicitudes
checkRateLimit($conn, $_SERVER['REMOTE_ADDR']);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Filtrar por estado (pendientes: false)
    $estado = isset($_GET['estado']) && $_GET['estado'] === 'true' ? 1 : 0; // Convertimos a 1 o 0
    $query = "SELECT * FROM publicacion WHERE estadopublicacion = :estado"; // Usamos un parámetro
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':estado', $estado, PDO::PARAM_BOOL); // Vinculamos el parámetro

    try {
        $stmt->execute();
        $publicaciones = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($publicaciones);
    } catch (PDOException $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['idPublicacion'];
    $estado = $data['estado'] ? 1 : 0; // Convertimos a 1 o 0

    $query = "UPDATE publicacion SET estadopublicacion = :estado WHERE idpublicacion = :id"; // Usamos parámetros
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':estado', $estado, PDO::PARAM_BOOL);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);

    try {
        $stmt->execute();
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
    exit;
}
