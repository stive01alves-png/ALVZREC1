import React, { useState, useEffect } from 'react';
import { Play, X } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import { getProjects } from '../services/api';

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError('Erreur lors du chargement des projets');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="portfolio" className="section-container">
        <div className="section-header">
          <h2 className="section-title">Portfolio</h2>
          <p className="section-subtitle">Chargement...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="portfolio" className="section-container">
        <div className="section-header">
          <h2 className="section-title">Portfolio</h2>
          <p className="section-subtitle">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="section-container">
      <div className="section-header">
        <h2 className="section-title">Portfolio</h2>
        <p className="section-subtitle">
          Découvrez nos réalisations récentes
        </p>
      </div>

      <div className="portfolio-grid">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="portfolio-card"
            onClick={() => setSelectedProject(project)}
          >
            <div className="portfolio-card-thumbnail">
              <img 
                src={`https://img.youtube.com/vi/9wSIkwAn3AE/maxresdefault.jpg`}
                alt={project.title}
                className="thumbnail-image"
              />
              <div className="play-overlay">
                <Play className="play-icon" size={48} />
              </div>
              <div className="category-badge">{project.category}</div>
            </div>
            <div className="portfolio-card-content">
              <h3 className="portfolio-card-title">{project.title}</h3>
              <p className="portfolio-card-description">{project.description}</p>
              <p className="portfolio-card-artist">{project.artist}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="video-modal">
          {selectedProject && (
            <div className="video-modal-content">
              <button 
                className="video-modal-close"
                onClick={() => setSelectedProject(null)}
              >
                <X size={24} />
              </button>
              <iframe
                src={selectedProject.videoUrl}
                title={selectedProject.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-iframe"
              />
              <div className="video-info">
                <h3>{selectedProject.title}</h3>
                <p>{selectedProject.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Portfolio;