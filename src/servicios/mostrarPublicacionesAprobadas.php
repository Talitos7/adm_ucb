<?php
require 'conexion.php';

class Publicacion {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getApprovedPublicationsByCategory($categoria) {
        $sql = "SELECT * FROM publicacion WHERE estadoPublicacion = true AND categoria = :categoria";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':categoria', $categoria, PDO::PARAM_STR);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

header('Content-Type: application/json');

try {
    $categoria = isset($_GET['categoria']) ? $_GET['categoria'] : null; // Leer categoría desde GET
    if (!$categoria) {
        http_response_code(400);
        echo json_encode(["error" => "La categoría es requerida"]);
        exit();
    }

    $publicacion = new Publicacion($conn);
    echo json_encode($publicacion->getApprovedPublicationsByCategory($categoria));
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error al obtener publicaciones aprobadas"]);
}
?>
