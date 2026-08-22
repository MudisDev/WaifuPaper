<?php
require_once 'Conexion.php';

require_once __DIR__ . "/Imagen_Etiqueta.php";
require_once __DIR__ . "/Imagen_Modelo_Lora.php";
require_once __DIR__ . "/Imagen_Personaje.php";

class Imagen
{
    private $id_imagen = null;
    private $url = null;
    private $semilla = null;
    private $imagen_listada = null;
    private $id_modelo_base = null;
    private $fecha_insercion = null;
    private $fecha_actualizacion = null;
    private $prompt_positivo_general = null;
    private $prompt_negativo_general = null;

    private $array_insert = [
        "url",
        "semilla",
        "imagen_listada",
        "id_modelo_base",
        "prompt_positivo_general",
        "prompt_negativo_general",
    ];

    public function __construct(array $datos)
    {
        foreach ($datos as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function Registrar_Imagen($conexion)
    {
        $resultado = $conexion->Insert(
            "Imagen",
            $this->array_insert,
            [$this->url, $this->semilla, $this->imagen_listada, $this->id_modelo_base, $this->prompt_positivo_general, $this->prompt_negativo_general],
            "ssiiss"
        );
        return $resultado;
    }

    public function Consultar_Etiquetas()
    {
        $conexion = new Conexion();
        $resultado = $conexion->Select("Vista_Tiene_Etiqueta", ["id_etiqueta", "nombre_etiqueta"], ["id_imagen = ?"], [$this->id_imagen], 'i');
        return $resultado;
    }

    public function Buscar_Imagen()
    {
        $conexion = new Conexion();
        $resultado = $conexion->Select("Imagen", ["*"], ["id_imagen = ?"], [$this->id_imagen], 'i');
        return $resultado;
    }

    public function Buscar_Imagen_Vista()
    {
        $conexion = new Conexion();
        $resultado = $conexion->Select("vista_imagen_datos", ["*"], ["id_imagen = ?"], [$this->id_imagen], 'i');
        return $resultado;
    }

    public function editar_imagen($conexion)
    {
        $resultado = $conexion->Update(
            "Imagen",
            ["id_imagen = ?"],
            [],
            ["url", "semilla", "imagen_listada", "id_modelo_base", "prompt_positivo_general", "prompt_negativo_general",],
            [$this->url, $this->semilla, $this->imagen_listada, $this->id_modelo_base, $this->prompt_positivo_general, $this->prompt_negativo_general, $this->id_imagen],
            "ssiissi"
        );
        $this->CheckResultado($resultado);
    }

    public function Actualizacion_Imagen_Completa($ids_etiquetas, $ids_modelos_lora, $prompts_positivos_modelos_lora, $prompts_negativos_modelos_lora, $fuerza_modelos_lora, $ids_personajes)
    {
        $conexion = new Conexion();
        try {

            $conexion->BeginTransaction();

            if ($this->id_imagen == null) {
                $resultado = $this->Registrar_Imagen($conexion);
                if (!isset($resultado["Success"])) {
                    throw new Exception("No se pudo registrar la imagen.");
                }
                $this->id_imagen = $resultado["id_generado"];

            } else
                $this->editar_imagen($conexion);

            $imagen_etiqueta = new Imagen_Etiqueta(["id_imagen" => $this->id_imagen, "ids_etiquetas" => $ids_etiquetas]);
            $imagen_modelo_lora = new Imagen_Modelo_Lora(["id_imagen" => $this->id_imagen, "ids_modelos_lora" => $ids_modelos_lora, "prompts_positivos_modelos_lora" => $prompts_positivos_modelos_lora, "fuerza_modelos_lora" => $fuerza_modelos_lora, "prompts_negativos_modelos_lora" => $prompts_negativos_modelos_lora]);
            $imagen_personaje = new Imagen_Personaje(["id_imagen" => $this->id_imagen, "ids_personajes" => $ids_personajes]);

            $imagen_etiqueta->Actualizar_Etiquetas($conexion);
            $imagen_personaje->Actualizar_Personajes($conexion);
            $imagen_modelo_lora->Actualizar_Modelos_Lora($conexion);

            $conexion->Commit();
            return ["Success" => "Transaccion Exitosa"];

        } catch (Throwable $th) {
            $conexion->Rollback();
            return [
                "Error" => $th->getMessage()
            ];
        }
    }
    private function CheckResultado($resultado)
    {
        if (isset($resultado["Error"])) {
            throw new Exception($resultado["Error"]);
        }
    }

    public function Mostrar_Personajes_En_Imagen()
    {
        $conexion = new Conexion();
        $resultado = $conexion->Select("vista_aparece_en", ["*"], ["id_imagen = ?"], [$this->id_imagen], 'i');
        return $resultado;
    }
}
