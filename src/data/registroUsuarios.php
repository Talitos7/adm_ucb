<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type"); 
include 'conexion.php';
try {
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $emailAdm = $_POST['emailAdm'];
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hashear la contraseña
        $celular = $_POST['celular'];
        $estado = true;  // Estado por defecto: activo (true)
        $rol = $_POST['rol'];
        $fechaRegistro = date('Y-m-d'); // Fecha actual para el registro
        $emailContacto = $_POST['emailContacto'];

        $sql = "INSERT INTO usuario (emailAdm, nombre, apellido, password, celular, estado, rol, fechaRegistro, emailContacto)
                VALUES (:emailAdm, :nombre, :apellido, :password, :celular, :estado, :rol, :fechaRegistro, :emailContacto)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':emailAdm', $emailAdm);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':apellido', $apellido);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':celular', $celular);
        $stmt->bindParam(':estado', $estado, PDO::PARAM_BOOL);
        $stmt->bindParam(':rol', $rol);
        $stmt->bindParam(':fechaRegistro', $fechaRegistro);
        $stmt->bindParam(':emailContacto', $emailContacto);
    
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Usuario registrado exitosamente."]);
        } else {
            echo json_encode(["success" => false, "message" => "Error al registrar el usuario."]);
            error_log(print_r($stmt->errorInfo(), true)); 
        }
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}

?>