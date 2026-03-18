$(document).ready(function () {
    function generateShortUUID() {
        return crypto.randomUUID().replace(/-/g, "")
    }

    function getPathWeb() {
        return window.location.pathname
    }

    function FloatButtonPeruBolivia() {
        const pathWeb = getPathWeb();
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: "popup_view",
            id_event: generateShortUUID(),
            id_journey: "popup_view_estas_en_yape_bolivia",
            id_multiproduct_journey: "yape web",
            path_web: pathWeb,
        });
        //console.log("Popup Web enviado al Data Layer:", pathWeb);
    }

    let curWwwPath = window.document.location.href;
    let pathName = window.document.location.pathname;
    let pos = curWwwPath.indexOf(pathName);
    let flagBol;
    if ("https://www.yape.com.bo/" == curWwwPath || "https://www.yape.com.bo/index.html" == curWwwPath) {
        flagBol = 'https://www.yape.com.bo/assets/img/Flag_Bol.png';
    } else {
        flagBol = 'https://www99.bancred.com.bo/yape.com.bo/assets/img/Flag_Bol.png'
    }
    if ("https://www.yape.com.bo/" == curWwwPath || "https://www.yape.com.bo/index.html" == curWwwPath || "http://127.0.0.1:5501/" == curWwwPath || "https://www99.bancred.com.bo/yape.com.bo/" == curWwwPath) {
        Swal.fire({
            width: "54vh",
            padding: 32,
            html: `<img alt="yape Bolivia Peru" width="80" height="80" style=" width: -webkit-fill-available; max-width: 80px" src=` + flagBol + ` alt="QR de yape" placeholder="blur"> 
                            <div class="yape-texto-purpura font-size-24 mt-16" style="font-family: Roboto-Bold">Estás en Yape Bolivia</div>
                            <div class="font-size-16 mt-16" style="width: -webkit-fill-available;font-family: Roboto-Regular">Hemos detectado que estás accediendo a nuestro sitio web de Bolivia.</div>`,
            showCloseButton: false,
            confirmButtonColor: "#10CBB4",
            showConfirmButton: true,
            showCancelButton: true,
            backdrop: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            confirmButtonText: 'Ir a Yape Perú',
            cancelButtonText: "Seguir en Yape Bolivia",
            customClass: {
                confirmButton: 'bta_cta_popup',
                cancelButton: 'bta_back_white_popup',
            }
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                FloatButtonPeruBolivia();
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    event: "click_popup", // Puedes personalizar el nombre del evento
                    id_event: generateShortUUID(),
                    button_name: "ir_a_yape_peru",
                    id_journey: "experiencia",
                    id_multiproduct_journey: "yape_web",
                    title: "Estás en Yape Bolivia",
                    search_term: null,
                    search_result: null,
                    feedback_text: null,
                    description: null,
                    id_flow: null,
                    id_type: "btn_action",
                    screen_name: "home_popup",
                    category_menu: null,
                    page_location: window.location.href,
                    page_title: document.title,
                    path_web: window.location.pathname,
                });

                window.location.replace("https://www.yape.com.pe/");
            } else {
                FloatButtonPeruBolivia();
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    event: "click_popup", // Puedes personalizar el nombre del evento
                    id_event: generateShortUUID(),
                    button_name: "seguir_en_yape_bolivia",
                    id_journey: "experiencia",
                    id_multiproduct_journey: "yape_web",
                    title: "Estás en Yape Bolivia",
                    search_term: null,
                    search_result: null,
                    feedback_text: null,
                    description: null,
                    id_flow: null,
                    id_type: "btn_action",
                    screen_name: "home_popup",
                    category_menu: null,
                    page_location: window.location.href,
                    page_title: document.title,
                    path_web: window.location.pathname,
                });

            }
        })
    }

    const buttons_confirm_swal = document.querySelectorAll('.swal2-confirm');

    buttons_confirm_swal.forEach(button_confirm_swal => {

        button_confirm_swal.setAttribute('data-button-name', 'ir_a_yape_peru');
        button_confirm_swal.setAttribute('data-id-journey', 'experiencia');
        button_confirm_swal.setAttribute('data-id-multiproduct-journey', 'yape_web');
        button_confirm_swal.setAttribute('data-id-type', 'btn_interaction');
        button_confirm_swal.setAttribute('data-screen-name', 'home_popup');
        button_confirm_swal.setAttribute('id', 'ir_a_yape_peru');
    });

    const buttons_cancel_swal = document.querySelectorAll('.swal2-cancel');

    buttons_cancel_swal.forEach(button_cancel_swal => {

        button_cancel_swal.setAttribute('data-button-name', 'seguir_en_yape_bolivia');
        button_cancel_swal.setAttribute('data-id-journey', 'experiencia');
        button_cancel_swal.setAttribute('data-id-multiproduct-journey', 'yape_web');
        button_cancel_swal.setAttribute('data-id-type', 'btn_interaction');
        button_cancel_swal.setAttribute('data-screen-name', 'home_popup');
        button_cancel_swal.setAttribute('id', 'seguir_en_yape_bolivia');
    });


    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            var path = window.location.pathname;
            var match = path.match(/(.*\/centro_de_ayuda_webview\/)/);
            if (match) {
                navigator.serviceWorker.register(match[1] + 'sw.js', { scope: match[1] })
                    .catch(function(err) { console.warn('SW registration failed: ', err); });
            }
        });
    }
});
if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    document.querySelector('meta[name=viewport]')
        .setAttribute(
            'content',
            'initial-scale=1.0001, minimum-scale=1.0001, maximum-scale=1.0001, user-scalable=no'
        );
    // $('.input-search').css('margin-top', '15px');
}
$('.checkbox-resp-no input').on('change', function () {
    // alert($('input[name=radio_response_no]:checked', '.checkbox-resp-no').val());
    if ($('input[name=radio_response_no]:checked', '.checkbox-resp-no').val() == "Otra razón") {
        $(".other_option_response_no").css("display", "block");
    } else {
        $(".other_option_response_no").css("display", "none");
    }
});

function saliendo_de_la_app() {
    Swal.fire({
        width: "54vh",
        padding: "0 32px",
        html: ` 
              <div class="yape-texto-purpura font-size-24 mt-16" style="font-family: Roboto-Bold">Estás saliendo de nuestra app</div>
              <div class="font-size-16 mt-16" style="width: -webkit-fill-available;font-family: Roboto-Regular">Estás saliendo hacia una app externa ¿Deseas continuar?</div>
              `,
        showCloseButton: false,
        confirmButtonColor: "#10CBB4",
        showConfirmButton: true,
        showCancelButton: true,
        backdrop: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        confirmButtonText: 'CONTINUAR',
        cancelButtonText: "VOLVER",
        customClass: {
            confirmButton: 'bta_cta_wpp_popup',
            cancelButton: 'bta_back_white_wpp_popup',
        }
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            window.location.replace("https://wa.me/59172007654?text=Hola,vengo+de+la+app,+cambié+de+teléfono+no+puedo+acceder+a+Yape");
        }
    })
}

function countChar(val) {
    var len = val.value.length;
    if (len == 0) {
        $(".pf_si_fin").addClass('disabled');
    } else {
        $(".pf_si_fin").removeClass('disabled');
    }
    $(val).next().html(300 - len + " / 300");
}

function countChar2(val) {
    var len = val.value.length;
    if (len == 0) {
        $(".pf_no_fin").addClass('disabled');
    } else {
        $(".pf_no_fin").removeClass('disabled');
    }
    $(val).next().html(100 - len + " / 100");
}

function countChar3(val) {
    var len = val.value.length;
    if (len == 0) {
        $(".pf_no_fin").addClass('disabled');
    } else {
        $(".pf_no_fin").removeClass('disabled');
    }
    $(val).next().html(300 - len + " / 300");
}

function detectMob() {
    return ((window.innerWidth <= 997));
}

//scroll to element phone just in phone
function scrollFunction() {
    let e = document.getElementById("phone_expo");
    if (detectMob()) {
        e.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
            inline: 'start'
        });
    }
}

function getposition(url, id) {
    if (window.navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

        function successCallback(datos) {
            // console.log(datos);
            var YOUR_LAT = datos.coords.latitude;
            var YOUR_LON = datos.coords.longitude
            var iframe_agentes = document.createElement('iframe');
            iframe_agentes.width = "100%";
            iframe_agentes.height = "400px";
            iframe_agentes.setAttribute("src", url + '&ll=' + YOUR_LAT + '%2C' + YOUR_LON + '&z=13');
            document.getElementById(id).appendChild(iframe_agentes);

        }

        function errorCallback(error) {
            var iframe_agentes = document.createElement('iframe');
            iframe_agentes.width = "100%";
            iframe_agentes.height = "400px";
            iframe_agentes.setAttribute("src", url);
            document.getElementById(id).appendChild(iframe_agentes);
        }
    }
}

function cargarMapa(url, contenedorId) {
    const $el = $("#" + contenedorId);

    if ($el.length === 0) return;

    // Evitar insertar dos veces
    if ($el.data("loaded") === true) return;

    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.loading = "lazy"; // Lazy loading
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.style.border = "0";
    iframe.width = "100%";
    iframe.height = "450";

    // Fallback si no carga
    iframe.onerror = () => {
        $el.html(`<p style="color:#c00">No se pudo cargar el mapa. Intenta nuevamente.</p>`);
    };

    $el.append(iframe);
    $el.data("loaded", true);
}
function observarMapa(id, url) {
    const el = document.getElementById(id);
    if (!el) return;

    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            cargarMapa(url, id);
            observer.disconnect();
        }
    });

    observer.observe(el);
}
observarMapa("agentes_atm_bcp",
    "https://www.google.com/maps/d/embed?mid=1w7mjA8BTGvV6lEb2X0ZXttE41tGt9_E&ehbc=2E312F&noprof=1"
);

observarMapa("agentes_bcp",
    "https://www.google.com/maps/d/embed?mid=19z1ANkjUJ9m6HtkCX2DZxwEF4m_JVfY&ehbc=2E312F&noprof=1"
);

observarMapa("atm_bcp",
    "https://www.google.com/maps/d/embed?mid=1Asn6iQzNJpchez2rm6limbmQZ3QSKc8&ehbc=2E312F&noprof=1"
);

// mapa con agentes y cajeros

//videos para web y movil
function video_web_mobile(videoweb, videomobile, id, id_frame) {
    var iframe_agentes = document.createElement('iframe');
    iframe_agentes.width = "100%";
    if (window.innerWidth <= 997) {
        iframe_agentes.height = "900px";
        iframe_agentes.setAttribute("src", videomobile);
    } else {
        iframe_agentes.height = "615px";
        iframe_agentes.setAttribute("src", videoweb);
    }
    iframe_agentes.setAttribute("id", id_frame);
    document.getElementById(id).appendChild(iframe_agentes);
}

function video_deposita_desde_agentes() {
    video_web_mobile("https://www.youtube.com/embed/SQOugA_rbKA", "https://www.youtube.com/embed/SQOugA_rbKA", "video_depositaagente", "video1")
}

function video_deposita_desde_cajeros() {
    video_web_mobile("https://www.youtube.com/embed/RblAlClazEc", "https://www.youtube.com/embed/RblAlClazEc", "video_depositacajero", "video2")
}

function video_deposita_desde_otro_yape() {
    video_web_mobile("https://www.youtube.com/embed/c7-wSQr8PcA", "https://www.youtube.com/embed/c7-wSQr8PcA", "video_depositaotroyape", "video3")
}

if ($("#yape-loader-overlay").length != 0) {
    window.addEventListener('load', function () {
        // Seleccionamos el loader
        const loader = document.getElementById('yape-loader-overlay');

        // Le agregamos la clase que lo hace transparente
        loader.classList.add('loader-hidden');

        // Opcional: Eliminarlo del DOM completamente después de la transición
        loader.addEventListener('transitionend', function () {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        });
    });
}
