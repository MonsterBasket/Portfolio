import React, { Children, ReactComponentElement, useEffect, useRef, useState } from "react"
import { forEachChild } from "typescript";

type Props = {
  buttonWidth: number;
  buttonOpacity: number;
  names: string[];
  children: React.ReactElement|React.ReactElement[]
}

export default function Tabs({buttonWidth, buttonOpacity, names, children}: Props) {

  buttonWidth += 35;
  let tabOffset:number = 0;
  let tabMorph:number = -Math.min(Math.max(1.5 - buttonOpacity -1, 0), 1);
  const [tab, setTab] = useState<string[]>(["0", "1", "2", "Front"])
  const kids = React.Children.toArray(children);

  function turnTo(page:number){
    if (tab[page] != "Front"){ //clicking on front tab does nothing
      let temptab:string[] = tab;
      for (let i = 0; i < 4; i++) {
        if (temptab[i] != "Up" && temptab[i] != "Front" && parseInt(temptab[i]) > parseInt(temptab[page])){
          let tempnum:number = parseInt(temptab[i]) - 1
          temptab[i] = tempnum.toString()
        }
        else if (temptab[i] == "Front"){
          temptab[i] = "2"
        }
      }
      temptab[page] = "Up"
      setTab([...temptab]) //spread array to force re-render
      setTimeout(() => {
        temptab[page] = "Front"
        setTab([...temptab])
      }, 300)
    }
  }

  // The transition doesn't currently work amazingly well on phones.  Looks fine before and after, but doesn't line up during.
  return (
    <div id="tabSection">
      <div className="tabTopBack" style={{opacity:`${1 - buttonOpacity}`}}></div>
      <div className={`tab tab${tab[0]}`} id="tab0" >
        <div className="tabTop tabTop0" onClick={() => turnTo(0)} style={{left: `${(buttonWidth -25) * 0 + tabOffset--}px`, width:`${buttonWidth}px`, opacity:`${1 - buttonOpacity}`, animationDelay:`${tabMorph}s`}}>{names[0]}</div>
          {kids[0]}
        </div>      
        <div className={`tab tab${tab[1]}`} id="tab1" >
          <div className="tabTop tabTop1" onClick={() => turnTo(1)} style={{left: `${(buttonWidth -25) * 1 + tabOffset--}px`, width:`${buttonWidth}px`, opacity:`${1 - buttonOpacity}`, animationDelay:`${tabMorph}s`}}>{names[1]}</div>
          {kids[1]}
        </div>      
        <div className={`tab tab${tab[2]}`} id="tab2" >
          <div className="tabTop tabTop3" onClick={() => turnTo(2)} style={{left: `${(buttonWidth -25) * 2 + tabOffset--}px`, width:`${buttonWidth}px`, opacity:`${1 - buttonOpacity}`, animationDelay:`${tabMorph}s`}}>{names[2]}</div>
          {kids[2]}
        </div>      
        <div className={`tab tab${tab[3]}`} id="tab3" >
          <div className="tabTop tabTop3" onClick={() => turnTo(3)} style={{left: `${(buttonWidth -25) * 3 + tabOffset--}px`, width:`${buttonWidth}px`, opacity:`${1 - buttonOpacity}`, animationDelay:`${tabMorph}s`}}>{names[3]}</div>
          {kids[3]}
        </div>      
    </div>
  );
}