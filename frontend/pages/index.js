import Head from "next/head";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/home/HeroSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>SHT Online Shopping</title>
      </Head>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
      </main>
      <Footer />
    </>
  );
}
