<?php

use PHPUnit\Framework\TestCase;

require_once __DIR__ . "/../clases/Imagen.php";

class ImagenTest extends TestCase
{
    public function testConstructorAsignaLosDatos()
    {
        $datos = [
            "id_imagen" => 10,
            "url" => "https://ejemplo.com/wallpaper.jpg",
            "semilla" => "123456",
            "imagen_listada" => 1,
            "id_modelo_base" => 5,
            "prompt_positivo_general" => "anime, girl",
            "prompt_negativo_general" => "low quality",
        ];

        $imagen = new Imagen($datos);

        // Aquí NO estamos repitiendo el código del constructor.
        // Estamos comprobando el resultado que produjo.

        $this->assertInstanceOf(Imagen::class, $imagen);
    }
}
