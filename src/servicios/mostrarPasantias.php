<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

include 'conexion.php'; // Incluye la conexión a la base de datos

// Verificar si se hace una solicitud GET
if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    try {
        // Preparar la consulta para obtener todas las pasantías
        $stmt = $conn->prepare("SELECT * FROM pasantias");
        $stmt->execute();

        // Obtener los resultados
        $pasantias = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($pasantias) {
            // Si hay pasantías, devolverlas como JSON
            echo json_encode(['success' => true, 'pasantias' => $pasantias]);
        } else {
            // Si no hay pasantías, devolver un mensaje adecuado
            echo json_encode(['success' => false, 'message' => 'No se encontraron pasantías.']);
        }
    } catch (PDOException $e) {
        // Manejar el error si algo falla con la base de datos
        echo json_encode(['success' => false, 'error' => 'Error en la base de datos: ' . $e->getMessage()]);
    }
} else {
    // Si el método no es GET, devolver un error
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
}
?>
