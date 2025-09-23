import React from 'react';
import Head from 'next/head';
import AnimatedLogo from '../components/AnimatedLogo';

const LogoDemo: React.FC = () => {
  return (
    <>
      <Head>
        <title>Logo Animado ARQUIMEC</title>
        <meta name="description" content="Logo animado de ARQUIMEC con formación de letras A y M" />
      </Head>
      
      <div className="demo-container">
        <div className="demo-header">
          <h1>Logo Animado ARQUIMEC</h1>
          <p>Animación que muestra la formación de las letras A y M, seguida del texto ARQUIMEC</p>
        </div>
        
        <AnimatedLogo />
        
        <div className="demo-controls">
          <button 
            onClick={() => window.location.reload()} 
            className="restart-button"
          >
            Reiniciar Animación
          </button>
        </div>
      </div>

      <style jsx>{`
        .demo-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-family: 'Arial', sans-serif;
        }

        .demo-header {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          z-index: 10;
        }

        .demo-header h1 {
          font-size: 2.5rem;
          margin: 0 0 10px 0;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .demo-header p {
          font-size: 1.1rem;
          margin: 0;
          opacity: 0.9;
        }

        .demo-controls {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
        }

        .restart-button {
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.5);
          color: white;
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .restart-button:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.8);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .demo-header h1 {
            font-size: 2rem;
          }
          
          .demo-header p {
            font-size: 1rem;
            padding: 0 20px;
          }
        }
      `}</style>
    </>
  );
};

export default LogoDemo;
