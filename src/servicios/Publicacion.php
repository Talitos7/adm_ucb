<?php
require 'conexion.php';

class Publicacion {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Crear una nueva publicación
    public function create($autor, $multimedia, $usuario_emailAdm, $descripcionPublicacion) {
        $sql = "INSERT INTO publicacion (idPublicacion, autor, estadoPublicacion, multimedia, usuario_emailAdm, fechaPublicacion, descripcionPublicacion) 
                VALUES (nextval('publicacion_seq'), :autor, false, :multimedia, :usuario_emailAdm, NOW(), :descripcionPublicacion)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':autor', $autor);
        $stmt->bindParam(':multimedia', $multimedia);
        $stmt->bindParam(':usuario_emailAdm', $usuario_emailAdm);
        $stmt->bindParam(':descripcionPublicacion', $descripcionPublicacion);
        
        return $stmt->execute();
    }

    // Obtener todas las publicaciones
    public function read() {
        $sql = "SELECT * FROM publicacion";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Actualizar una publicación
    public function update($idPublicacion, $autor, $estadoPublicacion, $multimedia, $descripcionPublicacion) {
        $sql = "UPDATE publicacion 
                SET autor = :autor, estadoPublicacion = :estadoPublicacion, multimedia = :multimedia, descripcionPublicacion = :descripcionPublicacion 
                WHERE idPublicacion = :idPublicacion";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':idPublicacion', $idPublicacion);
        $stmt->bindParam(':autor', $autor);
        $stmt->bindParam(':estadoPublicacion', $estadoPublicacion, PDO::PARAM_BOOL);
        $stmt->bindParam(':multimedia', $multimedia);
        $stmt->bindParam(':descripcionPublicacion', $descripcionPublicacion);
        
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
    $data = json_decode(file_get_contents("php://input"), true);

    if ($publicacion->create($data['autor'], $data['multimedia'], $data['usuario_emailAdm'], $data['descripcionPublicacion'])) {
        echo json_encode(["mensaje" => "Publicación creada exitosamente"]);
    } else {
        echo json_encode(["mensaje" => "Error al crear la publicación"]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $publicacion = new Publicacion($conn);
    echo json_encode($publicacion->read());
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $publicacion = new Publicacion($conn);
    $data = json_decode(file_get_contents("php://input"), true);

    if ($publicacion->update($data['idPublicacion'], $data['autor'], $data['estadoPublicacion'], $data['multimedia'], $data['descripcionPublicacion'])) {
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
