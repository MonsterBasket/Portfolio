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

  // these all need to change when screen width is changed, they currently only change on refresh
  window.addEventListener('resize', adjustMenuLeft);
  const [helloLeft, setHelloLeft] = useState<number>(window.innerWidth / 2 - 207)
  const [aboutLeft, setAboutLeft] = useState<number>(window.innerWidth / 2 - 102.5)
  const [projectsLeft, setProjectsLeft] = useState<number>(window.innerWidth / 2 + 2.5)
  const [contactLeft, setContactLeft] = useState<number>(window.innerWidth / 2 + 107)

  function adjustMenuLeft(){
    setHelloLeft(window.innerWidth / 2 - (window.innerWidth > 500 ? 207 : 157))
    setAboutLeft(window.innerWidth / 2 - (window.innerWidth > 500 ? 102.5 : 77.5))
    setProjectsLeft(window.innerWidth / 2 + 2.5)
    setContactLeft(window.innerWidth / 2 + (window.innerWidth > 500 ? 107 : 82))
    }

  useScrollPosition(({ prevPos, currPos }) => {
    let windowLimit: number = window.innerHeight < 500 ? window.innerHeight : 500;
    if (currPos.y === 0) { // top of screen / not scrolled
      setMenuTop(0);
      setMenuScale(1);
      setButtonRotate(0);
    }
    else if (currPos.y > -windowLimit) { // first 500 pixels of scroll
      // a** + b** = c**,  ==>  b** = c** - a**  ==>  b = sqrt(c** - a**)
      // a = % of scroll from 0 - 500px
      // b = actual position from top
      // c = radius of circle - we can just use 1 as it's a % conversion
      // Final equation: radius - scrollPos * windowHeight
      setMenuTop(1 - (currPos.y / -windowLimit) * (-window.innerHeight + 50))
      setButtonRotate(currPos.y / -windowLimit)
      if (currPos.y / -windowLimit < 0.5) {
        // b = scale of buttons
        // scale:         sqrt(radius -               scrollPos**)          + scaleAdjustment / (1 + scaleAdjustment)
        setMenuScale((1 - Math.sqrt(1 - Math.pow(1 - (currPos.y / -windowLimit), 2)) + 0.5) / 1.5)
      }
      else {
        setMenuScale((1 - Math.sqrt(1 - Math.pow(     currPos.y / -windowLimit,  2)) + 0.5) / 1.5)
      }
    }
    else { // set menu buttons to bottom by default
      setMenuTop(window.innerHeight - 50);
      setMenuScale(1);
      setButtonRotate(1);
    }

    // second set of conditions to set each button vertical pos individually
    // start and stop effecting each button when the relevant section is in view with a 50px buffer for height of button and margin
    // hello section, before 500px is 0, after 2*window height is -window height + 50px
    if (currPos.y > -windowLimit) setHelloTop(0)
    else if (currPos.y < -window.innerHeight * 2) setHelloTop(-window.innerHeight + 50)
    else {
      // !!!!!!! this only works for my laptop screen height
      setHelloTop(Math.max((windowLimit + currPos.y) / (window.innerHeight / 1000), -window.innerHeight + 50))
    }

    // about section, from window height * 1 (-50) to window height * 4 (-50)
    if (currPos.y > -window.innerHeight * 1 - 50) setAboutTop(0)
    else if (currPos.y <-window.innerHeight * 4 - 50) setAboutTop(-window.innerHeight + 50)
    else {
      // currPos.y is a negative number, and button pos needs to start at 0 and go negative
      // so this is clamped between a calculation of the scrollpos for the current section, and screenHeight - 50px
      setAboutTop(Math.max((window.innerHeight + currPos.y + 50) / 3, -window.innerHeight + 50 ))
    }

    // projects section, from window Height * 3 to window height * 6
    if (currPos.y > -window.innerHeight * 3 - 50) setProjectsTop(0)
    else if (currPos.y < -window.innerHeight * 6 - 50) setProjectsTop(-window.innerHeight + 50)
    else {
      setProjectsTop(Math.max((currPos.y + 50) / 3 + window.innerHeight, -window.innerHeight + 50 ))
    }

    // contact section; from window height * 5 onwards, exaggerated movement as you can't scroll past the bottom section
    if (currPos.y > -window.innerHeight * 5 - 50) setContactTop(0)
    else {
      setContactTop(Math.max(((currPos.y + 50) / 5 + window.innerHeight) * 2.5, -window.innerHeight + 50 ))
    }
  })

  const helloStyle = { perspectiveOrigin: "200% center", perspective: `${menuScale * 100 + 300}px`, top: `${helloTop}px`, left: `${helloLeft}px` };
  const aboutStyle = { perspectiveOrigin: "100% center", perspective: `${menuScale * 100 + 300}px`, top: `${aboutTop}px`, left: `${aboutLeft}px` };
  const projectsStyle = { perspectiveOrigin: "0% center", perspective: `${menuScale * 100 + 300}px`, top: `${projectsTop}px`, left: `${projectsLeft}px` };
  const contactStyle = { perspectiveOrigin: "-100% center", perspective: `${menuScale * 100 + 300}px`, top: `${contactTop}px`, left: `${contactLeft}px` };
  const front = { transform: `rotateX(${buttonRotate * 180}deg) translateZ(15px)`, filter: `brightness(${2 * buttonRotate + 1})` };
  const bottom = { transform: `rotateX(${buttonRotate * 180 - 90}deg) translateZ(15px)`, filter: `brightness(${2 * buttonRotate})` };
  const back = { transform: `rotateX(${buttonRotate * 180 - 180}deg) translateZ(15px)`, filter: `brightness(${2 * buttonRotate - 1})` };



  
  return <div style={{ 
      top:`${menuTop}px`,
      transform: `scale(${menuScale})`
      }} id="menu">
    <a href="#hello" style={helloStyle} className="menuButton helloButton">
      <div style={front} className='menuButtonPanel'>Hello</div>
      <div style={bottom} className='menuButtonPanel'>Hello</div>
      <div style={back} className='menuButtonPanel'>Hello</div>
    </a>
    <a href="#about" style={aboutStyle} className="menuButton aboutButton">
      <div style={front} className='menuButtonPanel'>About</div>
      <div style={bottom} className='menuButtonPanel'>About</div>
      <div style={back} className='menuButtonPanel'>About</div>
    </a>
    <a href="#projects" style={projectsStyle} className="menuButton projectsButton">
      <div style={front} className='menuButtonPanel'>Projects</div>
      <div style={bottom} className='menuButtonPanel'>Projects</div>
      <div style={back} className='menuButtonPanel'>Projects</div>
    </a>
    <a href="#contact" style={contactStyle} className="menuButton contactButton">
      <div style={front} className='menuButtonPanel'>Contact</div>
      <div style={bottom} className='menuButtonPanel'>Contact</div>
      <div style={back} className='menuButtonPanel'>Contact</div>
    </a>
  </div>
}

export default Menu;