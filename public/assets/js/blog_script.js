window.addEventListener("pageshow", function (event) {
    // Si la página viene del cache (bfcache) o se vuelve a mostrar
    if (event.persisted) {
        // Ejecuta tu script aquí
        if ($('.page-section').hasClass('hide')) {
            $('.page-section').removeClass('hide');
            $('.button').removeClass('active');
            $('.all').addClass('active');
        }
    } else {
        // También puedes ejecutarlo siempre si quieres asegurarte
        if ($('.page-section').hasClass('hide')) {
            $('.page-section').removeClass('hide');
            $('.button').removeClass('active');
            $('.all').addClass('active');
        }
    }
});
var checkClass = function () {
    if ($('.page-section').hasClass('hide')) {
        $('.page-section').removeClass('hide');
    }
};

// Category filters
$('.all').click(function () {
    checkClass();
});

$('.adios_al_efectivo').click(function () {
    checkClass();
    $('.page-section:not(.adios_al_efectivo)').toggleClass('hide');
});
$('.inclusion_financiera').click(function () {
    checkClass();
    $('.page-section:not(.inclusion_financiera)').toggleClass('hide');
});
// $('.mundo_fintech').click( function() {
//     checkClass();
//     $('.page-section:not(.mundo_fintech)').toggleClass('hide');
// });
// $('.prensa').click( function() {
//     checkClass();
//     $('.page-section:not(.prensa)').toggleClass('hide');
// });
// $('.negocios_digitales').click( function() {
//     checkClass();
//     $('.page-section:not(.negocios_digitales)').toggleClass('hide');
// });

// Active tag
$('.button').click(function () {
    if ($('.page-section').children(':visible').length == 0) {
        Swal.fire({
            title: 'Estamos trabajando!',
            text: '¡Muy pronto tendremos novedades!',
            imageUrl: 'https://i.gifer.com/Ao.gif',
            imageWidth: 400,
            imageHeight: 400,
            imageAlt: 'Yape articulos',
        })
    }
    $('.button').removeClass('active');
    $(this).addClass('active');
})

