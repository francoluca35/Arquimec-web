import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import '../styles/critical.css'
import CustomerServiceBubble from '../components/CustomerServiceBubble'
import { LoadingProvider, useLoading } from '../contexts/LoadingContext'
import { ColorPaletteProvider } from '../contexts/ColorPaletteContext'

function AppContent({ Component, pageProps }: AppProps) {
  const { isLoading } = useLoading();

  return (
    <>
      <Head>
        {/* Título de la página */}
        <title>Arquimec - Estudio de Arquitectura | Diseño y Construcción</title>
        
        {/* Meta tags adicionales para SEO */}
        <meta name="description" content="Arquimec - Estudio de arquitectura especializado en diseño y construcción de viviendas unifamiliares, proyectos comerciales y desarrollos urbanísticos en Buenos Aires y Córdoba." />
        <meta name="keywords" content="arquitectura, construcción, viviendas, proyectos comerciales, Buenos Aires, Córdoba, diseño arquitectónico, renders, obra gruesa, terminaciones" />
        
        {/* PRELOAD EXTREMO - RECURSOS CRÍTICOS PARA MÓVIL */}
        <link rel="preload" href="/Assets/logoarqmec.webp" as="image" type="image/webp" fetchPriority="high" />
        <link rel="preload" href="https://images.unsplash.com/photo-1624226784657-1e30fccdd59b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBleHRlcmlvcnxlbnwxfHx8fDE3NTg1MzkzMDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" as="image" fetchPriority="high" />
        
        {/* DNS PREFETCH EXTREMO */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* PRELOAD FONTS CRÍTICAS */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" as="style" onLoad={() => {}} />
        <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" /></noscript>
        
        {/* PRELOAD JS CRÍTICO */}
        <link rel="modulepreload" href="/_next/static/chunks/webpack.js" />
        <link rel="modulepreload" href="/_next/static/chunks/main.js" />
        
        {/* CSS CRÍTICO EXTREMO - SOLO LO ESENCIAL PARA MÓVIL */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* CRÍTICO EXTREMO - SOLO ABOVE-THE-FOLD */
            *{box-sizing:border-box;margin:0;padding:0}
            html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
            body{font-family:Inter,system-ui,-apple-system,sans-serif;margin:0;background:#fff;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
            img{max-width:100%;height:auto;display:block}
            .hero-section{min-height:100vh;position:relative;overflow:hidden}
            header{position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(26,42,60,0.95);backdrop-filter:blur(10px)}
            /* MÓVIL CRÍTICO */
            @media(max-width:768px){
              .hero-section{min-height:100vh}
              img{width:100%;height:auto;object-fit:cover}
              header{background:rgba(26,42,60,0.98)}
            }
            /* TOUCH OPTIMIZATIONS */
            *{touch-action:manipulation}
            button{cursor:pointer;border:none;background:none}
            /* LOADING CRÍTICO */
            .loading{opacity:0;transition:opacity 0.3s}
            .loaded{opacity:1}
          `
        }} />
      </Head>
      <Component {...pageProps} />
      
      {/* Customer Service Bubble - Global (solo después del loading) */}
      {!isLoading && (
        <CustomerServiceBubble phoneNumber="1234567890" />
      )}
    </>
  )
}

export default function MyApp(props: AppProps) {
  return (
    <LoadingProvider>
      <AppContent {...props} />
    </LoadingProvider>
  )
}