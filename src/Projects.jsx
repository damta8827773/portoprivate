import React from 'react';

const projectList = [
  // SOLUSI NO 6 & 7: Path gambar harus diawali "/" (contoh: /assets/...)
  { title: "Web Relationship", desc: "HTML, CSS, JS Only", img: "/assets/img/Project1.png", link: "https://dnajwawa02.netlify.app/new.html" },
  { title: "Web Portofolio", desc: "React Framework", img: "/assets/img/Project2.png", link: "https://projectdam.netlify.app/app#" },
  { title: "Web Absensi Karyawan", desc: "PHP, MySQL, Excel", img: "/assets/img/Project3.png", link: "https://presensi.ecommercedamta.com/" },
  { title: "Web Ecommerce", desc: "PHP Native, Modern CSS", img: "/assets/img/Project4.png", link: "https://api2.ecommercedamta.com/" },
  { title: "Web Vidio Viral", desc: "Oauth 2.0, PHP, MySQL", img: "/assets/img/Project5.png", link: "https://damtaproyek.ecommercedamta.com/login.php" },
  { title: "Web Couple Studio", desc: "WhatsApp Gateway", img: "/assets/img/Project6.png", link: "https://proyek.ecommercedamta.com/" }
];

const Projects = ({ title }) => {
  return (
    <section id="projects">
      {/* SOLUSI NO 5: Class neon-title-blue sudah diperbaiki font-size nya di App.css Mobile */}
      <h2 className="neon-title-blue">{title}</h2>
      <div className="project-grid">
        {projectList.map((item, index) => (
          <div className="project-card" key={index}>
            <div className="project-img">
              <img 
                src={item.img} 
                alt={item.title} 
                loading="lazy"
                onError={(e) => {e.target.style.display='none'}} 
              />
            </div>
            <div className="project-info">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <a href={item.link} target="_blank" rel="noreferrer" className="btn-view">
                  <i className="ri-arrow-right-line"></i> 
                  <span style={{marginLeft: '5px'}}>Lihat Website</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;