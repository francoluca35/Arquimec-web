import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import '../styles/critical.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Preload critical resources */}
        <link rel="preload" href="/Assets/logo-arqui.png" as="image" type="image/png" />
        <link rel="preload" href="/Assets/fondoarq.png" as="image" type="image/png" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        
        {/* Critical CSS inline for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical above-the-fold styles */
            body { margin: 0; font-family: system-ui, -apple-system, sans-serif; }
            .hero-section { min-height: 100vh; display: flex; align-items: center; }
            header { position: fixed; top: 0; left: 0; right: 0; z-index: 50; }
            img { max-width: 100%; height: auto; }
          `
        }} />
      </Head>
      <Component {...pageProps} />
    </>
  )
}