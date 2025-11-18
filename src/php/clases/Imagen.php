<?php
require_once 'Conexion.php';

class Imagen
{

    /*    CREATE TABLE Imagen (
       id_imagen INT AUTO_INCREMENT PRIMARY KEY,
       url TEXT NOT NULL,
       semilla TEXT NOT NULL,
       imagen_listada BOOLEAN DEFAULT NULL,
       id_modelo_base INT NOT NULL,
       fecha_insercion DATETIME DEFAULT CURRENT_TIMESTAMP,
       fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
       FOREIGN KEY (id_modelo_base) REFERENCES Modelo_Base (id_modelo_base)
   ); */
    private $id_imagen = null;
    private $url = null;
    private $semilla = null;
    private $imagen_listada = null;
    private $id_modelo_base = null;
    private $fecha_insercion = null;
    private $fecha_actualizacion = null;

    private $array_insert = [
        "url",
        "semilla",
        "imagen_listada",
        "id_modelo_base",

        /* "fecha_insercion",
        "fecha_actualizacion", */
    ];

    public function __construct(array $datos)
    {
        foreach ($datos as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function Registrar_Imagen()
    {
        $conexion = new Conexion();
        $resultado = $conexion->SetInsert(
            "Imagen",
            $this->array_insert,
            [
                $this->url,
                $this->semilla,
                $this->imagen_listada,
                $this->id_modelo_base,
                
                /*  $this->fecha_insercion,
                 $this->fecha_actualizacion, */
               
            ]
        );
        return $resultado;
    }

    public function Imagen_Existe()
    {
        // Escapamos los valores para seguridad
        $conexion = new Conexion();
        $resultado = $conexion->SetSelect("Imagen", ["*"], "id_imagen_api = '$this->id_imagen_api' AND api_origen = '$this->api_origen'");

        return $resultado;
    }

    public function Consultar_Etiquetas()
    {
        $conexion = new Conexion();
        $resultado = $conexion->SetSelect("Vista_Tiene_Etiqueta", ["id_etiqueta", "nombre_etiqueta"], "id_imagen = '$this->id_imagen'");
        return $resultado;
    }

}
