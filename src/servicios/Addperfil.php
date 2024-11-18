<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Manejo de solicitudes OPTIONS para CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'conexion.php'; // Conexión a la base de datos

try {
    // Asegúrate de que los datos se envíen como multipart/form-data
    if (isset($_POST['emailAdm']) && isset($_FILES['foto'])) {
        $emailAdm = $_POST['emailAdm'];  // Correo del usuario que quiere cambiar la foto
        $foto = $_FILES['foto'];  // Foto subida

        if ($foto['error'] === UPLOAD_ERR_OK) {
            $directorio = 'uploads/';  // Directorio donde se guardarán las imágenes

            // Verifica que el directorio exista
            if (!is_dir($directorio)) {
                mkdir($directorio, 0777, true);
            }

            $nombreFoto = time() . '-' . basename($foto['name']);
            $rutaFoto = $directorio . $nombreFoto;

            // Mover el archivo al servidor
            if (move_uploaded_file($foto['tmp_name'], $rutaFoto)) {
                // Si la imagen se subió correctamente, actualizar la base de datos con la URL de la imagen
                $sql = "UPDATE usuario SET fotoperfil = :fotoperfil WHERE emailAdm = :emailAdm";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':emailAdm', $emailAdm);
                $stmt->bindParam(':fotoperfil', $rutaFoto);

                if ($stmt->execute()) {
                    echo json_encode(["success" => true, "message" => "Foto de perfil actualizada exitosamente."]);
                } else {
                    echo json_encode([ "success" => false, "message" => "Error al actualizar la foto de perfil." ]);
                }
            } else {
                echo json_encode([ "success" => false, "message" => "Error al mover el archivo de imagen." ]);
            }
        } else {
            echo json_encode([ "success" => false, "message" => "Error al subir la foto." ]);
        }
    } else {
        echo json_encode([ "success" => false, "message" => "Faltan datos en la solicitud." ]);
    }
} catch (PDOException $e) {
    echo json_encode([ "success" => false, "message" => $e->getMessage() ]);
}
?>
