<?php
header("Access-Control-Allow-Origin: https://localhost:3000"); // Cambia por tu dominio
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
include 'conexion.php';
include 'middleware.php';

// Validar límite de solicitudes
checkRateLimit($conn, $_SERVER['REMOTE_ADDR']);

class Publicacion {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Obtener el autor basado en el email
    public function getAuthorByEmail($emailAdm) {
        $sql = "SELECT nombre, apellido FROM usuario WHERE emailAdm = :emailAdm";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':emailAdm', $emailAdm);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            return $result['nombre'] . ' ' . $result['apellido'];
        }
        return null;
    }

    // Crear una nueva publicación
    public function create($autor, $multimedia, $usuario_emailAdm, $descripcionPublicacion, $categoria) {
        $sql = "INSERT INTO publicacion (idPublicacion, autor, estadoPublicacion, multimedia, usuario_emailAdm, fechaPublicacion, descripcionPublicacion, categoria) 
                VALUES (nextval('publicacion_seq'), :autor, false, :multimedia, :usuario_emailAdm, NOW(), :descripcionPublicacion, :categoria)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':autor', $autor);
        $stmt->bindParam(':multimedia', $multimedia);
        $stmt->bindParam(':usuario_emailAdm', $usuario_emailAdm);
        $stmt->bindParam(':descripcionPublicacion', $descripcionPublicacion);
        $stmt->bindParam(':categoria', $categoria);

        // Depuración
        error_log("Datos recibidos para insertar: " . print_r(compact('autor', 'multimedia', 'usuario_emailAdm', 'descripcionPublicacion', 'categoria'), true));

        if ($stmt->execute()) {
            error_log("Inserción exitosa en la base de datos");
            return true;
        } else {
            error_log("Error al ejecutar consulta: " . print_r($stmt->errorInfo(), true));
            return false;
        }
    }

    // Obtener todas las publicaciones
    public function read() {
        $sql = "SELECT * FROM publicacion";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Actualizar una publicación
    public function update($idPublicacion, $autor, $estadoPublicacion, $multimedia, $descripcionPublicacion, $categoria) {
        $sql = "UPDATE publicacion 
                SET autor = :autor, estadoPublicacion = :estadoPublicacion, multimedia = :multimedia, descripcionPublicacion = :descripcionPublicacion, categoria = :categoria
                WHERE idPublicacion = :idPublicacion";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':idPublicacion', $idPublicacion);
        $stmt->bindParam(':autor', $autor);
        $stmt->bindParam(':estadoPublicacion', $estadoPublicacion, PDO::PARAM_BOOL);
        $stmt->bindParam(':multimedia', $multimedia);
        $stmt->bindParam(':descripcionPublicacion', $descripcionPublicacion);
        $stmt->bindParam(':categoria', $categoria);

        return $stmt->execute();
    }

    // Eliminar una publicación
    public function delete($idPublicacion) {
        $sql = "DELETE FROM publicacion WHERE idPublicacion = :idPublicacion";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':idPublicacion', $idPublicacion);
        return $stmt->execute();
    }
}

// Manejo de la API
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $publicacion = new Publicacion($conn);

    // Capturar datos del formulario
    $usuario_emailAdm = isset($_POST['usuario_emailAdm']) ? $_POST['usuario_emailAdm'] : 'josue.nisthaus@ejemplo.com';
    $descripcionPublicacion = isset($_POST['descripcionPublicacion']) ? $_POST['descripcionPublicacion'] : null;
    $categoria = isset($_POST['categoria']) ? $_POST['categoria'] : 'Intercambio'; // Categoría por defecto

    // Obtener autor automáticamente
    $autor = $publicacion->getAuthorByEmail($usuario_emailAdm);

    if (!$autor) {
        http_response_code(400); // Código de error si no se encuentra el autor
        echo json_encode(["mensaje" => "No se encontró el usuario con el email proporcionado"]);
        exit();
    }

    // Manejar archivo multimedia
    $multimedia = null;
    if (isset($_FILES['multimedia']) && $_FILES['multimedia']['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $_FILES['multimedia']['tmp_name'];
        $fileName = uniqid() . '_' . $_FILES['multimedia']['name'];
        $uploadFileDir = '../assets/';
        $destPath = $uploadFileDir . $fileName;

        if (move_uploaded_file($fileTmpPath, $destPath)) {
            $multimedia = $fileName;
        } else {
            error_log("Error al mover el archivo.");
        }
    }

    // Depuración
    error_log("Datos recibidos en POST (autor generado): " . print_r(compact('autor', 'multimedia', 'usuario_emailAdm', 'descripcionPublicacion', 'categoria'), true));

    if ($publicacion->create($autor, $multimedia, $usuario_emailAdm, $descripcionPublicacion, $categoria)) {
        echo json_encode(["mensaje" => "Publicación creada exitosamente"]);
    } else {
        echo json_encode(["mensaje" => "Error al crear la publicación"]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $publicacion = new Publicacion($conn);
    header('Content-Type: application/json');
    echo json_encode($publicacion->read());
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $publicacion = new Publicacion($conn);
    $data = json_decode(file_get_contents("php://input"), true);

    if ($publicacion->update($data['idPublicacion'], $data['autor'], $data['estadoPublicacion'], $data['multimedia'], $data['descripcionPublicacion'], $data['categoria'])) {
        echo json_encode(["mensaje" => "Publicación actualizada exitosamente"]);
    } else {
        echo json_encode(["mensaje" => "Error al actualizar la publicación"]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $publicacion = new Publicacion($conn);
    $data = json_decode(file_get_contents("php://input"), true);

    if ($publicacion->delete($data['idPublicacion'])) {
        echo json_encode(["mensaje" => "Publicación eliminada exitosamente"]);
    } else {
        echo json_encode(["mensaje" => "Error al eliminar la publicación"]);
    }
}
?>
