<?php

include_once "../modelo/usuariosModelo.php";

class controlUsuarios{
    public $nombre;
    public $apellido;
    public $genero;
    public $datos;

    public function ctrRegistrar(){
        $objRespuesta = modeloUsuarios::mdlRegistrar($this->nombre,$this->apellido,$this->genero);
        echo json_encode($objRespuesta);
    }

    public function ctrCargarTabla()
    {
        $objRespuesta = modeloUsuarios::mdlCargarTabla();
        echo json_encode($objRespuesta);
    }

}

if (isset($_POST["nombre"]) && isset($_POST["apellido"]) && isset($_POST["genero"])){
    $objUsuarios = new controlUsuarios();
    $objUsuarios->nombre = $_POST["nombre"];
    $objUsuarios->apellido = $_POST["apellido"];
    $objUsuarios->genero = $_POST["genero"];
    $objUsuarios->ctrRegistrar();
}

if(isset($_POST["cargarUsuarios"]) == "ok"){
    $objUsuarios = new controlUsuarios();;
    $objUsuarios->ctrCargarTabla();
}