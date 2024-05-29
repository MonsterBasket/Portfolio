import { useEffect, useRef, useState } from "react"
import Text from "./AboutText"
import "./CSS/about.css"

function About(){
  const [delay, setDelay] = useState<number>(0)
  const lastRender = useRef<number>(0)
  const sway = useRef<number>(0.5);
  const lastmousePos = useRef<number>(0);
  const mousePos = useRef<number>(0);
  const swayMod = useRef<number>(0)
  const swayModDirection = useRef<number>(0)

  useEffect(() => {
    requestAnimationFrame((now) => animate(now))
  }, [])
  useEffect(() => {
    window.addEventListener('mousemove', mouseCoords);
    window.addEventListener('devicemotion', handleOrientation, true);
    return () => {
      window.removeEventListener('mousemove', mouseCoords);
      window.removeEventListener('devicemotion', handleOrientation, true);
    };
  }, []);

  function mouseCoords(e:MouseEvent){
    mousePos.current = e.clientX
    console.log(e.clientX)
  }
  function handleOrientation(e:any){
    if(e.rotationRate.gamma) mousePos.current = Math.round(mousePos.current + e.rotationRate.gamma / 5)
  }

  function animate(now:number){
    now *= 0.01;
    const deltaTime = now - lastRender.current;
    lastRender.current = now;
    if (deltaTime) { //skips evaluations if no time has passed since last call (which strangely does happen)
      let speed = (mousePos.current - lastmousePos.current) / deltaTime / 1000
      sway.current *= 0.95
      sway.current -= speed;
        if (swayModDirection.current) swayMod.current += 0.001 * (sway.current + 1.5)
        else swayMod.current -= 0.001 * (sway.current + 1.5)
      if (swayMod.current >= 0.1) swayModDirection.current = 0;
      if (swayMod.current <= 0) swayModDirection.current =1;
      if (sway.current < -0.44) sway.current = -0.44
      if (sway.current > 0.45) sway.current = 0.45
      setDelay(sway.current - 0.5 + (swayMod.current - 0.05))
      lastmousePos.current = mousePos.current;
    }
    setTimeout(() => requestAnimationFrame((now) => animate(now)), 33)
  }

  const treeStyle:React.CSSProperties = {
    animationDelay: delay+"s",
    right: sway.current
  }
  
  return <section id="About">
    <div className="tree" style={treeStyle}></div>
    <h3>TESTING: {mousePos.current}</h3>
    <Text />
  </section>
}

export default About;