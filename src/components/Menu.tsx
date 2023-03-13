import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { useState } from 'react';

function Menu(){

  const [menuTop, setMenuTop] = useState<number>(0)
  const [menuScale, setMenuScale] = useState<number>(1)
  const [buttonRotate, setButtonRotate] = useState<number>(0)

  const [helloTop, setHelloTop] = useState<number>(0)
  const [aboutTop, setAboutTop] = useState<number>(0)
  const [projectsTop, setProjectsTop] = useState<number>(0)
  const [contactTop, setContactTop] = useState<number>(0)

  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y === 0) { // top of screen / not scrolled
      setMenuTop(0);
      setMenuScale(1);
      setButtonRotate(0);
    }
    else if (currPos.y > -500) { // first 500 pixels of scroll
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
    else { // set menu buttons to bottom by default
      setMenuTop(window.innerHeight - 50);
      setMenuScale(1);
      setButtonRotate(1);
    }

    //second set of conditions to set each button vpos individually
    if (currPos.y > -500){} // do nothing
    else if (currPos.y > -window.innerHeight * 2){  // "hello" after first 500
      // this one will need to take the first 500 px into account, so I'll do this last
    }
    if (currPos.y < -window.innerHeight * 1 && currPos.y > -window.innerHeight * 3){ // about section
      setAboutTop(currPos.y - window.innerHeight * 2)
    }
    if (currPos.y < -window.innerHeight * 5 && currPos.y > -window.innerHeight * 6){ // projects section

    }
    if (currPos.y < -window.innerHeight * 7 && currPos.y > -window.innerHeight * 8){ // cpntact section

    }
  })

  const helloStyle = { perspectiveOrigin: "200% center", perspective: `${menuScale * 100 + 300}px`, top: `${helloTop}px` };
  const aboutStyle = { perspectiveOrigin: "100% center", perspective: `${menuScale * 100 + 300}px`, top: `${aboutTop}px` };
  const projectsStyle = { perspectiveOrigin: "0% center", perspective: `${menuScale * 100 + 300}px`, top: `${projectsTop}px` };
  const contactStyle = { perspectiveOrigin: "-100% center", perspective: `${menuScale * 100 + 300}px`, top: `${contactTop}px` };
  const front = { transform: `rotateX(${buttonRotate * 180}deg) translateZ(15px)`, filter: `brightness(${2 * buttonRotate + 1})` };
  const bottom = { transform: `rotateX(${buttonRotate * 180 - 90}deg) translateZ(15px)`, filter: `brightness(${2 * buttonRotate})` };
  const back = { transform: `rotateX(${buttonRotate * 180 - 180}deg) translateZ(15px)`, filter: `brightness(${2 * buttonRotate - 1})` };



  
  return <div style={{ 
      top:`${menuTop}px`,
      transform: `scale(${menuScale})`
      }} id="menu">
    <a href="#hello">
      <div style={helloStyle} className="menuButton helloButton">
          <div style={front} className='menuButtonPanel'>{aboutTop}</div>
          <div style={bottom} className='menuButtonPanel'>Hello</div>
          <div style={back} className='menuButtonPanel'>{aboutTop}</div>
      </div>
    </a>
    <a href="#about">
      <div style={aboutStyle} className="menuButton aboutButton">
        <div style={front} className='menuButtonPanel'>About</div>
        <div style={bottom} className='menuButtonPanel'>About</div>
        <div style={back} className='menuButtonPanel'>About</div>
      </div>
    </a>
    <a href="#projects">
      <div style={projectsStyle} className="menuButton projectsButton">
        <div style={front} className='menuButtonPanel'>Projects</div>
        <div style={bottom} className='menuButtonPanel'>Projects</div>
        <div style={back} className='menuButtonPanel'>Projects</div>
      </div>
    </a>
    <a href="#contact">
      <div style={contactStyle} className="menuButton contactButton">
        <div style={front} className='menuButtonPanel'>Contact</div>
        <div style={bottom} className='menuButtonPanel'>Contact</div>
        <div style={back} className='menuButtonPanel'>Contact</div>
      </div>
    </a>
  </div>
}

export default Menu;