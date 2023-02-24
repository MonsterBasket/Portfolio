import './App.css';
import About from './components/About';
import Contact from './components/Contact';
import Hello from './components/Hello';
import Menu from './components/Menu';
import Projects from './components/Projects';

function App() {
  return (
    <div className="App">
      <Hello />
      <About />
      <Projects />
      <Contact />

      <Menu />
    </div>
  );
}

export default App;
