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
        if (isset($_GET['idEmpresa'])) {
            getEmpresa($_GET['idEmpresa']);
        } elseif (isset($_GET['nombreEmpresa'])) {
            getEmpresaNombre($_GET['nombreEmpresa']); // Llamar a la función con el nombre
        } else {
            getEmpresas();
        }
        break;

    case 'POST':
        if ($input) {
            createEmpresa($input);
        } else {
            response("error", "No se enviaron datos.");
        }
        break;

    case 'PUT':
        if ($input && isset($_GET['idEmpresa'])) {
            updateEmpresa($_GET['idEmpresa'], $input);
        } else {
            response("error", "Faltan datos para la actualización.");
        }
        break;

    case 'DELETE':
        if (isset($_GET['idEmpresa'])) {
            deleteEmpresa($_GET['idEmpresa']);
        } else {
            response("error", "Falta el ID de la empresa a eliminar.");
        }
        break;

    default:
        response("error", "Método no soportado.");
}

// Funciones CRUD

// Obtener todas las empresas
function getEmpresas() {
    global $conn; // Cambiado de $db a $conn
    $query = "SELECT * FROM empresas";
    $stmt = $conn->query($query);

    $empresas = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $empresas[] = $row;
    }

    response("success", "Empresas obtenidas exitosamente.", $empresas);
}

// Obtener una empresa por ID
function getEmpresa($idEmpresa) {
    global $conn; // Cambiado de $db a $conn
    $query = "SELECT * FROM empresas WHERE idEmpresa = ?";
    $stmt = $conn->prepare($query);
    $stmt->execute([$idEmpresa]);
    $empresa = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($empresa) {
        response("success", "Empresa obtenida exitosamente.", $empresa);
    } else {
        response("error", "No se encontró la empresa.");
    }
}

// Obtener una o más empresas por nombre
function getEmpresaNombre($nombreEmpresa) {
    global $conn; // Cambiado de $db a $conn

    // Consulta para buscar empresas con el mismo nombre
    $query = "SELECT * FROM empresas WHERE nombreEmpresa = ?";
    $stmt = $conn->prepare($query);
    $stmt->execute([$nombreEmpresa]);

    $empresas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!empty($empresas)) {
        response("success", "Empresas obtenidas exitosamente.", $empresas);
    } else {
        response("error", "No se encontraron empresas con el nombre proporcionado.");
    }
}

// Crear una empresa
function createEmpresa($data) {
    global $conn;

    // Verificar si ya existe una imagen con el mismo nombre
    $queryCheck = "SELECT COUNT(*) as count FROM empresas WHERE imagenEmpresa = ?";
    $stmtCheck = $conn->prepare($queryCheck);
    $stmtCheck->execute([$data['imagenEmpresa']]);
    $resultCheck = $stmtCheck->fetch(PDO::FETCH_ASSOC);

    if ($resultCheck['count'] > 0) {
        response("error", "El nombre de la imagen ya existe. Por favor, elige otro.");
    }

    // Insertar la nueva empresa si el nombre de la imagen es único
    $query = "INSERT INTO empresas (nombreEmpresa, imagenEmpresa, descripcionEmpresa) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($query);

    if ($stmt->execute([$data['nombreEmpresa'], $data['imagenEmpresa'], $data['descripcionEmpresa']])) {
        $lastId = $conn->lastInsertId(); // Obtener el ID generado automáticamente
        response("success", "Empresa creada exitosamente.", ["idEmpresa" => $lastId]);
    } else {
        response("error", "Error al crear la empresa.");
    }
}


// Actualizar una empresa
function updateEmpresa($idEmpresa, $data) {
    global $conn; // Cambiado de $db a $conn
    $query = "UPDATE empresas SET nombreEmpresa = ?, imagenEmpresa = ?, descripcionEmpresa = ? WHERE idEmpresa = ?";
    $stmt = $conn->prepare($query);

    if ($stmt->execute([$data['nombreEmpresa'], $data['imagenEmpresa'], $data['descripcionEmpresa'], $idEmpresa])) {
        response("success", "Empresa actualizada exitosamente.");
    } else {
        response("error", "Error al actualizar la empresa.");
    }
}

// Eliminar una empresa
function deleteEmpresa($idEmpresa) {
    global $conn; // Cambiado de $db a $conn
    $query = "DELETE FROM empresas WHERE idEmpresa = ?";
    $stmt = $conn->prepare($query);

    if ($stmt->execute([$idEmpresa])) {
        response("success", "Empresa eliminada exitosamente.");
    } else {
        response("error", "Error al eliminar la empresa.");
    }
}
?>
