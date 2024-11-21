<?php
header("Access-Control-Allow-Origin: https://localhost:3000"); // Cambia por tu dominio
include 'conexion.php';
include 'middleware.php';

// Validar límite de solicitudes
checkRateLimit($conn, $_SERVER['REMOTE_ADDR']);

class Publicacion {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getApprovedPublications($categoria) {
        $sql = "SELECT * FROM publicacion WHERE estadoPublicacion = true AND categoria = :categoria";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':categoria', $categoria);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

header('Content-Type: application/json');

try {
    $publicacion = new Publicacion($conn);

    // Verifica si se pasó la categoría como parámetro
    $categoria = isset($_GET['categoria']) ? $_GET['categoria'] : null;

    if (!$categoria) {
        echo json_encode(["error" => "Categoría no especificada"]);
        http_response_code(400); // Bad Request
        exit;
    }

    $publicaciones = $publicacion->getApprovedPublications($categoria);
    echo json_encode($publicaciones);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error al obtener publicaciones aprobadas"]);
}
?>
