<?php
require_once __DIR__ . '/../config/credentials.php';

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

    /* public function SetSelect(string $tabla, array $columnas = ['*'], string $condiciones = '', bool $is_login = false, string $password = '')
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
                    //if ($password == $fila['password']) {
                    if (password_verify($password, $fila['password'])) {
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

        // Si es login y no hubo coincidencia
        if ($is_login && empty($resultados)) {
            return ["Error" => "Contraseña incorrecta o usuario no encontrado"];
        }

        // Si es consulta normal y no hay resultados
        if (!$is_login && empty($resultados)) {
            return ["Error" => "No hubo coincidencias"];
        }

        return $resultados;
    } */

    /* public function SetSelect(string $tabla, array $columnas = ['*'], string $condiciones = '')
    {
        $cols = implode(", ", $columnas);
        $this->sql = "SELECT $cols FROM $tabla";

        if (!empty($condiciones)) {
            $this->sql .= " WHERE $condiciones";
        }

        $resultados = [];
        $resultado = $this->conn->query($this->sql);

        if ($resultado && $resultado->num_rows > 0) {
            while ($fila = $resultado->fetch_assoc()) {
                $resultados[] = $fila; // Cada fila es un diccionario (asociativo)
            }
        }

        if (empty($resultados)) {
            return ["Error" => "No hubo coincidencias"];
        }

        return $resultados;
    } */

    //tabla
    //condicion
    //dato condicion
    //array columnas
    //array datos
    //tipos datos

    public function SetSelect(string $tabla, array $columnas = ['*'], string $condiciones = '')
    {

        $cols = implode(", ", $columnas);
        $this->sql = "SELECT $cols FROM $tabla";

        if (!empty($condiciones)) {
            $this->sql .= " WHERE $condiciones";
        }

        $resultados = [];
        $resultado = $this->conn->query($this->sql);

        if ($resultado && $resultado->num_rows > 0) {
            while ($fila = $resultado->fetch_assoc()) {
                $resultados[] = $fila; // Cada fila es un diccionario (asociativo)
            }
        }

        if (empty($resultados)) {
            return ["Error" => "No hubo coincidencias"];
        }

        return $resultados;
    }

    public function Login(string $tabla, array $columnas = ['*'], string $condiciones, string $password = '')
    {
        $cols = implode(", ", $columnas);
        $this->sql = "SELECT $cols FROM $tabla WHERE $condiciones";

        /* if (!empty($condiciones)) {
            $this->sql .= " WHERE $condiciones";
        } */

        $resultados = [];
        $resultado = $this->conn->query($this->sql);

        if ($resultado && $resultado->num_rows > 0) {
            while ($fila = $resultado->fetch_assoc()) {
                if (password_verify($password, $fila['password'])) {
                    $resultados[] = $fila; // Cada fila es un diccionario (asociativo)
                    break;
                }
            }
        }

        if (empty($resultados)) {
            return ["Error" => "Contraseña incorrecta o usuario no encontrado"];
        }
        return $resultados;
    }


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





    /*     public function SetInsert(string $tabla, array $columnas, array $datos, bool $is_register = false)
        {

            if ($is_register) {
                $hashed_password = password_hash($datos[3], PASSWORD_DEFAULT);
                $datos[3] = $hashed_password;
            }
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

            $columnas = implode(", ", $columnas);
            $datos = implode(", ", $valores);


            $this->sql = "INSERT INTO $tabla($columnas) VALUES($datos)";


            $resultado = $this->conn->query($this->sql);
            if ($resultado) {
                if ($this->conn->affected_rows > 0) {

                    // Obtener el ID generado
                    $lastId = $this->conn->insert_id;

                    return ["Success" => "Registro exitoso en tabla $tabla.", "id_generado" => $lastId];
                } else {
                    return ["Warning" => "La consulta se ejecutó, pero no se insertó ninguna fila en $tabla."];
                }
            } else {
                return ["Error" => "Registro fallido en tabla $tabla."];
            }
        } */

    /*        // SQL query template
   $sql = "INSERT INTO MyGuests (firstname, lastname, email) VALUES (?, ?, ?)";

   // Prepare the SQL query template
   if ($stmt = $conn->prepare($sql)) {
       // Bind parameters
       $stmt->bind_param("sss", $firstname, $lastname, $email);

       // Set parameters and execute
       $firstname = "John";
       $lastname = "Doe";
       $email = "john@example.com";
       $stmt->execute();

   } */

    public function SetInsert(string $tabla, array $columnas, array $datos, string $tiposDatos)
    {

        if (count($columnas) !== count($datos) || count($datos) !== strlen($tiposDatos)) {
            return ["Error" => "No coincide el numero de parametros recibidos"];
        }

        $columnas = implode(", ", $columnas);
        $placeholder = implode(",", array_fill(0, count($datos), "?"));

        // SQL query template
        $this->sql = "INSERT INTO $tabla ($columnas) VALUES ($placeholder)";

        // Prepare the SQL query template/*  */
        $stmt = $this->conn->prepare($this->sql);

        if (!$stmt) {
            return ["Error" => "No se pudo preparar la consulta"];
        }

        $stmt->bind_param($tiposDatos, ...$datos);
        $resultado = $stmt->execute();

        if ($resultado) {
            if ($this->conn->affected_rows > 0) {

                // Obtener el ID generado
                $lastId = $this->conn->insert_id;

                return ["Success" => "Registro exitoso en tabla $tabla.", "id_generado" => $lastId];
            } else {
                return ["Warning" => "La consulta se ejecutó, pero no se insertó ninguna fila en $tabla."];
            }
        } else {
            return [
                "Error" => "Registro fallido en tabla $tabla.",
                "Mysql_error" => $stmt->error,
                "Mysql_codigo" => $stmt->errno
            ];
        }
    }

    public function RegistrarCuenta(string $tabla, array $columnas, array $datos, string $tiposDatos)
    {
        $hashed_password = password_hash($datos[3], PASSWORD_DEFAULT);
        $datos[3] = $hashed_password;

        return $this->SetInsert($tabla, $columnas, $datos, $tiposDatos);
    }

    public function SetUpdate(string $tabla, string $condicion, array $columnas, array $datos, string $tipoDatos /* $columnas_actualizar, $condiciones,  */)
    {

        if (count($datos) !== strlen($tipoDatos) || count($columnas) <= count($datos)) {
            return ["Error" => "No coincide el numero de datos con los tipos de datos"];
        }

        $valores = [];
        for ($i = 0; $i < count($columnas); $i++) {
            $valores[$i] = $columnas[$i] . " = ?";
        }
        $valores = implode(",", $valores);

        //$datos[] = $datoCondicion;
        //$tipoDatos .= "i";

        // SQL query template
        $this->sql = "UPDATE $tabla SET $valores WHERE $condicion";

        // Prepare the SQL query template/*  */
        $stmt = $this->conn->prepare($this->sql);

        if (!$stmt) {
            return ["Error" => "No se pudo preparar la consulta"];
        }

        $stmt->bind_param($tipoDatos, ...$datos);
        $resultado = $stmt->execute();

        if ($resultado) {
            if ($this->conn->affected_rows > 0) {
                return ["Success" => "Update exitoso en tabla $tabla."];
            } else {
                return ["Warning" => "La consulta se ejecutó, pero no se actualizo ninguna fila en $tabla."];
            }
        } else {
            return [
                "Error" => "Update fallido en tabla $tabla.",
                "Sql" => $this->sql,
                "Mysql_error" => $stmt->error,
                "Mysql_codigo" => $stmt->errno
            ];

        }

    }

    public function SetCount(string $tabla, string $condiciones = '')
    {
        $this->sql = "SELECT COUNT(*) AS total FROM $tabla";

        if (!empty($condiciones)) {
            $this->sql .= " WHERE $condiciones";
        }

        $resultado = $this->conn->query($this->sql);

        if ($resultado) {
            return $resultado->fetch_assoc();
        }

        return ["Error" => "No se pudo obtener el conteo"];
    }

    public function BeginTransaction()
    {
        $this->conn->begin_transaction();
    }
    public function Commit()
    {
        $this->conn->commit();
    }
    public function Rollback()
    {
        $this->conn->rollback();
    }
}



?>