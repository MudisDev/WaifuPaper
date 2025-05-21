<?php
 require_once '../../clases/Lista.php';

 $lista = new Lista();
 $lista->Consultar_Imagenes();
 $resultado = $lista->Get_Lista();
 echo json_encode($resultado);

?>