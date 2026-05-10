import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  FiLock, FiUsers, FiEye, FiTrendingUp, FiPlus, FiEdit2, FiTrash2,
  FiArrowLeft, FiSave, FiX, FiStar, FiLogOut, FiExternalLink, FiGithub,
  FiImage, FiPackage, FiActivity, FiClock, FiMail, FiMessageCircle,
  FiSettings, FiMonitor, FiSmartphone, FiGlobe, FiRefreshCw, FiDownload,
  FiUpload, FiCheck, FiAlertCircle, FiBarChart2, FiCalendar, FiUser,
  FiCpu, FiWifi, FiChevronDown, FiSearch, FiFilter, FiGrid, FiList,
  FiZap, FiShield, FiDatabase, FiToggleLeft, FiToggleRight, FiCopy,
  FiMaximize2, FiMinimize2, FiBell, FiHelpCircle, FiKey, FiMenu, FiMoreVertical
} from 'react-icons/fi';
import './AdminPanel.css';

// ===== CONSTANTS =====
const ADMIN_PASSWORD = 'alibek123';
const COUNTER_KEY = 'alibek-portfolio-visits';
const PROJECTS_KEY = 'portfolio-projects';
const MESSAGES_KEY = 'portfolio-messages';
const SETTINGS_KEY = 'portfolio-admin-settings';

// ===== DEFAULT PROJECTS =====
const DEFAULT_PROJECTS = [
  {
    id: '1', title: 'E-Commerce Platform',
    description: "Zamonaviy onlayn do'kon — React va Node.js bilan yaratilgan. To'lov sistemasini integratsiya qilgan, real-time buyurtma kuzatish va admin panel mavjud.",
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    github: '#', live: '#', featured: true, color: '#6c63ff', createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: '2', title: 'AI Chat Application',
    description: "Sun'iy intellekt asosidagi chat ilovasi. Real-time xabar almashish, fayl yuborish va AI javob berish funksiyalari bor.",
    tags: ['Next.js', 'OpenAI', 'WebSocket', 'Prisma'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    github: '#', live: '#', featured: true, color: '#00d4aa', createdAt: Date.now() - 86400000 * 4,
  },
  {
    id: '3', title: 'Dashboard Analytics',
    description: "Biznes uchun analitik dashboard. Ma'lumotlarni vizualizatsiya qilish, hisobot yaratish va real-time statistika ko'rish.",
    tags: ['React', 'D3.js', 'Python', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    github: '#', live: '#', featured: true, color: '#ff6b9d', createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: '4', title: 'Social Media App',
    description: "Mobil qurilmalar uchun ijtimoiy tarmoq ilovasi. Post yaratish, commenting, va real-time notifications.",
    tags: ['React Native', 'Firebase', 'Redux'],
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=400&fit=crop',
    github: '#', live: '#', featured: false, color: '#febc2e', createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: '5', title: 'Portfolio Generator',
    description: "Portfolio saytlar avtomatik yaratuvchi. Slayder bilan sozlash, bir nechta tema tanlash imkoniyati.",
    tags: ['Next.js', 'Tailwind', 'Supabase'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    github: '#', live: '#', featured: false, color: '#6c63ff', createdAt: Date.now() - 86400000,
  },
  {
    id: '6', title: 'Task Management Tool',
    description: "Jamoa uchun vazifalar boshqaruvi ilovasi. Kanban board, deadline tracking va jamoa bilan hamkorlik.",
    tags: ['Vue.js', 'Express', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    github: '#', live: '#', featured: false, color: '#00d4aa', createdAt: Date.now(),
  },
];

const EMPTY_PROJECT = {
  title: '', description: '', tags: '', image: '',
  github: '#', live: '#', featured: false, color: '#6c63ff',
};

const ACCENT_COLORS = ['#6c63ff', '#00d4aa', '#ff6b9d', '#febc2e', '#ff5f57', '#28c840', '#8b5cf6', '#06b6d4'];

// ===== HELPER FUNCTIONS =====
function trackVisit() {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const userAgent = navigator.userAgent;
  let device = 'Desktop';
  if (/Mobi|Android/i.test(userAgent)) device = 'Mobile';
  else if (/Tablet|iPad/i.test(userAgent)) device = 'Tablet';

  let browser = 'Other';
  if (userAgent.includes('Chrome')) browser = 'Chrome';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Safari')) browser = 'Safari';
  else if (userAgent.includes('Edge')) browser = 'Edge';

  let os = 'Other';
  if (userAgent.includes('Windows')) os = 'Windows';
  else if (userAgent.includes('Mac')) os = 'macOS';
  else if (userAgent.includes('Linux')) os = 'Linux';
  else if (userAgent.includes('Android')) os = 'Android';
  else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS';

  const visitorId = localStorage.getItem('alibek-visitor-id') || null;
  const isNew = !visitorId;

  if (isNew) {
    const id = 'v_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    localStorage.setItem('alibek-visitor-id', id);
  }

  const log = JSON.parse(localStorage.getItem(COUNTER_KEY) || '{"total":0,"today":0,"date":"","unique":0,"daily":{},"log":[],"devices":{},"browsers":{},"os":{}}');

  if (log.date !== today) {
    log.date = today;
    log.today = 0;
  }

  log.total++;
  log.today++;

  if (isNew) log.unique = (log.unique || 0) + 1;

  if (!log.daily) log.daily = {};
  log.daily[today] = (log.daily[today] || 0) + 1;

  if (!log.devices) log.devices = {};
  log.devices[device] = (log.devices[device] || 0) + 1;

  if (!log.browsers) log.browsers = {};
  log.browsers[browser] = (log.browsers[browser] || 0) + 1;

  if (!log.os) log.os = {};
  log.os[os] = (log.os[os] || 0) + 1;

  log.log.push({
    time: now.toLocaleString('uz-UZ'),
    date: today,
    timestamp: now.getTime(),
    device,
    browser,
    os,
    isNew,
  });

  if (log.log.length > 200) log.log = log.log.slice(-200);

  // Keep only last 30 days of daily data
  const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0];
  Object.keys(log.daily || {}).forEach(d => {
    if (d < thirtyDaysAgo) delete log.daily[d];
  });

  localStorage.setItem(COUNTER_KEY, JSON.stringify(log));
}

function getVisitStats() {
  return JSON.parse(localStorage.getItem(COUNTER_KEY) || '{"total":0,"today":0,"date":"","unique":0,"daily":{},"log":[],"devices":{},"browsers":{},"os":{}}');
}

function getProjects() {
  const stored = localStorage.getItem(PROJECTS_KEY);
  if (stored) return JSON.parse(stored);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(DEFAULT_PROJECTS));
  return DEFAULT_PROJECTS;
}

function saveProjects(projects) {
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

function getMessages() {
  return JSON.parse(localStorage.getItem(MESSAGES_KEY) || '[]');
}

function saveMessages(msgs) {
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(msgs));
}

function getSettings() {
  return JSON.parse(localStorage.getItem(SETTINGS_KEY) || JSON.stringify({
    password: 'alibek123',
    showVisitorCounter: true,
    showOnlineBadge: true,
  }));
}

function saveSettings(s) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
}

// ===== ANIMATED NUMBER =====
function AnimatedNumber({ value, duration = 1200 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const target = typeof value === 'number' ? value : parseInt(value) || 0;
    let start = 0;
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.round(start + (target - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}

// ===== MINI BAR CHART =====
function MiniBarChart({ data, maxBars = 7, height = 60, color = '#6c63ff' }) {
  const bars = useMemo(() => {
    if (!data || typeof data !== 'object') return [];
    const entries = Object.entries(data).sort((a, b) => a[0].localeCompare(b[0]));
    return entries.slice(-maxBars);
  }, [data, maxBars]);

  const maxVal = Math.max(...bars.map(([, v]) => v), 1);

  return (
    <div className="mini-chart">
      <div className="mini-chart__bars" style={{ height }}>
        {bars.map(([date, val], i) => (
          <div key={date} className="mini-chart__bar-wrap" title={`${date}: ${val}`}>
            <div
              className="mini-chart__bar"
              style={{
                height: `${Math.max(4, (val / maxVal) * 100)}%`,
                background: color,
                animationDelay: `${i * 0.08}s`,
              }}
            />
            <span className="mini-chart__val">{val}</span>
          </div>
        ))}
      </div>
      <div className="mini-chart__labels">
        {bars.map(([date]) => (
          <span key={date}>{date.slice(5)}</span>
        ))}
      </div>
    </div>
  );
}

// ===== DONUT CHART =====
function DonutChart({ data, size = 80, strokeWidth = 10, colors }) {
  const entries = useMemo(() => {
    if (!data || typeof data !== 'object') return [];
    return Object.entries(data).sort((a, b) => b[1] - a[1]);
  }, [data]);

  const total = entries.reduce((s, [, v]) => s + v, 0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;

  return (
    <div className="donut-chart">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {entries.map(([label, val], i) => {
          const pct = total > 0 ? val / total : 0;
          const dash = pct * circumference;
          const el = (
            <circle
              key={label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={colors?.[i] || ACCENT_COLORS[i % ACCENT_COLORS.length]}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
              className="donut-chart__segment"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          );
          offset += dash;
          return el;
        })}
      </svg>
      <div className="donut-chart__center">
        <AnimatedNumber value={total} />
      </div>
    </div>
  );
}

// ===== LOGIN SCREEN =====
function LoginScreen({ onLogin, error, onBack }) {
  const [password, setPassword] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (error) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="admin-login">
      <div className="admin-login__particles">
        {[...Array(30)].map((_, i) => (
          <span key={i} className="admin-login__particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${6 + Math.random() * 10}s`,
            animationDelay: `${Math.random() * 5}s`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
          }} />
        ))}
      </div>
      <div className={`admin-login__card ${shake ? 'admin-login__card--shake' : ''}`}>
        <div className="admin-login__glow" />
        <div className="admin-login__icon-ring">
          <FiShield className="admin-login__shield" />
        </div>
        <h2 className="admin-login__title">Admin Panel</h2>
        <p className="admin-login__subtitle">
          <FiKey style={{ verticalAlign: 'middle', marginRight: 6 }} />
          Kirish uchun parolni kiriting
        </p>
        {error && (
          <div className="admin-login__error">
            <FiAlertCircle /> Parol noto'g'ri!
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="admin-login__input-wrap">
            <FiLock className="admin-login__input-icon" />
            <input
              type="password"
              placeholder="Parol..."
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="admin-login__input"
              autoFocus
            />
          </div>
          <button type="submit" className="admin-login__btn">
            <FiZap /> Kirish
          </button>
        </form>
        <button className="admin-login__hint-btn" onClick={() => setShowHint(!showHint)}>
          {showHint ? 'Yashirish' : 'Parolni unutdim'}
        </button>
        {showHint && (
          <div className="admin-login__hint">
            Standart parol: <code>alibek123</code>
          </div>
        )}
        <button className="admin-login__back" onClick={onBack}>
          <FiArrowLeft /> Portfolio ga qaytish
        </button>
      </div>
    </div>
  );
}

// ===== PROJECT FORM =====
function ProjectForm({ project, onSave, onCancel }) {
  const [form, setForm] = useState({
    ...EMPTY_PROJECT,
    ...project,
    tags: project?.tags ? project.tags.join(', ') : '',
  });
  const [imgPreview, setImgPreview] = useState(project?.image || '');
  const [dragOver, setDragOver] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const saved = {
      ...form,
      id: form.id || Date.now().toString(),
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      createdAt: project?.createdAt || Date.now(),
    };
    onSave(saved);
  };

  const handleImageChange = (url) => {
    setForm({ ...form, image: url });
    setImgPreview(url);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer?.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = ev.target.result;
        setForm({ ...form, image: base64 });
        setImgPreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="admin-form-overlay" onClick={onCancel}>
      <form className="admin-form" onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
        <div className="admin-form__header">
          <h3>{form.id ? 'Loyihani tahrirlash' : 'Yangi loyiha qo\'shish'}</h3>
          <button type="button" className="admin-form__close" onClick={onCancel}><FiX /></button>
        </div>

        {/* Image Upload Area */}
        <div
          className={`admin-form__img-upload ${dragOver ? 'admin-form__img-upload--drag' : ''}`}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleFileDrop}
        >
          {imgPreview ? (
            <div className="admin-form__img-preview">
              <img src={imgPreview} alt="Preview" />
              <button type="button" className="admin-form__img-remove" onClick={() => { setForm({ ...form, image: '' }); setImgPreview(''); }}>
                <FiX />
              </button>
            </div>
          ) : (
            <div className="admin-form__img-placeholder">
              <FiImage size={32} />
              <span>Rasm URL kiriting yoki fayl tashlang</span>
              <FiUpload size={16} />
            </div>
          )}
        </div>

        <div className="admin-form__group">
          <label>Loyiha nomi *</label>
          <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="E-Commerce Platform" required />
        </div>

        <div className="admin-form__group">
          <label>Tavsif *</label>
          <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Loyiha haqida batafsil..." rows="3" required />
        </div>

        <div className="admin-form__row">
          <div className="admin-form__group">
            <label>Texnologiyalar (vergul bilan)</label>
            <input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} placeholder="React, Node.js, MongoDB" />
          </div>
          <div className="admin-form__group">
            <label>Rang</label>
            <div className="admin-form__colors">
              {ACCENT_COLORS.map(c => (
                <button key={c} type="button"
                  className={`admin-form__color ${form.color === c ? 'admin-form__color--active' : ''}`}
                  style={{ background: c }}
                  onClick={() => setForm({ ...form, color: c })} />
              ))}
            </div>
          </div>
        </div>

        <div className="admin-form__group">
          <label><FiGlobe /> Rasm URL</label>
          <input value={form.image && !form.image.startsWith('data:') ? form.image : ''} onChange={e => handleImageChange(e.target.value)} placeholder="https://images.unsplash.com/..." />
        </div>

        <div className="admin-form__row">
          <div className="admin-form__group">
            <label><FiGithub /> GitHub link</label>
            <input value={form.github} onChange={e => setForm({ ...form, github: e.target.value })} placeholder="https://github.com/..." />
          </div>
          <div className="admin-form__group">
            <label><FiExternalLink /> Live demo link</label>
            <input value={form.live} onChange={e => setForm({ ...form, live: e.target.value })} placeholder="https://..." />
          </div>
        </div>

        <div className="admin-form__group">
          <label className="admin-form__checkbox-label">
            <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
            <FiStar /> Featured loyiha
          </label>
        </div>

        <div className="admin-form__actions">
          <button type="button" className="admin-btn admin-btn--ghost" onClick={onCancel}>Bekor qilish</button>
          <button type="submit" className="admin-btn admin-btn--primary"><FiSave /> Saqlash</button>
        </div>
      </form>
    </div>
  );
}

// ===== STAT CARD =====
function StatCard({ icon, label, value, sub, color, delay = 0, onClick }) {
  return (
    <div className="stat-card" style={{ '--card-color': color, animationDelay: `${delay}s` }} onClick={onClick}>
      <div className="stat-card__glow" />
      <div className="stat-card__icon" style={{ background: `${color}18`, color }}>
        {icon}
      </div>
      <div className="stat-card__info">
        <span className="stat-card__value"><AnimatedNumber value={value} /></span>
        <span className="stat-card__label">{label}</span>
        {sub && <span className="stat-card__sub">{sub}</span>}
      </div>
      <div className="stat-card__bg-icon">{icon}</div>
    </div>
  );
}

// ===== DASHBOARD TAB =====
function DashboardTab({ stats, projects }) {
  const last7Days = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      days.push(d.toISOString().split('T')[0]);
    }
    return days;
  }, []);

  const last7Data = useMemo(() => {
    const obj = {};
    last7Days.forEach(d => { obj[d] = stats.daily?.[d] || 0; });
    return obj;
  }, [stats.daily, last7Days]);

  const thisWeekTotal = useMemo(() => last7Days.reduce((s, d) => s + (stats.daily?.[d] || 0), 0), [stats.daily, last7Days]);
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const yesterdayVisits = stats.daily?.[yesterday] || 0;

  return (
    <div className="tab-content">
      <div className="tab-content__header">
        <h2>Dashboard</h2>
        <span className="tab-content__badge">
          <FiActivity /> Real-time
        </span>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        <StatCard icon={<FiEye />} label="Jami tashriflar" value={stats.total || 0} sub="Hammasi davomida" color="#6c63ff" delay={0} />
        <StatCard icon={<FiUsers />} label="Bugungi tashriflar" value={stats.today || 0} sub={new Date().toLocaleDateString('uz-UZ', { weekday: 'long' })} color="#00d4aa" delay={0.1} />
        <StatCard icon={<FiUser />} label="Noyob tashriflar" value={stats.unique || 0} sub="Birinchi marta" color="#ff6b9d" delay={0.2} />
        <StatCard icon={<FiTrendingUp />} label="So'nggi 7 kun" value={thisWeekTotal} sub={`Kecha: ${yesterdayVisits}`} color="#febc2e" delay={0.3} />
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        <div className="chart-card">
          <div className="chart-card__header">
            <h3><FiBarChart2 /> So'nggi 7 kun</h3>
            <span className="chart-card__badge">Tashriflar</span>
          </div>
          <MiniBarChart data={last7Data} maxBars={7} height={140} color="#6c63ff" />
        </div>

        <div className="chart-card">
          <div className="chart-card__header">
            <h3><FiMonitor /> Qurilmalar</h3>
          </div>
          <div className="chart-card__body chart-card__body--row">
            <DonutChart data={stats.devices} size={100} strokeWidth={12}
              colors={['#6c63ff', '#00d4aa', '#ff6b9d']} />
            <div className="chart-legend">
              {Object.entries(stats.devices || {}).map(([k, v]) => (
                <div key={k} className="chart-legend__item">
                  <span className="chart-legend__dot" style={{ background: k === 'Desktop' ? '#6c63ff' : k === 'Mobile' ? '#00d4aa' : '#ff6b9d' }} />
                  <span className="chart-legend__label">{k}</span>
                  <span className="chart-legend__value">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card__header">
            <h3><FiCpu /> Brauzerlar</h3>
          </div>
          <div className="chart-card__body">
            {(Object.entries(stats.browsers || {}).sort((a, b) => b[1] - a[1])).map(([name, count]) => {
              const maxB = Math.max(...Object.values(stats.browsers || {}), 1);
              const pct = (count / maxB) * 100;
              return (
                <div key={name} className="progress-row">
                  <span className="progress-row__label">{name}</span>
                  <div className="progress-row__track">
                    <div className="progress-row__fill" style={{ width: `${pct}%`, background: ACCENT_COLORS[Object.keys(stats.browsers || {}).indexOf(name) % ACCENT_COLORS.length] }} />
                  </div>
                  <span className="progress-row__value">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card__header">
            <h3><FiGlobe /> Operatsion tizimlar</h3>
          </div>
          <div className="chart-card__body">
            {(Object.entries(stats.os || {}).sort((a, b) => b[1] - a[1])).map(([name, count]) => {
              const maxO = Math.max(...Object.values(stats.os || {}), 1);
              const pct = (count / maxO) * 100;
              return (
                <div key={name} className="progress-row">
                  <span className="progress-row__label">{name}</span>
                  <div className="progress-row__track">
                    <div className="progress-row__fill" style={{ width: `${pct}%`, background: ACCENT_COLORS[Object.keys(stats.os || {}).indexOf(name) % ACCENT_COLORS.length] }} />
                  </div>
                  <span className="progress-row__value">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Visitors */}
      <div className="visitors-card">
        <div className="visitors-card__header">
          <h3><FiClock /> So'nggi tashriflar</h3>
          <span className="visitors-card__count">{(stats.log?.length || 0)} ta</span>
        </div>
        <div className="visitors-card__list">
          {stats.log && stats.log.length > 0 ? (
            [...stats.log].reverse().slice(0, 20).map((visit, i) => (
              <div key={i} className="visitor-item" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="visitor-item__avatar">
                  {visit.device === 'Mobile' ? <FiSmartphone /> : visit.device === 'Tablet' ? <FiMonitor /> : <FiMonitor />}
                </div>
                <div className="visitor-item__info">
                  <div className="visitor-item__browser">
                    {visit.browser} <span className="visitor-item__on">{visit.os}</span>
                  </div>
                  <div className="visitor-item__meta">
                    <span>{visit.device}</span>
                    <span className="visitor-item__dot" />
                    <span>{visit.date}</span>
                  </div>
                </div>
                <div className="visitor-item__time">{visit.time}</div>
                {visit.isNew && <span className="visitor-item__badge">Yangi</span>}
              </div>
            ))
          ) : (
            <div className="empty-state">
              <FiUsers size={40} />
              <p>Hali tashrif yo'q</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ===== PROJECTS TAB =====
function ProjectsTab({ projects, onUpdate }) {
  const [editing, setEditing] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [search, setSearch] = useState('');
  const [filterFeatured, setFilterFeatured] = useState('all');
  const [dragId, setDragId] = useState(null);

  const filteredProjects = useMemo(() => {
    let list = [...projects];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
    }
    if (filterFeatured === 'featured') list = list.filter(p => p.featured);
    if (filterFeatured === 'normal') list = list.filter(p => !p.featured);
    return list;
  }, [projects, search, filterFeatured]);

  const handleSave = (project) => {
    const existing = projects.findIndex(p => p.id === project.id);
    let updated;
    if (existing >= 0) {
      updated = [...projects];
      updated[existing] = project;
    } else {
      updated = [...projects, project];
    }
    saveProjects(updated);
    onUpdate(updated);
    setEditing(null);
    window.dispatchEvent(new Event('projects-updated'));
  };

  const handleDelete = (id) => {
    if (window.confirm("Loyihani o'chirmoqchimisiz?")) {
      const updated = projects.filter(p => p.id !== id);
      saveProjects(updated);
      onUpdate(updated);
      window.dispatchEvent(new Event('projects-updated'));
    }
  };

  const toggleFeatured = (id) => {
    const updated = projects.map(p => p.id === id ? { ...p, featured: !p.featured } : p);
    saveProjects(updated);
    onUpdate(updated);
    window.dispatchEvent(new Event('projects-updated'));
  };

  const handleDragStart = (id) => setDragId(id);
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (targetId) => {
    if (dragId === targetId) return;
    const arr = [...projects];
    const fromIdx = arr.findIndex(p => p.id === dragId);
    const toIdx = arr.findIndex(p => p.id === targetId);
    const [moved] = arr.splice(fromIdx, 1);
    arr.splice(toIdx, 0, moved);
    saveProjects(arr);
    onUpdate(arr);
    setDragId(null);
    window.dispatchEvent(new Event('projects-updated'));
  };

  return (
    <div className="tab-content">
      <div className="tab-content__header">
        <h2>Loyihalar</h2>
        <div className="tab-content__actions">
          <div className="admin-search">
            <FiSearch className="admin-search__icon" />
            <input type="text" placeholder="Qidirish..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="admin-filter">
            <button className={`admin-filter__btn ${filterFeatured === 'all' ? 'admin-filter__btn--active' : ''}`} onClick={() => setFilterFeatured('all')}>Hammasi</button>
            <button className={`admin-filter__btn ${filterFeatured === 'featured' ? 'admin-filter__btn--active' : ''}`} onClick={() => setFilterFeatured('featured')}>
              <FiStar /> Featured
            </button>
            <button className={`admin-filter__btn ${filterFeatured === 'normal' ? 'admin-filter__btn--active' : ''}`} onClick={() => setFilterFeatured('normal')}>Oddiy</button>
          </div>
          <div className="admin-view-toggle">
            <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}><FiGrid /></button>
            <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}><FiList /></button>
          </div>
          <button className="admin-btn admin-btn--primary" onClick={() => setEditing({})}>
            <FiPlus /> Yangi loyiha
          </button>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="empty-state empty-state--large">
          <FiPackage size={48} />
          <h3>Loyiha topilmadi</h3>
          <p>Yangi loyiha qo'shing yoki filtrlarni o'zgartiring</p>
          <button className="admin-btn admin-btn--primary" onClick={() => setEditing({})}>
            <FiPlus /> Yangi loyiha
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-admin-card"
              draggable
              onDragStart={() => handleDragStart(project.id)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(project.id)}
              style={{ '--accent': project.color }}
            >
              <div className="project-admin-card__image">
                {project.image ? (
                  <img src={project.image} alt={project.title} loading="lazy" />
                ) : (
                  <div className="project-admin-card__noimg"><FiImage /></div>
                )}
                <div className="project-admin-card__overlay">
                  <button className="project-admin-card__link" title="Tahrirlash" onClick={() => setEditing(project)}><FiEdit2 /></button>
                  <button className="project-admin-card__link" title="O'chirish" onClick={() => handleDelete(project.id)}><FiTrash2 /></button>
                  <button className="project-admin-card__link" title="Featured" onClick={() => toggleFeatured(project.id)}><FiStar /></button>
                </div>
                {project.featured && <span className="project-admin-card__badge"><FiStar /> Featured</span>}
              </div>
              <div className="project-admin-card__content">
                <h3>{project.title}</h3>
                <p>{project.description?.slice(0, 90)}...</p>
                <div className="project-admin-card__tags">
                  {project.tags?.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}
                </div>
                <div className="project-admin-card__footer">
                  {project.github !== '#' && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-admin-card__ext"><FiGithub /></a>
                  )}
                  {project.live !== '#' && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-admin-card__ext"><FiExternalLink /></a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="projects-list">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-list-item" draggable onDragStart={() => handleDragStart(project.id)} onDragOver={handleDragOver} onDrop={() => handleDrop(project.id)}>
              <div className="project-list-item__drag"><FiMoreVertical /></div>
              <div className="project-list-item__img">
                {project.image ? <img src={project.image} alt={project.title} /> : <div className="project-admin-card__noimg"><FiImage /></div>}
              </div>
              <div className="project-list-item__info">
                <h3>{project.title}</h3>
                <div className="project-list-item__tags">
                  {project.tags?.slice(0, 5).map(tag => <span key={tag}>{tag}</span>)}
                </div>
              </div>
              <div className="project-list-item__status">
                {project.featured ? (
                  <span className="project-list-item__featured"><FiStar /> Featured</span>
                ) : (
                  <span className="project-list-item__normal">Oddiy</span>
                )}
              </div>
              <div className="project-list-item__actions">
                <button className="admin-btn admin-btn--edit" onClick={() => setEditing(project)}><FiEdit2 /></button>
                <button className="admin-btn admin-btn--delete" onClick={() => handleDelete(project.id)}><FiTrash2 /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing !== null && (
        <ProjectForm project={editing} onSave={handleSave} onCancel={() => setEditing(null)} />
      )}
    </div>
  );
}

// ===== MESSAGES TAB =====
function MessagesTab({ messages, onUpdate }) {
  const [selected, setSelected] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Xabarni o'chirmoqchimisiz?")) {
      const updated = messages.filter(m => m.id !== id);
      saveMessages(updated);
      onUpdate(updated);
    }
  };

  const handleMarkRead = (id) => {
    const updated = messages.map(m => m.id === id ? { ...m, read: true } : m);
    saveMessages(updated);
    onUpdate(updated);
  };

  const handleDeleteAll = () => {
    if (window.confirm("Barcha xabarlarni o'chirmoqchimisiz?")) {
      saveMessages([]);
      onUpdate([]);
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="tab-content">
      <div className="tab-content__header">
        <h2>Xabarlar</h2>
        <div className="tab-content__actions">
          {unreadCount > 0 && <span className="tab-content__unread">{unreadCount} o'qilmagan</span>}
          {messages.length > 0 && (
            <button className="admin-btn admin-btn--ghost" onClick={handleDeleteAll}>
              <FiTrash2 /> Barchasini o'chirish
            </button>
          )}
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="empty-state empty-state--large">
          <FiMail size={48} />
          <h3>Hali xabar yo'q</h3>
          <p>Contact form orqali kelgan xabarlar shu yerda ko'rinadi</p>
        </div>
      ) : (
        <div className="messages-layout">
          <div className="messages-list">
            {messages.map((msg, i) => (
              <div
                key={msg.id}
                className={`message-item ${selected?.id === msg.id ? 'message-item--active' : ''} ${!msg.read ? 'message-item--unread' : ''}`}
                onClick={() => { setSelected(msg); handleMarkRead(msg.id); }}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="message-item__avatar">
                  {msg.name?.charAt(0).toUpperCase() || '?'}
                </div>
                <div className="message-item__info">
                  <div className="message-item__top">
                    <span className="message-item__name">{msg.name}</span>
                    <span className="message-item__date">{msg.date}</span>
                  </div>
                  <span className="message-item__subject">{msg.subject}</span>
                  <p className="message-item__preview">{msg.message?.slice(0, 60)}...</p>
                </div>
                {!msg.read && <span className="message-item__dot" />}
              </div>
            ))}
          </div>

          {selected && (
            <div className="message-detail">
              <div className="message-detail__header">
                <div>
                  <h3>{selected.subject}</h3>
                  <span className="message-detail__from">{selected.name} — {selected.email}</span>
                </div>
                <button className="admin-btn admin-btn--delete" onClick={() => { handleDelete(selected.id); setSelected(null); }}>
                  <FiTrash2 />
                </button>
              </div>
              <div className="message-detail__body">
                <p>{selected.message}</p>
              </div>
              <div className="message-detail__footer">
                <span><FiClock /> {selected.time}</span>
                <a href={`mailto:${selected.email}`} className="admin-btn admin-btn--primary">
                  <FiMail /> Javob berish
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ===== SETTINGS TAB =====
function SettingsTab() {
  const [settings, setSettings] = useState(getSettings);
  const [saved, setSaved] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    if (newPassword) {
      if (newPassword !== confirmPassword) {
        alert("Parollar mos kelmayapti!");
        return;
      }
      settings.password = newPassword;
    }
    saveSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleResetVisits = () => {
    if (window.confirm("Barcha tashrif ma'lumotlarini o'chirmoqchimisiz?")) {
      localStorage.removeItem(COUNTER_KEY);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleResetProjects = () => {
    if (window.confirm("Loyihalarni boshlang'ich holatga qaytarmoqchimisiz?")) {
      localStorage.removeItem(PROJECTS_KEY);
      window.dispatchEvent(new Event('projects-updated'));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleExportData = () => {
    const data = {
      projects: getProjects(),
      visits: getVisitStats(),
      messages: getMessages(),
      settings: getSettings(),
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alibek-portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.projects) { saveProjects(data.projects); window.dispatchEvent(new Event('projects-updated')); }
        if (data.visits) localStorage.setItem(COUNTER_KEY, JSON.stringify(data.visits));
        if (data.messages) saveMessages(data.messages);
        if (data.settings) saveSettings(data.settings);
        setSettings(getSettings());
        alert("Ma'lumotlar muvaffaqiyatli import qilindi!");
      } catch {
        alert("Faylni o'qishda xatolik yuz berdi!");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="tab-content">
      <div className="tab-content__header">
        <h2>Sozlamalar</h2>
        <span className="tab-content__badge"><FiSettings /> Konfiguratsiya</span>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <div className="settings-card__header">
            <FiKey /> Xavfsizlik
          </div>
          <div className="settings-card__body">
            <div className="settings-card__group">
              <label>Yangi parol</label>
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Yangi parol..." />
            </div>
            <div className="settings-card__group">
              <label>Parolni tasdiqlash</label>
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Takrorlang..." />
            </div>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card__header">
            <FiEye /> Portfolio ko'rsatish
          </div>
          <div className="settings-card__body">
            <div className="settings-card__toggle">
              <span>Tashriflar sonini ko'rsatish</span>
              <button className="toggle-btn" onClick={() => { setSettings({ ...settings, showVisitorCounter: !settings.showVisitorCounter }); saveSettings({ ...settings, showVisitorCounter: !settings.showVisitorCounter }); }}>
                {settings.showVisitorCounter ? <FiToggleRight className="toggle-btn--on" /> : <FiToggleLeft />}
              </button>
            </div>
            <div className="settings-card__toggle">
              <span>Online badge ko'rsatish</span>
              <button className="toggle-btn" onClick={() => { setSettings({ ...settings, showOnlineBadge: !settings.showOnlineBadge }); saveSettings({ ...settings, showOnlineBadge: !settings.showOnlineBadge }); }}>
                {settings.showOnlineBadge ? <FiToggleRight className="toggle-btn--on" /> : <FiToggleLeft />}
              </button>
            </div>
          </div>
        </div>

        <div className="settings-card">
          <div className="settings-card__header">
            <FiDatabase /> Ma'lumotlar boshqaruvi
          </div>
          <div className="settings-card__body">
            <div className="settings-card__actions">
              <button className="admin-btn admin-btn--ghost" onClick={handleResetVisits}>
                <FiRefreshCw /> Tashriflarni tozalash
              </button>
              <button className="admin-btn admin-btn--ghost" onClick={handleResetProjects}>
                <FiRefreshCw /> Loyihalarni qayta tiklash
              </button>
              <button className="admin-btn admin-btn--primary" onClick={handleExportData}>
                <FiDownload /> Export (JSON)
              </button>
              <label className="admin-btn admin-btn--ghost" style={{ cursor: 'pointer' }}>
                <FiUpload /> Import (JSON)
                <input type="file" accept=".json" onChange={handleImportData} style={{ display: 'none' }} />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-save-row">
        <button className="admin-btn admin-btn--primary admin-btn--large" onClick={handleSave}>
          {saved ? <><FiCheck /> Saqlandi!</> : <><FiSave /> Sozlamalarni saqlash</>}
        </button>
      </div>
    </div>
  );
}

// ===== MAIN ADMIN PANEL =====
export default function AdminPanel({ onBack }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem('admin-auth') === 'true');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(getVisitStats());
  const [projects, setProjects] = useState(getProjects());
  const [messages, setMessages] = useState(getMessages());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifCount, setNotifCount] = useState(0);

  const refreshData = useCallback(() => {
    setStats(getVisitStats());
    setProjects(getProjects());
    const msgs = getMessages();
    setMessages(msgs);
    setNotifCount(msgs.filter(m => !m.read).length);
  }, []);

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 3000);
    return () => clearInterval(interval);
  }, [refreshData]);

  // Listen for new messages
  useEffect(() => {
    const handler = () => {
      const msgs = getMessages();
      setMessages(msgs);
      setNotifCount(msgs.filter(m => !m.read).length);
    };
    window.addEventListener('messages-updated', handler);
    return () => window.removeEventListener('messages-updated', handler);
  }, []);

  const handleLogin = (password) => {
    const settings = getSettings();
    if (password === (settings.password || ADMIN_PASSWORD)) {
      setIsLoggedIn(true);
      setLoginError(false);
      sessionStorage.setItem('admin-auth', 'true');
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('admin-auth');
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} error={loginError} onBack={onBack} />;
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiBarChart2 /> },
    { id: 'projects', label: 'Loyihalar', icon: <FiPackage /> },
    { id: 'messages', label: 'Xabarlar', icon: <FiMessageCircle />, badge: notifCount },
    { id: 'settings', label: 'Sozlamalar', icon: <FiSettings /> },
  ];

  return (
    <div className="admin-panel">
      {/* Animated Background */}
      <div className="admin-bg-grid" />
      <div className="admin-bg-glow admin-bg-glow--1" />
      <div className="admin-bg-glow admin-bg-glow--2" />

      {/* Mobile Menu Button */}
      <button className="admin-mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar--open' : ''}`}>
        <div className="admin-sidebar__logo">
          <div className="admin-sidebar__logo-icon">
            <FiShield />
          </div>
          <div>
            <span className="admin-sidebar__logo-text">Admin Panel</span>
            <span className="admin-sidebar__logo-sub">Portfolio boshqaruvi</span>
          </div>
        </div>

        <nav className="admin-sidebar__nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`admin-sidebar__link ${activeTab === tab.id ? 'admin-sidebar__link--active' : ''}`}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge > 0 && <span className="admin-sidebar__badge">{tab.badge}</span>}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar__bottom">
          <div className="admin-sidebar__user">
            <div className="admin-sidebar__user-avatar">A</div>
            <div>
              <span className="admin-sidebar__user-name">Alibek</span>
              <span className="admin-sidebar__user-role">Administrator</span>
            </div>
          </div>
          <div className="admin-sidebar__bottom-actions">
            <button className="admin-sidebar__link" onClick={onBack}>
              <FiArrowLeft /> Portfolio
            </button>
            <button className="admin-sidebar__link admin-sidebar__link--danger" onClick={handleLogout}>
              <FiLogOut /> Chiqish
            </button>
          </div>
        </div>
      </aside>

      {/* Sidebar Overlay for mobile */}
      {sidebarOpen && <div className="admin-sidebar__overlay" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <main className="admin-main">
        {/* Top Bar */}
        <header className="admin-topbar">
          <div className="admin-topbar__left">
            <h1 className="admin-topbar__title">
              {tabs.find(t => t.id === activeTab)?.icon}
              {tabs.find(t => t.id === activeTab)?.label}
            </h1>
          </div>
          <div className="admin-topbar__right">
            <button className="admin-topbar__btn" onClick={refreshData} title="Yangilash">
              <FiRefreshCw />
            </button>
            <button className={`admin-topbar__btn ${notifCount > 0 ? 'admin-topbar__btn--notif' : ''}`} onClick={() => setActiveTab('messages')} title="Xabarlar">
              <FiBell />
              {notifCount > 0 && <span className="admin-topbar__notif">{notifCount}</span>}
            </button>
            <button className="admin-topbar__btn admin-topbar__btn--logout" onClick={handleLogout} title="Chiqish">
              <FiLogOut />
            </button>
          </div>
        </header>

        {/* Tab Content */}
        <div className="admin-body">
          {activeTab === 'dashboard' && <DashboardTab stats={stats} projects={projects} />}
          {activeTab === 'projects' && <ProjectsTab projects={projects} onUpdate={(p) => setProjects(p)} />}
          {activeTab === 'messages' && <MessagesTab messages={messages} onUpdate={(m) => { setMessages(m); setNotifCount(m.filter(x => !x.read).length); }} />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </main>
    </div>
  );
}

// Export trackVisit for use in App.jsx
export { trackVisit, getVisitStats, getProjects, getSettings, getMessages, saveMessages, COUNTER_KEY };
