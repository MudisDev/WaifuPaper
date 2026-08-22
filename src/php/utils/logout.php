<?php

function Cerrar_Sesion()
{
    session_start();
    session_unset();
    session_destroy();

    setcookie(session_name(), '', time() - 3600, '/');
}

?>