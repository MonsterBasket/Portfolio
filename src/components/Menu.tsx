import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { useState } from 'react';

function Menu(){

  const [menuTop, setMenuTop] = useState<number>(0)

  useScrollPosition(({ prevPos, currPos }) => {
    // get % of scroll to -500, then convert it to % of screen.innerHeight - button height
    // use that number for "top" of menu buttons
    if (currPos.y === 0) setMenuTop(0);
    else if (currPos.y < -500) setMenuTop(window.innerHeight - 30);
    else {
      setMenuTop((currPos.y / 500) * (-window.innerHeight + 30));
      console.log("menuTop", menuTop, "currPos", currPos.y)
      console.log(window.innerHeight - 30)
    }
  })
  
  return <div style={{ top:`${menuTop}px` }} id="menu">
    <div className="menuButton helloButton">Hello</div>
    <div className="menuButton aboutButton">About</div>
    <div className="menuButton projectsButton">Projects</div>
    <div className="menuButton contactButton">Contact</div>
  </div>
}

export default Menu;

// 2 tablespoons of milk