import React, { useState, useEffect } from 'react';
import { Award, Target, Heart } from 'lucide-react';
import { getEquipment } from '../services/api';

const About = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        setLoading(true);
        const data = await getEquipment();
        setEquipment(data);
      } catch (err) {
        console.error('Error loading equipment:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);
  return (
    <section id="about" className="section-container">
      <div className="about-layout">
        <div className="about-content">
          <h2 className="section-title">Notre Histoire</h2>
          <div className="about-text">
            <p className="about-paragraph">
              <strong>ALVZ.REC</strong> est né de la passion pour l'image et la musique. 
              Chaque clip est une histoire, chaque projet une identité visuelle unique.
            </p>
            <p className="about-paragraph">
              Mon objectif : créer des visuels puissants, authentiques et modernes 
              qui capturent l'essence de chaque artiste et de chaque marque.
            </p>
            <p className="about-paragraph">
              Basé à Paris, je travaille avec des artistes indépendants, des rappeurs, 
              des créateurs de contenu et des marques urbaines pour donner vie à leurs 
              visions créatives.
            </p>
          </div>

          <div className="about-values">
            <div className="value-item">
              <Award className="value-icon" size={24} />
              <div>
                <h4 className="value-title">Qualité Cinéma</h4>
                <p className="value-text">Matériel professionnel et expertise technique</p>
              </div>
            </div>
            <div className="value-item">
              <Target className="value-icon" size={24} />
              <div>
                <h4 className="value-title">Précision</h4>
                <p className="value-text">Chaque détail compte dans la création visuelle</p>
              </div>
            </div>
            <div className="value-item">
              <Heart className="value-icon" size={24} />
              <div>
                <h4 className="value-title">Passion</h4>
                <p className="value-text">Un engagement total dans chaque projet</p>
              </div>
            </div>
          </div>
        </div>

        <div className="equipment-section">
          <h3 className="equipment-title">Matériel Utilisé</h3>
          <div className="equipment-grid">
            {equipment.map((item, index) => (
              <div key={index} className="equipment-category">
                <h4 className="equipment-category-title">{item.category}</h4>
                <ul className="equipment-list">
                  {item.items.map((equipment, idx) => (
                    <li key={idx} className="equipment-item">
                      {equipment}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;