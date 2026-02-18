import React from 'react';

const Profile = ({ text }) => {
  return (
    <section id="profil">
      <div className="profil-bg-decoration"></div>
      <div className="profil-card">
        <h2>{text.profil_title}</h2>
        <div className="detail-row">
          <span className="detail-label">{text.label_user}</span>
          <span>Damta Noviyan Muhamad Faiz</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">{text.label_loc}</span>
          <span>Jakarta, Indonesia</span> 
        </div>
        <div className="detail-row">
          <span className="detail-label">{text.label_guild}</span>
          <span>UIN Syarif Hidayatullah Jakarta</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">{text.label_role}</span>
          <span>Full Stack Developer In PT.Biro Klasifikasi Indonesia</span>
        </div>
      </div>
    </section>
  );
};

export default Profile;