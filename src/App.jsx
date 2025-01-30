import { useRef } from "react";
import DisplaySection from "./components/DisplaySection/DisplaySection";
import Jambotron from "./components/Jambotron/Jambotron";
import NavBar from "./components/NavBar/NavBar";
import SoundSection from "./components/SoundSection/SoundSection";
import WebgiViewer from "./components/WebgiViewer/WebgiViewer";

function App() {
  const WebgiViewerRef = useRef();
  const handlePreview = () => {
    WebgiViewerRef.current?.triggerPreview();
  };
  const contentRef = useRef();
  return (
    <div className="App">
      <div ref={contentRef} id="content">
        <NavBar />
        <Jambotron />
        <SoundSection />
        <DisplaySection triggerPreview={handlePreview} />
      </div>
      <WebgiViewer ref={WebgiViewerRef} contentRef={contentRef} />
    </div>
  );
}

export default App;
