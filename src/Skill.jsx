import React from 'react';

// Data Skill
const skillsLeft = [
  { img: "/assets/img/html.png", name: "HTML" },
  { img: "/assets/img/css.png", name: "CSS" },
  { img: "/assets/img/js.png", name: "JS" },
  { img: "/assets/img/react.png", name: "React" },
  { img: "/assets/img/node.png", name: "NodeJS" },
  { img: "/assets/img/cpanel.png", name: "Cpanel" }
];

const skillsRight = [
  { img: "/assets/img/c.png", name: "C Language" },
  { img: "/assets/img/php.png", name: "PHP" },
  { img: "/assets/img/mysql.png", name: "MySQL" },
  { img: "/assets/img/bootstrap.png", name: "Bootstrap" },
  { img: "/assets/img/tailwind.png", name: "Tailwind" },
  { img: "/assets/img/vscode.png", name: "VS Code" }
];

// SOLUSI POIN 4: Duplikasi Array agar seamless (looping tanpa putus)
// Kita duplikasi 3x atau 2x agar panjang marquee cukup
const duplicatedLeft = [...skillsLeft, ...skillsLeft, ...skillsLeft]; 
const duplicatedRight = [...skillsRight, ...skillsRight, ...skillsRight];

const SkillItem = ({ img, name }) => (
  <div className="tech-item">
    {/* SOLUSI POIN 6: Path diawali "/" */}
    <img 
      src={img} 
      alt={name} 
      onError={(e) => {e.target.style.display='none'}} 
    />
    <span>{name}</span>
  </div>
);

const Skills = ({ title }) => {
  return (
    <section id="skill" className="skill-section">
      <div className="container" style={{width: '100%'}}>
        <h2 className="neon-title">{title}</h2>
        
        {/* Marquee Kiri */}
        <div className="marquee-wrapper">
          <div className="marquee-content scroll-left">
             {duplicatedLeft.map((item, index) => (
                <SkillItem key={`l-${index}`} img={item.img} name={item.name} />
             ))}
          </div>
        </div>
        
        <br/>

        {/* Marquee Kanan */}
        <div className="marquee-wrapper">
          <div className="marquee-content scroll-right">
             {duplicatedRight.map((item, index) => (
                <SkillItem key={`r-${index}`} img={item.img} name={item.name} />
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;