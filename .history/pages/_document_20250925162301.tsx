import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        {/* Meta tags básicos */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1a2a3c" />
        
        {/* SEO Meta Tags */}
        <meta name="description" content="Arquimec - Estudio de arquitectura especializado en diseño y construcción de viviendas unifamiliares, proyectos comerciales y desarrollos urbanísticos en Buenos Aires y Córdoba." />
        <meta name="keywords" content="arquitectura, construcción, viviendas, proyectos comerciales, Buenos Aires, Córdoba, diseño arquitectónico, renders, obra gruesa, terminaciones" />
        <meta name="author" content="Arquimec - Marcelo Eduardo González Silva" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://arquimec.com/" />
        <meta property="og:title" content="Arquimec - Estudio de Arquitectura" />
        <meta property="og:description" content="Especializados en diseño y construcción de viviendas unifamiliares, proyectos comerciales y desarrollos urbanísticos." />
        <meta property="og:image" content="https://arquimec.com/Assets/logoarq.svg" />
        <meta property="og:locale" content="es_AR" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://arquimec.com/" />
        <meta property="twitter:title" content="Arquimec - Estudio de Arquitectura" />
        <meta property="twitter:description" content="Especializados en diseño y construcción de viviendas unifamiliares, proyectos comerciales y desarrollos urbanísticos." />
        <meta property="twitter:image" content="https://arquimec.com/Assets/logoarq.svg" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect para optimización */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Arquimec",
              "description": "Estudio de arquitectura especializado en diseño y construcción de viviendas unifamiliares, proyectos comerciales y desarrollos urbanísticos.",
              "url": "https://arquimec.com",
              "logo": "https://arquimec.com/Assets/logoarq.svg",
              "founder": {
                "@type": "Person",
                "name": "Marcelo Eduardo González Silva"
              },
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Buenos Aires",
                "addressCountry": "AR"
              },
              "sameAs": [
                "https://instagram.com/arquimec",
                "https://wa.me/1234567890"
              ]
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}