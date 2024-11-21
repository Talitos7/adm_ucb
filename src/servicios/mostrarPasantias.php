<?php
header("Access-Control-Allow-Origin: https://localhost:3000"); // Cambia por tu dominio
header("Access-Control-Allow-Methods: GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
include 'conexion.php';
include 'middleware.php';

// Validar límite de solicitudes
checkRateLimit($conn, $_SERVER['REMOTE_ADDR']);

// Ruta base donde se almacenan las imágenes
$baseUrl = "http://localhost/adm_ucb/src/servicios/uploads/";

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    try {
        $stmt = $conn->prepare("SELECT * FROM pasantias");
        $stmt->execute();

        $pasantias = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($pasantias) {
            foreach ($pasantias as &$pasantia) {
                if (!empty($pasantia['imagen'])) {
                    $pasantia['imagen_url'] = $baseUrl . $pasantia['imagen'];
                } else {
                    $pasantia['imagen_url'] = null;
                }
            }

            echo json_encode(['success' => true, 'pasantias' => $pasantias]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No se encontraron pasantías.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => 'Error en la base de datos: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
}
?>
