import Image from "next/image";
import SimpleSlider from "./(commponent)/HeroSlider/page";
import Aboute from "./(main)/about/page";
import CountDoctor from "./countDoctor/page";
import Department from "./(main)/Department";
import AllDoctor from "./(main)/AllDoctor/page";

export default function Home() {
  return (
    <>
      <div id="home">
        <SimpleSlider />
      </div>

      <div id="about">
        <Aboute />
      </div>

      <div id="count">
        <CountDoctor />
      </div>

      <div id="departments">
        <Department />
      </div>

      <div id="doctors">
        <AllDoctor />
      </div>
    </>
  );
}
