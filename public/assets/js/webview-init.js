/**
 * webview-init.js
 * Centro de Ayuda WebView — search engine + datalayer capture
 * Loaded with `defer` — safe to reference DOM on DOMContentLoaded.
 */

(function () {
    'use strict';

    /* ─────────────────────────────────────────
       1. ELASTICLUNR SEARCH ENGINE
    ───────────────────────────────────────── */
    var searchIndex = null;
    var searchConfig = { expand: true };

    function buildIndex() {
        // Synonyms plugin
        elasticlunr.synonyms = function (token) {
            if (token === null || token === undefined) {
                throw new Error('token should not be undefined');
            }
            switch (token) {
                case 'desvincular': return 'Cambié';
                case 'perdi':       return 'Cambié';
                default:            return token;
            }
        };
        elasticlunr.Pipeline.registerFunction(elasticlunr.synonyms, 'synonyms');

        searchIndex = elasticlunr(function () {
            this.addField('question');
            this.addField('tags');
            this.setRef('link');
            this.pipeline.before(elasticlunr.trimmer, elasticlunr.synonyms);
        });
    }

    /* ─────────────────────────────────────────
       2. SEARCH RESULT RENDERER (XSS-safe)
    ───────────────────────────────────────── */
    function createSearchResultBlurb(query, pageContent) {
        var fragment = document.createDocumentFragment();
        var safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        var reg = new RegExp(safeQuery, 'gi');
        var lastIndex = 0;

        pageContent.replace(reg, function (match, offset) {
            fragment.appendChild(document.createTextNode(pageContent.slice(lastIndex, offset)));
            var strong = document.createElement('strong');
            strong.className = 'highlight-search';
            strong.textContent = match;
            fragment.appendChild(strong);
            lastIndex = offset + match.length;
        });
        fragment.appendChild(document.createTextNode(pageContent.slice(lastIndex)));
        return fragment;
    }

    function displayResult(val, result) {
        var $results = document.getElementById('results');
        if (!$results) return result;
        $results.innerHTML = '';
        result.forEach(function (el) {
            var li = document.createElement('li');
            var a  = document.createElement('a');
            try {
                var url = new URL(el.doc.link, window.location.origin);
                if (url.protocol === 'http:' || url.protocol === 'https:') {
                    a.href = url.href;
                } else {
                    a.href = '#';
                }
            } catch (e) {
                a.href = '#';
            }
            a.appendChild(createSearchResultBlurb(val, el.doc.question));
            li.appendChild(a);
            $results.appendChild(li);
        });
        return result;
    }

    /* ─────────────────────────────────────────
       3. SEARCH UI — uses jQuery (loaded before this via defer order)
    ───────────────────────────────────────── */
    function initSearchUI() {
        var DEBOUNCE_MS = 300; // Was 1000ms — reduced for perceived speed
        var debounceTimer;

        $('#clear').on('click', function (e) {
            e.preventDefault();
            $('#text-search').val('');
            $('.results').html('');
            $('#clear').css('display', 'none');
            $('.title_search').css('display', 'none');
            $('.sin_resultados_hide').css('display', 'none');
            $('#search_recomendation').css('display', 'block');
            return false;
        });

        $('.search-js').on('click', function () {
            var val = $('#text-search').val();
            if (!searchIndex) return;
            displayResult(val, searchIndex.search(val, searchConfig));
        });

        /* Load search index — network-first, cache fallback via SW */
        $.ajax({
            url: '../library_webview.json',
            success: function (response) {
                $('button').prop('disabled', false);
                response.forEach(function (el, i) {
                    el.id = i;
                    searchIndex.addDoc(el);
                });
            },
            error: function () { /* graceful degradation */ },
            dataType: 'json'
        });

        $('.input-search').on('keyup', function () {
            var val     = $('#text-search').val();
            clearTimeout(debounceTimer);

            $('.title_search').css('display', 'none');
            $('.result_search').css('display', 'none');

            if (val !== '') {
                $('.results').html('');
                $('.sin_resultados_hide').css('display', 'none');
                $('.result_search').css('display', 'block');
                $('#clear').css('display', 'block');
                $('#search_recomendation').css('display', 'none');
                $('#searching').css('display', 'block');
            } else {
                $('#searching').css('display', 'none');
                $('.sin_resultados_hide').css('display', 'none');
                $('.result_search').css('display', 'none');
                $('#clear').css('display', 'none');
                $('#search_recomendation').css('display', 'block');
                return;
            }

            debounceTimer = setTimeout(function () {
                if (!searchIndex) return;
                $('#searching').css('display', 'none');
                var resultado = displayResult(val, searchIndex.search(val, searchConfig));
                if (resultado.length === 0 && val !== '') {
                    $('.title_search').css('display', 'none');
                    $('.sin_resultados_hide').css('display', 'block');
                    var msg = document.getElementById('mensaje_sin_resultados');
                    if (msg) {
                        msg.innerHTML = '';
                        msg.appendChild(document.createTextNode('No se encontraron'));
                        msg.appendChild(document.createElement('br'));
                        msg.appendChild(document.createTextNode('resultados para'));
                        msg.appendChild(document.createElement('br'));
                        msg.appendChild(document.createTextNode("'" + val + "'"));
                    }
                } else {
                    $('.title_search').css('display', 'block');
                    $('.sin_resultados_hide').css('display', 'none');
                }
            }, DEBOUNCE_MS);
        });

        $('#button-close, #close').on('click', function () {
            $('body').css('overflow-y', 'visible');
            var ws = document.getElementById('window-search');
            if (ws) ws.style.display = 'none';
        });
    }

    /* ─────────────────────────────────────────
       4. DATALAYER CAPTURE
    ───────────────────────────────────────── */
    function generateShortUUID() {
        try {
            return crypto.randomUUID().replace(/-/g, '');
        } catch (e) {
            return Math.random().toString(36).substr(2, 10);
        }
    }

    function sendToDataLayer(eventData) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event:                    eventData.id_type,
            id_event:                 eventData.id_event,
            button_name:              eventData.button_name              || null,
            id_journey:               eventData.id_journey               || null,
            id_multiproduct_journey:  eventData.id_multiproduct_journey  || null,
            title:                    eventData.title                    || document.title,
            page_location:            eventData.page_location            || window.location.href,
            page_title:               eventData.page_title               || document.title,
            path_web:                 eventData.path_web                 || window.location.pathname,
            search_term:              eventData.search_term              || null,
            search_result:            eventData.search_result            || null,
            feedback_text:            eventData.feedback_text            || null,
            description:              eventData.description              || null,
            id_flow:                  eventData.id_flow                  || null,
            id_type:                  eventData.id_type                  || null,
            screen_name:              eventData.screen_name              || null,
            category_menu:            eventData.category_menu            || null
        });
    }

    function initDataLayer() {
        document.addEventListener('click', function (event) {
            var link = event.target.closest('a, button, div');
            if (!link) return;
            var target_id = link.id || (link.offsetParent && link.offsetParent.id) || null;
            if (!target_id) return;
            var target = document.getElementById(target_id);
            if (!target) return;
            sendToDataLayer({
                id_event:                generateShortUUID(),
                button_name:             target.getAttribute('data-button-name'),
                id_journey:              target.getAttribute('data-id-journey'),
                id_multiproduct_journey: target.getAttribute('data-id-multiproduct-journey'),
                title:                   target.getAttribute('data-title'),
                search_term:             target.getAttribute('data-search-term'),
                search_result:           target.getAttribute('data-search-result'),
                feedback_text:           target.getAttribute('data-feedback-text'),
                description:             target.getAttribute('data-description'),
                id_flow:                 target.getAttribute('data-id-flow'),
                id_type:                 target.getAttribute('data-id-type'),
                screen_name:             target.getAttribute('data-screen-name'),
                category_menu:           target.getAttribute('data-category-menu'),
                page_location:           window.location.href,
                page_title:              document.title,
                path_web:                window.location.pathname
            });
        });
    }

    /* ─────────────────────────────────────────
       5. GLOBAL HELPERS (called from inline onclick in HTML)
    ───────────────────────────────────────── */
    window.MakeSearch = function () {
        var ws = document.getElementById('window-search');
        if (ws) ws.style.display = 'block';
        var search = document.getElementById('text-search');
        if (search) { search.focus(); search.select(); }
        $('body').css('overflow-y', 'hidden');
    };

    /* ─────────────────────────────────────────
       6. BOOT
    ───────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', function () {
        if (typeof elasticlunr !== 'undefined') {
            buildIndex();
            initSearchUI();
        }
        initDataLayer();
    });

})();
