import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import '../styles/critical.css'
import CustomerServiceBubble from '../components/CustomerServiceBubble'
import { LoadingProvider, useLoading } from '../contexts/LoadingContext'

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
        
        {/* Preload critical resources for mobile LCP */}
        <link rel="preload" href="/Assets/logoarqmec.png" as="image" type="image/png" fetchPriority="high" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        
        {/* Preload critical fonts for mobile LCP */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" as="style" onLoad={() => {}} />
        <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" /></noscript>
        
        {/* Critical CSS inline for above-the-fold content - Mobile optimized */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical above-the-fold styles for mobile LCP */
            body { margin: 0; font-family: 'Inter', system-ui, -apple-system, sans-serif; }
            .hero-section { min-height: 100vh; display: flex; align-items: center; }
            header { position: fixed; top: 0; left: 0; right: 0; z-index: 50; }
            img { max-width: 100%; height: auto; }
            /* Mobile-specific optimizations */
            @media (max-width: 768px) {
              .hero-section { min-height: 100vh; }
              img { width: 100%; height: auto; object-fit: cover; }
            }
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