"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Función para manejar el buscador (placeholder de tu MakeSearch)
    const handleSearch = () => {
        console.log("Iniciando búsqueda...");
    };

    return (
        <header className="header sticky top-0 z-50 bg-white shadow-sm" id="header">
            <div className="desk-menu container mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <div className="logo">
                    <Link href="/" id="menu_inicio" title="menu yape">
                        <img
                            id="logo-menu"
                            className="logo-menu w-[120px] h-[35px]"
                            alt="logo yape"
                            src="/public/assets/img/logo-yape.svg" // Asegúrate de que la ruta sea correcta
                        />
                    </Link>
                </div>

                {/* Navegación Desktop */}
                <nav className="hidden lg:flex items-center space-x-8">
                    <ul className="flex space-x-6 font-medium text-gray-700">
                        <li><Link href="/" className="hover:text-[#742384]">Inicio</Link></li>
                        <li><Link href="/yapenegocios" className="hover:text-[#742384]">Negocios</Link></li>
                        <li className="group relative">
                            <button className="flex items-center hover:text-[#742384]">
                                Productos
                                <span className="ml-1 text-[10px]">▼</span>
                            </button>
                            {/* Dropdown simple */}
                            <ul className="absolute left-0 mt-2 hidden w-48 bg-white shadow-lg group-hover:block border-t-2 border-[#742384]">
                                <li><Link href="/productos/recargas" className="block px-4 py-2 hover:bg-gray-100">Recargas</Link></li>
                                <li><Link href="/productos/depositayretira" className="block px-4 py-2 hover:bg-gray-100">Depósitos</Link></li>
                                <li><Link href="/productos/pagoservicios" className="block px-4 py-2 hover:bg-gray-100">Pago de servicios</Link></li>
                            </ul>
                        </li>
                    </ul>

                    <Link
                        href="https://onelink.to/xurcbr"
                        target="_blank"
                        className="rounded-full bg-[#1acbb4] px-6 py-2 font-bold text-white transition-all hover:bg-[#16ad9a]"
                    >
                        Descargar Yape
                    </Link>
                </nav>

                {/* Hamburger para móvil */}
                <button
                    className="lg:hidden text-2xl text-[#742384]"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? '✕' : '☰'}
                </button>
            </div>
        </header>
    );
}