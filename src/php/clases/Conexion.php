<?php
require_once  __DIR__ . '/../config/credentials.php';

class Conexion
{
    private $server;
    private $user;
    private $passwordb;
    private $bdname;
    private $conn; // Variable para almacenar la conexión

    private $sql;

    public function __construct(/* $server, $user, $passwordb, $bdname */)
    {
        $this->server = DB_SERVER;
        $this->user = DB_USER;
        $this->passwordb = DB_PASSWORD;
        $this->bdname = DB_NAME;

        // Intentar conexión a la BD
        $this->conn = new mysqli($this->server, $this->user, $this->passwordb, $this->bdname);

        // Verificar errores en la conexión
        if ($this->conn->connect_error) {
            die("Error de conexión: " . $this->conn->connect_error);
        }
    }

    // Método para obtener información de conexión (solo con fines de prueba)
    public function getInfoConexion()
    {
        return "Conectado a la base de datos '{$this->bdname}' en el servidor '{$this->server}' con el usuario '{$this->user}'.";
    }

    // Método para cerrar la conexión
    public function cerrarConexion()
    {
        $this->conn->close();
        return "Conexión cerrada.";
    }

    public function SetSelect(string $tabla, array $columnas = ['*'], string $condiciones = '', bool $is_login = false, string $password = '')
    {
        $cols = implode(", ", $columnas);
        $this->sql = "SELECT $cols FROM $tabla";

        if (!empty($condiciones)) {
            $this->sql .= " WHERE $condiciones";
        }

        $coincidenciaBusqueda = false;

        $resultados = [];
        $resultado = $this->conn->query($this->sql);

        if ($resultado && $resultado->num_rows > 0) {
            while ($fila = $resultado->fetch_assoc()) {

                if ($is_login) {
                    if ($password == $fila['password']) {
                        $coincidenciaBusqueda = true;
                        $resultados[] = $fila; // Cada fila es un diccionario (asociativo)
                        break;
                    }
                } else {
                    $coincidenciaBusqueda = true;
                    $resultados[] = $fila; // Cada fila es un diccionario (asociativo)
                }


            }
        }

        if ($coincidenciaBusqueda == false) {
            return ["Error" => "No hubo coincidencias"];
        } else {
            return $resultados;
        }
    }

    /* public function IniciarSesion(string $tabla, array $columnas = ['*'], $columna_usuario, $username, $password)
    {
        $cols = implode(", ", $columnas);
        $username = $this->conn->real_escape_string($username); // para prevenir inyecciones básicas

        $band = false;

        $this->sql = "SELECT $cols FROM $tabla WHERE $columna_usuario = '$username'";
        $resultados = [];
        $resultado = $this->conn->query($this->sql);

        if ($resultado && $resultado->num_rows > 0) {
            while ($fila = $resultado->fetch_assoc()) {
                if ($password == $fila['password']) {
                    $band = true;
                    $resultados[] = $fila; // Cada fila es un diccionario (asociativo)
                }
            }
            if (!$band)
                return ["Error" => "Credenciales incorrectas"];
        }
        return $resultados;
    } */

    public function SetDelete(string $tabla, string $condiciones/* , $id */)
    {
        /* $this->sql = "DELETE FROM $tabla WHERE $condiciones'$id'"; */
        $this->sql = "DELETE FROM $tabla WHERE $condiciones";
        $resultado = $this->conn->query($this->sql);

        if ($resultado) {
            if ($this->conn->affected_rows > 0) {
                return ["Success" => "DELETE en tabla $tabla exitoso"];
            } else {
                return ["Warning" => "No se elimino ninguna fila en tabla $tabla"];
            }
        } else {
            return ["Error" => "DELETE fallido en tabla $tabla"];
        }
    }

    public function SetInsert(string $tabla, array $columnas, array $datos)
    {
        //echo "Entro a set insert en conexion";

        $valores = [];
        foreach ($datos as $dato) {
            if ($dato === '' || is_null($dato)) {
                $valores[] = "NULL"; // sin comillas

            } elseif (strtoupper($dato) === 'CURDATE()') {
                $valores[] = "CURDATE()"; // sin comillas, es una función SQL
            } else {
                // Escapa y coloca comillas simples
                $dato_escapado = $this->conn->real_escape_string($dato);
                $valores[] = "'$dato_escapado'";
            }
        }

        //echo "paso el foreach";


        $columnas = implode(", ", $columnas);
        $datos = implode(", ", $valores);

        /*         echo "tabla -> ", $tabla;
                echo "<br>";
                echo json_encode($columnas);
                echo "<br>";
                echo json_encode($datos);
                echo "<br>"; */

        $this->sql = "INSERT INTO $tabla($columnas) VALUES($datos)";

        /* echo "SQL -> ", $this->sql;
        echo "<br>"; */
        $resultado = $this->conn->query($this->sql);
        if ($resultado) {
            if ($this->conn->affected_rows > 0) {
                return ["Success" => "Registro exitoso en tabla $tabla."];
            } else {
                return ["Warning" => "La consulta se ejecutó, pero no se insertó ninguna fila en $tabla."];
            }
        } else {
            return ["Error" => "Registro fallido en tabla $tabla."];
        }
    }

    /* public function SetActualizarRelacion($tabla, $id_primario, $id_foraneo, $columna_actualizar, $condiciones)
    {
        $this->sql = "UPDATE $tabla SET $columna_actualizar = '$id_foraneo' WHERE $condiciones '$id_primario'";

        $resultado = $this->conn->query($this->sql);

        if ($resultado) {
            if ($this->conn->affected_rows > 0) {
                return ["Success" => "Update exitoso en tabla $tabla."];
            } else {
                return ["Warning" => "La consulta se ejecutó, pero no se actualizo ninguna fila en $tabla."];
            }
        } else {
            return [
                "error" => "Update fallido en tabla $tabla.",
                "sql" => $this->sql,
                "mysql_error" => $this->conn->error
            ];
        }

    } */
    public function SetUpdate($tabla, $columnas_actualizar, $condiciones, )
    {
        $this->sql = "UPDATE $tabla SET $columnas_actualizar WHERE $condiciones";

        $resultado = $this->conn->query($this->sql);

        if ($resultado) {
            if ($this->conn->affected_rows > 0) {
                return ["Success" => "Update exitoso en tabla $tabla."];
            } else {
                return ["Warning" => "La consulta se ejecutó, pero no se actualizo ninguna fila en $tabla."];
            }
        } else {
            return [
                "error" => "Update fallido en tabla $tabla.",
                "sql" => $this->sql,
                "mysql_error" => $this->conn->error
            ];
        }

    }
}

?>