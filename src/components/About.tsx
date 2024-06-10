import { useRef } from "react";
import "./CSS/about.css"
import Text from "./AboutText"

export default function About(){

window.addEventListener('pointermove', mouseCoords); // This needs some serious work for mobile devices.
window.addEventListener('pointerdown', handleMouseDown);
window.addEventListener('pointerup', handleMouseUp);
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

let contStyle = { gridTemplateAreas: `"${order[0]} ${order[1]} ${order[2]} ${order[3]} ${order[4]} ${order[5]} ${order[6]}"`, gridTemplateColumns: `${squish}fr 1fr 1fr 1fr 1fr 1fr ${1 - squish}fr` }


function mouseDrag(e:any){
  
}
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
  console.log(mousePos, clickedMousePos)
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

window.requestAnimationFrame(slide)
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
      squish += (speed / 90);  // this is what ultimately controls the speed
      if (squish < 0){
        squish = 1;
        order.push(order.shift() as string)
      }
      if (squish > 1){
        squish = 0
        order.unshift(order.pop() as string)
      }
      contStyle = { gridTemplateAreas: `"${order[0]} ${order[1]} ${order[2]} ${order[3]} ${order[4]} ${order[5]} ${order[6]}"`, gridTemplateColumns: `${squish}fr 1fr 1fr 1fr 1fr 1fr ${1 - squish}fr` }
    }
  }
  window.requestAnimationFrame(slide);
  lastMousePos = mousePos;
}

  return <section id="About">
    <div id="cont" onDragStart={e => e.preventDefault} onDrop={e => e.preventDefault} style={contStyle}>
      <div className="item a1"><label><input onClick={(e) => mouseDrag(e)} type="radio" name="cards" /><div className="c card">
        <div className="c cardImage"></div>
        <div className="c cardDesc"><div className="c h3"><h3>Headline About Image</h3><p>Smaller, longer description about whatever is happening in this card.  Is this interesting to you?</p></div></div>
      </div></label></div>
      <div className="item a2"><label><input onClick={(e) => mouseDrag(e)} type="radio" name="cards" /><div className="c card">
        <div className="c cardImage"></div>
        <div className="c cardDesc"><div className="c h3"><h3>Longer Headline About Image for Two Lines</h3><p>Smaller, longer description about whatever is happening in this card.  Is this interesting to you?</p></div></div>
      </div></label></div>
        <div className="item a3"><label><input onClick={(e) => mouseDrag(e)} type="radio" name="cards" /><div className="c card">
          <div className="c cardImage"></div>
          <div className="c cardDesc"><div className="c h3"><h3>Different Headline</h3><p>Smaller, longer description about whatever is happening in this card.  Is this interesting to you?</p></div></div>
      </div></label></div>
        <div className="item a4"><label><input onClick={(e) => mouseDrag(e)} type="radio" name="cards" /><div className="c card">
          <div className="c cardImage"></div>
          <div className="c cardDesc"><div className="c h3"><h3>Is this even a headline?</h3><p>Smaller, longer description about whatever is happening in this card.  Is this interesting to you?</p></div></div>
      </div></label></div>
        <div className="item a5"><label><input onClick={(e) => mouseDrag(e)} type="radio" name="cards" /><div className="c card">
          <div className="c cardImage"></div>
          <div className="c cardDesc"><div className="c h3"><h3>What Is This Headline Anyway?</h3><p>Smaller, longer description about whatever is happening in this card.  Is this interesting to you?</p></div></div>
      </div></label></div>
          <div className="item a6"><label><input onClick={(e) => mouseDrag(e)} type="radio" name="cards" /><div className="c card">
          <div className="c cardImage"></div>
            <div className="c cardDesc"><div className="c h3"><h3>Need to Know More?</h3><p>Smaller, longer description about whatever is happening in this card.  Is this interesting to you?</p></div></div>
      </div></label></div>
          <div className="item a7"><label><input onClick={(e) => mouseDrag(e)} type="radio" name="cards" /><div className="c card">
          <div className="c cardImage"></div>
            <div className="c cardDesc"><div className="c h3"><h3>Are You Sure You Want to Click on This?</h3><p>Smaller, longer description about whatever is happening in this card.  Is this interesting to you?</p></div></div>
      </div></label></div>
    </div>
    <div style={{height: '100%'}}>
      <Text />
    </div>
  </section>
}