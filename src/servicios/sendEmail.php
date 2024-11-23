<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Cambia por tu dominio
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
include 'conexion.php';
include 'middleware.php';
include 'headers.php';
// Validar límite de solicitudes
checkRateLimit($conn, $_SERVER['REMOTE_ADDR']);

require '../PHPMailer-master/src/PHPMailer.php';   // Ruta a PHPMailer.php
require '../PHPMailer-master/src/SMTP.php';        // Ruta a SMTP.php
require '../PHPMailer-master/src/Exception.php';   // Ruta a Exception.php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!isset($_POST['idPasantia'])) {
        echo json_encode(['error' => 'Falta el ID de la pasantía.']);
        exit();
    }

    $idPasantia = $_POST['idPasantia'];

    // Obtener los detalles de la pasantía
    try {
        $stmt = $conn->prepare("SELECT titulo, detalle FROM pasantias WHERE idpsantia = :idPasantia");
        $stmt->bindParam(':idPasantia', $idPasantia);
        $stmt->execute();
        $pasantia = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($pasantia) {
            $titulo = $pasantia['titulo'];
            $detalle = $pasantia['detalle'];

            // Obtener todos los correos electrónicos de usuarios activos
            $query = $conn->prepare("SELECT emailadm FROM usuario WHERE estado = true");
            $query->execute();
            $usuarios = $query->fetchAll(PDO::FETCH_COLUMN);

            // Configurar y enviar el correo
            $mail = new PHPMailer(true);

            try {
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com'; 
                $mail->SMTPAuth = true;
                $mail->Username = 'carlos.caba@ucb.edu.bo'; // Cambia a tu correo
                $mail->Password = 'kroh hjco pkmi rrti'; // Cambia a tu contraseña o contraseña de aplicación
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
                echo json_encode(['success' => 'Correos enviados a todos los contactos activos.']);
            } catch (Exception $e) {
                echo json_encode(['error' => 'Error al enviar el correo: ' . $mail->ErrorInfo]);
            }
        } else {
            echo json_encode(['error' => 'No se encontró la pasantía.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['error' => 'Error en la base de datos: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Método no permitido']);
}
?>
