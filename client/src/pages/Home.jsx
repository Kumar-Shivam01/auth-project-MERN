
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import bg_img from '../assets/artistic-blurry.png';

const Home = () => {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg_img})` }}
    >
      <Navbar/>
      <Header/>
          
    </div>
  );
};

export default Home;
