<?php
require 'conexion.php';

class PublicacionesAprobadas {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Obtener publicaciones aprobadas
    public function getApprovedPublications() {
        $sql = "SELECT * FROM publicacion WHERE estadoPublicacion = true";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

// Manejo de la API
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $publicaciones = new PublicacionesAprobadas($conn);
    header('Content-Type: application/json');
    echo json_encode($publicaciones->getApprovedPublications());
} else {
    http_response_code(405); // Método no permitido
    echo json_encode(["mensaje" => "Método no permitido"]);
}
?>
