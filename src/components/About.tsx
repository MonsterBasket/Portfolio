import { useEffect, useRef, useState } from "react";
import "./CSS/about.css"
import Text from "./AboutText"

export default function About(){

  const active = useRef<boolean>(true)

  // const [squish, setSquish] = useState<number>(1);
  // const [order, setOrder] = useState<string[]>(["a1", "a2", "a3", "a4", "a5", "a6", "a7"]);
  let squish:number = 1;
  let order:string[] = ["a1", "a2", "a3", "a4", "a5", "a6", "a7"];
  let speed:number = 1;
  let mousePos:number = 0;
  let lastMousePos:number = 0;
  let clickedMousePos:number = 0;
  let clickTarget:number = 0;
  let hoverTarget:number = 0;
  let lastTime:number = 0;
  let checked:HTMLInputElement|null = null;
  let tempChecked:HTMLInputElement|null = null;
  const seventh = 100 / 7

  const [contStyle, setContStyle] = useState<object>({ gridTemplateAreas: `"${order[0]} ${order[1]} ${order[2]} ${order[3]} ${order[4]} ${order[5]} ${order[6]}"`, gridTemplateColumns: `${squish}fr 1fr 1fr 1fr 1fr 1fr ${1 - squish}fr` })
  const [a1Pos, setA1Pos] = useState<object>({backgroundPosition: "50% 50%"})
  const [a2Pos, setA2Pos] = useState<object>({backgroundPosition: "50% 50%"})
  const [a3Pos, setA3Pos] = useState<object>({backgroundPosition: "50% 50%"})
  const [a4Pos, setA4Pos] = useState<object>({backgroundPosition: "50% 50%"})
  const [a5Pos, setA5Pos] = useState<object>({backgroundPosition: "50% 50%"})
  const [a6Pos, setA6Pos] = useState<object>({backgroundPosition: "50% 50%"})
  const [a7Pos, setA7Pos] = useState<object>({backgroundPosition: "50% 50%"})

  useEffect(() => {
    window.addEventListener('pointermove', mouseCoords); // This needs some serious work for mobile devices.
    window.addEventListener('pointerdown', handleMouseDown);
    window.addEventListener('pointerup', handleMouseUp);
    return () =>{
      window.removeEventListener('pointermove', mouseCoords);
      window.removeEventListener('pointerdown', handleMouseDown);
      window.removeEventListener('pointerup', handleMouseUp);
    }
  }, [])

  function handleMouseDown(e:any){
    if (e.target.previousElementSibling != checked) {
      uncheck()
    }
    clickTarget = getTarget(e)
    if (clickTarget == 2) tempChecked = e.target
    mousePos = e.clientX;
    clickedMousePos = e.clientX;
  }

  function handleMouseUp(e:any){
    if (e.target == tempChecked && Math.abs(mousePos - clickedMousePos) < 15){
      checked = e.target.previousElementSibling
      if (checked) checked.checked = true
    }
    if (Math.abs(mousePos - clickedMousePos) > 30) uncheck()
    clickTarget = 0;
    mousePos = e.clientX;
  }

  function mouseCoords(e:any){
    requestAnimationFrame(t => mousePos = e.clientX)
    hoverTarget = getTarget(e)
    // if(hoverTarget || clickTarget) mousePos = e.clientX;
  }
  function getTarget(e:any){
    if (e.target.classList.contains("item")) return 1;
    else if (e.target.classList.contains("c")) return 2;
    else return 0;
  }
  function uncheck(){
    let temp:HTMLInputElement|null = document.querySelector('input[name="cards"]:checked')
    if (temp) temp.checked = false
    checked = null
  }

  useEffect(() => {
    if (active.current) requestAnimationFrame(slide)
    return () => {active.current = false}
  }, [active])
  function slide(timeStamp:number){
    if(timeStamp - lastTime > 16) {
      lastTime = timeStamp;
      checked = document.querySelector('input[name="cards"]:checked')
      if (clickTarget) speed = (mousePos - lastMousePos) / 2
      else if (checked){
        let cc:string|undefined = checked?.parentElement?.classList[1];
        if (order[0] == cc || order[1] == cc || order[2] == cc) speed = 5
        else if (order[4] == cc || order[5] == cc || order[6] == cc) speed = -5
        else if (Math.abs(speed) > 2) speed *= 0.8
        else {
          if (squish > 0.55) speed = -2
          else if (squish < 0.45) speed = 2
          else speed = 0;
        }
      }
      else if (hoverTarget && Math.abs(speed) > 0.5) speed *= 0.95
      else if (Math.abs(speed) > 1.1) speed *= 0.99
      else if (Math.abs(speed) < 1) speed += speed < 0 ? -0.015 : 0.015;
      if (Math.abs(speed) > 0.05){
        // const tempSquish = squish + (speed / 90);  // this is what ultimately controls the speed
        squish += (speed / 150)
        if (squish < 0){
          // setSquish(1);
          squish = 1;
          // setOrder([order[1], order[2], order[3], order[4], order[5], order[6], order[0]])
          order.push(order.shift() as string)
        }
        if (squish > 1){
          // setSquish(0)
          squish = 0;
          // setOrder([order[6], order[0], order[1], order[2], order[3], order[4], order[5]])
          order.unshift(order.pop() as string)
        }
        // else setSquish(tempSquish)
        // else squish = tempSquish;
        setContStyle({ gridTemplateAreas: `"${order[0]} ${order[1]} ${order[2]} ${order[3]} ${order[4]} ${order[5]} ${order[6]}"`, gridTemplateColumns: `${squish}fr 1fr 1fr 1fr 1fr 1fr ${1 - squish}fr` })
        let squeventh = seventh * squish
        setA1Pos({backgroundPosition: `${seventh * (7 - parseInt(order[6].substring(1))) + squeventh}% 50%`})
        setA2Pos({backgroundPosition: `${seventh * (7 - parseInt(order[5].substring(1))) + squeventh}% 50%`})
        setA3Pos({backgroundPosition: `${seventh * (7 - parseInt(order[4].substring(1))) + squeventh}% 50%`})
        setA4Pos({backgroundPosition: `${seventh * (7 - parseInt(order[3].substring(1))) + squeventh}% 50%`})
        setA5Pos({backgroundPosition: `${seventh * (7 - parseInt(order[2].substring(1))) + squeventh}% 50%`})
        setA6Pos({backgroundPosition: `${seventh * (7 - parseInt(order[1].substring(1))) + squeventh}% 50%`})
        setA7Pos({backgroundPosition: `${seventh * (7 - parseInt(order[0].substring(1))) + squeventh}% 50%`})
      }
    }
    window.requestAnimationFrame(slide);
    lastMousePos = mousePos;
  }


  const header1:string = "Headline About Image"
  const header2:string = "Longer Headline About Image for Two Lines"
  const header3:string = "Different Headline"
  const header4:string = "Is this even a headline?"
  const header5:string = "What Is This Headline Anyway?"
  const header6:string = "Need to Know More?"
  const header7:string = "Are You Sure You Want to Click on This?"
  const desc1:string = "What's Spanish for 'I know you speak English?' There's so many poorly chosen words in that sentence. But I bought a yearbook ad from you, doesn't that mean anything anymore?"
  const desc2:string = "When I held that gun in my hand, I felt a surge of power… like God must feel when he's holding a gun. And now, in the spirit of the season: start shopping. And for every dollar of Krusty merchandise you buy, I will be nice to a sick kid. For legal purposes, sick kids may include hookers with a cold."
  const desc3:string = "Aww, gee, you got me there, Rick. It's a figure of speech, Morty! They're bureaucrats! I don't respect them. Just keep shooting, Morty! You have no idea what prison is like here!"
  const desc4:string = "I was part of something special. Eventually, you do plan to have dinosaurs on your dinosaur tour, right? Jaguar shark! So tell me - does it really exist?"
  const desc5:string = "I'm sorry, guys. I never meant to hurt you. Just to destroy everything you ever believed in. Doomsday device? Ah, now the ball's in Farnsworth's court! Bender, quit destroying the universe! Goodbye, friends. I never thought I'd die like this. But I always really hoped."
  const desc6:string = "As a scientist, I want to go to Mars and back to asteroids and the Moon because I'm a scientist. But I can tell you, I'm not so naive a scientist to think that the nation might not have geopolitical reasons for going into space."
  const desc7:string = "Ni! Ni! Ni! Ni! Oh! Come and see the violence inherent in the system! Help, help, I'm being repressed! On second thoughts, let's not go there. It is a silly place. Bring her forward!"


  return <section id="About">
    <div id="cont" onDragStart={e => e.preventDefault} onDrop={e => e.preventDefault} style={contStyle}>
      <div className="item a1">
        <input id="a1" onClick={handleMouseDown} type="radio" name="cards" />
        <div className="c card">
          <div className="c cardImage" style={a1Pos}></div>
          <div className="c cardDesc">
            <div className="c h3"><h3>{header1}</h3><p>{desc1}</p></div>
          </div>
        </div>
      </div>
      <div className="item a2">
        <input id="a2" onClick={handleMouseDown} type="radio" name="cards" />
        <div className="c card">
          <div className="c cardImage" style={a2Pos}></div>
          <div className="c cardDesc">
            <div className="c h3"><h3>{header2}</h3><p>{desc2}</p></div>
          </div>
        </div>
      </div>
      <div className="item a3">
        <input id="a3" onClick={handleMouseDown} type="radio" name="cards" />
        <div className="c card">
          <div className="c cardImage" style={a3Pos}></div>
          <div className="c cardDesc">
            <div className="c h3"><h3>{header3}</h3><p>{desc3}</p></div>
          </div>
        </div>
      </div>
      <div className="item a4">
        <input id="a4" onClick={handleMouseDown} type="radio" name="cards" />
        <div className="c card">
          <div className="c cardImage" style={a4Pos}></div>
          <div className="c cardDesc">
            <div className="c h3"><h3>{header4}</h3><p>{desc4}</p></div>
          </div>
        </div>
      </div>
      <div className="item a5">
        <input id="a5" onClick={handleMouseDown} type="radio" name="cards" />
        <div className="c card">
          <div className="c cardImage" style={a5Pos}></div>
          <div className="c cardDesc">
            <div className="c h3"><h3>{header5}</h3><p>{desc5}</p></div>
          </div>
        </div>
      </div>
      <div className="item a6">
        <input id="a6" onClick={handleMouseDown} type="radio" name="cards" />
        <div className="c card">
          <div className="c cardImage" style={a6Pos}></div>
          <div className="c cardDesc">
            <div className="c h3"><h3>{header6}</h3><p>{desc6}</p></div>
          </div>
        </div>
      </div>
      <div className="item a7">
        <input id="a7" onClick={handleMouseDown} type="radio" name="cards" />
        <div className="c card">
          <div className="c cardImage" style={a7Pos}></div>
          <div className="c cardDesc">
            <div className="c h3"><h3>{header7}</h3><p>{desc7}</p></div>
          </div>
        </div>
      </div>
    </div>
    <div style={{height: '100%'}}>
      <Text />
    </div>
  </section>
}
