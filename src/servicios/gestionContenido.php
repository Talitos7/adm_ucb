<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

include 'conexion.php'; // Se incluye solo una vez

class GestionContenido {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Obtener publicaciones pendientes
    public function getPendingPublications() {
        $sql = "SELECT * FROM publicacion WHERE estadoPublicacion = false";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Aprobar o rechazar una publicación
    public function updatePublicationStatus($idPublicacion, $newStatus) {
        $sql = "UPDATE publicacion SET estadoPublicacion = :newStatus WHERE idPublicacion = :idPublicacion";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':newStatus', $newStatus, PDO::PARAM_BOOL);
        $stmt->bindParam(':idPublicacion', $idPublicacion);
        if ($stmt->execute()) {
            return ['success' => true, 'message' => 'Estado de publicación actualizado.'];
        } else {
            return ['success' => false, 'message' => 'Error al actualizar el estado de la publicación.'];
        }
    }
}

// Procesar las solicitudes HTTP
$conn = (new Conexion())->getConnection(); // Única instancia de conexión
$gestion = new GestionContenido($conn);

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents('php://input'), true);

if ($method === 'GET' && isset($_GET['action']) && $_GET['action'] === 'getPending') {
    echo json_encode(['success' => true, 'data' => $gestion->getPendingPublications()]);
} elseif ($method === 'POST' && isset($data['action']) && $data['action'] === 'updateStatus') {
    echo json_encode($gestion->updatePublicationStatus($data['idPublicacion'], $data['newStatus']));
}
?>
