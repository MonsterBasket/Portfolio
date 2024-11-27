import { ReactElement, useEffect, useRef, useState } from "react";
import "./CSS/projects.css"
import monster from "../images/screengrab.png"
import typing from "../images/typing.png"
import battleship from "../images/battleship.png"
import Typing from "./Typing";

type Props = {turnToCheat: number;}

export default function Projects({turnToCheat}: Props){
  const [panel1, setPanel1] = useState<string>(window.innerHeight > window.innerWidth ? "projTop" : "projLeft")
  const [panel2, setPanel2] = useState<string>(window.innerHeight > window.innerWidth ? "projBottom" : "projRight")
  const [position, setPosition] = useState<number[]>([1,2,3])
  const active = useRef<number>(2)
  useEffect(() => {
    if(turnToCheat == 1) active.current = position[1]
    else active.current = -1;
  }, [turnToCheat, position])

  useEffect(() => {
    window.addEventListener('resize', updateScreen);
    return () => {
      window.removeEventListener('resize', updateScreen);
    };
  }, []);



  function updateScreen(){
    setPanel1(window.innerHeight > window.innerWidth ? "projTop" : "projLeft");
    setPanel2(window.innerHeight > window.innerWidth ? "projBottom" : "projRight");
  }

  function change(num:number){
    let temp:number[] = []
    if (num == 0) temp = [3,1,2]
    else if (num == 1) temp = [1,2,3]
    else if (num == 2) temp = [2,3,1]
    setPosition([...temp])
  }

  const project1:ReactElement = <img className={`project project${position[0]}`} src={monster}></img>
  // const project2:ReactElement = <img className={`project project${position[1]}`} src={typing}></img>
  const project2:ReactElement = <div className={`project project${position[1]}`}><Typing active={position[1] == 2 ? true : false}/></div>
  const project3:ReactElement = <img className={`project project${position[2]}`} src={battleship}></img>

  // const disclaimer:ReactElement = <img src={disclaimerImg} style={{width:"100%"}}></img>

  const project1Link:ReactElement = <h2>Monster Basket</h2>
  const project2Link:ReactElement = <h2><a href="https://monsterbasket.github.io/TypingGame/" target="_blank">Typing Game</a></h2>
  const project3Link:ReactElement = <h2><a href="https://github.com/MonsterBasket/battleship" target="_blank">Battleship</a></h2>

  const project1Desc:ReactElement = <span>This was my "pièce de résistance" of my bootcamp.  A lot to be proud of despite being a bit janky and buggy.  On top of that the server is constantly out of RAM so it's pretty broken right now.  I've taken it off-line for now and I'll take a look when this folio site is finished.</span>
  const project2Desc:ReactElement = <span>A JavaScript typing game. Choose a theme and type the words that appear on the screen before they reach the end. Words and background image come from separate APIs and are generated based on the theme you choose.</span>
  const project3Desc:ReactElement = <span>Battleship made in Ruby, you can't play it because it's almost impossible to host a pure Ruby app, but feel free to look at the code in the link provided.</span>


  return <section id="Projects">
        <div className={panel1}>
          {project1}
          {project2}
          {project3}
        </div>
        <div className={panel2}>
          <div className={`projDesc desc${position[0]}`}>
            <div>
              {project1Link}
              {project1Desc}
            </div>
          </div>
          <div className={`projDesc desc${position[1]}`}>
            <div>
              {project2Link}
              {project2Desc}
            </div>
          </div>
          <div className={`projDesc desc${position[2]}`}>
            <div>
              {project3Link}
              {project3Desc}
            </div>
          </div>          
        </div>
        <div className={`${panel1}Cover`}></div>
        <div className={`${panel1}Rule`}>
          <div className="projButtonBack">
            <div className={`projButton active${position[1]}`} onClick={() => change(0)}></div>
            <div className={`projButton active${position[0]}`} onClick={() => change(1)}></div>
            <div className={`projButton active${position[2]}`} onClick={() => change(2)}></div>
          </div>
          <div className="projUpButton" onClick={() => change(position[0] -1)}></div>
          <div className="projDownButton" onClick={() => change(position[2] -1)}></div>
        </div>
  </section>
}