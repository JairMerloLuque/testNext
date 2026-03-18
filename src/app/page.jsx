"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Parallax, Autoplay } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function HomePage() {

  const slides = [
    {
      id: 'banner1',
      title: '¡Con Yape todo es posible!',
      subtitle: 'Facilita tu día a día con la aplicación de pagos N°1 de Bolivia',
      imgDesktop: '/assets/img/HOME-LANDING-1440X496.png',
      imgMobile: '/assets/img/HOME-LANDING-1-900X1920.png',
      ctaText: null
    },
    {
      id: 'banner2',
      title: 'Yapea tus Paquetigos de forma fácil y rápida',
      subtitle: 'Aquí te enseñamos como.',
      imgDesktop: '/assets/img/Banner_Desktop_recargas_Tigo_1440x496.jpg',
      imgMobile: '/assets/img/Banner_Desktop_recargas_Tigo_360x496.jpg',
      ctaText: 'Conoce más',
      link: '/productos/recargas'
    },
    {
      id: 'banner3',
      title: 'Agrega y retira dinero desde un Agente BCP',
      subtitle: 'Aquí te enseñamos como.',
      imgDesktop: '/assets/img/HOMEHORIZONTAL-BANNER3.jpg',
      imgMobile: '/assets/img/HOMEVERTICAL-BANNER3.jpg',
      ctaText: 'Conoce más',
      link: '/centro_de_ayuda/retirar-dinero'
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Header Placeholder (Debería ser un componente Navbar) */}
      <div id="header-placeholder" className="h-20 bg-white" />

      {/* Hero Section */}
      <section id="swiper-home" className="relative pb-16">
        <Swiper
          modules={[Navigation, Pagination, Parallax, Autoplay]}
          parallax={true}
          navigation={{
            nextEl: '.showcaseSlider-next',
            prevEl: '.showcaseSlider-prev',
          }}
          pagination={{ clickable: true, el: '.showcaseSlider-pagination' }}
          autoplay={{ delay: 5000 }}
          className="h-[80vh] min-h-[600px] w-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="relative flex items-end overflow-hidden">
              {/* Responsive Background Image */}
              <div className="absolute inset-0 z-0" data-swiper-parallax="20%">
                <picture>
                  <source media="(max-width: 768px)" srcSet={slide.imgMobile} />
                  <img
                    src={slide.imgDesktop}
                    alt={slide.title}
                    className="h-full w-full object-cover object-top lg:object-center"
                  />
                </picture>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2a233e] to-transparent opacity-60" />
              </div>

              {/* Text Content */}
              <div className="container relative z-20 mx-auto px-6 pb-20 lg:pb-32">
                <div className="max-w-3xl text-center lg:text-left" data-swiper-parallax="-300">
                  <h1 className="text-4xl font-bold text-white lg:text-6xl drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="mt-4 text-lg text-white opacity-90 lg:text-xl">
                    {slide.subtitle}
                  </p>
                  {slide.ctaText && (
                    <Link href={slide.link} className="btn-cta mt-8 inline-block">
                      {slide.ctaText}
                    </Link>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Navigation & Pagination */}
          <div className="showcaseSlider-pagination !bottom-10" />
          <div className="absolute inset-y-0 left-4 z-30 flex items-center lg:left-10">
            <div className="showcaseSlider-prev swiper-button-prev !static !mt-0 after:!text-white after:!text-2xl" />
          </div>
          <div className="absolute inset-y-0 right-4 z-30 flex items-center lg:right-10">
            <div className="showcaseSlider-next swiper-button-next !static !mt-0 after:!text-white after:!text-2xl" />
          </div>
        </Swiper>
      </section>

      {/* Beneficios Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              Yo yapeo, tú yapeas, <span className="text-[#742384]">¡todos yapeamos!</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Olvídate de ir al banco o llevar efectivo. Con Yape, puedes enviar y recibir dinero las 24 horas del día.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              { img: 'yape-es-gratis.png', text: '¡Es gratis!' },
              { img: 'yape-esta-en-todos-lados.png', text: '¡Puedes yapear en todos lados!' },
              { img: 'yape-es-al-toque.png', text: 'Es más rápido y simple' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center transition-transform hover:-translate-y-2">
                <Image src={`/assets/img/${item.img}`} width={172} height={172} alt="Yape" />
                <p className="mt-4 text-xl font-medium text-[#742384]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funcionalidades Section */}
      <section id="transacciones" className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
              ¿Qué más tiene <span className="text-[#742384]">Yape para ti</span>?
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-3">
            {[
              { title: 'Yapea a tu contacto', icon: 'transferencia_yape.svg', href: '#' },
              { title: 'Recargar tu celular', icon: 'transferencia_entre_yape.svg', href: '/productos/recargas' },
              { title: 'Yapea tus servicios', icon: 'compras_yape.svg', href: '/productos/pagoservicios' },
              { title: 'Cobra con Yape', icon: 'tienda_yape.svg', href: '/yapenegocios' },
              { title: 'Yapea a otros bancos', icon: 'yapea-a-otro-banco.svg', href: '/productos/depositayretira' },
              { title: 'Yape Promos', icon: 'promo_yape.svg', href: '/productos/promos' }
            ].map((func, i) => (
              <Link
                key={i}
                href={func.href}
                className="group flex flex-col items-center rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
              >
                <Image src={`/assets/img/${func.icon}`} width={72} height={72} alt={func.title} className="mb-4" />
                <span className="text-center text-lg font-bold text-gray-800 lg:text-xl">
                  {func.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        .btn-cta {
          background-color: #1acbb4;
          color: white;
          padding: 0.75rem 2rem;
          border-radius: 9999px;
          font-weight: 700;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .btn-cta:hover {
          transform: scale(1.03);
          filter: brightness(1.1);
          box-shadow: 0 8px 15px rgba(26, 203, 180, 0.4);
        }
        .swiper-pagination-bullet-active {
          background: #742384 !important;
        }
      `}</style>
    </main>
  );
}