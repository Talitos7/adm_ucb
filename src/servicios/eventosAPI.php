<?php
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');
include 'conexion.php';

// Obtener el método HTTP
$method = $_SERVER['REQUEST_METHOD'];

// Obtener el cuerpo de la solicitud si es POST o PUT
$input = json_decode(file_get_contents("php://input"), true);

// Función para generar una respuesta JSON
function response($status, $message, $data = null) {
    echo json_encode(["status" => $status, "message" => $message, "data" => $data]);
    exit();
}

// Manejo de rutas
switch ($method) {
    case 'GET':
        if (isset($_GET['idEvento'])) {
            getEvento($_GET['idEvento']);
        } else {
            getEventos();
        }
        break;

    case 'POST':
        if ($input) {
            createEvento($input);
        } else {
            response("error", "No se enviaron datos.");
        }
        break;

    case 'PUT':
        if ($input && isset($_GET['idEvento'])) {
            updateEvento($_GET['idEvento'], $input);
        } else {
            response("error", "Faltan datos para la actualización.");
        }
        break;

    case 'DELETE':
        if (isset($_GET['idEvento'])) {
            deleteEvento($_GET['idEvento']);
        } else {
            response("error", "Falta el ID del evento a eliminar.");
        }
        break;

    default:
        response("error", "Método no soportado.");
}

// Funciones CRUD

// Obtener todos los eventos
function getEventos() {
    global $conn;
    $query = "SELECT * FROM evento";
    $stmt = $conn->query($query);

    $eventos = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $eventos[] = $row;
    }

    response("success", "Eventos obtenidos exitosamente.", $eventos);
}

// Obtener un evento por ID
function getEvento($idEvento) {
    global $conn;
    $query = "SELECT * FROM evento WHERE idEvento = ?";
    $stmt = $conn->prepare($query);
    $stmt->execute([$idEvento]);
    $evento = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($evento) {
        response("success", "Evento obtenido exitosamente.", $evento);
    } else {
        response("error", "No se encontró el evento.");
    }
}

// Crear un nuevo evento
function createEvento($data) {
    global $conn;
    $query = "INSERT INTO evento (fechaInicio, fechaFin, hora, enlaceRegistro, descripcion, estado, usuario_emailAdm, titulo) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);

    if ($stmt->execute([
        $data['fechaInicio'],
        $data['fechaFin'],
        $data['hora'],
        $data['enlaceRegistro'],
        $data['descripcion'],
        $data['estado'],
        $data['usuario_emailAdm'],
        $data['titulo']
    ])) {
        $lastId = $conn->lastInsertId();
        response("success", "Evento creado exitosamente.", ["idEvento" => $lastId]);
    } else {
        response("error", "Error al crear el evento.");
    }
}

// Actualizar un evento
// Actualizar un evento
function updateEvento($idEvento, $data) {
    global $conn;

    // Validar y convertir el estado a un booleano explícito
    if (!isset($data['estado']) || !is_bool($data['estado'])) {
        response("error", "El campo 'estado' debe ser un booleano válido (true o false).");
    }
    $estado = $data['estado'];

    $query = "UPDATE evento 
              SET fechaInicio = ?, fechaFin = ?, hora = ?, enlaceRegistro = ?, descripcion = ?, estado = ?, usuario_emailAdm = ?, titulo = ? 
              WHERE idEvento = ?";
    $stmt = $conn->prepare($query);

    if ($stmt->execute([
        $data['fechaInicio'],
        $data['fechaFin'],
        $data['hora'],
        $data['enlaceRegistro'],
        $data['descripcion'],
        $estado, // Valor booleano asegurado
        $data['usuario_emailAdm'],
        $data['titulo'],
        $idEvento
    ])) {
        response("success", "Evento actualizado exitosamente.");
    } else {
        response("error", "Error al actualizar el evento.");
    }
}

// Eliminar un evento
function deleteEvento($idEvento) {
    global $conn;
    $query = "DELETE FROM evento WHERE idEvento = ?";
    $stmt = $conn->prepare($query);

    if ($stmt->execute([$idEvento])) {
        response("success", "Evento eliminado exitosamente.");
    } else {
        response("error", "Error al eliminar el evento.");
    }
}
?>
