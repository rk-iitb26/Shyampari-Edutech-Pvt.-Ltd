import NavBar from "../Components/Navbar";
import MainContent from "../Components/MainContent";
import HowItWorks from "../Components/Aboutus";
import Testimonials from "../Components/restimonials";
import WhyUs from "../Components/Whyus";
import Footer from "../Components/Footer";

function HomePage() {
    return (
        <div>
            <NavBar />
            <div
                className="w-full min-h-[80vh] bg-center bg-cover bg-no-repeat relative" // Added 'relative' for positioning content
                style={{
                    backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/bgimage.jpg')",
                }}
            >
                <MainContent />
            </div>
            <HowItWorks />
            <WhyUs />
            <Testimonials />
            <Footer />

        </div>

    );
}

export default HomePage;