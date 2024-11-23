<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');
include 'conexion.php';
include 'middleware.php';
include 'headers.php';
use \Firebase\JWT\JWT;
require_once '../../vendor/autoload.php'; // Incluye JWT

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../..');
$dotenv->load();

$key = $_ENV['JWT_SECRET'];

// Validar límite de solicitudes
checkRateLimit($conn, $_SERVER['REMOTE_ADDR']);

// Verifica el método HTTP de la solicitud
$method = $_SERVER['REQUEST_METHOD'];

// Ruta principal de la API
switch ($method) {
    case 'POST':
        login($conn);
        break;

    case 'GET':
        validarToken(); // Proteger este endpoint
        if (isset($_GET['emailAdm']) && isset($_GET['tipo']) && $_GET['tipo'] === 'rol') {
            obtenerRolUsuario($conn, $_GET['emailAdm']);
        } elseif (isset($_GET['emailAdm'])) {
            obtenerInfoUsuario($conn, $_GET['emailAdm']);
        } else {
            echo json_encode(["mensaje" => "Parámetros incorrectos"]);
        }
        break;

    default:
        echo json_encode(["mensaje" => "Método no permitido"]);
        break;
}

// Función para el login de usuario
function login($conn) {
    global $key; // Accede a la clave secreta

    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['emailAdm']) && isset($data['password'])) {
        $emailAdm = $data['emailAdm'];
        $password = $data['password'];

        // Buscar al usuario por email
        $stmt = $conn->prepare("SELECT * FROM usuario WHERE emailAdm = :emailAdm");
        $stmt->bindParam(':emailAdm', $emailAdm);
        $stmt->execute();

        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario && password_verify($password, $usuario['password'])) {
            // Generar token JWT
            $payload = [
                "iss" => "http://localhost",
                "aud" => "http://localhost",
                "iat" => time(),
                "exp" => time() + (60 * 60), // Expira en 1 hora
                "emailAdm" => $emailAdm
            ];
            
            $jwt = JWT::encode($payload, $key, 'HS256');

            echo json_encode(["mensaje" => "Login exitoso", "token" => $jwt]);
        } else {
            echo json_encode(["mensaje" => "Credenciales incorrectas"]);
        }
    } else {
        echo json_encode(["mensaje" => "Faltan datos para el login"]);
    }
}

// Función para obtener toda la información del usuario
function obtenerInfoUsuario($conn, $emailAdm) {
    $stmt = $conn->prepare("SELECT * FROM usuario WHERE emailAdm = :emailAdm");
    $stmt->bindParam(':emailAdm', $emailAdm);
    $stmt->execute();

    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($usuario) {
        echo json_encode($usuario);
    } else {
        echo json_encode(["mensaje" => "Usuario no encontrado"]);
    }
}

// Función para obtener solo el rol del usuario
function obtenerRolUsuario($conn, $emailAdm) {
    $stmt = $conn->prepare("SELECT rol FROM usuario WHERE emailAdm = :emailAdm");
    $stmt->bindParam(':emailAdm', $emailAdm);
    $stmt->execute();

    $rol = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($rol) {
        echo json_encode($rol);
    } else {
        echo json_encode(["mensaje" => "Usuario no encontrado"]);
    }
}