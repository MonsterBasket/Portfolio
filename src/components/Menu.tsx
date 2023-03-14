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
      // setHelloTop(Math.max)
    }
    // start and stop effecting each button when the relevant section is in view with a 50px buffer for height of button and margin
    if (currPos.y < -window.innerHeight * 1 - 50 && currPos.y > -window.innerHeight * 4 - 50){ // about section
      // currPos.y is a negative number, and button pos needs to start at 0 and go negative
      // so this is clamped between a calculation of the scrollpos for the current section, and screenHeight - 50px
      setAboutTop(Math.max((window.innerHeight + currPos.y + 50) / 3, -window.innerHeight + 50 ))
    }
    if (currPos.y < -window.innerHeight * 3 - 50 && currPos.y > -window.innerHeight * 6 - 50){ // projects section
      setProjectsTop(Math.max((currPos.y + 50) / 3 + window.innerHeight, -window.innerHeight + 50 ))
    }
    if (currPos.y < -window.innerHeight * 5 - 50 && currPos.y > -window.innerHeight * 8 - 50){ // cpntact section
      setContactTop(Math.max(((currPos.y + 50) / 5 + window.innerHeight) * 2.5, -window.innerHeight + 50 ))
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
          <div style={front} className='menuButtonPanel'>{projectsTop}</div>
          <div style={bottom} className='menuButtonPanel'>Hello</div>
          <div style={back} className='menuButtonPanel'>{projectsTop}</div>
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
        <div style={front} className='menuButtonPanel'>{contactTop}</div>
        <div style={bottom} className='menuButtonPanel'>Projects</div>
        <div style={back} className='menuButtonPanel'>{contactTop}</div>
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