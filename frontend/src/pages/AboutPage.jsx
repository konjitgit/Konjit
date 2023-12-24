import Header from "../components/Layout/Header";
import AboutHero from "../components/About/AboutHero.jsx";
import About from "../components/About/About.jsx";
import Footer from "../components/Footer/Footer1";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <AboutHero />
      <About />
      {/* <Testimonial/> */}
      <Footer />
    </div>
  );
};

export default AboutPage;
