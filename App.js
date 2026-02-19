import React, { useState, useEffect } from 'react';
import './App.css';

// --- 1. FIREBASE IMPORTS ---
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged, 
  signOut 
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp 
} from "firebase/firestore";

// --- 2. CONFIG FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyC80W6y97OPM8m6VeiKs_0vt7oCd5HsTi8",
  authDomain: "projectdamta.firebaseapp.com",
  projectId: "projectdamta",
  storageBucket: "projectdamta.firebasestorage.app",
  messagingSenderId: "118530088464",
  appId: "1:118530088464:web:f193173dcc75d7557b7495"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// --- 3. DATA & TRANSLATIONS ---
const translations = {
  id: {
    nav_home: "Beranda", nav_profil: "Profil", nav_skill: "Skill", nav_project: "Proyek",
    nav_cert: "Sertifikat", nav_contact: "Kontak",
    hero_title: <>HAI, SAYA <br/> DAMTA NOVIYAN MUHAMAD FAIZ</>,
    hero_subtitle: "Full Stack Developer | Mahasiswa Sistem Informasi | Tech Enthusiast",
    profil_title: "Profil", label_user: "Nama:", label_loc: "Lokasi:", label_guild: "Kampus:", label_role: "Posisi:",
    skill_title: "Weapons & Skills", project_title: "Featured Projects", cert_title: "Certificates",
    about_title: "Visi & Misi", about_us: "About Us", btn_view: "Lihat Website", footer: "Hak Cipta Dilindungi.",
    comment_title: "Komentar & Rating"
  },
  en: {
    nav_home: "Home", nav_profil: "Profile", nav_skill: "Skills", nav_project: "Projects",
    nav_cert: "Certificates", nav_contact: "Contact",
    hero_title: <>HI, I AM <br/> DAMTA NOVIYAN MUHAMAD FAIZ</>,
    hero_subtitle: "Full Stack Developer | Information Systems Student | Tech Enthusiast",
    profil_title: "Profile", label_user: "Name:", label_loc: "Location:", label_guild: "Guild:", label_role: "Role:",
    skill_title: "Weapons & Skills", project_title: "Featured Projects", cert_title: "Certificates",
    about_title: "Vision & Mission", about_us: "About Us", btn_view: "View Website", footer: "All Rights Reserved.",
    comment_title: "Comments & Ratings"
  }
};

const projects = [
  { title: "Web Relationship", desc: "Website Relationship HTML, CSS, JS murni.", img: "assets/img/Project1.png", link: "https://dnajwawa02.netlify.app/new.html" },
  { title: "Web Portofolio", desc: "Portofolio React.js Neon Style.", img: "assets/img/Project2.png", link: "https://projectdam.netlify.app/app#" },
  { title: "Web Absensi", desc: "Sistem absensi PHP & MySQL.", img: "assets/img/Project3.png", link: "https://presensi.ecommercedamta.com/" },
  { title: "Web Ecommerce", desc: "Toko online PHP Native.", img: "assets/img/Project4.png", link: "https://api2.ecommercedamta.com/" },
  { title: "Web Video Viral", desc: "Platform video Login Google.", img: "assets/img/Project5.png", link: "https://damtaproyek.ecommercedamta.com/login.php" },
  { title: "Web Couple Site", desc: "Undangan digital invoice WA.", img: "assets/img/Project6.png", link: "https://proyek.ecommercedamta.com/" }
];

const certificates = [
  { title: "Public Speaking", issuer: "SMK Yappenda - 2024", img: "assets/img/ser1.png" },
  { title: "Dasar AI", issuer: "Dicoding - 2025", img: "assets/img/ser2.png" },
  { title: "CISCO Packet Tracer", issuer: "SMK Yappenda - 2024", img: "assets/img/ser3.png" },
  { title: "Microsoft APPS", issuer: "SMK Yappenda - 2024", img: "assets/img/ser4.png" },
  { title: "Ekstra Skill (AC)", issuer: "SMK Yappenda - 2024", img: "assets/img/ser5.png" },
  { title: "Red Hat Admin", issuer: "SMK Yappenda - 2024", img: "assets/img/ser6.png" }
];

const historyData = [
  { year: "2022", text: "Awal mula belajar teknologi dan dasar pemrograman.", img: "assets/img/contoh.jpeg" },
  { year: "2023", text: "Mulai mendalami CISCO dan Praktek Kerja Lapangan.", img: "assets/img/history2023.jpg" },
  { year: "2024", text: "Fokus mendalami TKJ dan aktif di organisasi.", img: "assets/img/history2024.jpg" },
  { year: "2025", text: "Lulus SMK, masuk UIN Jakarta. Titik awal Web Dev.", img: "assets/img/history2025.jpg" },
  { year: "2026", text: "Menjadi pengembang profesional di BKI.", img: "assets/img/history2026.jpg" }
];

function App() {
  const [lang, setLang] = useState('id');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  
  // State Komentar
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);

  const t = translations[lang];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('light-mode');
  };

  const closeMenu = () => setIsMenuOpen(false);

  // --- EFFECT: AUTH & COMMENTS ---
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    const q = query(collection(db, "comments"), orderBy("timestamp", "desc"));
    const unsubscribeComments = onSnapshot(q, (snapshot) => {
      const docs = [];
      snapshot.forEach((doc) => docs.push({ id: doc.id, ...doc.data() }));
      setComments(docs);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeComments();
    };
  }, []);

  // --- EFFECT: ANIMASI SCROLL FIX ---
  useEffect(() => {
    const timer = setTimeout(() => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show');
            }
          });
        }, { threshold: 0.15 });

        const hiddenElements = document.querySelectorAll(
          '.profil-card, .skill-section, .project-card, .cert-card, .vm-card, .history-item, #comments'
        );
        
        hiddenElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => clearTimeout(timer);
  }, [showHistory, comments]); 

  // --- FUNCTIONS: FIREBASE ---
  const handleLogin = () => signInWithPopup(auth, provider);
  const handleLogout = () => signOut(auth);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment || rating === 0) return alert("Pilih rating bintang dan tulis pesan!");

    try {
      await addDoc(collection(db, "comments"), {
        name: user.displayName,
        photo: user.photoURL,
        email: user.email,
        comment: newComment,
        rating: rating,
        timestamp: serverTimestamp()
      });
      setNewComment("");
      setRating(0);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="App">
      
      <div className="navbar-container">
        <nav className="navbar">
          <div className="nav-left">
            <div className="logo-container">
              <img src="assets/img/logo.png" alt="Logo" />
            </div>
          </div>
          <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <ul>
              <li><a href="#home" onClick={closeMenu}>{t.nav_home}</a></li>
              <li><a href="#profil" onClick={closeMenu}>{t.nav_profil}</a></li>
              <li><a href="#skill" onClick={closeMenu}>{t.nav_skill}</a></li>
              <li><a href="#projects" onClick={closeMenu}>{t.nav_project}</a></li>
              <li><a href="#certificates" onClick={closeMenu}>{t.nav_cert}</a></li>
              <li><a href="#about" onClick={closeMenu}>{t.about_us}</a></li>
              <div className="controls">
                <button className="control-btn" onClick={() => setLang(lang === 'id' ? 'en' : 'id')}>
                  <i className="ri-global-line"></i> 
                  <span>{lang.toUpperCase()}</span>
                </button>
                <button className="control-btn" onClick={toggleTheme}>
                  <i className={isDarkMode ? "ri-sun-line" : "ri-moon-line"}></i>
                  <span>MODE</span>
                </button>
              </div>
            </ul>
          </div>
        </nav>
      </div>

      <section id="home" className="hero">
        <h1>{t.hero_title}</h1>
        <p>{t.hero_subtitle}</p> 
      </section>

      <section id="profil">
        <div className="profil-card">
          <div className="profil-bg-decoration"></div>
          <h2>{t.profil_title}</h2>
          <div className="detail-row">
            <span className="detail-label">{t.label_user}</span>
            <span>Damta Noviyan Muhamad Faiz</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">{t.label_loc}</span>
            <span>Jakarta, Indonesia</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">{t.label_guild}</span>
            <span>UIN Syarif Hidayatullah Jakarta</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">{t.label_role}</span>
            <span>Full Stack Developer</span>
          </div>
        </div>
      </section>

      <section id="skill" className="skill-section">
        <h2 className="neon-title">{t.skill_title}</h2>
        
        {/* === BAGIAN KIRI (DIPERBAIKI) === */}
        <div className="marquee-wrapper">
          <div className="marquee-content scroll-left">
              {/* SET 1 */}
              <SkillItem img="assets/img/html.png" name="HTML" />
              <SkillItem img="assets/img/css.png" name="CSS" />
              <SkillItem img="assets/img/js.png" name="JS" />
              <SkillItem img="assets/img/react.png" name="React" />
              <SkillItem img="assets/img/node.png" name="NodeJS" />
              <SkillItem img="assets/img/cpanel.png" name="Cpanel" />
              <SkillItem img="assets/img/github.png" name="Github" />
              {/* SET 2 (WAJIB ADA AGAR BISA SCROLLING TANPA PUTUS) */}
              <SkillItem img="assets/img/html.png" name="HTML" />
              <SkillItem img="assets/img/css.png" name="CSS" />
              <SkillItem img="assets/img/js.png" name="JS" />
              <SkillItem img="assets/img/react.png" name="React" />
              <SkillItem img="assets/img/node.png" name="NodeJS" />
              <SkillItem img="assets/img/cpanel.png" name="Cpanel" />
              <SkillItem img="assets/img/github.png" name="Github" />
          </div>
        </div>
        
        <br/>
        
        {/* === BAGIAN KANAN (DIPERBAIKI) === */}
        <div className="marquee-wrapper">
           <div className="marquee-content scroll-right">
              {/* SET 1 */}
              <SkillItem img="assets/img/c.png" name="C Lang" />
              <SkillItem img="assets/img/php.png" name="PHP" />
              <SkillItem img="assets/img/mysql.png" name="MySQL" />
              <SkillItem img="assets/img/bootstrap.png" name="Bootstrap" />
              <SkillItem img="assets/img/tailwind.png" name="Tailwind" />
              <SkillItem img="assets/img/vscode.png" name="VS Code" />
              <SkillItem img="assets/img/gemini.png" name="Gemini" />
              {/* SET 2 (WAJIB ADA AGAR BISA SCROLLING TANPA PUTUS) */}
              <SkillItem img="assets/img/c.png" name="C Lang" />
              <SkillItem img="assets/img/php.png" name="PHP" />
              <SkillItem img="assets/img/mysql.png" name="MySQL" />
              <SkillItem img="assets/img/bootstrap.png" name="Bootstrap" />
              <SkillItem img="assets/img/tailwind.png" name="Tailwind" />
              <SkillItem img="assets/img/vscode.png" name="VS Code" />
              <SkillItem img="assets/img/gemini.png" name="Gemini" />
           </div>
        </div>
      </section>

      <section id="projects">
        <h2 className="neon-title-blue">{t.project_title}</h2>
        <div className="project-grid">
          {projects.map((item, index) => (
            <div className="project-card" key={index}>
              <div className="project-img">
                <img src={item.img} alt={item.title} onError={(e) => {e.target.style.display='none'}} />
              </div>
              <div className="project-info">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <a href={item.link} target="_blank" rel="noreferrer" className="btn-view">
                   <i className="ri-arrow-right-line arrow-icon"></i> 
                   {t.btn_view}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="certificates">
        <h2 className="neon-title">{t.cert_title}</h2>
        <div className="cert-container">
          {certificates.map((cert, index) => (
            <div className="cert-card" key={index}>
              <div className="cert-img-box">
                <img src={cert.img} alt={cert.title} />
              </div>
              <div className="cert-content">
                <h4>{cert.title}</h4>
                <span>{cert.issuer}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="about">
         <div className="about-profile-img">
             <img src="assets/img/profile-bg.jpg" alt="About Background" onError={(e)=>{e.target.style.display='none'}}/>
         </div>
         <h2 className="neon-title">{t.about_title}</h2>
         <div className="visi-misi-container">
            <div className="vm-card">
              <h3>Visi</h3>
              <p>Menjadi tech leader yang inovatif.</p>
            </div>
            <div className="vm-card">
              <h3>Misi</h3>
              <p>Terus belajar dan berkarya.</p>
            </div>
         </div>
         <div className="about-us-container">
            <div className="about-us-header" onClick={() => setShowHistory(!showHistory)}>
                <div className="line"></div>
                <h3>{t.about_us}</h3>
                <div className="line"></div>
            </div>
            <div className={`history-content ${showHistory ? 'active' : ''}`}>
                {historyData.map((item, index) => (
                    <div className="history-item" key={index}>
                        <div className="hist-img">
                          <img src={item.img} alt={item.year} />
                        </div>
                        <div className="hist-text">
                          <h4>{item.year}</h4>
                          <p>{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </section>

      <section id="comments" className="hidden">
        <h2 className="neon-title">{t.comment_title}</h2>
        <div className="comment-container profil-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
          
          {!user ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p style={{ marginBottom: '20px' }}>Login untuk memberi ulasan:</p>
              
              <button 
                onClick={handleLogin} 
                className="btn-view" 
                style={{ 
                  background: '#ffffff', 
                  color: '#333333', 
                  fontWeight: 'bold', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '10px',
                  padding: '12px 25px',
                  border: '1px solid #ddd',
                  borderRadius: '30px',
                  cursor: 'pointer'
                }}
              >
                <img 
                  src="assets/img/Google.png" 
                  alt="Google" 
                  style={{ width: '20px', height: '20px', filter: 'none !important', display: 'block' }} 
                  onError={(e) => {
                    e.target.style.display='none';
                  }}
                />
                Login dengan Google
              </button>

            </div>
          ) : (
            <form onSubmit={handleSubmitComment}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <img src={user.photoURL} alt="User" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid var(--primary-neon)' }} />
                <strong>{user.displayName}</strong>
                <button type="button" onClick={handleLogout} className="control-btn" style={{ fontSize: '0.7rem', height: '30px', marginLeft: 'auto' }}>Logout</button>
              </div>

              <div className="star-rating">
                {[5, 4, 3, 2, 1].map((num) => (
                  <React.Fragment key={num}>
                    <input 
                      type="radio" 
                      id={`star${num}`} 
                      name="rating" 
                      value={num} 
                      onChange={() => setRating(num)} 
                      checked={rating === num} 
                    />
                    <label htmlFor={`star${num}`}>★</label>
                  </React.Fragment>
                ))}
              </div>

              <textarea 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Tulis komentar kamu disini..." 
                className="comment-input-area"
                required
              />
              <button type="submit" className="btn-view" style={{marginTop: '10px'}}>Kirim Komentar</button>
            </form>
          )}

          <hr style={{ margin: '30px 0', border: '0', borderTop: '1px solid var(--card-border)', opacity: '0.2' }} />

          <div className="comments-list">
            {comments.map((c) => (
              <div key={c.id} className="comment-item">
                <img src={c.photo} alt={c.name} className="comment-avatar" />
                <div className="comment-body">
                  <div className="comment-header">
                    <strong>
                      {c.name} 
                      {c.email === "damtafaiz@gmail.com" && <span className="owner-badge">Owner</span>}
                    </strong>
                    <span className="comment-stars">{"⭐".repeat(c.rating)}</span>
                  </div>
                  <p className="comment-text">{c.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact">
        <div className="social-links">
          <SocialBtn href="https://instagram.com/tadamta_" icon="ri-instagram-fill" />
          <SocialBtn href="https://www.linkedin.com/in/damta-faiz" icon="ri-linkedin-fill" />
          <SocialBtn href="https://github.com/damta8827773" icon="ri-github-fill" />
          <SocialBtn href="mailto:damtafaiz@gmail.com" icon="ri-mail-fill" />
        </div>
        <p>&copy; {new Date().getFullYear()} Damta Noviyan Muhamad Faiz. {t.footer}</p>
      </footer>
    </div>
  );
}

function SkillItem({ img, name }) {
  return (
    <div className="tech-item">
      <img src={img} alt={name} onError={(e) => {e.target.style.display='none'}} />
      <span>{name}</span>
    </div>
  );
}

function SocialBtn({ href, icon }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="social-icon-btn">
      <i className={icon}></i>
    </a>
  );
}

export default App;