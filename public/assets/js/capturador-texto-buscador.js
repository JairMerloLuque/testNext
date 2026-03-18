//capturar texto del buscador
window.dataLayer = window.dataLayer || [];

// Elemento objetivo
const campoBusqueda = document.getElementById('text-search');

// Debounce genérico
function debounce(fn, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
    };
}

// Normaliza según tus reglas
function normalizeText(input) {
    if (!input) return '';

    // 1) Trim y pasar a minúsculas
    let s = input.trim().toLowerCase();

    // 2) Normalizar Unicode para separar diacríticos y luego eliminarlos
    //    e.g. "á" -> "á" (a + combining) -> eliminamos combining -> "a"
    s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // 3) Asegurarnos que ñ también quede como n (por si algún engine no lo descompone)
    s = s.replace(/ñ/g, 'n');

    // 4) Eliminar caracteres especiales: conservar letras (a-z), números (0-9) y espacios
    //    También eliminamos cualquier otro guion, puntuación, símbolos, etc.
    s = s.replace(/[^a-z0-9\s]/g, '');

    // 5) Colapsar espacios múltiples en uno solo y trim final
    s = s.replace(/\s+/g, ' ').trim();

    // 6) Limitar a 100 caracteres
    if (s.length > 100) s = s.slice(0, 100);

    return s;
}

// Handler con debounce (800ms)
const handler = debounce(function (event) {
    const raw = event.target.value || '';
    const valor = normalizeText(raw);

    // No enviar si queda vacío después de normalizar
    if (!valor) return;

    window.dataLayer.push({
        event: 'search_input_completed',
        field_id: 'text-search',
        field_value_normalized: valor,
        char_length: valor.length,
        word_count: valor.split(/\s+/).filter(Boolean).length
    });

    console.log('dataLayer push:', valor);
}, 800);

// Vincular solo si existe el elemento
if (campoBusqueda) {
    campoBusqueda.addEventListener('input', handler);

    // opcional: también enviar si el usuario sale del campo (change)
    campoBusqueda.addEventListener('change', (e) => {
        const valor = normalizeText(e.target.value || '');
        if (!valor) return;
        window.dataLayer.push({
            event: 'view_search_results',
            button_name:'resultado busqueda',
            id_event:'',
            id_journey:'experiencia',
            id_multiproduct_journey:'yape web',
            field_id: 'text-search',
            search_term: 'texto ingresado',
            search_result: valor,
        });
        // console.warn('Se encontró #text-search en el DOM', valor);
    });

} else {
    // console.warn('No se encontró #text-search en el DOM');
}
//fin capturar texto del buscador
