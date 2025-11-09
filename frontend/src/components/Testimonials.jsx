import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { getTestimonials } from '../services/api';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (err) {
        console.error('Error loading testimonials:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="section-container section-dark">
        <div className="section-header">
          <h2 className="section-title">Témoignages</h2>
          <p className="section-subtitle">Chargement...</p>
        </div>
      </section>
    );
  }
  return (
    <section className="section-container section-dark">
      <div className="section-header">
        <h2 className="section-title">Témoignages</h2>
        <p className="section-subtitle">
          Ce que disent nos clients
        </p>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <Quote className="quote-icon" size={32} />
            <p className="testimonial-text">{testimonial.text}</p>
            <div className="testimonial-rating">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="star-icon" size={16} fill="currentColor" />
              ))}
            </div>
            <div className="testimonial-author">
              <p className="author-name">{testimonial.name}</p>
              <p className="author-role">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;