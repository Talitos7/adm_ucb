<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
include 'conexion.php';

require '../PHPMailer-master/src/PHPMailer.php';   // Ruta a PHPMailer.php
require '../PHPMailer-master/src/SMTP.php';        // Ruta a SMTP.php
require '../PHPMailer-master/src/Exception.php';   // Ruta a Exception.php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!isset($_POST['titulo']) || !isset($_POST['detalle'])) {
        echo json_encode(['error' => 'Faltan datos obligatorios.']);
        exit();
    }

    $titulo = $_POST['titulo'];
    $detalle = $_POST['detalle'];

    try {
        $stmt = $conn->prepare("INSERT INTO pasantias (titulo, detalle) VALUES (:titulo, :detalle)");
        $stmt->bindParam(':titulo', $titulo);
        $stmt->bindParam(':detalle', $detalle);

        if ($stmt->execute()) {
            $idPasantia = $conn->lastInsertId();

            $query = $conn->prepare("SELECT emailContacto FROM usuario WHERE estado = true");
            $query->execute();
            $usuarios = $query->fetchAll(PDO::FETCH_COLUMN);

            // Configurar y enviar el correo
            $mail = new PHPMailer(true);

            try {
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com'; 
                $mail->SMTPAuth = true;
                $mail->Username = 'carlos.caba@ucb.edu.bo'; 
                $mail->Password = 'Ucb.13491987'; 
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port = 587;

                // Configuración del correo
                $mail->setFrom('carlos.caba@ucb.edu.bo', 'Notificaciones');
                foreach ($usuarios as $email) {
                    $mail->addAddress($email); 
                }
                $mail->isHTML(true);
                $mail->Subject = 'Nueva Pasantía Agregada';
                $mail->Body = "<h3>Se ha agregado una nueva pasantía</h3>
                               <p><strong>Título:</strong> $titulo</p>
                               <p><strong>Detalle:</strong> $detalle</p>";

                // Enviar el correo
                $mail->send();
                echo json_encode(['success' => 'Pasantía agregada y correos enviados a todos los contactos activos.']);
            } catch (Exception $e) {
                echo json_encode(['error' => 'Error al enviar el correo: ' . $mail->ErrorInfo]);
            }
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
