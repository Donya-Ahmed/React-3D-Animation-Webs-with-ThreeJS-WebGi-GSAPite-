import DisplaySection from "./components/DisplaySection/DisplaySection";
import Jambotron from "./components/Jambotron/Jambotron";
import NavBar from "./components/NavBar/NavBar";
import SoundSection from "./components/SoundSection/SoundSection";
import WebgiViewer from "./components/WebgiViewer/WebgiViewer";

function App() {

  return (
    <div className="App">
     <NavBar/>
     <Jambotron/>
     <SoundSection/>
     <DisplaySection/>
     <WebgiViewer/>
    </div>
  );
}

export default App;
