import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Market from "./components/Market";
import Trading from "./components/Trading";


export default function Home() {
  return (
    <>
      <Header/>
      <Hero/>
      <Trading/>
      <Market/>
      <Footer/>
    </>
  );
};