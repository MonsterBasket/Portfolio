import { useEffect, useRef, useState } from "react"
import Text from "./AboutText"
import "./CSS/about.css"

function About(){
  const [delay, setDelay] = useState<number>(0)
  const lastRender = useRef<number>(0)
  const sway = useRef<number>(0.5);
  const lastmousePos = useRef<number>(0);
  const mousePos = useRef<number>(0);

  useEffect(() => {
    requestAnimationFrame((now) => animate(now))
  }, [])
  useEffect(() => {
    window.addEventListener('mousemove', mouseCoords);
    return () => {
      window.removeEventListener('mousemove', mouseCoords);
    };
  }, []);

  function mouseCoords(e:MouseEvent){
    mousePos.current = e.clientX
  }

  function animate(now:number){
    now *= 0.01;
    const deltaTime = now - lastRender.current;
    lastRender.current = now;
    if (deltaTime) { //skips evaluations if no time has passed since last call (which strangely does happen)
      let speed = (mousePos.current - lastmousePos.current) / deltaTime / 450
      if (speed != 0) {
        sway.current -= speed;
        if (sway.current < -0.99) sway.current = -0.99
        if (sway.current > 1) sway.current = 1
      }
      else sway.current *= 0.98
      sway.current = sway.current / 2
      setDelay(sway.current - 0.5)
      lastmousePos.current = mousePos.current;
    }
    setTimeout(() => requestAnimationFrame((now) => animate(now)), 100)
  }

  const treeStyle:React.CSSProperties = {
    animationDelay: delay+"s",
    right: sway.current
  }
  
  return <section id="About">
    <div className="tree" style={treeStyle}></div>
    <h3>Outdated filler text</h3>
    <Text />
  </section>
}

export default About;