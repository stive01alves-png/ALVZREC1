import React from 'react';
import { services } from '../data/mock';
import { Video, Sparkles, Film, Palette, Smartphone, Camera } from 'lucide-react';

const iconMap = {
  Video,
  Sparkles,
  Film,
  Palette,
  Smartphone,
  Camera
};

const Services = () => {
  return (
    <section id="services" className="section-container section-dark">
      <div className="section-header">
        <h2 className="section-title">Services</h2>
        <p className="section-subtitle">
          De la conception à la post-production
        </p>
      </div>

      <div className="services-grid">
        {services.map((service) => {
          const Icon = iconMap[service.icon];
          return (
            <div key={service.id} className="service-card">
              <div className="service-icon">
                <Icon size={32} />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          );
        })}
      </div>

      <div className="services-cta">
        <div className="cta-box">
          <p className="cta-text">
            Chaque projet est unique — obtenez un devis personnalisé.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;