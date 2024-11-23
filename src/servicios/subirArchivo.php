<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Definir la carpeta base y la carpeta específica para subir las fotos
$baseDir = realpath(__DIR__); // Obtiene la ruta absoluta del directorio actual
$uploadDir = $baseDir . '/uploadsEventos/'; // Ruta completa para guardar archivos

// Asegurar que la carpeta exista o crearla si no existe
if (!is_dir($uploadDir)) {
    if (!mkdir($uploadDir, 0777, true) && !is_dir($uploadDir)) {
        echo json_encode([
            "status" => "error",
            "message" => "No se pudo crear el directorio de subida."
        ]);
        exit();
    }
}

// Verificar si se envió un archivo
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $file = $_FILES['file'];

    // Validar si ocurrió un error en la subida
    if ($file['error'] !== UPLOAD_ERR_OK) {
        echo json_encode([
            "status" => "error",
            "message" => "Error al subir el archivo: " . $file['error']
        ]);
        exit();
    }

    // Validar el tipo de archivo permitido (solo imágenes)
    $allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!in_array($file['type'], $allowedTypes)) {
        echo json_encode([
            "status" => "error",
            "message" => "Tipo de archivo no permitido. Solo se permiten imágenes (JPEG, PNG)."
        ]);
        exit();
    }

    // Generar un nombre único para el archivo
    $fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $fileName = uniqid('evento_', true) . '.' . $fileExtension;

    // Definir la ruta completa del archivo
    $filePath = $uploadDir . $fileName;

    // Mover el archivo a la carpeta destino
    if (move_uploaded_file($file['tmp_name'], $filePath)) {
        echo json_encode([
            "status" => "success",
            "message" => "Archivo subido exitosamente.",
            "filePath" => "servicios/uploadsEventos/" . $fileName // Ruta relativa para la BD
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "No se pudo mover el archivo al directorio destino."
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "No se recibió ningún archivo."
    ]);
}
?>
