import { useScrollPosition } from "@n8tb1t/use-scroll-position"
import { useState } from "react"

function Hello(){

  const [rotate, setRotate] = useState<number>(0)

  useScrollPosition(({ prevPos, currPos }) => {
    if (currPos.y === 0) setRotate(0)
    else if (currPos.y >= -150) setRotate(currPos.y * 1.65 / -500)
    else if (currPos.y < -150 && currPos.y > -350) setRotate(0.5)
    else if (currPos.y <= -350 && currPos.y >= -500) setRotate((500 + currPos.y) * 1.65 / -500 + 1)
    else if (currPos.y < -500) setRotate(1)
    else setRotate(currPos.y / -500)
  })

  const frontRight = { transform: `rotateX(${-rotate * 180}deg) translateZ(50px)`, filter: `brightness(${2 * -rotate + 1})` };
  const bottomRight = { transform: `rotateX(${-rotate * 180 + 90}deg) translateZ(50px)`, filter: `brightness(${2 * -rotate + 2})` };
  const backRight = { transform: `rotateX(${-rotate * 180 - 180}deg) translateZ(50px)`, filter: `brightness(${2 * -rotate + 3})` };
  const front = { transform: `rotateX(${rotate * 180}deg) translateZ(50px)`, filter: `brightness(${2 * rotate + 1})` };
  const bottom = { transform: `rotateX(${rotate * 180 - 90}deg) translateZ(50px)`, filter: `brightness(${2 * rotate})` };
  const back = { transform: `rotateX(${rotate * 180 - 180}deg) translateZ(50px)`, filter: `brightness(${2 * rotate - 1})` };
  const right = { transform: `rotateY(90deg) rotateZ(${rotate * 180}deg)`}

  return <section id="hello">
    <div className="spinContainer">
      <div className="helloSpinLeft">
        <div style={front} className='helloSpinPanel'> </div>
        <div style={bottom} className='helloSpinPanel middleBorder'>I am&#8202;</div>
        <div style={back} className='helloSpinPanel'>I'm a&#8202;</div>
        <div style={right} className='helloSpinPanelRight'> </div>
      </div>
      <div className="helloSpin">
        <div style={frontRight} className='helloSpinPanel'>&#8202;Hello</div>
        <div style={bottomRight} className='helloSpinPanel middleBorder'>&#8202;James</div>
        <div style={backRight} className='helloSpinPanel'>&#8202;Software Engineer</div>
      </div>
    </div>
  </section>
}

export default Hello