<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Permitir todas las solicitudes CORS
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type"); // Encabezados permitidos

// Ruta al archivo JSON
$filepath = __DIR__ . '/../assets/information.json';

// Función para enviar una respuesta en formato JSON
function sendResponse($status, $message, $data = null) {
    echo json_encode([
        "status" => $status,
        "message" => $message,
        "data" => $data
    ]);
    exit;
}

// Verificar si el archivo JSON existe
if (!file_exists($filepath)) {
    sendResponse("error", "El archivo JSON no existe.");
}

// Manejo de solicitudes GET y POST
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Obtener una sección específica
    if (isset($_GET['section']) && !empty($_GET['section'])) {
        $section = $_GET['section'];

        $data = json_decode(file_get_contents($filepath), true);

        if (isset($data['sections'][$section])) {
            sendResponse("success", "Sección cargada correctamente.", $data['sections'][$section]);
        } else {
            sendResponse("error", "Sección no encontrada.");
        }
    } else {
        // Si no se especifica sección, devolver todo el contenido
        $data = json_decode(file_get_contents($filepath), true);
        sendResponse("success", "Contenido completo cargado.", $data);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Leer el cuerpo de la solicitud
    $input = json_decode(file_get_contents("php://input"), true);

    if (isset($input['section']) && isset($input['content'])) {
        $section = $input['section'];
        $content = $input['content'];

        // Leer el archivo JSON actual
        $data = json_decode(file_get_contents($filepath), true);

        // Actualizar la sección especificada
        $data['sections'][$section] = $content;

        // Guardar los cambios en el archivo JSON
        if (file_put_contents($filepath, json_encode($data, JSON_PRETTY_PRINT))) {
            sendResponse("success", "Información actualizada correctamente.");
        } else {
            sendResponse("error", "No se pudo actualizar la información.");
        }
    } else {
        sendResponse("error", "Datos inválidos.");
    }
}

// Manejo de solicitudes OPTIONS para CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}

// Si no coincide con ningún método válido
sendResponse("error", "Método no permitido.");
