<?php
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');
include 'conexion.php';
include 'middleware.php';
include 'headers.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

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
            if (isset($_GET['action']) && $_GET['action'] === 'changeState' && isset($_GET['idEvento'])) {
                changeState($_GET['idEvento']);
            } elseif ($input && isset($_GET['idEvento'])) {
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
    global $conn, $key;

    // Validar el token JWT
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        response("error", "No autorizado. Token faltante.");
    }

    $jwt = str_replace("Bearer ", "", $headers['Authorization']);

    try {
        $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
    } catch (Exception $e) {
        response("error", "Token inválido: " . $e->getMessage());
    }

    // Combinar fecha y hora correctamente
    $fechaHora = $data['fechainicio'] . ' ' . $data['hora'];

    // Crear el evento
    $query = "INSERT INTO evento (fechainicio, fechafin, hora, enlaceregistro, descripcion, estado, usuario_emailadm, urlfotoevento) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($query);

    try {
        $values = [
            $data['fechainicio'],
            $data['fechafin'],
            $fechaHora, // Fecha y hora combinadas
            $data['enlaceregistro'],
            $data['descripcion'],
            filter_var($data['estado'], FILTER_VALIDATE_BOOLEAN) ? 'TRUE' : 'FALSE',
            $data['usuario_emailAdm'],
            $data['urlfotoevento']
        ];

        if ($stmt->execute($values)) {
            $lastId = $conn->lastInsertId();
            response("success", "Evento creado exitosamente.", ["idEvento" => $lastId]);
        } else {
            response("error", "Error al crear el evento.");
        }
    } catch (PDOException $e) {
        response("error", "Error al crear el evento: " . $e->getMessage());
    }
}

// Actualizar un evento
function updateEvento($idEvento, $data) {
    global $conn;

    $query = "UPDATE evento SET 
                fechainicio = ?, 
                fechafin = ?, 
                hora = ?, 
                enlaceregistro = ?, 
                descripcion = ?, 
                estado = ?, 
                urlfotoevento = ? 
              WHERE idevento = ?";

    $stmt = $conn->prepare($query);

    try {
        $stmt->execute([
            $data['fechainicio'],
            $data['fechafin'],
            $data['hora'],
            $data['enlaceregistro'],
            $data['descripcion'],
            filter_var($data['estado'], FILTER_VALIDATE_BOOLEAN) ? 'TRUE' : 'FALSE',
            $data['urlfotoevento'],
            $idEvento
        ]);

        if ($stmt->rowCount() > 0) {
            response("success", "Evento actualizado exitosamente.");
        } else {
            response("warning", "No se realizaron cambios en el evento.");
        }
    } catch (PDOException $e) {
        response("error", "Error al actualizar el evento: " . $e->getMessage());
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
function changeState($idEvento) {
    global $conn;

    // Verificar que se reciba un ID válido
    if (!$idEvento) {
        response("error", "ID del evento es obligatorio.");
    }

    try {
        // Cambiar el estado a false
        $query = "UPDATE evento SET estado = FALSE WHERE idevento = ?";
        $stmt = $conn->prepare($query);
        $stmt->execute([$idEvento]);

        // Registrar el resultado de la operación
        if ($stmt->rowCount() > 0) {
            response("success", "Estado cambiado exitosamente.");
        } else {
            response("warning", "No se realizaron cambios en el evento.");
        }
    } catch (PDOException $e) {
        // Registrar errores en la base de datos
        response("error", "Error al cambiar el estado del evento: " . $e->getMessage());
    }
}


?>
