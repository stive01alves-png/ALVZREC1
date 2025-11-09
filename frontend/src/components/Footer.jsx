import React from 'react';
import { socialLinks } from '../data/mock';
import { Instagram, Youtube, MessageCircle, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img 
            src="https://customer-assets.emergentagent.com/job_cinematic-alvz/artifacts/d2ogzfdm_IMG_2409.png" 
            alt="ALVZ.REC" 
            className="footer-logo"
          />
          <p className="footer-tagline">Ton univers. Ton image.</p>
          <p className="footer-location">Paris, France</p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-list">
              <li><a href="#home">Accueil</a></li>
              <li><a href="#portfolio">Portfolio</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#about">À propos</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-title">Services</h4>
            <ul className="footer-list">
              <li>Clips Musicaux</li>
              <li>Publicités & Teasers</li>
              <li>Montage & Étalonnage</li>
              <li>Direction Artistique</li>
              <li>Contenus Verticaux</li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-title">Contact</h4>
            <div className="footer-contact">
              <a href={socialLinks.whatsappLink} target="_blank" rel="noopener noreferrer" className="footer-contact-item">
                <MessageCircle size={18} />
                <span>{socialLinks.whatsapp}</span>
              </a>
              <a href="mailto:contact@alvz.rec" className="footer-contact-item">
                <Mail size={18} />
                <span>contact@alvz.rec</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-social">
          <h4 className="footer-title">Suivez-nous</h4>
          <div className="footer-social-links">
            <a 
              href={socialLinks.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a 
              href={socialLinks.youtube} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label="YouTube"
            >
              <Youtube size={24} />
            </a>
            <a 
              href={socialLinks.whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon-link"
              aria-label="WhatsApp"
            >
              <MessageCircle size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; {currentYear} ALVZ.REC. Tous droits réservés.
        </p>
        <p className="footer-credit">
          Studio de production audiovisuelle basé à Paris
        </p>
      </div>
    </footer>
  );
};

export default Footer;