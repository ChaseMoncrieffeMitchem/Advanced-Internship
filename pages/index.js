import Navbar from "@/components/Navbar";
import Landing from "@/components/Landing";
import Features from "@/components/Features";
import Reviews from "@/components/Reviews";
import Numbers from "@/components/Numbers";
import Footer from "@/components/Footer";
import LoginModal from "@/components/modals/LoginModal";

export default function Home() {
  return (
    <>
      <div className="wrapper wrapper__full">
        {/* <LoginModal /> */}
        <Navbar />
        <Landing />
        <Features />
        <Reviews />
        <Numbers />
        <Footer />
      </div>
    </>
  );
}
