import './projects.css'
import { useState } from 'react';

function Projects(){
  const [pagePos, setPagePos] = useState<string[]>(["front","frontRight","backRight","back","backLeft","frontLeft"])

  function moveLeft(){
    setPagePos([pagePos[1], pagePos[2], pagePos[3], pagePos[0]])
  }
  function moveRight(){
    setPagePos([pagePos[3], pagePos[0], pagePos[1], pagePos[2]])
  }
  
  return <section id="projects">
    <article>
      Projects
      <article className="proAll proFront"></article>
      <article className="proAll proFrontLeft"></article>
      <article className="proAll proFrontRight"></article>
      <article className="proAll proBack"></article>
      <article className="proAll proBackLeft"></article>
      <article className="proAll proBackRight"></article>
      <div onClick={moveLeft} className="left ontop"></div>
      <div onClick={moveRight} className="right ontop"></div>
    </article>

  </section>
}

export default Projects;