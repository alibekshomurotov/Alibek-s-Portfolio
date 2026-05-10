import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Sardor Karimov',
    role: 'CEO, TechCorp Solutions',
    text: 'Alibek bizning eng yaxshi dasturchimiz. React va Node.js bilan ajoyib platforma yaratdi. Sifat va tezlik jihatidan hammasi mukammal edi. Albatta yana hamkorlik qilamiz!',
    rating: 5,
    color: '#6c63ff',
  },
  {
    name: 'Nilufar Xasanova',
    role: 'Product Manager, Digital Agency',
    text: 'Alibek bilan 3 ta yirik loyihada ishladik. Har safar o\'z vaqtida va sifatli natija berdi. CSS animatsiyalari va responsive dizayn bo\'yicha mutaxassis. Tavsiya qilaman!',
    rating: 5,
    color: '#00d4aa',
  },
  {
    name: 'Jasur Toshmatov',
    role: 'Startup Founder',
    text: 'Startup uchun MVP yaratdik — Alibek 2 haftada tayyorlab berdi. Professional yondashuvi va maslahatlari juda foydali bo\'ldi. Hozir ham murojaat qilaman.',
    rating: 5,
    color: '#ff6b9d',
  },
  {
    name: 'Dilnoza Rahimova',
    role: 'E-Commerce Owner',
    text: 'Onlayn do\'konimni Alibek yaratdi. To\'lov tizimi, admin panel — hammasi ishlaydi. Mijozlar juda mamnun. Texnik yordam ham a\'lo darajada.',
    rating: 4,
    color: '#febc2e',
  },
];

export default function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="section testimonials" ref={ref}>
      <div className="container">
        <div className={`testimonials__header ${inView ? 'testimonials__header--visible' : ''}`}>
          <h2 className="section-title">Mijozlar izohlari</h2>
          <p className="section-subtitle">
            Men bilan ishlagan mijozlar nima deydi.
          </p>
        </div>

        <div className={`testimonials__slider ${inView ? 'testimonials__slider--visible' : ''}`}>
          <div className="testimonials__track">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`testimonials__card glass-card ${i === current ? 'testimonials__card--active' : ''}`}
                style={{ '--accent': t.color }}
              >
                <div className="testimonials__quote-icon">❝</div>
                <p className="testimonials__text">{t.text}</p>
                <div className="testimonials__stars">
                  {[...Array(5)].map((_, si) => (
                    <FiStar
                      key={si}
                      className={`testimonials__star ${si < t.rating ? 'testimonials__star--filled' : ''}`}
                      style={si < t.rating ? { color: t.color } : {}}
                    />
                  ))}
                </div>
                <div className="testimonials__author">
                  <div className="testimonials__avatar" style={{ background: `${t.color}20`, color: t.color }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <span className="testimonials__name">{t.name}</span>
                    <span className="testimonials__role">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonials__controls">
            <button className="testimonials__btn" onClick={prev} aria-label="Oldingi">
              <FiChevronLeft />
            </button>
            <div className="testimonials__dots">
              {testimonials.map((_, i) => (
                <span
                  key={i}
                  className={`testimonials__dot ${i === current ? 'testimonials__dot--active' : ''}`}
                  onClick={() => setCurrent(i)}
                />
              ))}
            </div>
            <button className="testimonials__btn" onClick={next} aria-label="Keyingi">
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
