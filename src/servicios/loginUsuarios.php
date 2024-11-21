<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

include 'conexion.php';
require_once '../../vendor/autoload.php'; // Subir dos directorios para acceder a vendor

use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        login($conn);
        break;

    case 'GET':
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

function login($conn) {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['emailAdm']) && isset($data['password'])) {
        $emailAdm = $data['emailAdm'];
        $password = $data['password'];

        if (!filter_var($emailAdm, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(["mensaje" => "Email inválido"]);
            return;
        }

        try {
            $stmt = $conn->prepare("SELECT * FROM usuario WHERE emailAdm = :emailAdm");
            $stmt->bindParam(':emailAdm', $emailAdm);
            $stmt->execute();

            $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo json_encode(["mensaje" => "Error en la base de datos", "error" => $e->getMessage()]);
            return;
        }

        if ($usuario && password_verify($password, $usuario['password'])) {
            if (isset($usuario['idUsuario']) && isset($usuario['emailadm']) && isset($usuario['rol'])) {
                $key = getenv('JWT_SECRET_KEY');
                $payload = [
                    "iss" => "http://localhost", // Cambiado para entorno local
                    "aud" => "http://localhost", // Cambiado para entorno local
                    "iat" => time(),
                    "exp" => time() + 3600,
                    "data" => [
                        "idUsuario" => $usuario['idUsuario'],
                        "emailAdm" => $usuario['emailAdm'],
                        "rol" => $usuario['rol']
                    ]
                ];
        
                $jwt = JWT::encode($payload, $key, 'HS256');
                echo json_encode(["mensaje" => "Login exitoso", "token" => $jwt]);
            } else {
                echo json_encode(["mensaje" => "Datos del usuario incompletos"]);
            }
        } else {
            echo json_encode(["mensaje" => "Credenciales incorrectas"]);
        }        
    } else {
        echo json_encode(["mensaje" => "Faltan datos para el login"]);
    }
}

function verificarToken($token) {
    $key = getenv('JWT_SECRET_KEY');
    try {
        $decoded = JWT::decode($token, new Key($key, 'HS256'));
        return $decoded;
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(["mensaje" => "Token inválido o expirado"]);
        exit;
    }
}

function obtenerInfoUsuario($conn, $emailAdm) {
    $headers = apache_request_headers();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["mensaje" => "Token no proporcionado"]);
        exit;
    }

    $token = str_replace("Bearer ", "", $headers['Authorization']);
    $decoded = verificarToken($token);

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

function obtenerRolUsuario($conn, $emailAdm) {
    $headers = apache_request_headers();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["mensaje" => "Token no proporcionado"]);
        exit;
    }

    $token = str_replace("Bearer ", "", $headers['Authorization']);
    $decoded = verificarToken($token);

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
?>