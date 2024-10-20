<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type"); 
include 'conexion.php';

try {
    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $emailAdm = $_POST['emailAdm'];

        // Comprobar si el usuario existe
        $sqlCheck = "SELECT * FROM usuario WHERE emailAdm = :emailAdm";
        $stmtCheck = $conn->prepare($sqlCheck);
        $stmtCheck->bindParam(':emailAdm', $emailAdm);
        $stmtCheck->execute();
        
        if ($stmtCheck->rowCount() > 0) {
            // Actualizar el estado del usuario a inactivo (false)
            $sql = "UPDATE usuario SET estado = false WHERE emailAdm = :emailAdm";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':emailAdm', $emailAdm);
            
            if ($stmt->execute()) {
                echo json_encode(["success" => true, "message" => "Usuario dado de baja exitosamente."]);
            } else {
                echo json_encode(["success" => false, "message" => "Error al dar de baja al usuario."]);
                error_log(print_r($stmt->errorInfo(), true));
            }
        } else {
            echo json_encode(["success" => false, "message" => "Usuario no encontrado."]);
        }
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>