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
        if ($_POST) {
            createEmpresa($_POST, $_FILES['imagenempresa']);
        } else {
            response("error", "No se enviaron datos.");
        }
        break;

    case 'PUT':
        parse_str(file_get_contents("php://input"), $putData);
        if ($putData && isset($_GET['idempresa'])) {
            updateEmpresa($_GET['idempresa'], $putData, $_FILES['imagenempresa'] ?? null);
        } else {
            response("error", "Faltan datos para la actualización.");
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

    if (isset($_FILES['imagenempresa']) && $_FILES['imagenempresa']['error'] === UPLOAD_ERR_OK) {
        $fileName = uniqid() . "_" . basename($file['name']);
        $filePath = $uploadDir . $fileName;

        if (move_uploaded_file($file['tmp_name'], $filePath)) {
            $query = "INSERT INTO empresas (nombreempresa, imagenempresa, descripcionempresa, linkempresa) VALUES (?, ?, ?, ?)";
            $stmt = $conn->prepare($query);

            if ($stmt->execute([$data['nombreempresa'], $fileName, $data['descripcionempresa'], $data['linkempresa']])) {
                response("success", "Empresa creada exitosamente.");
            } else {
                response("error", "Error al crear la empresa.");
            }
        } else {
            response("error", "Error al subir la imagen.");
        }
    } else {
        response("error", "No se proporcionó una imagen válida.");
    }
}

// Actualizar una empresa
function updateEmpresa($idempresa, $data, $file) {
    global $conn;

    // Validar datos requeridos
    if (empty($data['nombreempresa']) || empty($data['descripcionempresa']) || empty($data['linkempresa'])) {
        response("error", "Faltan campos requeridos.");
    }

    $uploadDir = __DIR__ . "/uploadsEmpresas/";

    // Buscar la empresa existente
    $querySelect = "SELECT imagenempresa FROM empresas WHERE idempresa = ?";
    $stmtSelect = $conn->prepare($querySelect);
    $stmtSelect->execute([$idempresa]);
    $empresa = $stmtSelect->fetch(PDO::FETCH_ASSOC);

    if (!$empresa) {
        response("error", "No se encontró la empresa.");
    }

    $fileName = $empresa['imagenempresa']; // Mantener imagen actual
    if (isset($_FILES['imagenempresa'])) {
        // Manejo del archivo
        $file = $_FILES['imagenempresa'];
        if ($file['error'] === UPLOAD_ERR_OK) {
            $fileName = uniqid() . "_" . basename($file['name']);
            $filePath = $uploadDir . $fileName;

            if (move_uploaded_file($file['tmp_name'], $filePath)) {
                // Eliminar la imagen antigua si existe
                $oldFilePath = $uploadDir . $empresa['imagenempresa'];
                if (file_exists($oldFilePath)) {
                    unlink($oldFilePath);
                }
            } else {
                response("error", "Error al subir la nueva imagen.");
            }
        }
    }

    // Actualizar los datos de la empresa
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
