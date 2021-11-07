$(document).ready(function () {

    cargarUsuarios

    $("#leer").click(function () {

        /* set up XMLHttpRequest */
        var url = "vista/js/usuarios.xlsx";
        var oReq = new XMLHttpRequest();
        oReq.open("GET", url, true);
        oReq.responseType = "arraybuffer";

        oReq.onload = function (e) {
            var arrayDatos = readData();
            for (let index = 0; index < arrayDatos.length; index++) {

                var resultado = arrayDatos[index];

                var nombre = (resultado.nombre);
                var apellido = (resultado.apellido);
                var genero = (resultado.genero);

                console.log(nombre);
                var objData = new FormData();
                objData.append("nombre", nombre);
                objData.append("apellido", apellido);
                objData.append("genero", genero);

                $.ajax({
                    url: "controlador/usuariosControlador.php",
                    type: "post",
                    dataType: "json",
                    data: objData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (respuesta) {
                        if (respuesta == "ok") {
                            swal({
                                title: "Buen Trabajo!",
                                text: "Excel Cargado Correctamente",
                                icon: "success",
                                button: "Aceptar",
                            });
                        } else {
                            swal({
                                title: "Error!",
                                text: respuesta,
                                icon: "error",
                                button: "Aceptar",
                            });
                        }

                    }
                })
                cargarUsuarios();
            }


            function readData() {

                var arraybuffer = oReq.response;

                /* convert data to binary string */
                var data = new Uint8Array(arraybuffer);
                var arr = new Array();
                for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
                var bstr = arr.join("");

                /* Call XLSX */
                var workbook = XLSX.read(bstr, {
                    type: "binary"
                });

                /* DO SOMETHING WITH workbook HERE */
                var first_sheet_name = workbook.SheetNames[0];
                /* Get worksheet */
                var worksheet = workbook.Sheets[first_sheet_name];
                var arrayDatos = XLSX.utils.sheet_to_json(worksheet, {
                    raw: true
                });
                return arrayDatos;
            }

        }

        oReq.send();

    })

    function cargarUsuarios() {
        var cargarUsuarios = "ok";
        var objData = new FormData();
        objData.append("cargarUsuarios", cargarUsuarios);
        $.ajax({
            url: "controlador/usuariosControlador.php",
            type: "post",
            dataType: "json",
            data: objData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {
                var interface = '';
                var contadorFilas = 0;
                respuesta.forEach(cargarListaUsuarios);

                function cargarListaUsuarios(item, index) {
                    contadorFilas += 1;
                    interface += '<tr>';
                    interface += '<td>' + contadorFilas + '</td>';
                    interface += '<td>' + item.nombre + '</td>';
                    interface += '<td>' + item.apellido + '</td>';
                    interface += '<td>' + item.genero + '</td>';
                    interface += '</tr>';
                }

                $("#bodyUsuarios").html(interface);

            }
        })
    }


})

