import { useInView } from 'react-intersection-observer';
import { FiBriefcase, FiCalendar } from 'react-icons/fi';
import './Experience.css';

const experiences = [
  {
    title: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    period: '2023 — Hozirgi',
    description: 'React va TypeScript asosida yirik SaaS platformani rivojlantirdim. 10+ kishilik jamoa boshchiligida ishlayman. Performance optimization va CI/CD pipeline sozlash.',
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    color: '#6c63ff',
  },
  {
    title: 'Full-Stack Developer',
    company: 'Digital Agency Pro',
    period: '2022 — 2023',
    description: 'Mijozlar uchun 15+ web loyihalar yaratdim. E-commerce, dashboard va CRM tizimlarni ishlab chiqdim. REST API va MongoDB bilan ishladim.',
    tags: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    color: '#00d4aa',
  },
  {
    title: 'Frontend Developer',
    company: 'StartUp Hub',
    period: '2021 — 2022',
    description: 'Startup loyihalarda frontend qismini rivojlantirdim. Responsive dizayn, animatsiyalar va UX/UI optimizatsiya bilan shug\'ullandim.',
    tags: ['JavaScript', 'HTML/CSS', 'React', 'Figma'],
    color: '#ff6b9d',
  },
  {
    title: 'Freelance Developer',
    company: 'Mustaqil',
    period: '2020 — 2021',
    description: 'Freelance sifatida kichik bizneslar va shaxsiy loyihalar uchun veb-saytlar yaratdim. WordPress va React bilan ishladim.',
    tags: ['React', 'WordPress', 'CSS', 'JavaScript'],
    color: '#febc2e',
  },
];

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="experience" className="section experience" ref={ref}>
      <div className="container">
        <div className={`experience__header ${inView ? 'experience__header--visible' : ''}`}>
          <h2 className="section-title">Tajriba</h2>
          <p className="section-subtitle">
            Professional faoliyatim va ish tajribam.
          </p>
        </div>

        <div className="experience__timeline">
          <div className="experience__line"></div>
          {experiences.map((exp, i) => (
            <div
              key={exp.title}
              className={`experience__item ${inView ? 'experience__item--visible' : ''} ${i % 2 === 0 ? 'experience__item--left' : 'experience__item--right'}`}
              style={{ transitionDelay: `${i * 0.2}s`, '--accent': exp.color }}
            >
              <div className="experience__dot" style={{ background: exp.color }}></div>
              <div className="experience__card glass-card">
                <div className="experience__card-header">
                  <span className="experience__period">
                    <FiCalendar /> {exp.period}
                  </span>
                  <span className="experience__company" style={{ color: exp.color }}>
                    <FiBriefcase /> {exp.company}
                  </span>
                </div>
                <h3 className="experience__title">{exp.title}</h3>
                <p className="experience__description">{exp.description}</p>
                <div className="experience__tags">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="experience__tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
