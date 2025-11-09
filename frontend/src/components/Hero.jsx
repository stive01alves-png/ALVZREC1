import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Play } from 'lucide-react';

const Hero = ({ onNavigate }) => {
  return (
    <section className="hero-section">
      <div className="hero-overlay" />
      
      {/* YouTube Video Background */}
      <div className="hero-video-container">
        <iframe
          src="https://www.youtube.com/embed/9wSIkwAn3AE?autoplay=1&mute=1&loop=1&playlist=9wSIkwAn3AE&controls=0&showinfo=0&rel=0&modestbranding=1"
          title="ALVZ.REC Demo Reel"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="hero-video"
        />
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-brand">
          <img 
            src="https://customer-assets.emergentagent.com/job_cinematic-alvz/artifacts/d2ogzfdm_IMG_2409.png" 
            alt="ALVZ.REC Logo" 
            className="hero-logo"
          />
        </div>
        
        <div className="hero-text">
          <h1 className="hero-title">
            Ton univers.<br />Ton image.
          </h1>
          <p className="hero-subtitle">
            Studio de production audiovisuelle à Paris.
            <br />
            Clips musicaux, publicités et contenus créatifs.
          </p>
        </div>

        <div className="hero-actions">
          <Button 
            onClick={() => onNavigate('portfolio')}
            className="cta-button-primary"
          >
            Voir mes projets
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            onClick={() => onNavigate('contact')}
            variant="outline"
            className="cta-button-secondary"
          >
            Demander un devis
            <Play className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="hero-scroll-indicator">
          <span className="scroll-text">Scroll</span>
          <div className="scroll-line" />
        </div>
      </div>
    </section>
  );
};

export default Hero;