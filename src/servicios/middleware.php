<?php
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key;
require_once '../../vendor/autoload.php'; // Incluye JWT

function checkRateLimit($conn, $ip) {
    $stmt = $conn->prepare("SELECT * FROM rate_limit WHERE ip_address = :ip");
    $stmt->bindParam(':ip', $ip);
    $stmt->execute();

    $record = $stmt->fetch(PDO::FETCH_ASSOC);
    $currentTime = new DateTime();

    if ($record) {
        $lastRequest = new DateTime($record['last_request']);
        $timeDiff = $currentTime->getTimestamp() - $lastRequest->getTimestamp();

        if ($timeDiff < 60) { // 60 segundos entre evaluaciones
            if ($record['request_count'] >= 10) { // Máximo 10 solicitudes por minuto
                http_response_code(429); // Código HTTP para demasiadas solicitudes
                echo json_encode(["mensaje" => "Demasiadas solicitudes. Intente de nuevo más tarde."]);
                exit(); // Detiene la ejecución del script
            } else {
                // Incrementa el contador de solicitudes
                $stmt = $conn->prepare("UPDATE rate_limit SET request_count = request_count + 1, last_request = NOW() WHERE ip_address = :ip");
                $stmt->bindParam(':ip', $ip);
                $stmt->execute();
            }
        } else {
            // Reinicia el contador porque pasó el límite de tiempo
            $stmt = $conn->prepare("UPDATE rate_limit SET request_count = 1, last_request = NOW() WHERE ip_address = :ip");
            $stmt->bindParam(':ip', $ip);
            $stmt->execute();
        }
    } else {
        // Inserta un nuevo registro para la IP si es la primera solicitud
        $stmt = $conn->prepare("INSERT INTO rate_limit (ip_address, last_request) VALUES (:ip, NOW())");
        $stmt->bindParam(':ip', $ip);
        $stmt->execute();
    }
}

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../..');
$dotenv->load();

$key = $_ENV['JWT_SECRET'];

function validarToken() {
    global $key;

    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(["mensaje" => "Acceso no autorizado"]);
        exit();
    }

    $token = str_replace('Bearer ', '', $headers['Authorization']);

    try {
        $decoded = JWT::decode($token, new Key($key, 'HS256'));
        return $decoded;
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(["mensaje" => "Token inválido"]);
        exit();
    }
}
?>