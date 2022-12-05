let lista_empleados = []

let lista_storage = window.localStorage;
if (lista_storage.getItem("lista_empleados")) {
    lista_empleados = JSON.parse(lista_storage.getItem("lista_empleados"));
}

listar()
function listar() {
    $("#lista").empty()
    for (index in lista_empleados) {
        let tr = `<tr>`
            tr += `<td>${lista_empleados[index].codigo}</td>`
            tr += `<td>${lista_empleados[index].nombre}</td>`
            tr += `<td>${lista_empleados[index].apellido}</td>`
            tr += `<td>${lista_empleados[index].correo}</td>`
            tr += `<td>${lista_empleados[index].cargo}</td>`
            tr += `<td>${lista_empleados[index].sueldobruto}</td>`
            tr += `<td>${lista_empleados[index].sueldoneto}</td>`
        tr += `<td><a href="#" class="text-purple" onclick="ver(${lista_empleados[index].codigo})"><i class="fe-file-text"></i> Ver Data</a></td>`
        tr += `</tr>`
        $("#lista").append(tr)
    }
}

function ver(codigo) {
    lista_storage.setItem("codigo_empleado", codigo);
    window.location.href = "data.html"
}

let reverse = "asc"
function ordenar(parametro) {
    if (reverse === "asc") {
        $(".fe-arrow-down").show()
        $(".fe-arrow-up").hide()
    }else{
        $(".fe-arrow-down").hide()
        $(".fe-arrow-up").show()
    }

    if (lista_empleados.length > 0) {
        let strings = ["nombre", "apellido", "correo", "cargo"]
        if (strings.includes(parametro)) {
            if (reverse === "asc") {
                lista_empleados.sort((a, b) => String(b[parametro]).localeCompare(String(a[parametro])))
            } else {
                lista_empleados.sort((a, b) => String(a[parametro]).localeCompare(String(b[parametro])))
            }
        } else {
            if (reverse === "asc") {
                lista_empleados.sort((a, b) => b[parametro] - a[parametro])
            } else {
                lista_empleados.sort((a, b) => a[parametro] - b[parametro])
            }
        }

        if (reverse === "asc") {
            reverse = "desc"
        }else{
            reverse = "asc"
        }
        listar()
    }
}
