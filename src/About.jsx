import React, { useState } from 'react';

const About = ({ title }) => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  return (
    <section id="about">
      <h2 className="neon-title">{title}</h2>
      
      <div className="visi-misi-container">
          <div className="vm-card">
              <h3>Visi</h3>
              <p>Menjadi pengembang teknologi terdepan yang menciptakan solusi digital inovatif dan bermanfaat bagi masyarakat luas.</p>
          </div>
          <div className="vm-card">
              <h3>Misi</h3>
              <p>Mengembangkan aplikasi web yang efisien, terus belajar teknologi terbaru, dan memberikan kontribusi positif dalam transformasi digital.</p>
          </div>
      </div>

      <div className="about-us-container" style={{width: '100%', maxWidth: '900px'}}>
          <div 
            className="about-us-header" 
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            style={{ cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            justifyContent: 'center' }}
          >
              <div className="line" style={{height:'2px', background:'#00f3ff', flex:1}}></div>
              <h3>History</h3>
              <i 
                className={`ri-arrow-down-s-line`} 
                style={{ 
                    transition: 'transform 0.3s', 
                    transform: isHistoryOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    fontSize: '1.5rem',
                    color: '#00f3ff'
                }}
              ></i>
              <div className="line" style={{height:'2px', background:'#00f3ff', flex:1}}></div>
          </div>

          <div className={`history-content ${isHistoryOpen ? 'active' : ''}`}>
              {/* SOLUSI NO 7: Tambahkan slash (/) di depan assets */}
              <HistoryItem year="2022" img="/assets/img/contoh.jpeg" desc="Awal mula perjalanan di dunia teknologi. Mencoba VSCode pertama kali." side="left" />
              <HistoryItem year="2023" img="/assets/img/contoh.jpeg" desc="Mulai menguasai CISCO Packet Tracer dan menjalani PKL." side="right" />
              <HistoryItem year="2024" img="/assets/img/history2024.jpg" desc="Kelas XII, fokus mendalami TKJ dan aktif di Ekskul." side="left" />
              <HistoryItem year="2025" img="/assets/img/history2025.jpg" desc="Lulus SMK Yappenda, masuk UIN Jakarta. Titik balik Web Development." side="right" />
              <HistoryItem year="2026" img="/assets/img/history2026.jpg" desc="Menjadi pengembang profesional yang ambisius." side="left" />
          </div>
      </div>
    </section>
  );
};

// Komponen Kecil untuk History agar kodingan rapi
const HistoryItem = ({ year, img, desc, side }) => (
    <div className={`history-item ${side === 'right' ? 'zigzag-right' : ''}`}>
        <div className="hist-img">
            <img src={img} alt={year} onError={(e) => e.target.style.display='none'} />
        </div>
        <div className="hist-text">
            <h4 style={{color: '#00f3ff', fontSize: '2rem', marginBottom: '10px'}}>{year}</h4>
            <p>{desc}</p>
        </div>
    </div>
);

export default About;