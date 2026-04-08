<?php
require_once 'Conexion.php';

require_once __DIR__ . "/Imagen_Etiqueta.php";
require_once __DIR__ . "/Imagen_Modelo_Lora.php";
require_once __DIR__ . "/Imagen_Personaje.php";

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

    public function Buscar_Imagen()
    {
        $conexion = new Conexion();
        $condiciones = "id_imagen = '$this->id_imagen'";
        $resultado = $conexion->SetSelect("Imagen", ["*"], $condiciones);

        return $resultado;
    }

    public function editar_imagen($conexion)
    {
        //$conexion = new Conexion();
        $condiciones = "id_imagen = '$this->id_imagen'";
        $columnas_actualizar = "url = '$this->url', semilla = '$this->semilla', imagen_listada = '$this->imagen_listada', id_modelo_base = '$this->id_modelo_base'";
        $resultado = $conexion->SetUpdate("Imagen", $columnas_actualizar, $condiciones);

        //return $resultado;
        $this->CheckResultado($resultado);
    }


    public function Actualizacion_Imagen_Completa($ids_etiquetas, $ids_modelos_lora, $prompts_modelos_lora, $fuerza_modelos_lora)
    {

        $conexion = new Conexion();
        $imagen_etiqueta = new Imagen_Etiqueta(["id_imagen" => $this->id_imagen, "ids_etiquetas" => $ids_etiquetas]);
        $imagen_modelo_lora = new Imagen_Modelo_Lora(["id_imagen" => $this->id_imagen, "ids_modelos_lora" => $ids_modelos_lora, "prompts_modelos_lora" => $prompts_modelos_lora, "fuerza_modelos_lora" => $fuerza_modelos_lora]);

        try {

            $conexion->BeginTransaction();
            $this->editar_imagen($conexion);

            //actualizar etiquetas
            $imagen_etiqueta->Actualizar_Etiquetas($conexion);

            //actualizar personajes

            //actualizar loras
            $imagen_modelo_lora->Actualizar_Modelos_Lora($conexion);

            /*  foreach ($this->ids_etiquetas as $id_etiqueta) {
                 $this->Insertar_Etiqueta($conexion, $id_etiqueta);
             } */

            $conexion->Commit();

            return true;

        } catch (Throwable $th) {
            $conexion->Rollback();
            return false;
        }


    }
    private function CheckResultado($resultado)
    {
        if (isset($resultado["Error"])) {
            throw new Exception($resultado["Error"]);
        }
    }

    public function Mostrar_Personajes_En_Imagen(){
        $condiciones = "id_imagen = '$this->id_imagen'";
        $conexion = new Conexion();
        $resultado = $conexion->SetSelect("vista_aparece_en", ["*"], $condiciones);

        return $resultado;
    }
}
