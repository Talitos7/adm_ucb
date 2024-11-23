<?php
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Origin: http://localhost:3000"); // Cambia por tu dominio
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');
include 'conexion.php';
include 'middleware.php';
include 'headers.php';
// Validar límite de solicitudes
checkRateLimit($conn, $_SERVER['REMOTE_ADDR']);

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
        // Validar y ajustar la URL de la imagen
        if (!empty($row['urlFotoEvento']) && !filter_var($row['urlFotoEvento'], FILTER_VALIDATE_URL)) {
            $row['urlFotoEvento'] = "http://localhost/adm_ucb/src/" . $row['urlFotoEvento'];
        }
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
    $query = "INSERT INTO evento (fechaInicio, fechaFin, hora, enlaceRegistro, descripcion, estado, usuario_emailAdm, titulo, urlFotoEvento) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);

    if ($stmt->execute([
        $data['fechaInicio'],
        $data['fechaFin'],
        $data['hora'],
        $data['enlaceRegistro'],
        $data['descripcion'],
        $data['estado'],
        $data['usuario_emailAdm'],
        $data['titulo'],
        $data['urlFotoEvento']
    ])) {
        $lastId = $conn->lastInsertId();
        response("success", "Evento creado exitosamente.", ["idEvento" => $lastId]);
    } else {
        response("error", "Error al crear el evento.");
    }
}

// Actualizar un evento
function updateEvento($idEvento, $data) {
    global $conn;

    $query = "UPDATE evento SET ";

    // Construir los campos dinámicamente según los datos enviados
    $fields = [];
    $values = [];
    foreach ($data as $key => $value) {
        $fields[] = "$key = ?";
        if ($key === 'estado') {
            // Convertir booleano a formato aceptado por PostgreSQL
            $values[] = filter_var($value, FILTER_VALIDATE_BOOLEAN) ? 'TRUE' : 'FALSE';
        } else {
            $values[] = $value;
        }
    }
    $query .= implode(', ', $fields) . " WHERE idEvento = ?";

    // Agregar el ID del evento al final de los valores
    $values[] = $idEvento;

    $stmt = $conn->prepare($query);

    try {
        $stmt->execute($values);
        if ($stmt->rowCount() > 0) {
            response("success", "Evento actualizado exitosamente.");
        } else {
            response("warning", "No se realizaron cambios en el evento.");
        }
    } catch (PDOException $e) {
        response("error", "Error de base de datos: " . $e->getMessage());
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
