import React from 'react';

const certList = [
  { title: "Belajar Public Speaking", issuer: "SMK Yappenda - 2024", desc: "Fokus skill komunikasi publik.", icon: "ri-mic-fill" },
  { title: "Belajar Dasar AI", issuer: "Dicoding - 2025", desc: "Penggunaan AI efektif.", icon: "ri-robot-fill" },
  { title: "CISCO Packet Tracer", issuer: "SMK Yappenda - 2024", desc: "Simulasi jaringan.", icon: "ri-router-fill" },
  { title: "Microsoft APPS", issuer: "SMK Yappenda - 2024", desc: "Aplikasi Perkantoran.", icon: "ri-windows-fill" },
  { title: "Ekstra Skill", issuer: "SMK Yappenda - 2024", desc: "Sistem Pendingin (AC).", icon: "ri-tools-fill" },
  { title: "REDHAT", issuer: "SMK Yappenda - 2024", desc: "Admin Sistem Dasar.", icon: "ri-server-fill" }
];

const Certificates = ({ title }) => {
  return (
    <section id="certificates">
      <h2 className="neon-title">{title}</h2>
      <div className="cert-container">
        {certList.map((cert, index) => (
          <div className="cert-card" key={index}>
            <div className="cert-img-box">
               <i className={cert.icon} style={{fontSize: '4rem', color: 'var(--primary-neon)'}}></i>
            </div>
            <div className="cert-content">
              <h4>{cert.title}</h4>
              <span>{cert.issuer}</span>
              <p>{cert.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certificates;