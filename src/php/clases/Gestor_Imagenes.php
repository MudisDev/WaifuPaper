<?php

require_once __DIR__ . "/../config/server.php";

class Gestor_Imagenes
{
    private $id_personaje;
    private $imagen_perfil;

    private $docRoot;
    private $uploadDir;

    public function __construct($id_personaje, $imagen_perfil)
    {
        $this->id_personaje = intval($id_personaje);
        $this->imagen_perfil = $imagen_perfil;
        $this->Normalizar_Ruta();
    }

    private function Normalizar_Ruta()
    {
        $this->docRoot = rtrim($_SERVER['DOCUMENT_ROOT'], '/\\');
        if ($this->id_personaje == 0) {
            $this->uploadDir = $this->docRoot . "/waifupaper/wallpapers/imagen-perfil/";

        } else {
            $this->uploadDir = $this->docRoot . "/waifupaper/wallpapers/" . $this->id_personaje . "/";
        }
    }

    public function Crear_Directorio()
    {
        if (!is_dir($this->uploadDir)) {

            if (!mkdir($this->uploadDir, 0777, true)) {
                return [
                    "Error" => "No se pudo crear el directorio"
                ];
            }
        }

        return ["Success" => "El directorio se creo exitosamente"];
    }

    public function Subir_Imagen()
    {
        if (!$this->imagen_perfil || $this->imagen_perfil['error'] !== UPLOAD_ERR_OK) {
            return [
                "Error" => "No se recibió imagen o hubo error en la subida"
            ];
        }

        $originalName = basename($this->imagen_perfil['name']);
        $tmpName = $this->imagen_perfil['tmp_name'];

        // Sanitiza
        $sanitizedName = preg_replace("/[^A-Za-z0-9_\-\.]/", "_", $originalName);

        // Nombre único
        $uniqueName = time() . "_" . $sanitizedName;

        $uploadFile = $this->uploadDir . $uniqueName;

        if (move_uploaded_file($tmpName, $uploadFile)) {
            chmod($uploadFile, 0644);

            // Construir URL pública desde config.php
            if ($this->id_personaje == 0) {
                $urlPublica = BASE_URL_PUBLICA . "imagen-perfil/" . $uniqueName;

            } else {
                $urlPublica = BASE_URL_PUBLICA . intval($this->id_personaje) . "/" . $uniqueName;
            }
            


            return [
                "Success" => "Exito al mover el archivo",
                "url" => $urlPublica,
                "filename" => $uniqueName
            ];
        }

        return [
            "Error" => "Error al mover el archivo"
        ];
    }
}

?>