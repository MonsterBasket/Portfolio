import './projects.css'
import React, { useState } from 'react';

function Projects(){
  const [pagePos, setPagePos] = useState<string[]>(["front","frontRight","backRight","back","backLeft","frontLeft"])

  function move(direction:number){
    function num(i:number){
      i += direction;
      if (i > 5) i -= 6
      if (i < 0) i += 6
      return i
    }
    setPagePos([pagePos[num(0)], pagePos[num(1)], pagePos[num(2)], pagePos[num(3)], pagePos[num(4)], pagePos[num(5)]])
  }
  
  return <section id="Projects">
    <article>
      Projects
      <article className={`project ${pagePos[0]}`}></article>
      <article className={`project ${pagePos[1]}`}></article>
      <article className={`project ${pagePos[2]}`}></article>
      <article className={`project ${pagePos[3]}`}></article>
      <article className={`project ${pagePos[4]}`}></article>
      <article className={`project ${pagePos[5]}`}></article>
      <div onClick={()=> move(1)} className="frontLeft ontop"></div>
      <div onClick={()=> move(-1)} className="frontRight ontop"></div>
      <div onClick={()=> move(2)} className="backLeft ontop"></div>
      <div onClick={()=> move(-2)} className="backRight ontop"></div>
      <div onClick={()=> move(-3)} className="back ontop"></div>
    </article>

  </section>
}

export default Projects;