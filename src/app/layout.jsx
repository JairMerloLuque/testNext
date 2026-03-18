import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css"; // Aquí debería estar Tailwind
import Script from "next/script";

export const metadata = {
  title: "Yape | ¡Operaciones sin comisiones!",
  description: "Cuenta digital creada para los bolivianos que necesiten más que una cuenta de ahorros. Respaldada por el BCP.",
  keywords: ["billetera", "Yape", "Yape Bolivia", "BCP", "pagos"],
  authors: [{ name: "Banco de Crédito de Bolivia S.A." }],
  openGraph: {
    title: "Yape | ¡Operaciones sin comisiones! | Cuenta digital en Bs.",
    description: "Cuenta digital creada para los bolivianos...",
    url: "https://www.yape.com.bo",
    siteName: "Yape | App Billetera móvil",
    images: [
      {
        url: "https://www.yape.com.bo/assets/img/preview_yape.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  // Agrega aquí el resto de metas como icons, themeColor, etc.
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {/* Google Tag Manager - Usando el componente optimizado de Next */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MLWMSCNW');`}
        </Script>
        <Navbar />
        {children}
        <Footer />
        {/* Noscript de GTM */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MLWMSCNW"
            height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      </body>
    </html>
  );
}