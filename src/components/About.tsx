import { useCallback, useEffect, useRef, useState } from "react";
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

  const [contStyle, setContStyle] = useState({ gridTemplateAreas: `"${order[0]} ${order[1]} ${order[2]} ${order[3]} ${order[4]} ${order[5]} ${order[6]}"`, gridTemplateColumns: `${squish}fr 1fr 1fr 1fr 1fr 1fr ${1 - squish}fr` })

  window.addEventListener('pointermove', mouseCoords); // This needs some serious work for mobile devices.
  window.addEventListener('pointerdown', handleMouseDown);
  window.addEventListener('pointerup', handleMouseUp);

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
    hoverTarget = getTarget(e)
    if(hoverTarget || clickTarget) mousePos = e.clientX;
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
      if (checked){
        let cc:string|undefined = checked?.parentElement?.parentElement?.classList[1];
        if (order[0] == cc || order[1] == cc || order[2] == cc) speed = 5
        else if (order[4] == cc || order[5] == cc || order[6] == cc) speed = -5
        else if (Math.abs(speed) > 0.5) speed *= 0.8
        else {
          if (squish > 0.55) speed = -0.5
          else if (squish < 0.45) speed = 0.5
          else speed = 0;
        }
      }
      else if (hoverTarget && Math.abs(speed) > 0.5) speed *= 0.95
      else if (Math.abs(speed) > 1.1) speed *= 0.99
      else if (Math.abs(speed) < 1) speed += speed < 0 ? -0.015 : 0.015;
      if (clickTarget)
      speed = (mousePos - lastMousePos) / 2
      if (Math.abs(speed) > 0.05){
        // const tempSquish = squish + (speed / 90);  // this is what ultimately controls the speed
        squish += (speed / 90)
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
      }
    }
    window.requestAnimationFrame(slide);
    lastMousePos = mousePos;
  }


  return <section id="About">
    <div id="cont" onDragStart={e => e.preventDefault} onDrop={e => e.preventDefault} style={contStyle}>
      <div className="item a1"><label htmlFor="a1"></label>
        <input id="a1" onClick={(e) => handleMouseDown(e)} type="radio" name="cards" />
        <div className="c card">
        <div className="c cardImage"></div>
        <div className="c cardDesc"><div className="c h3"><h3>Headline About Image</h3><p>Smaller, longer description about whatever is happening in this card.  Is this interesting to you?</p></div></div>
      </div></div>
      <div className="item a2"><label htmlFor="a2"></label>
        <input id="a2" onClick={(e) => handleMouseDown(e)} type="radio" name="cards" />
        <div className="c card">
        <div className="c cardImage"></div>
        <div className="c cardDesc"><div className="c h3"><h3>Longer Headline About Image for Two Lines</h3><p>Smaller, longer description about whatever is happening in this card.  Is this interesting to you?</p></div></div>
      </div></div>
        <div className="item a3"><label htmlFor="a3"></label>
          <input id="a3" onClick={(e) => handleMouseDown(e)} type="radio" name="cards" />
          <div className="c card">
          <div className="c cardImage"></div>
          <div className="c cardDesc"><div className="c h3"><h3>Different Headline</h3><p>Smaller, longer description about whatever is happening in this card.  Is this interesting to you?</p></div></div>
      </div></div>
        <div className="item a4"><label htmlFor="a4"></label>
          <input id="a4" onClick={(e) => handleMouseDown(e)} type="radio" name="cards" />
          <div className="c card">
          <div className="c cardImage"></div>
          <div className="c cardDesc"><div className="c h3"><h3>Is this even a headline?</h3><p>Smaller, longer description about whatever is happening in this card.  Is this interesting to you?</p></div></div>
      </div></div>
        <div className="item a5"><label htmlFor="a5"></label>
          <input id="a5" onClick={(e) => handleMouseDown(e)} type="radio" name="cards" />
          <div className="c card">
          <div className="c cardImage"></div>
          <div className="c cardDesc"><div className="c h3"><h3>What Is This Headline Anyway?</h3><p>Smaller, longer description about whatever is happening in this card.  Is this interesting to you?</p></div></div>
      </div></div>
          <div className="item a6"><label htmlFor="a6"></label>
            <input id="a6" onClick={(e) => handleMouseDown(e)} type="radio" name="cards" />
            <div className="c card">
          <div className="c cardImage"></div>
            <div className="c cardDesc"><div className="c h3"><h3>Need to Know More?</h3><p>Smaller, longer description about whatever is happening in this card.  Is this interesting to you?</p></div></div>
      </div></div>
          <div className="item a7"><label htmlFor="a7"></label>
            <input id="a7" onClick={(e) => handleMouseDown(e)} type="radio" name="cards" />
            <div className="c card">
          <div className="c cardImage"></div>
            <div className="c cardDesc"><div className="c h3"><h3>Are You Sure You Want to Click on This?</h3><p>Smaller, longer description about whatever is happening in this card.  Is this interesting to you?</p></div></div>
      </div></div>
    </div>
    <div style={{height: '100%'}}>
      <Text />
    </div>
  </section>
}
