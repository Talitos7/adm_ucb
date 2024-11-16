<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

include 'conexion.php'; // Se incluye solo una vez

class PublicacionAlumni {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Crear una nueva publicación (solo alumni)
    public function create($autor, $multimedia, $usuario_emailAdm, $descripcionPublicacion) {
        $sqlRoleCheck = "SELECT rol FROM usuario WHERE emailAdm = :usuario_emailAdm";
        $stmtRoleCheck = $this->conn->prepare($sqlRoleCheck);
        $stmtRoleCheck->bindParam(':usuario_emailAdm', $usuario_emailAdm);
        $stmtRoleCheck->execute();
        $result = $stmtRoleCheck->fetch();

        if ($result['rol'] !== 'alumni') {
            return ['success' => false, 'message' => 'Solo los alumni pueden crear publicaciones.'];
        }

        $sql = "INSERT INTO publicacion (idPublicacion, autor, estadoPublicacion, multimedia, usuario_emailAdm, descripcionPublicacion) 
                VALUES (nextval('publicacion_seq'), :autor, false, :multimedia, :usuario_emailAdm, :descripcionPublicacion)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':autor', $autor);
        $stmt->bindParam(':multimedia', $multimedia);
        $stmt->bindParam(':usuario_emailAdm', $usuario_emailAdm);
        $stmt->bindParam(':descripcionPublicacion', $descripcionPublicacion);

        if ($stmt->execute()) {
            return ['success' => true, 'message' => 'Publicación creada con éxito.'];
        } else {
            return ['success' => false, 'message' => 'Error al crear la publicación.'];
        }
    }

    // Obtener todas las publicaciones aprobadas
    public function read() {
        $sql = "SELECT * FROM publicacion WHERE estadoPublicacion = true";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Agregar un comentario a una publicación
    public function addComment($idPublicacion, $textoComentario) {
        $sql = "INSERT INTO comentarios (idComentario, textoComentario, estado, publicacion_idPublicacion) 
                VALUES (nextval('comentarios_seq'), :textoComentario, true, :idPublicacion)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':textoComentario', $textoComentario);
        $stmt->bindParam(':idPublicacion', $idPublicacion);

        if ($stmt->execute()) {
            return ['success' => true, 'message' => 'Comentario añadido con éxito.'];
        } else {
            return ['success' => false, 'message' => 'Error al agregar el comentario.'];
        }
    }
}

// Procesar las solicitudes HTTP
$conn = (new Conexion())->getConnection(); // Única instancia de conexión
$publicacion = new PublicacionAlumni($conn);

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents('php://input'), true);

if ($method === 'POST' && isset($data['action'])) {
    if ($data['action'] === 'create') {
        echo json_encode($publicacion->create($data['autor'], $data['multimedia'], $data['usuario_emailAdm'], $data['descripcionPublicacion']));
    } elseif ($data['action'] === 'addComment') {
        echo json_encode($publicacion->addComment($data['idPublicacion'], $data['textoComentario']));
    }
} elseif ($method === 'GET') {
    echo json_encode(['success' => true, 'data' => $publicacion->read()]);
}
?>
