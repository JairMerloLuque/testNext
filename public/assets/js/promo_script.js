
// Check active classes
var checkClass = function() {
    if ( $('.page-section').hasClass('hide') ) {
        $('.page-section').removeClass('hide');
    }
};
if ($('.promos_activas_click').hasClass('active')) {
    checkClass();
    $('.page-section:not(.promos_activas)').toggleClass('hide');
}
// Category filters
$('.all').click( function() {
    checkClass();
    var element = document.getElementById("sinpromos");
    element.style.display = "none";
});

$('.promos_activas_click').click( function() {
    checkClass();
    $('.page-section:not(.promos_activas)').toggleClass('hide');
});
$('.promos_finalizadas_click').click( function() {
    checkClass();
    $('.page-section:not(.promos_finalizadas)').toggleClass('hide');
    var element = document.getElementById("sinpromos");
    element.style.display = "none";
});
if($("#datatable_ganadores").length > 0){
    $("#datatable_ganadores").DataTable({
        "paging":   true,
        "ordering": false,
        "info":     false,
        "language": {
            "lengthMenu": "visualización -- registros por página",
            "zeroRecords": "No hay datos de su elección.",
            "infoEmpty": "No hay registros disponibles"
        },
        layout: {
            topStart: 'info',
            topEnd: {
                search: {
                    placeholder: 'Últimos 5 dígitos de CI'
                }
            }
        }
    });
}

// Obtener el elemento por su clase
const elemento = $('.dt-layout-start:first');

// Crear el nuevo elemento de campo de texto
const campoTexto = $('<div class="title_table_winners">Ellos ya ganaron usando Yape</div>'); // Especificar el tipo de campo de texto (puedes personalizarlo)

// Agregar el campo de texto al elemento
elemento.append(campoTexto);
// Active tag
$('.button').click(function(){
    if($('.page-section').children(':visible').length == 0) {
        // Swal.fire({
        //     title: 'Estamos trabajando!',
        //     text: '¡Muy pronto tendremos novedades!',
        //     imageUrl: 'https://i.gifer.com/Ao.gif',
        //     imageWidth: 400,
        //     imageHeight: 400,
        //     imageAlt: 'Yape articulos',
        // })
        // $('.sin_promos').css('display','block');
        var element = document.getElementById("sinpromos");
        element.style.display = "block";
        document.getElementsByClassName('conpromos')[0].style.display = 'none';
    }
    $('.button').removeClass('active');
    $(this).addClass('active');
    document.getElementsByClassName('conpromos')[0].style.display = 'block';
})

