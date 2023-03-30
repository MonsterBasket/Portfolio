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

  // used for pushing them up against the left side of the screen
  const [helloTangent, setHelloTangent] = useState<number>(1)
  const [aboutTangent, setAboutTangent] = useState<number>(1)
  const [projectsTangent, setProjectsTangent] = useState<number>(1)
  const [contactTangent, setContactTangent] = useState<number>(1)
  // re-align as each button moves in and out of rows
  const [helloAlign, setHelloAlign] = useState<number>(0)
  const [aboutAlign, setAboutAlign] = useState<number>(0)
  const [projectsAlign, setProjectsAlign] = useState<number>(0)
  const [contactAlign, setContactAlign] = useState<number>(0)
  // currently not accounting for width of vertical scroll bar - I'm hoping to replace this later anyway
  const [buttonWidth, setButtonWidth] = useState<number>(window.innerWidth > 500 ? 100 : 75)
  const [helloLeft, setHelloLeft] = useState<number>((window.innerWidth / 2 - (buttonWidth * 2 + 17.5) - helloAlign) * helloTangent + 10)
  const [aboutLeft, setAboutLeft] = useState<number>((window.innerWidth / 2 - (buttonWidth + 12.5) - aboutAlign) * aboutTangent + 10)
  const [projectsLeft, setProjectsLeft] = useState<number>((window.innerWidth / 2 - 7.5 - projectsAlign) * projectsTangent + 10)
  const [contactLeft, setContactLeft] = useState<number>((window.innerWidth / 2 + (buttonWidth -2.5) - contactAlign) * contactTangent + 10)
  // width of button used in conjunction with buttonWidth and tangent
  const [helloWidth, sethelloWidth] = useState<number>(buttonWidth)
  const [aboutWidth, setaboutWidth] = useState<number>(buttonWidth)
  const [projectsWidth, setprojectsWidth] = useState<number>(buttonWidth)
  const [contactWidth, setcontactWidth] = useState<number>(buttonWidth)  //need to add tangent calc here


  window.addEventListener('resize', setAllLeft);
  
  function setAllLeft(){
    let buttonWidth = window.innerWidth > 500 ? 100 : 75 // local variable to avoid setstate delay
    setHelloLeft((window.innerWidth / 2 - (buttonWidth * 2 + 17.5) - helloAlign) * helloTangent + 10)
    setAboutLeft((window.innerWidth / 2 - (buttonWidth + 12.5) - aboutAlign) * aboutTangent + 10)
    setProjectsLeft((window.innerWidth / 2 - 7.5 - projectsAlign) * projectsTangent + 10)
    setContactLeft((window.innerWidth / 2 + (buttonWidth -2.5) - contactAlign) * contactTangent + 10)
  }

  useScrollPosition(({ prevPos, currPos }) => {
    // window limit sets the first section scroll limit to the lesser of window height or 500px
    let windowLimit: number = Math.min(window.innerHeight, 500);
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
      // setHelloTop(Math.max((windowLimit + currPos.y) / (window.innerHeight / 1000), -window.innerHeight + 50))
      // this needs to start at windowLimit but end at window.innerHeight... CONFUSING
      setHelloTop((-(currPos.y + windowLimit) / (window.innerHeight * 2 - windowLimit + 70) * -window.innerHeight))
      // setHelloTop((1 - ((windowLimit - currPos.y) / windowLimit / 2)) * window.innerHeight)
    }
    // two more statements that kick in 50px before and after the above to push button to the left
    if (currPos.y < -windowLimit + 25 && currPos.y > -windowLimit - 25) {
      // smooth ease from mid to left (1 to 0 tangent as %)
      // also need to adjust setabout/contact/projectAlign to be three buttons
      setHelloTangent(1 - (-windowLimit + 25 - currPos.y) / 50)
    }
    // this condition works as the section reaches the top, but the button reaches the top earlier
    else if (currPos.y < -window.innerHeight * 2 + 50 && currPos.y > -window.innerHeight * 2) {
      setHelloTangent((-window.innerHeight * 2 + 50 - currPos.y) / 50)
    }
    else if (currPos.y < -windowLimit - 25 && currPos.y > -window.innerHeight * 2 + 50)
      setHelloTangent(0)
    else setHelloTangent(1);


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

    // yep, this will be constantly setting state and aligning all buttons whenever you're scrolling...
    setAllLeft();
  })

  const helloStyle = { perspectiveOrigin: "200% center", perspective: `${menuScale * 100 + 300}px`, top: `${helloTop}px`, left: `${helloLeft}px`, width: `${helloWidth}px` };
  const aboutStyle = { perspectiveOrigin: "100% center", perspective: `${menuScale * 100 + 300}px`, top: `${aboutTop}px`, left: `${aboutLeft}px`, width: `${aboutWidth}px` };
  const projectsStyle = { perspectiveOrigin: "0% center", perspective: `${menuScale * 100 + 300}px`, top: `${projectsTop}px`, left: `${projectsLeft}px`, width: `${projectsWidth}px` };
  const contactStyle = { perspectiveOrigin: "-100% center", perspective: `${menuScale * 100 + 300}px`, top: `${contactTop}px`, left: `${contactLeft}px`, width: `${contactWidth}px` };
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
      <div style={back} className='menuButtonPanel'>{helloTangent}</div>
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