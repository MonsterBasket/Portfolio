import './CSS/animation.css'
import disclaimerImg from '../images/disclaimer.png';
import { ReactElement, useState } from 'react';

function Animation(){
  const [pagePos, setPagePos] = useState<string[]>(["front","frontRight","backRight","back","backLeft","frontLeft"])
  const [descPos, setDescPos] = useState<string[]>(["frontD","frontRightD","backRightD","backD","backLeftD","frontLeftD"])

  function move(direction:number){
    function num(i:number){
      i += direction;
      if (i > 5) i -= 6
      if (i < 0) i += 6
      return i
    }
    setPagePos([pagePos[num(0)], pagePos[num(1)], pagePos[num(2)], pagePos[num(3)], pagePos[num(4)], pagePos[num(5)]])
    setDescPos([descPos[num(0)], descPos[num(1)], descPos[num(2)], descPos[num(3)], descPos[num(4)], descPos[num(5)]])
  }

  const alley:ReactElement = <iframe src="https://player.vimeo.com/video/5008288?h=22815a5165" width="100%" height="100%" allow="autoplay; fullscreen; picture-in-picture" />
  const alleyDesc:string = `Brief: A 6 second abstract video synced to a music clip promoting a school event "Kick the Vendor".  I modelled the alleyway to match the photo and used (too many?) dynamic particles with physics.`
  const cookies:ReactElement = <iframe width="100%" height="100%" src="https://www.youtube.com/embed/XRhsOcLPqiQ?si=wbU0P8G8_0sTDUb6" title="YouTube video player" allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" />
  const cookiesDesc:ReactElement = <span><h3>Cookies</h3>Flash animation that I had a lot of fun with. I lost the original render and the blurred animations (smoke, bird, trees) rendered as static in this one.</span>
  const mattePainting:ReactElement = <iframe width="100%" height="100%" src="https://youtube.com/embed/6Q-97PUTFZo?si=V3gneftIKLd2Nfk0" title="YouTube video player" allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" />
  const mattePaintingDesc:string = "A matte painting, cutting out trees is hard!"
  const showreel:ReactElement = <iframe title="Showreel - James Blaskett 2011" src="https://player.vimeo.com/video/35045360?h=02bc212f2a" width="100%" height="100%" allow="autoplay; fullscreen; picture-in-picture"></iframe>
  const showreelDesc:string = "A compilation showing many of my works from uni after I graduated in 2011"
  const gears:ReactElement = <iframe width="100%" height="100%" src="https://www.youtube.com/embed/T0VNYxlmUbQ?si=jcFYfyD0epqUukZX" title="Dynamic Gears" allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" />
  const gearsDesc:string = "All the animation here is dynamic, the tall gear shown first is animated to spin, then everything else (including the swinging lights) is dynamic."
  const hair:ReactElement = <iframe width="100%" height="100%" src="https://www.youtube.com/embed/D81XrEyneAA?si=jFrUNLEuW4z46LJd" title="MoCap Hair" allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" />
  const hairDesc:string = "This was a group project that was supposed to be MoCap but ended up being mostly rotoscope.  The 3D modelling was done by the other members, the mocap/roto was me, not sure if that's a self compliment or insult though..."
  const disclaimer:ReactElement = <img src={disclaimerImg} style={{width:"100%"}}></img>
  const disclaimerDesc:ReactElement = <span>Please note, all the work in this section is close to 15 years old.  This website itself is my portfolio, this is just filler content from a previous life.<br/><br/>I originally made this carousel for the menu in my game Monster Basket which you can see on my projects page.</span>
  
  // This is all good, but 

  return <section id="Animation">
    <article>
      <article className={`animation ${pagePos[0]}`}>{disclaimer}</article>
      <article className={`animation ${pagePos[1]}`}>{gears}</article>
      <article className={`animation ${pagePos[2]}`}>{cookies}</article>
      <article className={`animation ${pagePos[3]}`}>{alley}</article>
      <article className={`animation ${pagePos[4]}`}>{showreel}</article>
      <article className={`animation ${pagePos[5]}`}>{hair}</article>
      <div onClick={()=> move(1)} className="frontLeft ontop"></div>
      <div onClick={()=> move(-1)} className="frontRight ontop"></div>
      <div onClick={()=> move(2)} className="backLeft ontop"></div>
      <div onClick={()=> move(-2)} className="backRight ontop"></div>
      <div onClick={()=> move(-3)} className="back ontop"></div>
    </article>
    <div className="descContainer">
      <div className={`${descPos[0]}`}>{disclaimerDesc}</div>
      <div className={`${descPos[1]}`}>{gearsDesc}</div>
      <div className={`${descPos[2]}`}>{cookiesDesc}</div>
      <div className={`${descPos[3]}`}>{alleyDesc}</div>
      <div className={`${descPos[4]}`}>{showreelDesc}</div>
      <div className={`${descPos[5]}`}>{hairDesc}</div>
    </div>
  </section>
}

export default Animation;