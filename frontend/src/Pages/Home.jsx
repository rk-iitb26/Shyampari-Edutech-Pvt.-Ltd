import NavBar from "../Components/Nav";
import MainSection from "../Components/MainSection";
import HowItWorks from "../Components/AboutSection";
import WhyUs from "../Components/Whyus";
import Testimonials from "../Components/Testimonials";
import Footer from "../Components/Footer";

function HomePage() {
    return (
        <div className="overflow-x-hidden" style={{ background: "#0f172a" }}>
            <NavBar About="About" Event="Events" Contact="Contact" Feedback="Feedback" />
            <MainSection imageUrl="/bg.jpg" />
            <HowItWorks />
            <WhyUs />
            <Testimonials />
            <Footer />
        </div>
    );
}

export default HomePage;