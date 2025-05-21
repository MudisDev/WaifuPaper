<?php
/* ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL); */

require_once 'clases/Conexion.php';
require_once 'clases/Usuario.php'; 

 $conexion = new Conexion();
echo $conexion->getInfoConexion(); 
//echo "BV";
/* $username = $_GET['username'];
echo "username -> $username";
 */
//?nombre=mudisBv&username=mudis&email=martin@rocketmail.com&password=Kazo&genero=masculino&telefono=4571051235&foto_perfil=FotoBv
$usuario = new Usuario($_GET);
$resultado = $usuario->RegistrarUsuario();
echo json_encode($resultado);
?>