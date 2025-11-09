import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { socialLinks } from '../data/mock';
import { MessageCircle, Mail, Send, Instagram, Youtube } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    
    const message = `Bonjour ALVZ.REC,\n\nNom: ${formData.name}\nContact: ${formData.contact}\nType de projet: ${formData.projectType}\nBudget: ${formData.budget}\n\nMessage:\n${formData.message}`;
    
    const whatsappUrl = `${socialLinks.whatsappLink}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Redirection vers WhatsApp",
      description: "Votre message a été préparé. Finalisez l'envoi sur WhatsApp."
    });
  };

  const handleEmailSubmit = () => {
    const subject = `Demande de projet - ${formData.projectType}`;
    const body = `Nom: ${formData.name}\nContact: ${formData.contact}\nType de projet: ${formData.projectType}\nBudget: ${formData.budget}\n\nMessage:\n${formData.message}`;
    
    window.location.href = `mailto:contact@alvz.rec?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="section-container">
      <div className="contact-layout">
        <div className="contact-info">
          <h2 className="section-title">Contactez-nous</h2>
          <p className="contact-description">
            Vous avez un projet en tête ? Parlons-en.
            <br />
            <strong>Réponse sous 24h.</strong>
          </p>

          <div className="contact-methods">
            <a 
              href={socialLinks.whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-method-card"
            >
              <MessageCircle size={32} />
              <div>
                <h4>WhatsApp</h4>
                <p>{socialLinks.whatsapp}</p>
              </div>
            </a>

            <button 
              onClick={handleEmailSubmit}
              className="contact-method-card"
            >
              <Mail size={32} />
              <div>
                <h4>Email</h4>
                <p>contact@alvz.rec</p>
              </div>
            </button>
          </div>

          <div className="social-links">
            <h4 className="social-title">Suivez-nous</h4>
            <div className="social-buttons">
              <a 
                href={socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-button"
              >
                <Instagram size={24} />
                <span>Instagram</span>
              </a>
              <a 
                href={socialLinks.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-button"
              >
                <Youtube size={24} />
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <form onSubmit={handleWhatsAppSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Nom / Pseudo</label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Votre nom"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact" className="form-label">Email / Instagram</label>
              <Input
                id="contact"
                type="text"
                value={formData.contact}
                onChange={(e) => handleChange('contact', e.target.value)}
                placeholder="@votre_instagram ou email"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="projectType" className="form-label">Type de projet</label>
              <Select onValueChange={(value) => handleChange('projectType', value)} required>
                <SelectTrigger className="form-input">
                  <SelectValue placeholder="Sélectionnez un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clip">Clip Musical</SelectItem>
                  <SelectItem value="pub">Publicité / Teaser</SelectItem>
                  <SelectItem value="montage">Montage & Étalonnage</SelectItem>
                  <SelectItem value="vertical">Contenu Vertical</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="form-group">
              <label htmlFor="budget" className="form-label">Budget estimé</label>
              <Select onValueChange={(value) => handleChange('budget', value)} required>
                <SelectTrigger className="form-input">
                  <SelectValue placeholder="Sélectionnez une fourchette" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="500-1000">500€ - 1000€</SelectItem>
                  <SelectItem value="1000-2000">1000€ - 2000€</SelectItem>
                  <SelectItem value="2000-5000">2000€ - 5000€</SelectItem>
                  <SelectItem value="5000+">5000€+</SelectItem>
                  <SelectItem value="discuter">À discuter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange('message', e.target.value)}
                placeholder="Parlez-nous de votre projet..."
                rows={5}
                required
                className="form-input"
              />
            </div>

            <div className="form-actions">
              <Button type="submit" className="cta-button-primary full-width">
                <MessageCircle className="mr-2 h-5 w-5" />
                Envoyer via WhatsApp
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleEmailSubmit}
                className="cta-button-secondary full-width"
              >
                <Mail className="mr-2 h-5 w-5" />
                Envoyer par Email
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;