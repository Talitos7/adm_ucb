<?php
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Origin: https://localhost:3000"); // Cambia por tu dominio
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Content-Type: application/json");
include 'conexion.php';
include 'middleware.php';

// Validar límite de solicitudes
checkRateLimit($conn, $_SERVER['REMOTE_ADDR']);

// Obtener el método HTTP
$method = $_SERVER['REQUEST_METHOD'];

// Obtener el cuerpo de la solicitud si es POST o PUT
if ($method === 'PUT') {
    parse_str(file_get_contents("php://input"), $_PUT);
    $_FILES = $_PUT['files'] ?? [];
    $input = $_PUT;
}

// Ruta base para las imágenes
$baseUrl = "http://localhost/adm_ucb/src/servicios/uploadsEmpresas/";

// Función para generar una respuesta JSON
function response($status, $message, $data = null) {
    echo json_encode(["status" => $status, "message" => $message, "data" => $data]);
    exit();
}

// Manejo de rutas
switch ($method) {
    case 'GET':
        if (isset($_GET['idempresa'])) {
            getEmpresa($_GET['idempresa']);
        } elseif (isset($_GET['nombreempresa'])) {
            getEmpresaNombre($_GET['nombreempresa']);
        } else {
            getEmpresas();
        }
        break;

    case 'POST':
        if (isset($_GET['idempresa'])) {
            // Si viene un ID, se actualiza
            $imagenempresa = isset($_FILES['imagenempresa']) ? $_FILES['imagenempresa'] : null;
            updateEmpresa($_GET['idempresa'], $_POST, $imagenempresa);
        } elseif ($_POST) {
            // Si no hay ID, se crea
            $imagenempresa = isset($_FILES['imagenempresa']) ? $_FILES['imagenempresa'] : null;
            createEmpresa($_POST, $imagenempresa);
        } else {
            response("error", "No se enviaron datos.");
        }
        break;                    

    case 'DELETE':
        if (isset($_GET['idempresa'])) {
            deleteEmpresa($_GET['idempresa']);
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
    global $conn, $baseUrl;
    $query = "SELECT * FROM empresas";
    $stmt = $conn->query($query);

    $empresas = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $row['imagen_url'] = !empty($row['imagenempresa']) ? $baseUrl . $row['imagenempresa'] : null;
        $empresas[] = $row;
    }

    response("success", "Empresas obtenidas exitosamente.", $empresas);
}

// Obtener una empresa por ID
function getEmpresa($idempresa) {
    global $conn, $baseUrl;
    $query = "SELECT * FROM empresas WHERE idempresa = ?";
    $stmt = $conn->prepare($query);
    $stmt->execute([$idempresa]);
    $empresa = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($empresa) {
        $empresa['imagen_url'] = !empty($empresa['imagenempresa']) ? $baseUrl . $empresa['imagenempresa'] : null;
        response("success", "Empresa obtenida exitosamente.", $empresa);
    } else {
        response("error", "No se encontró la empresa.");
    }
}

// Obtener una o más empresas por nombre
function getEmpresaNombre($nombreempresa) {
    global $conn, $baseUrl;

    $query = "SELECT * FROM empresas WHERE nombreEmpresa LIKE ?";
    $stmt = $conn->prepare($query);
    $stmt->execute(["%$nombreempresa%"]);

    $empresas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!empty($empresas)) {
        foreach ($empresas as &$empresa) {
            $empresa['imagen_url'] = !empty($empresa['imagenempresa']) ? $baseUrl . $empresa['imagenempresa'] : null;
        }

        response("success", "Empresas obtenidas exitosamente.", $empresas);
    } else {
        response("error", "No se encontraron empresas con el nombre proporcionado.");
    }
}

// Crear una empresa
function createEmpresa($data, $file) {
    global $conn;
    $uploadDir = __DIR__ . "/uploadsEmpresas/";

    if (empty($data['nombreempresa']) || empty($data['descripcionempresa']) || empty($data['linkempresa'])) {
        response("error", "Todos los campos son obligatorios.");
    }    

    if ($file['error'] === UPLOAD_ERR_OK) {
        $query = "INSERT INTO empresas (nombreempresa, imagenempresa, descripcionempresa, linkempresa) VALUES (?, null, ?, ?)";
        $stmt = $conn->prepare($query);

        if ($stmt->execute([$data['nombreempresa'], $data['descripcionempresa'], $data['linkempresa']])) {
            $idEmpresa = $conn->lastInsertId(); // Obtener el ID generado

            // Generar el nombre del archivo
            $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
            $cleanName = preg_replace('/[^A-Za-z0-9_\-]/', '_', $data['nombreempresa']);
            $fileName = $cleanName . "." . $extension;
            $filePath = $uploadDir . $fileName;

            if (move_uploaded_file($file['tmp_name'], $filePath)) {
                // Actualizar la empresa con el nombre de la imagen
                $queryUpdate = "UPDATE empresas SET imagenempresa = ? WHERE idempresa = ?";
                $stmtUpdate = $conn->prepare($queryUpdate);
                $stmtUpdate->execute([$fileName, $idEmpresa]);

                response("success", "Empresa creada exitosamente.", ["id" => $idEmpresa, "imagen" => $fileName]);
            } else {
                response("error", "Error al mover la imagen.");
            }
        } else {
            response("error", "Error al crear la empresa.");
        }
    } else {
        response("error", "Error al cargar la imagen.");
    }
}

// Actualizar una empresa
function updateEmpresa($idempresa, $data, $file) {
    global $conn;
    $uploadDir = __DIR__ . "/uploadsEmpresas/";

    // Obtener la empresa actual
    $querySelect = "SELECT * FROM empresas WHERE idempresa = ?";
    $stmtSelect = $conn->prepare($querySelect);
    $stmtSelect->execute([$idempresa]);
    $empresa = $stmtSelect->fetch(PDO::FETCH_ASSOC);

    if (!$empresa) {
        response("error", "Empresa no encontrada.");
    }

    $fileName = $empresa['imagenempresa']; // Mantener la imagen actual si no se sube otra

    if ($file && $file['error'] === UPLOAD_ERR_OK) {
        // Eliminar la imagen anterior si existe
        if (!empty($empresa['imagenempresa']) && file_exists($uploadDir . $empresa['imagenempresa'])) {
            unlink($uploadDir . $empresa['imagenempresa']);
        }

        // Generar nuevo nombre de archivo
        $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        $cleanName = preg_replace('/[^A-Za-z0-9_\-]/', '_', $data['nombreempresa']);
        $fileName = $cleanName . "." . $extension;
        $filePath = $uploadDir . $fileName;

        if (!move_uploaded_file($file['tmp_name'], $filePath)) {
            response("error", "Error al subir la nueva imagen.");
        }
    }

    // Actualizar la empresa
    $queryUpdate = "UPDATE empresas SET nombreempresa = ?, imagenempresa = ?, descripcionempresa = ?, linkempresa = ? WHERE idempresa = ?";
    $stmtUpdate = $conn->prepare($queryUpdate);

    if ($stmtUpdate->execute([$data['nombreempresa'], $fileName, $data['descripcionempresa'], $data['linkempresa'], $idempresa])) {
        response("success", "Empresa actualizada exitosamente.");
    } else {
        response("error", "Error al actualizar la empresa.");
    }
}

// Eliminar una empresa
function deleteEmpresa($idempresa) {
    global $conn;
    $uploadDir = __DIR__ . "/uploadsEmpresas/";

    $querySelect = "SELECT imagenempresa FROM empresas WHERE idempresa = ?";
    $stmtSelect = $conn->prepare($querySelect);
    $stmtSelect->execute([$idempresa]);
    $empresa = $stmtSelect->fetch(PDO::FETCH_ASSOC);

    if ($empresa) {
        $filePath = $uploadDir . $empresa['imagenEmpresa'];
        if (file_exists($filePath)) {
            unlink($filePath);
        }

        $queryDelete = "DELETE FROM empresas WHERE idempresa = ?";
        $stmtDelete = $conn->prepare($queryDelete);
        if ($stmtDelete->execute([$idempresa])) {
            response("success", "Empresa eliminada exitosamente.");
        } else {
            response("error", "Error al eliminar la empresa.");
        }
    } else {
        response("error", "No se encontró la empresa.");
    }
}
?>
