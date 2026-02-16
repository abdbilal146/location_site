import AboutUsSection from '../components/AboutUsSection';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import OurServices from '../components/OurServices';
import './HomePage.scss';

export default function HomePage() {
    return (
        <>
            <Header />
            <main>
                <HeroSection />
                <OurServices />
                <AboutUsSection />
                <ContactUs />
            </main>
            <Footer />

        </>
    );
}