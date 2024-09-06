import { ReactElement, useEffect, useRef, useState } from "react"
import "./CSS/contact.css"

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
  const page = useRef<number>(1);
  const gustSpeed = useRef<number>(0);
  const gustTarget = useRef<number>(0);

  const [textWidth, setTextWidth] = useState<object>({gridTemplateColumns: "90% 5% 5%"})
  const [t1Style, setT1Style] = useState<object>({background: "rgba(0,0,0,0"})
  const [t2Style, setT2Style] = useState<object>({background: "rgba(0,0,0,0.1"})
  const [t3Style, setT3Style] = useState<object>({background: "rgba(0,0,0,0.2"})


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

  useEffect(() => {
    document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");
  }, [])

  function move(col:number){
    gust(page.current, col)
    console.log(page.current, col)
    if (col == 1) {
      page.current = 1
      setTextWidth({gridTemplateColumns: "90% 5% 5%"})
      setT1Style({background: "rgba(0,0,0,0"})
      setT2Style({background: "rgba(0,0,0,0.1"})
      setT3Style({background: "rgba(0,0,0,0.2"})
    }
    else if (col == 2) {
      page.current = 2
      setTextWidth({gridTemplateColumns: "5% 90% 5%"})
      setT1Style({background: "rgba(0,0,0,0.1"})
      setT2Style({background: "rgba(0,0,0,0"})
      setT3Style({background: "rgba(0,0,0,0.1"})
    }
    else if (col == 3) {
      page.current = 3
      setTextWidth({gridTemplateColumns: "5% 5% 90%"})
      setT1Style({background: "rgba(0,0,0,0.2"})
      setT2Style({background: "rgba(0,0,0,0.1"})
      setT3Style({background: "rgba(0,0,0,0"})
    }
  }

  function gust(from:number, to:number){
    if (from == to) return
    else if (from > to) gustTarget.current = -1;
    else gustTarget.current = 1;
  }

  function makeLeaves(){
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
      leaves[i] = <div className="leafContainer" id={`leaf${i}`} key={i} style={{animationDuration:fallSpeed+'s', animationDelay:startTop+'s', transform:`scale(${depth})`, zIndex:Math.floor((depth - 0.5) * 10) + 1, left:leftPos}}>
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
      if (Math.abs(gustTarget.current) > 0) gustSpeed.current += gustTarget.current * 0.5;
      if (Math.abs(gustSpeed.current) > 3 && gustTarget.current) gustTarget.current = 0; 
      else if (Math.abs(gustSpeed.current) > 0.005) gustSpeed.current *= 0.95
      else gustSpeed.current = 0
      // let speed = (mousePos.current - lastmousePos.current) / deltaTime / 1000
      let tempSway = sway.current * 0.95
      let tempSwayMod = swayMod.current
      // tempSway -= speed;
      if (swayModDirection.current) tempSwayMod += 0.001 * (tempSway + 1.5)
      else tempSwayMod -= 0.001 * (tempSway + 1.5)
      if (tempSwayMod >= 0.1) swayModDirection.current = 0;
      if (tempSwayMod <= 0) swayModDirection.current = 1;
      let gust = Math.min(Math.max(gustSpeed.current + tempSway, -0.43), 0.43)
      tempSway = Math.min(Math.max(tempSway, -0.43), 0.43)
      setDelay(gust - 0.5 + (tempSwayMod - 0.05))
      sway.current = tempSway
      swayMod.current = tempSwayMod
      lastmousePos.current = mousePos.current;
      for (let i = 0; i < leaves.length; i++) {
        let myLeaf = document.getElementById(`leaf${i}`)
        if (myLeaf) {
          let left = parseFloat(myLeaf.style.left.substring(0, myLeaf.style.left.length - 1))
          let leftMove = left - ((tempSway + gustSpeed.current) * 2 * (parseFloat(myLeaf.style.zIndex + i / 10) / 30)) // i / 10 gives it a "random" multiplier for each leaf
          if (leftMove > 100) leftMove -= 105
          if (leftMove < -5) leftMove += 105
          myLeaf.style.left = `${leftMove}%`
        }
      }
    }
    setTimeout(() => requestAnimationFrame((now) => animate(now)), 33)
  }

  
  return <section id="Contact">
    <div className="text" style={textWidth}>
      <div className="t1" onMouseOver={e => move(1)}>
        <div style={t1Style}>
          Please note that this folio site is a work in progress, the site itself is my folio, as well as a handful of projects in the Projects section.
          <br/><br/>
          That includes the below.  I'll rewrite this soon, but this is what I was thinking a year ago:
          <br/><br/>
          Over a decade ago I finished a degree in 3D animation. I learnt two very important things during my course:
          <br/><br/>
          1: I LOVE the technical side of animation, and<br/>
          2: Animation is not for me.
        </div>
      </div>
      <div className="t2" onMouseOver={e => move(2)}>
        <div style={t2Style}>
          I'm an extremely technically minded person, and can never have enough problems to solve. While I definitely have a creative side, I discovered that I don't have that artistic PASSION that's required in such a competitive industry, not like I do for coding, scripting and automation.
          <br/><br/>
          I've played around with code my whole life, and even made my own Google Maps API integrated webtools to make my job easier in my last three roles. But it wasn't until my last position was made redundant that I went "hang on, this pay-out will keep me afloat for a little while, maybe I *don't* have to just jump into the next available position".
        </div>
      </div>
      <div className="t3" onMouseOver={e => move(3)}>
        <div style={t3Style}>
          So I did some serious research and introspection. I even took two or three personality tests! I'm still not entirely sure I believe in them entirely, but they all gave me the same answers, and those answers felt like quite an accurate representation of how my mind works. One of the top suggested careers for people with my personality type was software engineer, so I looked into what a software engineer actually does, and I honestly felt like I didn't even have an option any more. I HAD to pursue this.
          <br/><br/>
          So I found a bootcamp that would help me solidify the skills I already had and add a few more to my repertoire, and jumped! Having now completed that course, I can confidently say that I'm ready for action!
        </div>
      </div>
      <div className="textTop"></div>
    </div>
    <div className="treeEffects">
      {/* <div className="tree" style={{animationDelay: delay+"s"}}></div> */}
      {renderLeaves}
    </div>
  </section>
}