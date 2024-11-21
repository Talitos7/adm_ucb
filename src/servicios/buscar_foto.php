<?php
header("Access-Control-Allow-Origin: https://localhost:3000"); // Cambia por tu dominio
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
include 'conexion.php';
include 'middleware.php';

// Validar límite de solicitudes
checkRateLimit($conn, $_SERVER['REMOTE_ADDR']);

// Manejo de solicitudes OPTIONS para CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Asegúrate de que el correo electrónico esté presente en la solicitud
    if (isset($_GET['emailAdm'])) {
        $emailAdm = $_GET['emailAdm'];  // Correo del usuario que queremos buscar

        // Consulta para obtener la URL de la foto de perfil desde la base de datos
        $sql = "SELECT fotoperfil FROM usuario WHERE emailAdm = :emailAdm";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':emailAdm', $emailAdm);

        if ($stmt->execute()) {
            // Verificar si se encontró el usuario
            if ($stmt->rowCount() > 0) {
                $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
                $fotoperfil = $usuario['fotoperfil'];

                // Si hay foto de perfil, devolvemos la URL completa
                if ($fotoperfil) {
                    // Aquí configuramos la URL base donde se sirven las imágenes
                    $baseUrl = "http://localhost/adm_ucb/src/servicios/"; // No agregar 'uploads' dos veces
                    $fotoUrl = $baseUrl . $fotoperfil;  // Concatenamos la ruta base con el nombre del archivo

                    echo json_encode(["success" => true, "fotoperfil" => $fotoUrl]);
                } else {
                    echo json_encode(["success" => false, "message" => "El usuario no tiene foto de perfil."]);
                }
            } else {
                echo json_encode(["success" => false, "message" => "Usuario no encontrado."]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Error al ejecutar la consulta."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Faltan parámetros en la solicitud."]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
