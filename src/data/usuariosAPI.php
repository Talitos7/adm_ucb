<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
include 'conexion.php';

try {
    $data = json_decode(file_get_contents("php://input"), true);
    $action = $_GET['action'] ?? '';

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        if ($action === 'registro') {
            // Registro de usuario (Create)
            $emailAdm = $data['emailAdm'];
            $nombre = $data['nombre'];
            $apellido = $data['apellido'];
            $password = password_hash($data['password'], PASSWORD_DEFAULT);
            $celular = $data['celular'];
            $estado = true;
            $rol = $data['rol'];
            $fechaRegistro = date('Y-m-d');
            $emailContacto = $data['emailContacto'];

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
            }

        } elseif ($action === 'baja') {
            // Baja de usuario (Delete lógico)
            $emailAdm = $data['emailAdm'];

            $sqlCheck = "SELECT * FROM usuario WHERE emailAdm = :emailAdm";
            $stmtCheck = $conn->prepare($sqlCheck);
            $stmtCheck->bindParam(':emailAdm', $emailAdm);
            $stmtCheck->execute();

            if ($stmtCheck->rowCount() > 0) {
                $sql = "UPDATE usuario SET estado = false WHERE emailAdm = :emailAdm";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':emailAdm', $emailAdm);

                if ($stmt->execute()) {
                    echo json_encode(["success" => true, "message" => "Usuario dado de baja exitosamente."]);
                } else {
                    echo json_encode(["success" => false, "message" => "Error al dar de baja al usuario."]);
                }
            } else {
                echo json_encode(["success" => false, "message" => "Usuario no encontrado."]);
            }

        } elseif ($action === 'modificar') {
            // Modificación de usuario (Update)
            $emailAdm = $data['emailAdm'];
            $nombre = $data['nombre'] ?? null;
            $apellido = $data['apellido'] ?? null;
            $password = isset($data['password']) ? password_hash($data['password'], PASSWORD_DEFAULT) : null;
            $celular = $data['celular'] ?? null;
            $rol = $data['rol'] ?? null;
            $emailContacto = $data['emailContacto'] ?? null;

            $sql = "UPDATE usuario SET 
                        nombre = COALESCE(:nombre, nombre),
                        apellido = COALESCE(:apellido, apellido),
                        password = COALESCE(:password, password),
                        celular = COALESCE(:celular, celular),
                        rol = COALESCE(:rol, rol),
                        emailContacto = COALESCE(:emailContacto, emailContacto)
                    WHERE emailAdm = :emailAdm";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':emailAdm', $emailAdm);
            $stmt->bindParam(':nombre', $nombre);
            $stmt->bindParam(':apellido', $apellido);
            $stmt->bindParam(':password', $password);
            $stmt->bindParam(':celular', $celular);
            $stmt->bindParam(':rol', $rol);
            $stmt->bindParam(':emailContacto', $emailContacto);

            if ($stmt->execute()) {
                echo json_encode(["success" => true, "message" => "Usuario modificado exitosamente."]);
            } else {
                echo json_encode(["success" => false, "message" => "Error al modificar el usuario."]);
            }
        }
    } elseif ($_SERVER["REQUEST_METHOD"] === "GET" && $action === 'leer') {
        // Lectura de usuarios (Read)
        $emailAdm = $_GET['emailAdm'] ?? null;
        if ($emailAdm) {
            $sql = "SELECT * FROM usuario WHERE emailAdm = :emailAdm";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':emailAdm', $emailAdm);
        } else {
            $sql = "SELECT * FROM usuario";
            $stmt = $conn->prepare($sql);
        }
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>
