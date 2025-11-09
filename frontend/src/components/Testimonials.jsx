import React from 'react';
import { testimonials } from '../data/mock';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
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