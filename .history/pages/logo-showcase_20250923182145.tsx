import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LogoAnimation from '../components/LogoAnimation';
import EnhancedAnimatedLogo from '../components/EnhancedAnimatedLogo';
import RealisticAnimatedLogo from '../components/RealisticAnimatedLogo';

const LogoShowcase: React.FC = () => {
  const [selectedVersion, setSelectedVersion] = useState<'basic' | 'enhanced' | 'realistic'>('basic');

  return (
    <>
      <Head>
        <title>Logo Animado ARQUIMEC - Showcase</title>
        <meta name="description" content="Showcase del logo animado de ARQUIMEC" />
      </Head>
      
      <div className="showcase-container">
        <div className="showcase-header">
          <Link href="/" className="back-link">
            ← Volver al inicio
          </Link>
          
          <h1>Logo Animado ARQUIMEC</h1>
          <p>Selecciona una versión para ver la animación</p>
          
          <div className="version-selector">
            <button 
              className={`version-btn ${selectedVersion === 'basic' ? 'active' : ''}`}
              onClick={() => setSelectedVersion('basic')}
            >
              Versión Básica
            </button>
            <button 
              className={`version-btn ${selectedVersion === 'enhanced' ? 'active' : ''}`}
              onClick={() => setSelectedVersion('enhanced')}
            >
              Versión Mejorada
            </button>
            <button 
              className={`version-btn ${selectedVersion === 'realistic' ? 'active' : ''}`}
              onClick={() => setSelectedVersion('realistic')}
            >
              Versión Realista
            </button>
          </div>
        </div>

        <div className="logo-display">
          {selectedVersion === 'basic' ? (
            <LogoAnimation 
              onComplete={() => console.log('Animación básica completada')}
            />
          ) : selectedVersion === 'enhanced' ? (
            <EnhancedAnimatedLogo />
          ) : (
            <RealisticAnimatedLogo 
              onComplete={() => console.log('Animación realista completada')}
            />
          )}
        </div>

        <div className="showcase-info">
          <div className="info-card">
            <h3>Versión Básica</h3>
            <ul>
              <li>Animación simple y limpia</li>
              <li>Formación de letras A y M</li>
              <li>Transición a texto ARQUIMEC</li>
              <li>Ideal para integración rápida</li>
            </ul>
          </div>
          
          <div className="info-card">
            <h3>Versión Mejorada</h3>
            <ul>
              <li>Efectos visuales avanzados</li>
              <li>Partículas y brillos</li>
              <li>Animaciones más fluidas</li>
              <li>Perfecta para presentaciones</li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .showcase-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 20px;
          font-family: 'Arial', sans-serif;
        }

        .showcase-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .back-link {
          display: inline-block;
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          margin-bottom: 20px;
          transition: color 0.3s ease;
        }

        .back-link:hover {
          color: #5a6fd8;
        }

        .showcase-header h1 {
          font-size: 3rem;
          color: #333;
          margin: 0 0 10px 0;
          background: linear-gradient(45deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .showcase-header p {
          font-size: 1.2rem;
          color: #666;
          margin: 0 0 30px 0;
        }

        .version-selector {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 40px;
        }

        .version-btn {
          padding: 12px 24px;
          border: 2px solid #667eea;
          background: white;
          color: #667eea;
          border-radius: 25px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .version-btn:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
        }

        .version-btn.active {
          background: #667eea;
          color: white;
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }

        .logo-display {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 500px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          margin-bottom: 40px;
          overflow: hidden;
        }

        .showcase-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          max-width: 800px;
          margin: 0 auto;
        }

        .info-card {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }

        .info-card:hover {
          transform: translateY(-5px);
        }

        .info-card h3 {
          color: #333;
          margin: 0 0 20px 0;
          font-size: 1.5rem;
        }

        .info-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .info-card li {
          padding: 8px 0;
          color: #666;
          position: relative;
          padding-left: 20px;
        }

        .info-card li:before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #667eea;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .showcase-header h1 {
            font-size: 2.2rem;
          }

          .version-selector {
            flex-direction: column;
            align-items: center;
          }

          .logo-display {
            min-height: 400px;
            margin: 0 10px 40px 10px;
          }

          .showcase-info {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default LogoShowcase;
