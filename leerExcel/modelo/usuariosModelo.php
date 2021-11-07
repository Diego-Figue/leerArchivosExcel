<?php
include_once "conexion.php";

class modeloUsuarios
{

    public static function mdlRegistrar($nombre,$apellido,$genero)
    {


        try {
            $objRegistrarEstudiante = Conexion::conectar()->prepare("INSERT INTO usuario(nombre,apellido,genero)VALUES(:nombre,:apellido,:genero)");
            $objRegistrarEstudiante->bindParam(":nombre", $nombre, PDO::PARAM_STR);
            $objRegistrarEstudiante->bindParam(":apellido", $apellido, PDO::PARAM_STR);
            $objRegistrarEstudiante->bindParam(":genero", $genero, PDO::PARAM_STR);

            if ($objRegistrarEstudiante->execute()) {
                $mensaje = "ok";
            } else {
                $mensaje = "error";
            }
            $objRegistrarEstudiante = null;
        } catch (Exception $e) {
            $mensaje = $e;
        }

        return $mensaje;
    }

    public static function mdlCargarTabla()
    {
        $objCargarUsuarios = Conexion::conectar()->prepare("select* from usuario");
        $objCargarUsuarios->execute();
        $listaUsuarios = $objCargarUsuarios->fetchAll();
        $objCargarUsuarios = null;
        return $listaUsuarios;
    }
}
