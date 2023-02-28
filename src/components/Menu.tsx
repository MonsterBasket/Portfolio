import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { useState } from 'react';

function Menu(){

  const [menuTop, setMenuTop] = useState<number>(0)
  const [menuScale, setMenuScale] = useState<number>(1)
  const [buttonRotate, setButtonRotate] = useState<number>(0)

  useScrollPosition(({ prevPos, currPos }) => {
    // get % of scroll to -500, then convert it to % of screen.innerHeight - button height
    // use that number for "top" of menu buttons
    if (currPos.y === 0) {
      setMenuTop(0);
      setMenuScale(1);
      setButtonRotate(0);
    }
    else if (currPos.y < -500) {
      setMenuTop(window.innerHeight - 50);
      setMenuScale(1);
      setButtonRotate(1);
    }
    else {
      // a** + b** = c**,  ==>  b** = c** - a**  ==>  b = sqrt(c** - a**)
      // a = % of scroll from 0 - 500px
      // b = actual position from top
      // c = radius of circle - we can just use 1 as it's a % conversion
      // Final equation: radius - scrollPos * windowHeight
      setMenuTop(1 - (currPos.y / -500) * (-window.innerHeight + 50))
      setButtonRotate(currPos.y / -500)
      if (currPos.y / -500 < 0.5) {
        // b = scale of buttons
        // scale:         sqrt(radius -               scrollPos**)          + scaleAdjustment / (1 + scaleAdjustment)
        setMenuScale((1 - Math.sqrt(1 - Math.pow(1 - (currPos.y / -500), 2)) + 0.5) / 1.5)
      }
      else {
        setMenuScale((1 - Math.sqrt(1 - Math.pow(     currPos.y / -500,  2)) + 0.5) / 1.5)
      }
    }
  })

  const helloStyle = {perspectiveOrigin: "200% center", perspective: `${menuScale * 100 + 300}px`};
  const aboutStyle = {perspectiveOrigin: "100% center", perspective: `${menuScale * 100 + 300}px`};
  const projectsStyle = {perspectiveOrigin: "0% center", perspective: `${menuScale * 100 + 300}px`};
  const contactStyle = {perspectiveOrigin: "-100% center", perspective: `${menuScale * 100 + 300}px`};
  const front = { transform: `rotateX(${buttonRotate * 180}deg) translateZ(15px)`, filter: `brightness(${2 * buttonRotate + 1})` };
  const bottom = { transform: `rotateX(${buttonRotate * 180 - 90}deg) translateZ(15px)`, filter: `brightness(${2 * buttonRotate})` };
  const back = { transform: `rotateX(${buttonRotate * 180 - 180}deg) translateZ(15px)`, filter: `brightness(${2 * buttonRotate - 1})` };



  
  return <div style={{ 
      top:`${menuTop}px`,
      transform: `scale(${menuScale})`
      }} id="menu">
    <div style={helloStyle} className="menuButton helloButton">
      <div style={front} className='menuButtonPanel'>Hello</div>
      <div style={bottom} className='menuButtonPanel'>Hello</div>
      <div style={back} className='menuButtonPanel'>Hello</div>
    </div>
    <div style={aboutStyle} className="menuButton aboutButton">
      <div style={front} className='menuButtonPanel'>About</div>
      <div style={bottom} className='menuButtonPanel'>About</div>
      <div style={back} className='menuButtonPanel'>About</div>
    </div>
    <div style={projectsStyle} className="menuButton projectsButton">
      <div style={front} className='menuButtonPanel'>Projects</div>
      <div style={bottom} className='menuButtonPanel'>Projects</div>
      <div style={back} className='menuButtonPanel'>Projects</div>
    </div>
    <div style={contactStyle} className="menuButton contactButton">
      <div style={front} className='menuButtonPanel'>Contact</div>
      <div style={bottom} className='menuButtonPanel'>Contact</div>
      <div style={back} className='menuButtonPanel'>Contact</div>
    </div>
  </div>
}

export default Menu;