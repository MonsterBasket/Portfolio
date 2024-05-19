import React, { useState } from 'react';
import './App.css';
import About from './components/About';
import Contact from './components/Contact';
import Hello from './components/Hello';
import Menu from './components/Menu';
import Projects from './components/Projects';
import Tabs from './components/Tabs';

function App() {

  const [buttonWidth, setButtonWidth] = useState<number>(window.innerWidth > 500 ? 100 : window.innerWidth / 5)
  const [buttonOpacity, setButtonOpacity] = useState<number>(1)   

  return (
    <div className="App">

      <Hello />
      <Tabs buttonWidth={buttonWidth} buttonOpacity={buttonOpacity} names={["Hello", "About", "Projects", "Contact"]}>
        <About />
        <About />
        <Projects />
        <Contact />
      </Tabs>

      <Menu buttonWidth={buttonWidth} setButtonWidth={setButtonWidth} buttonOpacity={buttonOpacity} setButtonOpacity={setButtonOpacity}/>
    </div>
  );
}

export default App;
