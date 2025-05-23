<?php
 require_once '../../clases/Lista.php';

 $lista = new Lista();
 $lista->Consultar_Personajes();
 $resultado = $lista->Get_Lista();
 echo json_encode($resultado);

?>