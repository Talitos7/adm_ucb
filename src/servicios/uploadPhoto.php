<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:3000"); // Cambia por tu dominio
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
include 'middleware.php';
include 'headers.php';
// Validar límite de solicitudes
checkRateLimit($conn, $_SERVER['REMOTE_ADDR']);

if (isset($_FILES['image'])) {
    $file = $_FILES['image'];
    $fileName = uniqid() . '_' . basename($file['name']);
    $targetPath = __DIR__ . '/../assets/' . $fileName;

    // Crear la carpeta si no existe
    if (!is_dir(__DIR__ . '/../assets')) {
        mkdir(__DIR__ . '/../assets', 0777, true);
    }

    // Mover el archivo al directorio de destino
    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        echo json_encode([
            'success' => true,
            'path' => 'assets/' . $fileName // Ruta relativa
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Error al mover el archivo'
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'No se recibió ningún archivo'
    ]);
}
?>
