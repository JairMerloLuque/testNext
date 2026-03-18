(function () {
        function generateShortUUID() {
            return crypto.randomUUID().replace(/-/g, "")
        }

        function getPageLocation() {
            return window.location.href
        }

        function getPageTitle() {
            return document.title
        }

        function getPathWeb() {
            return window.location.pathname
        }

        function detectMobile() {
            return window.innerWidth <= 997
        }

        // function FloatButton() {
        //     if (localStorage.getItem("estadoBoton") == null) {
        //         const pathWeb = getPathWeb();
        //         window.dataLayer = window.dataLayer || [];
        //         window.dataLayer.push({
        //             event: "popup_view",
        //             id_event: generateShortUUID(),
        //             id_journey: "popup_view_descarga_yape",
        //             id_multiproduct_journey: "yape web",
        //             path_web: pathWeb
        //         })
        //     }
        // }

        // if (detectMobile())
        //     FloatButton();

        function sendPageView(pathname) {
            sendToDataLayer(pathname)
        }

        function sendScreenView() {
            sendPathWebToDataLayer()
        }

        const Webview = {
            isWebView: () => false
        };

        function PageView() {
            const pathname = {
                event: "page_view",
                page_location: getPageLocation(),
                page_title: getPageTitle(),
                id_event: generateShortUUID()
            };

            function sendAnalytics() {
                sendPageView(pathname);
                sendScreenView()
            }

            let initialTimer = setTimeout(() => {
                    sendAnalytics();
                    clearInterval(initialTimer)
                }
                , 1e3)
        }


        PageView();

        function sendPathWebToDataLayer() {
            const pathWeb = getPathWeb();
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "page_view",
                path_web: pathWeb
            })
        }

        function sendToDataLayer(eventData) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: eventData.id_type,
                id_event: eventData.id_event,
                button_name: eventData.button_name || null,
                id_journey: eventData.id_journey || null,
                id_multiproduct_journey: eventData.id_multiproduct_journey || null,
                title: eventData.title || document.title,
                page_location: eventData.page_location || window.location.href,
                page_title: eventData.page_title || document.title,
                path_web: eventData.path_web || window.location.pathname,
                search_term: eventData.search_term || null,
                search_result: eventData.search_result || null,
                feedback_text: eventData.feedback_text || null,
                description: eventData.description || null,
                id_flow: eventData.id_flow || null,
                id_type: eventData.id_type || null,
                screen_name: eventData.screen_name || null,
                category_menu: eventData.category_menu || null
            })
        }

        document.addEventListener("click", function (event) {
            let link = event.target.closest("a, button, div");
            //const target = event.target.closest("a, button, div").offsetParent;
            let target_id = link.id || link.offsetParent?.id || null;
            const target = document.getElementById(target_id);
            if (target != "") {
                const eventData = {
                    id_event: generateShortUUID(),
                    button_name: target ? target.getAttribute("data-button-name") : null,
                    id_journey: target ? target.getAttribute("data-id-journey") : null,
                    id_multiproduct_journey: target ? target.getAttribute("data-id-multiproduct-journey") : null,
                    title: target ? target.getAttribute("data-title") : null,
                    search_term: target ? target.getAttribute("data-search-term") : null,
                    search_result: target ? target.getAttribute("data-search-result") : null,
                    feedback_text: target ? target.getAttribute("data-feedback-text") : null,
                    description: target ? target.getAttribute("data-description") : null,
                    id_flow: target ? target.getAttribute("data-id-flow") : null,
                    id_type: target ? target.getAttribute("data-id-type") : null,
                    screen_name: target ? target.getAttribute("data-screen-name") : null,
                    category_menu: target ? target.getAttribute("data-category-menu") : null,
                    page_location: getPageLocation(),
                    page_title: getPageTitle(),
                    path_web: getPathWeb()
                };
                sendToDataLayer(eventData);
            }
        });
    }
)();


let curWwwPath = window.document.location.href;
let pathName = window.document.location.pathname;
let pos = curWwwPath.indexOf(pathName);
let localhostPaht = curWwwPath.substring(0, pos);
let projectName = pathName.substring(0, pathName.substring(1).indexOf("/") + 1);
let realPath;
if (localhostPaht.indexOf("www99.bancred.com.bo") == -1) {
    realPath = localhostPaht
} else {
    realPath = localhostPaht + projectName
}
var config = {
    expand: true
};
elasticlunr.synonyms = function (token) {
    if (token === null || token === undefined) {
        throw new Error("token should not be undefined")
    }
    switch (token) {
        case "desvincular":
            return "Cambié";
        case "perdi":
            return "Cambié";
        default:
            return token
    }
}
;
elasticlunr.Pipeline.registerFunction(elasticlunr.synonyms, "synonyms");
var index = elasticlunr(function () {
    this.addField("question");
    this.addField("tags");
    this.setRef("link");
    this.pipeline.before(elasticlunr.trimmer, elasticlunr.synonyms)
});
var displayResult = function (val, result) {
    let url_base;
    if (window.document.location.host.indexOf("www99.bancred.com.bo") >= 0) {
        if (window.document.location.pathname.indexOf("centro_de_ayuda_webview") >= 0) {
            url_base = "https://www99.bancred.com.bo/yape.com.bo/centro_de_ayuda_webview/";
        } else {
            url_base = "https://www99.bancred.com.bo/yape.com.bo/centro_de_ayuda/";
        }

    } else {
        if (window.document.location.pathname.indexOf("centro_de_ayuda_webview") >= 0) {
            url_base = "/centro_de_ayuda_webview/";
        } else {
            url_base = "/centro_de_ayuda/";
        }
        //url_base = "/centro_de_ayuda/";
    }
    $(".results").html("");
    result.slice(0, 5).map(function (el) {
        var li = $('<li></li>');

        var a = $('<a></a>', {
            target: '_self'
        });

// 🔐 Validar que el link sea seguro
        try {
            const url = new URL(el.doc.link, window.location.origin);

            // Solo permitir http y https
            if (url.protocol === "http:" || url.protocol === "https:") {
                a.attr("href", url.href);
            } else {
                a.attr("href", "#");
            }
        } catch (e) {
            a.attr("href", "#");
        }

// 🔐 Insertar contenido seguro (sin .html)
        a.append(createSearchResultBlurb(val, el.doc.question));

        li.append(a);
        $('#results').append(li);
    });
    return result
};

function createSearchResultBlurb(query, pageContent) {
    const reg = new RegExp(query, "gi");
    pageContent = pageContent.replace(reg, `<strong class="highlight-search">${query}</strong>`);
    return pageContent
}

$("#clear").on("click", function (e) {
    e.preventDefault();
    $("#text-search-CDA").length != "" ? $("#text-search-CDA").val("") : $("#text-search").val("");
    if ($("#text-search-CDA").length != "") {
        $("#searching").css("display", "none");
        $(".not-searching").css("display", "block")
    }
    $(".results").html("");
    $("#clear").css("display", "none");
    $(".title_search").css("display", "none");
    $(".sin_resultados_hide").css("display", "none");
    $("#search_recomendation").css("display", "block");
    return false
});
$(".search-js").on("click", function () {
    var val = $("#text-search-CDA").length != "" ? $("#text-search-CDA").val() : $("#text-search").val();
    var result = index.search(val, config);
    displayResult(val, result)
});
$.ajax({
    url: realPath + "/library.json",
    success: function (response) {
        $("button").prop("disabled", false);
        response.map(function (el, i) {
            el.id = i;
            index.addDoc(el)
        })
    },
    error: function (jqxhr, status, exception) {
    },
    dataType: "json"
});
$(".input-search").on("keyup", e => {
        $(".title_search").css("display", "none");
        $(".result_search").css("display", "none");
        $("#searching").css("display", "block");
        var val = $("#text-search-CDA").length != "" ? $("#text-search-CDA").val() : $("#text-search").val();
        if ($("#text-search-CDA").length != "") {
            $("#searching").css("display", "block");
            $(".not-searching").css("display", "none")
        }
        var result = index.search(val, config);
        if (val != "") {
            $(".results").html("");
            $(".sin_resultados_hide").css("display", "none");
            $(".result_search").css("display", "block");
            $("#clear").css("display", "block");
            $("#search_recomendation").css("display", "none");
            $("#resultados-CDA").css("padding-top", "0")
        } else {
            $("#searching").css("display", "none");
            $(".sin_resultados_hide").css("display", "none");
            $(".result_search").css("display", "none");
            $("#clear").css("display", "none");
            $("#search_recomendation").css("display", "block");
            $("#resultados-CDA").css("padding-top", "64px")
        }
        const timeoutSearch = setTimeout(function () {
            $("#searching").css("display", "none");
            var resultado = displayResult(val, result);
            if (resultado.length == 0 && val != "") {
                $(".title_search").css("display", "none");
                $(".sin_resultados_hide").css("display", "block");
                $("#mensaje_sin_resultados")
                    .empty()
                    .append("No se encontraron")
                    .append("<br>")
                    .append("resultados para")
                    .append("<br>")
                    .append(document.createTextNode("'" + val + "'"));
            } else {
                $(".title_search").css("display", "block");
                $(".sin_resultados_hide").css("display", "none")
            }
        }, 1e3)
    }
);
$(document).ready(function () {
});
window.addEventListener("beforeunload", function (e) {
    sessionStorage.clear()
});
$("#button-close").on("click", function () {
    $("section ").css("display", "block");
    $("footer ,.sub-footer ").css("display", "flex");
    $("body").css("overflow-y", "visible");
    document.getElementById("window-search").style.display = "none"
});
$("#close").on("click", function () {
    $("section ").css("display", "block");
    $("footer ,.sub-footer ").css("display", "flex");
    $("body").css("overflow-y", "visible");
    document.getElementById("window-search").style.display = "none"
});

function MakeSearch() {
    $("section ").css("display", "block");
    $("footer ,.sub-footer ").css("display", "none");
    document.getElementById("window-search").style.display = "block";
    let search = document.getElementById("text-search");
    $(".input-search").css("top", "0");
    search.focus();
    search.select();
    $("body").css("overflow", "hidden")
}

$("input#text-search").bind("keypress", function (event) {
    var regex = new RegExp("^[a-zA-Z0-9_ ]*$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        event.preventDefault();
        return false
    }
});
$(document).ready(function () {
    $("input#text-search").on("paste", function (e) {
        e.preventDefault()
    });
    $("input#text-search").on("copy", function (e) {
        e.preventDefault()
    })
});
$("#text-search").on("keyup", e => {
        $(".title_search").css("display", "none");
        $(".result_search").css("display", "none");
        $("#searching").css("display", "block");
        $(".not-searching").css("display", "none");
        $(".searching").css("display", "block");
        $("body").css("overflow-y", "hidden");
        var val = $("#text-search").val();
        var result = index.search(val, config);
        if (val != "") {
            $(".results").html("");
            $(".sin_resultados_hide").css("display", "none");
            $(".result_search").css("display", "block");
            $("#clear").css("display", "block");
            $("#search_recomendation").css("display", "none");
            $("#resultados-CDA").css("padding-top", "0")
        } else {
            $("#searching").css("display", "none");
            $(".sin_resultados_hide").css("display", "none");
            $(".result_search").css("display", "none");
            $("#clear").css("display", "none");
            $("#search_recomendation").css("display", "block");
            $(".searching").css("display", "none");
            $(".not-searching").css("display", "block");
            $("#resultados-CDA").css("padding-top", "64px");
            $("body").css("overflow-y", "auto")
        }
        const timeoutSearch = setTimeout(function () {
            $("#searching").css("display", "none");
            var resultado = displayResult(val, result);
            if (resultado.length == 0 && val != "") {
                $(".title_search").css("display", "none");
                $(".sin_resultados_hide").css("display", "block");
                $("#mensaje_sin_resultados")
                    .empty()
                    .append("No se encontraron")
                    .append("<br>")
                    .append("resultados para")
                    .append("<br>")
                    .append(document.createTextNode("'" + val + "'"));
            } else {
                $(".title_search").css("display", "block");
                $(".sin_resultados_hide").css("display", "none")
            }
        }, 1e3)
    }
);
(function ($) {
        function detectarDispositivo() {
            const ua = navigator.userAgent;
            if (/android/i.test(ua)) {
                return "android"
            } else if (/iphone|ipad|ipod/i.test(ua)) {
                return "ios"
            } else if (/huawei/i.test(ua)) {
                return "huawei"
            } else {
                return "otro"
            }
        }

        function abrirDescarga() {
            const urlDescarga = obtenerURLDescarga();
            window.location.href = urlDescarga
        }

        function obtenerURLDescarga() {
            const dispositivo = detectarDispositivo();
            switch (dispositivo) {
                case "android":
                    return "https://play.google.com/store/apps/details?id=com.bcp.bo.wallet&pcampaignid=web_share";
                case "ios":
                    return "https://apps.apple.com/us/app/yape-bolivia/id1135987447";
                case "huawei":
                    return "https://appgallery.huawei.com/app/C102205251";
                default:
                    return "#"
            }
        }

        if ($("#icono-descarga").length != 0) {
            const botonFlotante = document.getElementById("boton-flotante");
            const iconoDescarga = document.getElementById("icono-descarga");
            const botonCerrar = document.getElementById("boton-cerrar");

            function cerrarBoton() {
                botonFlotante.classList.add("cerrado");
                //     localStorage.setItem("estadoBoton", "cerrado")
            }

            // function mostrarBoton() {
            //     botonFlotante.classList.remove("cerrado")
            // }

            //let estadoBoton = localStorage.getItem("estadoBoton");
            // if (estadoBoton === "cerrado") {
            //     cerrarBoton()
            // } else {
            //     mostrarBoton()
            // }
            iconoDescarga.addEventListener("click", abrirDescarga);
            botonCerrar.addEventListener("click", cerrarBoton);
            // window.addEventListener("load", () => {
            //         if (botonFlotante.classList.contains("cerrado")) {
            //             localStorage.setItem("estadoBoton", "cerrado")
            //         } else {
            //             localStorage.removeItem("estadoBoton")
            //         }
            //     }
            // )
        }
        if ($(".footer-section").length != 0) {
            document.getElementById("copyright").innerHTML = `<p style='padding: 3px;color:rgba(255, 255, 255, 0.7) !important;font-size: 10px !important;'>Yape Bolivia © ${(new Date).getFullYear()}. Todos los derechos reservados.</p>`;
            if ($("#copyright-phone").length != 0) {
                document.getElementById("copyright-phone").innerHTML = `<p style='padding: 3px;color:rgba(255, 255, 255, 0.7) !important;font-size: 14px !important;'>Yape Bolivia © ${(new Date).getFullYear()}. Todos los derechos reservados.</p>`
            }
            document.getElementById("copyrightyear").innerHTML = `<p style="padding: 3px;font-size: 12px;"><a href="https://www.asfi.gob.bo/" 
                                  data-button-name="ASFI"
                                  data-id-journey="experiencia"
                                  data-id-multiproduct-journey="yape web"
                                  data-id-type="btn_interaction"
                                  data-screen-name="home footer"
                                  id="ASFI"
                                target="_blank">Esta Entidad es Supervisada por ASFI – Banco de Crédito de Bolivia S.A.</a><br>Banco de Crédito de Bolivia S.A. Av. Hernando Siles N.º 5555, edificio “Torre Empresarial ESIMSA”, en la zona de Obrajes de la ciudad de La Paz</p>`
        }
        var size;
        document.querySelector('meta[property="og:image"]').setAttribute("content", realPath + "/assets/img/preview_yape.png");
        $(".descarga_QR").click(function () {
            if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
                window.location.href = "https://onelink.to/xurcbr"
            } else {
                Swal.fire({
                    padding: "3em",
                    width: "46vh",
                    html: '<div class="row d-flex">' + '<div class="col-md-12 indent-left-services">' + '<div style="text-align: left"><strong class="mb-20 yape-texto-purpura font-size-26">Escanea el código QR y regístrate en Yape:</strong>\n' + '<ol class="font-size-16" style="padding-inline-start: 15px;margin-block-start: revert;">' + "<li>Apunta al código QR con la cámara de tu celular</li>" + "<li>Haz clic en el enlace generado para descargar e instalar la aplicación</li>" + "</ol>" + "</div>" + '<img class="img-responsive" src="' + realPath + '/assets/img/yape_qr_redirect.svg" alt="QR de yape"> ' + "</div>" + '<div class=" " >' + '' + "</div>" + "</div>",
                    showCloseButton: true,
                    showConfirmButton: false,
                    showCancelButton: false,
                    footer: '<strong class="font-size-14">Disponible en:</strong><img style="padding:10px" alt="descarga yape de play store" src="' + realPath + '/assets/img/yape_google_play_icon.svg"><img style="padding: 10px;" alt="descarga yape del apple store" src="' + realPath + '/assets/img/yape_apple_icon.svg"><img style="padding: 10px;" alt="descarga yape de huawei store " src="' + realPath + '/assets/img/yape_huawei_icon.svg">'
                })
            }
        });

        function changeUrlMenu() {
            $(".descarga_android").attr("src", realPath + "/assets/img/soli-05.svg");
            $(".descarga_ios").attr("src", realPath + "/assets/img/soli-02.svg");
            $(".descarga_appgallery").attr("src", realPath + "/assets/img/app-gallery.svg");
            if ($(".footer-section").length != 0) {
                document.getElementById("footer-facebook").src = realPath + "/assets/img/ic_social_facebook_b.svg";
                document.getElementById("footer-instagram").src = realPath + "/assets/img/ic_social_instagram_b.svg";
                document.getElementById("footer-youtube").src = realPath + "/assets/img/ic_social_youtube_b.svg";
                document.getElementById("footer-whatsapp").src = realPath + "/assets/img/Contactos.svg";
                document.getElementById("footer-terminos-condiciones").src = realPath + "/assets/img/Conocenos.svg";
                document.getElementById("footer-tiktok").src = realPath + "/assets/img/ic_social_tiktok_b.svg";
                document.getElementById("footer-logo").src = realPath + "/assets/img/Logo_Bolivia_footer.svg";
                document.getElementById("footer-facebook-phone").src = realPath + "/assets/img/ic_social_facebook_b.svg";
                document.getElementById("footer-instagram-phone").src = realPath + "/assets/img/ic_social_instagram_b.svg";
                document.getElementById("footer-youtube-phone").src = realPath + "/assets/img/ic_social_youtube_b.svg";
                document.getElementById("footer-whatsapp-phone").src = realPath + "/assets/img/contactos-phone.svg";
                document.getElementById("footer-terminos-condiciones-phone").src = realPath + "/assets/img/conocenos-phone.svg";
                document.getElementById("footer-tiktok-phone").src = realPath + "/assets/img/ic_social_tiktok_b.svg";
                document.getElementById("footer-logo-phone").src = realPath + "/assets/img/Logo_Bolivia_footer.svg";
                document.getElementById("footer-scrollup").src = realPath + "/assets/img/angle-up-white.svg"
                document.getElementById("boton-cerrar_float").src = realPath + "/assets/img/icon-close.svg"
                document.getElementById("img_icon_download").src = realPath + "/assets/img/descarga.svg"
                document.getElementById("busqueda_yape_sin_resultados").src = realPath + "/assets/img/s-search-empty.svg";
            }
            if (realPath.indexOf("www99.bancred.com.bo") != -1) {
                document.getElementById("menu_inicio").href = realPath + "/";
                document.getElementById("inicio_yape").href = realPath + "/";
                document.getElementById("menu_ayuda").href = realPath + "/centro_de_ayuda/";
                document.getElementById("menu_ayuda_movil").href = realPath + "/centro_de_ayuda/";
                document.getElementById("menu_seguridad").href = realPath + "/seguridad/";
                document.getElementById("menu_recargas").href = realPath + "/productos/recargas/";
                document.getElementById("menu_depositayretira").href = realPath + "/productos/depositayretira/";
                document.getElementById("menu_pagoservicios").href = realPath + "/productos/pagoservicios";
                document.getElementById("menu_yapeos").href = realPath + "/productos/yapeos";
                document.getElementById("menu_promociones").href = realPath + "/productos/promos/";
                document.getElementById("menu_blog").href = realPath + "/blog/";
                document.getElementById("menu_negocio").href = realPath + "/yapenegocios/";
                document.getElementById("busqueda_yape_sin_resultados").src = realPath + "/assets/img/s-search-empty.svg";
            }

            $(".terminos_condiciones").attr("href", realPath + "/legales/YAPE_BCP_CONTRACT.pdf");
            $(".numero_wpp_soporte").attr("href", "https://api.whatsapp.com/send?phone=+59172007654&text=%C2%A1Hola!%20Vengo%20de%20la%20web%20y%20necesito%20ayuda,%20por%20favor.%20%F0%9F%91%A8%F0%9F%8F%BB%E2%80%8D%F0%9F%92%BB%F0%9F%91%A9%F0%9F%8F%BB%E2%80%8D%F0%9F%92%BB");
            if ($("#swiper-home").length != 0) {
                const showcaseSlider = new Swiper(".home-showcaseSlider", {
                    speed: 1e3,
                    slidesPerView: 1,
                    parallax: false,
                    loop: false,
                    watchSlidesVisibility: true,
                    centeredSlides: true,
                    autoplay: {
                        delay: 3e4,
                        disableOnInteraction: false
                    },
                    pagination: {
                        el: ".showcaseSlider-pagination",
                        clickable: true
                    },
                    navigation: {
                        nextEl: ".showcaseSlider-next",
                        prevEl: ".showcaseSlider-prev"
                    }
                });
                var swiper = new Swiper(".mySwiper", {
                    cssMode: true,
                    loop: false,
                    slidesPerView: 1,
                    speed: 1e3,
                    autoplay: {
                        delay: 3e4,
                        disableOnInteraction: false
                    },
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    },
                    pagination: {
                        el: ".swiper-pagination"
                    },
                    mousewheel: true,
                    keyboard: true
                })
            }
        }

        changeUrlMenu();

        function windowSize() {
            size = $(document).width();
            if (size >= 991) {
                $(".button_bottom").css("display", "none");
                $("body").removeClass("open-menu");
                $(".hamburger-menu .bar").removeClass("animate");
                $("#inicio").css("display", "none")
            } else {
                if ($("#header-sroll").length != 0) {
                    $("#header-sroll").addClass("small");
                    $("header .desk-menu .menu-container").css("top", "60px")
                }
                if ($("#header-home").length != 0) {
                    $("#header-home").addClass("small");
                    $("#title_principal").addClass("space_smart")
                }
            }
        }

        $(".hamburger-menu").on("click", function () {
            $(".hamburger-menu .bar").toggleClass("animate");
            if ($("body").hasClass("open-menu")) {
                $("body").removeClass("open-menu");
                $(".button_bottom").css("display", "none")
            } else {
                $("body").toggleClass("open-menu");
                $(".button_bottom").css("display", "flex")
            }
        });
        const currentContent = document.querySelector("#submenu_productos").innerHTML;
        document.querySelector("#submenu_productos").innerHTML = '<li class="back"><a href="#">Productos</a></li>' + currentContent;
        const currentContent2 = document.querySelector("#submenu_descubremas").innerHTML;
        document.querySelector("#submenu_descubremas").innerHTML = '<li class="back"><a href="#">Descubre más</a></li>' + currentContent2;
        $("header .desk-menu .menu-container .menu .menu-item-has-children > a").on("click", function (e) {
            e.preventDefault();
            if (size <= 991) {
                $(this).next("ul").addClass("open-sub")
            }
        });
        $(document).on("click", ".menu-item-has-children a", function () {
            $(this).next("ul").addClass("open-sub")
        });
        $("header .desk-menu .menu-container .menu .menu-item-has-children ul .back").on("click", function (e) {
            e.preventDefault();
            $(this).parent("ul").removeClass("open-sub")
        });
        $("body .over-menu").on("click", function () {
            $("body").removeClass("open-menu");
            $(".bar").removeClass("animate")
        });
        $(document).ready(function () {
            windowSize()
        });
        $(window).resize(function () {
            windowSize()
        });
    }
)(jQuery);
