'use client'
import React, { useState } from 'react';

const Footer = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <div className="font-sans">
            {/* --- SUB-FOOTER: Sección de Descarga --- */}
            <section className="bg-[#742284] py-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl mx-auto">
                        <div className="text-center md:text-left text-white">
                            <h2 className="text-2xl font-bold mb-1">Descarga Yape gratis</h2>
                            <p className="text-sm opacity-90">¡Regístrate rápido y sin cuenta bancaria!</p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="transition-transform hover:scale-105">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-12" />
                            </button>
                            <button className="transition-transform hover:scale-105">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" className="h-12" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FOOTER PRINCIPAL --- */}
            <footer className="relative bg-white pt-16 pb-8 border-t border-gray-100">
                {/* Botón Scroll Up */}
                <a href="#top" className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#742284] p-3 rounded-full shadow-lg hover:bg-[#5a1a66] transition-colors">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
                </a>

                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left">

                        {/* Logo y Redes */}
                        <div className="flex flex-col items-center md:items-start space-y-4">
                            <img src="/logo-yape.png" alt="Yape" className="w-16 h-16 object-contain" />
                            <div className="flex flex-col space-y-2">
                                <span className="text-gray-600 font-semibold">Síguenos en:</span>
                                <div className="flex space-x-4 justify-center md:justify-start text-[#742284]">
                                    {/* Simulación de iconos */}
                                    <div className="w-8 h-8 bg-gray-100 rounded-full hover:bg-purple-100 cursor-pointer transition-colors" />
                                    <div className="w-8 h-8 bg-gray-100 rounded-full hover:bg-purple-100 cursor-pointer transition-colors" />
                                    <div className="w-8 h-8 bg-gray-100 rounded-full hover:bg-purple-100 cursor-pointer transition-colors" />
                                </div>
                            </div>
                        </div>

                        {/* Links Legales (En Mobile se ven distintos, aquí los unificamos) */}
                        <div className="flex flex-col space-y-4 items-center">
                            <button className="w-full max-w-[240px] border-2 border-[#742284] text-[#742284] py-3 rounded-xl font-bold hover:bg-purple-50 transition-colors">
                                Términos y Condiciones
                            </button>
                            <button className="w-full max-w-[240px] bg-[#25D366] text-white py-3 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                                Soporte WhatsApp
                            </button>
                        </div>

                        {/* Copyright Desktop / Información Extra */}
                        <div className="hidden md:flex flex-col items-end text-gray-400 text-sm">
                            <p>© {new Date().getFullYear()} Yape Bolivia.</p>
                            <p>Todos los derechos reservados.</p>
                        </div>
                    </div>

                    {/* Copyright Mobile */}
                    <div className="md:hidden mt-12 text-center text-gray-400 text-xs">
                        <p>© {new Date().getFullYear()} Yape Bolivia. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>

            {/* --- MODAL DE BÚSQUEDA --- */}
            {isSearchOpen && (
                <div className="fixed inset-0 bg-white z-[100] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between max-w-4xl mx-auto">
                        <img src="/logo-search.png" alt="Search" className="h-10" />
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="text-gray-500 font-bold flex items-center gap-1 hover:text-[#742284]"
                        >
                            Cerrar <span className="text-xl">×</span>
                        </button>
                    </div>

                    <div className="max-w-4xl mx-auto p-6">
                        <div className="relative mb-10">
                            <input
                                type="text"
                                placeholder="Ingresa tu consulta..."
                                className="w-full text-xl py-4 border-b-2 border-gray-200 focus:border-[#742284] outline-none transition-colors"
                            />
                        </div>

                        <div className="space-y-6">
                            <h3 className="font-bold text-gray-800">Lo más buscado:</h3>
                            <div className="flex flex-col space-y-4">
                                {["¿Qué es Yape y cómo funciona?", "¿Necesito cuenta para tener Yape?", "¿Cómo creo mi cuenta?"].map((text, i) => (
                                    <a key={i} href="#" className="flex justify-between items-center py-2 border-b border-gray-50 text-gray-600 hover:text-[#742284] group">
                                        {text}
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- BANNER FLOTANTE MOBILE --- */}
            <div className="fixed bottom-0 left-0 right-0 bg-[#742284] text-white p-4 flex items-center justify-between md:hidden z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
                <button className="text-2xl p-2 leading-none">×</button>
                <div className="flex-1 text-center font-bold">
                    Descargar Yape
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    ↓
                </div>
            </div>

            {/* Trigger para abrir búsqueda (Ejemplo) */}
            <button
                onClick={() => setIsSearchOpen(true)}
                className="fixed bottom-24 right-6 bg-[#742284] text-white p-4 rounded-full shadow-2xl z-40 md:bottom-10"
            >
                🔍
            </button>
        </div>
    );
};

export default Footer;