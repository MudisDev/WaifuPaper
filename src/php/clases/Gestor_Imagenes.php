<?php

require_once __DIR__ . "/../config/server.php";

class Gestor_Imagenes
{
    private $id_personaje;
    private $imagen_perfil;
    private $uploadDir;

    public function __construct(array $datos)
    {
        foreach ($datos as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function Normalizar_Ruta()
    {
        if ($this->id_personaje == 0)
            $this->uploadDir = RUTA_IMAGENES . "imagen-perfil/";
        else
            $this->uploadDir = RUTA_IMAGENES . intval($this->id_personaje) . "/";
    }

    public function Crear_Directorio()
    {
        if (!is_dir($this->uploadDir))
            if (!mkdir($this->uploadDir, 0777, true))
                return ["Error" => "No se pudo crear el directorio"];
        return ["Success" => "El directorio se creo exitosamente"];
    }

    public function Subir_Imagen()
    {
        if (!$this->imagen_perfil || $this->imagen_perfil['error'] !== UPLOAD_ERR_OK)
            return ["Error" => "No se recibió imagen o hubo error en la subida"];

        $originalName = basename($this->imagen_perfil['name']);
        $tmpName = $this->imagen_perfil['tmp_name'];

        // Sanitizar nombre
        $sanitizedName = preg_replace("/[^A-Za-z0-9_\-\.]/", "_", $originalName);

        // Nombre único
        $uniqueName = time() . "_" . $sanitizedName;

        $uploadFile = $this->uploadDir . $uniqueName;

        /*
         * Copiamos el archivo temporal al directorio definitivo.
         * En el entorno local, copy() funciona correctamente,
         * mientras que move_uploaded_file() estaba generando
         * archivos ilegibles.
         */
        if (!copy($tmpName, $uploadFile))
            return ["Error" => "Error al copiar el archivo", "uploadFile" => $uploadFile];

        /*
         * La copia fue exitosa, así que eliminamos
         * el archivo temporal de PHP.
         */
        if (file_exists($tmpName))
            unlink($tmpName);

        // Construir URL pública
        if ($this->id_personaje == 0)
            $urlPublica = BASE_URL_PUBLICA . "imagen-perfil/" . $uniqueName;
        else
            $urlPublica = BASE_URL_PUBLICA . intval($this->id_personaje) . "/" . $uniqueName;

        return [
            "Success" => "Exito al subir el archivo",
            "url" => $urlPublica,
            "filename" => $uniqueName
        ];
    }

    public function Eliminar_Imagen()
    {
        $url = parse_url($this->imagen_perfil, PHP_URL_PATH);

        if (!$url)
            return ["Error" => "URL de imagen inválida"];

        $prefijo = "/wallpapers/waifupaper/";

        if (strpos($url, $prefijo) !== 0)
            return ["Error" => "Ruta de imagen no válida"];

        $rutaRelativa = substr($url, strlen($prefijo));
        $archivo = RUTA_IMAGENES . $rutaRelativa;

        if (!file_exists($archivo))
            return ["Error" => "El archivo no existe"];

        if (!unlink($archivo))
            return ["Error" => "No se pudo eliminar el archivo"];

        return ["Success" => "Imagen eliminada correctamente"];
    }
}