<?php
require 'conexion.php';

class Publicacion {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getApprovedPublications() {
        $sql = "SELECT * FROM publicacion WHERE estadoPublicacion = true";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

header('Content-Type: application/json');

try {
    $publicacion = new Publicacion($conn);
    echo json_encode($publicacion->getApprovedPublications());
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error al obtener publicaciones aprobadas"]);
}
?>
