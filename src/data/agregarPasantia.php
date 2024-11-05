<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $errors = []; // Array para almacenar errores

    // Verificar si se han enviado los datos
    if (!isset($_POST['titulo'])) {
        $errors[] = 'El campo "titulo" es obligatorio.';
    }
    
    if (!isset($_POST['detalle'])) {
        $errors[] = 'El campo "detalle" es obligatorio.';
    }

    // Si hay errores, devolverlos
    if (!empty($errors)) {
        echo json_encode(['error' => $errors]);
        exit();
    }

    $titulo = $_POST['titulo'];
    $detalle = $_POST['detalle'];

    try {
        $stmt = $conn->prepare("INSERT INTO pasantias (titulo, detalle) VALUES (:titulo, :detalle)");
        $stmt->bindParam(':titulo', $titulo);
        $stmt->bindParam(':detalle', $detalle);

        if ($stmt->execute()) {
            // Obtener el ID de la nueva pasantía
            $idPasantia = $conn->lastInsertId();

            // Llamar a la API de envío de correo
            $url = 'http://localhost/adm_ucb/src/data/sendEmail.php'; // Cambia la URL según sea necesario
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
