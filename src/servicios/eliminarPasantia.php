<?php
header("Access-Control-Allow-Origin: https://localhost:3000"); // Cambia por tu dominio
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
include 'conexion.php';
include 'middleware.php';

// Validar límite de solicitudes
checkRateLimit($conn, $_SERVER['REMOTE_ADDR']);

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['idpsantia'])) {
        echo json_encode(['success' => false, 'message' => 'El campo "idpsantia" es obligatorio.']);
        exit();
    }

    $idPasantia = $data['idpsantia'];

    try {
        $stmt = $conn->prepare("SELECT * FROM pasantias WHERE idpsantia = :idpsantia");
        $stmt->bindParam(':idpsantia', $idPasantia);
        $stmt->execute();

        if ($stmt->rowCount() == 0) {
            echo json_encode(['success' => false, 'message' => 'Pasantía no encontrada.']);
            exit();
        }

        $stmtDelete = $conn->prepare("DELETE FROM pasantias WHERE idpsantia = :idpsantia");
        $stmtDelete->bindParam(':idpsantia', $idPasantia);

        if ($stmtDelete->execute()) {
            echo json_encode(['success' => true, 'message' => 'Pasantía eliminada con éxito.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al eliminar la pasantía.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error en la base de datos: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
?>
