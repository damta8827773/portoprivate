import React from 'react';

const Hero = ({ title, subtitle }) => {
  return (
    <section id="home" className="hero">
      <h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
      <p dangerouslySetInnerHTML={{ __html: subtitle }}></p>
    </section>
  );
};

export default Hero;