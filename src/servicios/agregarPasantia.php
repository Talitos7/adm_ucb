<?php
header("Access-Control-Allow-Origin: https://localhost:3000"); // Cambia por tu dominio
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');
include 'conexion.php';
include 'middleware.php';

// Validar límite de solicitudes
checkRateLimit($conn, $_SERVER['REMOTE_ADDR']);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $errors = []; 

    if (!isset($_POST['titulo'])) {
        $errors[] = 'El campo "titulo" es obligatorio.';
    }
    
    if (!isset($_POST['detalle'])) {
        $errors[] = 'El campo "detalle" es obligatorio.';
    }

    if (!isset($_FILES['imagen']) || $_FILES['imagen']['error'] !== UPLOAD_ERR_OK) {
        $errors[] = 'El campo "imagen" es obligatorio.';
    }

    if (!empty($errors)) {
        echo json_encode(['error' => implode(", ", $errors)]);
        exit();
    }

    $titulo = $_POST['titulo'];
    $detalle = $_POST['detalle'];

    // Procesar la imagen
    $imagen = $_FILES['imagen'];
    $uploadDir = 'uploads/'; // Directorio donde se guardarán las imágenes
    $uploadPath = $uploadDir . basename($imagen['name']);
    $imageUrl = $uploadPath; 

    // Crear el directorio si no existe
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Mover la imagen al directorio de destino
    if (!move_uploaded_file($imagen['tmp_name'], $uploadPath)) {
        echo json_encode(['error' => 'Error al guardar la imagen.']);
        exit();
    }

    try {
        // Insertar los datos en la base de datos
        $stmt = $conn->prepare("INSERT INTO pasantias (titulo, detalle, ruta_imagen) VALUES (:titulo, :detalle, :ruta_imagen)");
        $stmt->bindParam(':titulo', $titulo);
        $stmt->bindParam(':detalle', $detalle);
        $stmt->bindParam(':ruta_imagen', $imageUrl);

        if ($stmt->execute()) {
            // Obtener el ID de la nueva pasantía
            $idPasantia = $conn->lastInsertId();

            // Llamar a la API de envío de correo
            $url = 'http://localhost/adm_ucb/src/servicios/sendEmail.php'; // Cambia la URL según sea necesario
            $data = ['idPasantia' => $idPasantia];
            $options = [
                'http' => [
                    'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                    'method'  => 'POST',
                    'content' => http_build_query($data),
                ],
            ];
            $context  = stream_context_create($options);
            $result = file_get_contents($url, false, $context);

            echo json_encode(['success' => 'Pasantía agregada y correo enviado.', 'emailResponse' => json_decode($result)]);
        } else {
            echo json_encode(['error' => 'Error al agregar la pasantía.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error en la base de datos: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Método no permitido']);
}
?>
