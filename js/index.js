let lista_empleados = []

let lista_storage = window.localStorage;
if (lista_storage.getItem("lista_empleados")) {
    lista_empleados = JSON.parse(lista_storage.getItem("lista_empleados"));
}

class Empleado{
    constructor(codigo, nombre, apellido, correo, cargo){
        this.codigo = codigo
        this.nombre = nombre 
        this.apellido = apellido
        this.correo = correo
        this.cargo = cargo
        this.sueldobruto = this.sueldoBruto()
        this.sueldoneto = this.sueldoNeto()
    }

    sueldoBruto(){
        let sueldos = {
            jefe: 5000,
            analista: 4000,
            programador: 3000,
            soporte: 2000,
            asistente: 1500,
        }
        return sueldos[this.cargo.toLowerCase()]
    }

    sueldoNeto(){
        return this.sueldobruto * 80 / 100
    }
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
        $("#name").addClass("is-invalid")
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
        let existe = lista_empleados.filter(e => e.correo == $("#email_address").val().toLowerCase())
        if (existe.length > 0) {
            alert(`El correo ya existe`)
        }else{
            let codigo = lista_empleados.length + 1
            let nuevo_empleado = new Empleado(codigo, $("#name").val(), $("#last_name").val(), $("#email_address").val().toLowerCase(), $("#charge").val())

            lista_empleados.push(nuevo_empleado)
            lista_storage.setItem("lista_empleados", JSON.stringify(lista_empleados));
            $("#formulario")[0].reset()
            alert(`Registrado correctamente`)
        }
    }
}
