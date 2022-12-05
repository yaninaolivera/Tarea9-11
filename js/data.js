let lista_empleados = []

let lista_storage = window.localStorage;
if (lista_storage.getItem("lista_empleados")) {
    lista_empleados = JSON.parse(lista_storage.getItem("lista_empleados"));
}

let codigo_empleado = 0
if (lista_storage.getItem("codigo_empleado")) {
    codigo_empleado = lista_storage.getItem("codigo_empleado");
}

let posicion = lista_empleados.map(e => e.codigo).indexOf(parseInt(codigo_empleado))
$("#name").val(lista_empleados[posicion].nombre)
$("#last_name").val(lista_empleados[posicion].apellido)
$("#email_address").val(lista_empleados[posicion].correo)
$("#charge").val(lista_empleados[posicion].cargo)

$("#txt_name").text(lista_empleados[posicion].nombre + " " + lista_empleados[posicion].apellido)
$("#txt_email").text(lista_empleados[posicion].correo)
$("#txt_charge").text(lista_empleados[posicion].cargo)
$("#txt_sbruto").text(lista_empleados[posicion].sueldobruto)
$("#txt_sneto").text(lista_empleados[posicion].sueldoneto)

function habilitar() {
    $(".form-control").removeAttr("disabled")
}

function guardar(e) {
    e.preventDefault()
    $("input").removeClass("is-valid is-invalid")
    $("select").removeClass("is-valid is-invalid")
    let form_valido = true

    let exp_name = /^([A-Za-zñÑÁÉÍÓÚáéíóú ]){2,14}$/
    if (exp_name.test($("#name").val()) && $("#name").val() !== "") {
        $("#name").addClass("is-valid")
    } else {
        $("#first_name").addClass("is-invalid")
        form_valido = false
    }

    let exp_last_name = /^([A-Za-zñÑÁÉÍÓÚáéíóú ]){2,14}$/
    if (exp_last_name.test($("#last_name").val()) && $("#last_name").val() !== "") {
        $("#last_name").addClass("is-valid")
    } else {
        $("#last_name").addClass("is-invalid")
        form_valido = false
    }

    let exp_email_address = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (exp_email_address.test($("#email_address").val())) {
        $("#email_address").addClass("is-valid")
    } else {
        $("#email_address").addClass("is-invalid")
        form_valido = false
    }

    if ($("#charge").val() !== "") {
        $("#charge").addClass("is-valid")
    } else {
        $("#charge").addClass("is-invalid")
        form_valido = false
    }

    if (form_valido == true) {
        let existe = lista_empleados.filter(e => e.correo == $("#email_address").val().toLowerCase() && e.codigo !== parseInt(codigo_empleado))
        if (existe.length > 0) {
            alert(`El correo ya existe`)
        } else {
            let sueldos = {
                jefe: 5000,
                analista: 4000,
                programador: 3000,
                soporte: 2000,
                asistente: 1500,
            }
            
            lista_empleados[posicion]["nombre"] = $("#name").val()
            lista_empleados[posicion]["apellido"] = $("#last_name").val()
            lista_empleados[posicion]["correo"] = $("#email_address").val()
            lista_empleados[posicion]["cargo"] = $("#charge").val()
            lista_empleados[posicion]["sueldobruto"] = sueldos[$("#charge").val().toLowerCase()]
            lista_empleados[posicion]["sueldoneto"] = lista_empleados[posicion]["sueldobruto"] * 80 / 100
            
            lista_storage.setItem("lista_empleados", JSON.stringify(lista_empleados));
            alert(`Modificado correctamente`)
            window.location.href = "lista.html"
        }
    }
}




