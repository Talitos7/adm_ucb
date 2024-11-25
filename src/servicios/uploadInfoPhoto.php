<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); // Cambiar * si necesitas restringir el acceso
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Ruta donde se guardarán las imágenes
$uploadDir = __DIR__ . '/../assets/';

// Verificar si se envió el archivo
if (isset($_FILES['image'])) {
    $file = $_FILES['image'];

    // Validar errores en la subida del archivo
    if ($file['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Error al subir el archivo.',
            'error_code' => $file['error']
        ]);
        exit;
    }

    // Validar tipo de archivo
    $validMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!in_array($file['type'], $validMimeTypes)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Solo se permiten archivos JPG o PNG.'
        ]);
        exit;
    }

    // Crear un nombre único para el archivo
    $fileName = uniqid() . '_' . basename($file['name']);
    $targetPath = $uploadDir . $fileName;

    // Crear el directorio si no existe
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Mover el archivo al directorio de destino
    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        echo json_encode([
            'success' => true,
            'path' => '/src/assets/' . $fileName // Ruta relativa para usar en la aplicación
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Error al guardar el archivo en el servidor.'
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'No se recibió ningún archivo.'
    ]);
}
