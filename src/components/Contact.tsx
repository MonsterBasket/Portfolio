import { ReactElement, useEffect, useRef, useState } from "react"
import "./CSS/contact.css"
import React from "react";

export default function Contact(){
  const [delay, setDelay] = useState<number>(0)
  const lastRender = useRef<number>(0)
  const sway = useRef<number>(0.5);
  const lastmousePos = useRef<number>(0);
  const mousePos = useRef<number>(0);
  const swayMod = useRef<number>(0)
  const swayModDirection = useRef<number>(0)
  const leaves:ReactElement[] = []
  const [renderLeaves, setLeaves] = useState<ReactElement[]>([])
  const leafClasses:string[] = ["leaf", "blossom"]
  const leafMoves:string[] = ["leafSway1", "leafSway2", "leafSway3"]
  const leafSpins:string[] = ["leafSpin1", "leafSpin2", "leafSpin3"]

  useEffect(() => makeLeaves, [])

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

  function makeLeaves(){
    console.log("hello leaves")
    for (let i = 0; i < 60; i++) {
      const depth = Math.random() + 0.5;
      const wh = window.innerHeight / 100;
      const fallSpeed = Math.random() * wh + wh - (wh / 2) * depth;
      const startTop = Math.random() * -fallSpeed;
      const leftPos = Math.random() * 100 + '%';
      const leafClass = leafClasses[Math.floor(Math.random() * 2)]
      const spin = leafSpins[Math.floor(Math.random() * 3)]
      const move = leafMoves[Math.floor(Math.random() * 3)]
      const spinSpeed = Math.random() * 3 + 4 + 's'
      const moveSpeed = Math.random() * 4 + 5 + 's'
      leaves[i] = <div className="leafContainer" id={`leaf${i}`} key={i} style={{animationDuration:fallSpeed+'s', animationDelay:startTop+'s', transform:`scale(${depth})`, zIndex:Math.floor((depth - 0.5) * 10), left:leftPos}}>
        <div className={leafClass} style={{animationName:`${spin}, ${move}`, animationDuration:`${spinSpeed}, ${moveSpeed}`, filter:`blur(${depth * 3 - 2}px)`}}></div>
      </div>
    }
    setLeaves([...leaves])
  }

  function mouseCoords(e:MouseEvent){
    mousePos.current = e.clientX
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
      let tempSway = sway.current * 0.95
      let tempSwayMod = swayMod.current
      tempSway -= speed;
        if (swayModDirection.current) tempSwayMod += 0.001 * (tempSway + 1.5)
        else tempSwayMod -= 0.001 * (tempSway + 1.5)
      if (tempSwayMod >= 0.1) swayModDirection.current = 0;
      if (tempSwayMod <= 0) swayModDirection.current =1;
      if (tempSway < -0.43) tempSway = -0.43
      if (tempSway > 0.43) tempSway = 0.43
      setDelay(tempSway - 0.5 + (tempSwayMod - 0.05))
      sway.current = tempSway
      swayMod.current = tempSwayMod
      lastmousePos.current = mousePos.current;
      for (let i = 0; i < leaves.length; i++) {
        let myLeaf = document.getElementById(`leaf${i}`)
        if (myLeaf) {
          let left = parseFloat(myLeaf.style.left.substring(0, myLeaf.style.left.length - 1))
          let leftMove = left - (tempSway * 2 * (parseFloat(myLeaf.style.zIndex + i / 10) / 50)) // i / 10 gives it a "random" multiplier for each leaf
          if (leftMove > 100) leftMove -= 105
          if (leftMove < -5) leftMove += 105
          myLeaf.style.left = `${leftMove}%`
        }
      }
    }
    setTimeout(() => requestAnimationFrame((now) => animate(now)), 33)
  }

  
  return <section id="Contact">
    <h2>Contact</h2>
    <a href="https://www.linkedin.com/in/james-blaskett/">LinkedIn</a><br/><br/>
    <a href="mailto:jmblasket@gmail.com" target="_blank">Email</a>
    <div className="treeEffects">
      <div className="tree" style={{animationDelay: delay+"s"}}></div>
      {renderLeaves}
    </div>
  </section>
}