import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { useState } from 'react';

function Menu(){

  const [menuTop, setMenuTop] = useState<number>(0)
  const [menuScale, setMenuScale] = useState<number>(1)

  useScrollPosition(({ prevPos, currPos }) => {
    // get % of scroll to -500, then convert it to % of screen.innerHeight - button height
    // use that number for "top" of menu buttons
    if (currPos.y === 0) {
      setMenuTop(0);
      setMenuScale(1);
    }
    else if (currPos.y < -500) {
      setMenuTop(window.innerHeight - 30);
      setMenuScale(1);
    }
    else {
      // a** + b** = c**,  ==>  b** = c** - a**  ==>  b = sqrt(c** - a**)
      // a = % of scroll from 0 - 500px
      // b = actual position from top
      // c = radius of circle - we can just use 1 as it's a % conversion
      // Final equation: radius - scrollPos * windowHeight
      setMenuTop(1 - (currPos.y / -500) * (-window.innerHeight + 30))
      if (currPos.y / -500 < 0.5) {
        // b = scale of buttons
        // scale:         sqrt(radius -               scrollPos**)          + scaleAdjustment / (1 + scaleAdjustment)
        setMenuScale((1 - Math.sqrt(1 - Math.pow(1 - (currPos.y / -500), 2)) + 0.5) / 1.5)
      }
      else {
        setMenuScale((1 - Math.sqrt(1 - Math.pow(     currPos.y / -500,  2)) + 0.5) / 1.5)
      }
      console.log(currPos.y / -500)
    }
  })
  
  return <div style={{ 
      top:`${menuTop}px`,
      transform: `scale(${menuScale})`
      }} id="menu">
    <div className="menuButton helloButton">Hello</div>
    <div className="menuButton aboutButton">About</div>
    <div className="menuButton projectsButton">Projects</div>
    <div className="menuButton contactButton">Contact</div>
  </div>
}

export default Menu;

//a2 + b2 = c2
//b2 = c2 - a2
//c2 always = 1
//a is the percentage of scroll
//b is the amount of scale required