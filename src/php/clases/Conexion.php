<?php
require_once __DIR__ . '/../config/credentials.php';

class Conexion
{
    private $server;
    private $user;
    private $passwordb;
    private $bdname;
    private $conn;

    private $sql;

    public function __construct()
    {
        $this->server = DB_SERVER;
        $this->user = DB_USER;
        $this->passwordb = DB_PASSWORD;
        $this->bdname = DB_NAME;

        $this->conn = new mysqli($this->server, $this->user, $this->passwordb, $this->bdname);

        if ($this->conn->connect_error) {
            die("Error de conexión: " . $this->conn->connect_error);
        }
    }

    public function getInfoConexion()
    {
        return "Conectado a la base de datos '{$this->bdname}' en el servidor '{$this->server}' con el usuario '{$this->user}'.";
    }

    public function cerrarConexion()
    {
        $this->conn->close();
        return "Conexión cerrada.";
    }

    public function Select(string $tabla, array $columnas = ['*'], array $condiciones = [], array $datos = [], string $tipoDatos = '', array $operadores = [])
    {
        if (count($datos) !== strlen($tipoDatos))
            return ["Error" => "No coincide el número de datos con los tipos de datos"];

        if (
            !empty($operadores) &&
            count($operadores) !== count($condiciones) - 1
        )
            return ["Error" => "No coincide la cantidad de condiciones y operadores"];

        $columnas = implode(", ", $columnas);

        $this->sql = "SELECT $columnas FROM $tabla";

        if (!empty($condiciones)) {
            $condicionSQL = $condiciones[0];
            if (!empty($operadores)) {
                for ($i = 1; $i < count($condiciones); $i++) {
                    $condicionSQL .= " " . $operadores[$i - 1] . " " . $condiciones[$i];
                }

            }
            $this->sql .= " WHERE $condicionSQL";
        }

        $stmt = $this->conn->prepare($this->sql);

        if (!$stmt) {
            return [
                "Error" => "No se pudo preparar la consulta",
                "Mysql_error" => $this->conn->error,
                "Mysql_codigo" => $this->conn->errno
            ];
        }

        if (!empty($datos)) {
            $stmt->bind_param($tipoDatos, ...$datos);
        }

        if (!$stmt->execute()) {
            return [
                "Error" => "No se pudo ejecutar la consulta",
                "Mysql_error" => $stmt->error,
                "Mysql_codigo" => $stmt->errno
            ];
        }

        $resultado = $stmt->get_result();

        $resultados = [];

        while ($fila = $resultado->fetch_assoc()) {
            $resultados[] = $fila;
        }

        if (empty($resultados)) {
            return ["Error" => "No hubo coincidencias"];
        }

        return $resultados;
    }

    public function Login(string $tabla, array $columnas = ['*'], array $condiciones = [], array $datos = [], string $tipoDatos = '')
    {
        if (empty($condiciones))
            return ["Error" => "No hay condiciones para el LogIn"];

        if (count($datos) !== strlen($tipoDatos))
            return ["Error" => "No coincide el número de datos con los tipos de datos"];

        $password = $datos[1];
        $datosSQL = [$datos[0]];
        $tipoDatosSQL = $tipoDatos[0];

        $columnas = implode(", ", $columnas);
        $condicionSQL = $condiciones[0];

        $this->sql = "SELECT $columnas FROM $tabla WHERE $condicionSQL";

        $stmt = $this->conn->prepare($this->sql);

        if (!$stmt) {
            return [
                "Error" => "No se pudo preparar la consulta",
                "Mysql_error" => $this->conn->error,
                "Mysql_codigo" => $this->conn->errno
            ];
        }

        $stmt->bind_param($tipoDatosSQL, ...$datosSQL);

        if (!$stmt->execute()) {
            return [
                "Error" => "No se pudo ejecutar la consulta",
                "Mysql_error" => $stmt->error,
                "Mysql_codigo" => $stmt->errno
            ];
        }

        $resultado = $stmt->get_result();

        $resultados = [];

        while ($fila = $resultado->fetch_assoc()) {
            if (password_verify($password, $fila['password'])) {
                $resultados[] = $fila;
                break;
            }
        }

        if (empty($resultados))
            return ["Error" => "No hubo coincidencias"];

        return $resultados[0];
    }

        public function SelectOne(string $tabla, array $columnas = ['*'], array $condiciones = [], array $datos = [], string $tipoDatos = '', array $operadores = [])
    {
        if (count($datos) !== strlen($tipoDatos))
            return ["Error" => "No coincide el número de datos con los tipos de datos"];

        if (
            !empty($operadores) &&
            count($operadores) !== count($condiciones) - 1
        )
            return ["Error" => "No coincide la cantidad de condiciones y operadores"];

        $columnas = implode(", ", $columnas);

        $this->sql = "SELECT $columnas FROM $tabla";

        if (!empty($condiciones)) {
            $condicionSQL = $condiciones[0];
            if (!empty($operadores)) {
                for ($i = 1; $i < count($condiciones); $i++) {
                    $condicionSQL .= " " . $operadores[$i - 1] . " " . $condiciones[$i];
                }

            }
            $this->sql .= " WHERE $condicionSQL";
        }

        $stmt = $this->conn->prepare($this->sql);

        if (!$stmt) {
            return [
                "Error" => "No se pudo preparar la consulta",
                "Mysql_error" => $this->conn->error,
                "Mysql_codigo" => $this->conn->errno
            ];
        }

        if (!empty($datos)) {
            $stmt->bind_param($tipoDatos, ...$datos);
        }

        if (!$stmt->execute()) {
            return [
                "Error" => "No se pudo ejecutar la consulta",
                "Mysql_error" => $stmt->error,
                "Mysql_codigo" => $stmt->errno
            ];
        }

        $resultado = $stmt->get_result();

        $resultados = [];

        while ($fila = $resultado->fetch_assoc()) {
            $resultados[] = $fila;
        }

        if (empty($resultados)) {
            return ["Error" => "No hubo coincidencias"];
        }

        return $resultados[0];
    }


    public function Delete(string $tabla, array $condiciones, array $operadores, array $datos, string $tipoDatos)
    {
        if (empty($condiciones))
            return ["Error" => "No hay condiciones para ejecutar DELETE"];

        if (count($datos) !== strlen($tipoDatos))
            return ["Error" => "No coincide el numero de datos con los tipos de datos"];

        if (
            !empty($operadores) &&
            count($operadores) !== count($condiciones) - 1
        )
            return ["Error" => "No coincide la cantidad de condiciones y operadores"];


        $condicionSQL = $condiciones[0];
        if (!empty($operadores)) {
            for ($i = 1; $i < count($condiciones); $i++) {
                $condicionSQL .= " " . $operadores[$i - 1] . " " . $condiciones[$i];
            }
        }
        $this->sql = "DELETE FROM $tabla WHERE $condicionSQL";

        // Prepare the SQL query template/*  */
        $stmt = $this->conn->prepare($this->sql);

        if (!$stmt) {
            return ["Error" => "No se pudo preparar la consulta"];
        }

        $stmt->bind_param($tipoDatos, ...$datos);
        $resultado = $stmt->execute();

        if ($resultado) {
            if ($this->conn->affected_rows > 0) {
                return ["Success" => "DELETE exitoso en tabla $tabla."];
            } else {
                return ["Warning" => "La consulta se ejecutó, pero no se eliminó ninguna fila en $tabla."];
            }
        } else {
            return [
                "Error" => "Delete fallido en tabla $tabla.",
                "Sql" => $this->sql,
                "Mysql_error" => $stmt->error,
                "Mysql_codigo" => $stmt->errno
            ];
        }
    }


    public function Insert(string $tabla, array $columnas, array $datos, string $tiposDatos)
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

        if (!$stmt)
            return ["Error" => "No se pudo preparar la consulta"];

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

        return $this->Insert($tabla, $columnas, $datos, $tiposDatos);
    }

    public function Update(string $tabla, array $condiciones, array $operadores, array $columnas, array $datos, string $tipoDatos)
    {

        if (count($datos) !== strlen($tipoDatos))
            return ["Error" => "No coincide el numero de datos con los tipos de datos"];

        if (empty($condiciones))
            return ["Error" => "No hay condiciones para realizar la actualizacion de datos"];

        if (!empty($operadores) && count($operadores) !== count($condiciones) - 1)
            return ["Error" => "No coincide la cantidad de condiciones y operadores"];

        $valores = [];
        for ($i = 0; $i < count($columnas); $i++) {
            $valores[$i] = $columnas[$i] . " = ?";
        }
        $valores = implode(",", $valores);

        $condicionSQL = $condiciones[0];
        if (!empty($operadores)) {
            for ($i = 1; $i < count($condiciones); $i++) {
                $condicionSQL .= " " . $operadores[$i - 1] . " " . $condiciones[$i];
            }
        }

        // SQL query template
        $this->sql = "UPDATE $tabla SET $valores WHERE $condicionSQL";

        // Prepare the SQL query template/*  */
        $stmt = $this->conn->prepare($this->sql);

        if (!$stmt)
            return ["Error" => "No se pudo preparar la consulta"];

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

    public function Count(string $tabla, array $condiciones = [], array $datos = [], string $tipoDatos = '', array $operadores = [])
    {
        if (count($datos) !== strlen($tipoDatos))
            return ["Error" => "No coincide el número de datos con los tipos de datos"];

        $this->sql = "SELECT COUNT(*) AS total FROM $tabla";

        if (!empty($condiciones)) {
            $condicionSQL = $condiciones[0];
            if (!empty($operadores)) {
                for ($i = 1; $i < count($condiciones); $i++) {
                    $condicionSQL .= " " . $operadores[$i - 1] . " " . $condiciones[$i];
                }
            }
            $this->sql .= " WHERE $condicionSQL";
        }

        $stmt = $this->conn->prepare($this->sql);

        if (!$stmt) {
            return [
                "Error" => "No se pudo preparar la consulta",
                "Mysql_error" => $this->conn->error,
                "Mysql_codigo" => $this->conn->errno
            ];
        }

        if (!empty($datos)) {
            $stmt->bind_param($tipoDatos, ...$datos);
        }

        if (!$stmt->execute()) {
            return [
                "Error" => "No se pudo ejecutar la consulta",
                "Mysql_error" => $stmt->error,
                "Mysql_codigo" => $stmt->errno
            ];
        }
        $resultado = $stmt->get_result();
        $fila = $resultado->fetch_assoc();
        return $fila;
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