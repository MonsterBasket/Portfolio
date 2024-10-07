import { Fragment, ReactElement, useEffect, useRef, useState } from "react"
import { v4 as uuid } from 'uuid';
import "./CSS/typing.css"

type Props = {
  right: string;
  left: string;
}

function Word({right, left}: Props) {
  let first = true
  let leftClass = left.length ? "typedLetters" : ""
  let rightClass = left.length ? "untypedLetters" : "preLetters"
  const letters = useRef<ReactElement[]>([])
  const liveWord = useRef<ReactElement>(<>
    <span className={leftClass}>{left}</span>
    <span className={rightClass}>{right}</span>
  </>)
  const [, rerender] = useState<string[]>([])

  useEffect(() => {
    if (first){
      first = false
    }
    else if (leftClass === ""){
      console.log(leftClass)
      leftClass = "typedLetters"
      rightClass = "untypedLetters"
    }
    if (right === "") explode()
    rerender([])
  }, [right])

  useEffect(() => {
    setTimeout(() => explode(), 4000)
  },[])
  function explode() {
    // const x = pos.left - ((pos.left - pos.right) * 0.2)
    const word = left + right
    for (let i = 0; i < word.length; i++) {
      letters.current[i] = <span key={i} className="deadLetters" style={{left:`${i * 10}px`}}>{word.charAt(i)}</span>
        // jump(letter, (i-word.length / 2)+0.5);
    }
    // realWord.current = <div>hello</div>
    right = ""
    left = ""
    leftClass = "noLetters"
    rightClass = "noLetters"
    liveWord.current = <div>{letters.current.map(l => l)}</div>
    setTimeout(() => letters.current = [], 2000)
  }
  // return letters.current.length > 0 ? deadWord : liveWord
  return liveWord.current
}

export default function Typing(){

  let firstTime = useRef<boolean>(true);
  let target:string|null = null;
  let allWords:string[] = ['ant', 'box', 'car', 'dog', 'egg', 'fog', 'gin', 'hot', 'ice', 'jam', 'kin', 'lie', 'map', 'nil', 'off', 'pet', 'qin', 'red', 'sly', 'tee', 'urn', 'vat', 'why', 'you', 'zen',
    'atom', 'bare', 'cave', 'dire', 'epic', 'fate', 'goal', 'heat', 'iron', 'joke', 'kept', 'list', 'made', 'note', 'ouch', 'play', 'quit', 'rest', 'sell', 'told', 'unit', 'volt', 'wind', 'xray', 'yarn', 'zeus',
    'apart', 'bring', 'close', 'delve', 'ember', 'finch', 'ghost', 'heart', 'ideal', 'joint', 'knife', 'level', 'moist', 'noise', 'ounce', 'proud', 'quiet', 'rapid', 'solid', 'teach', 'under', 'voice', 'whale', 'xenon', 'yacht', 'zebra',
    'aurora', 'bright', 'create', 'docile', 'earned', 'finder', 'golden', 'honest', 'ironic', 'joking', 'knight', 'lowest', 'modest', 'novice', 'orient', 'played', 'quoted', 'reward', 'spoilt', 'taught', 'undone', 'violet', 'whisky', 'xanadu', 'yellow', 'zenith'];

  const [r,rerender] = useState<[]>([])

  interface keys2 {key: string, left: string, right: string, top: number}
  interface keysInfo { [index: string]: keys2; }
  const [keys, setKeys] = useState<keysInfo>({})
  const key = useRef<string>("")

  // interface firsts { [index: string]: string }
  // const first:firsts = {}
  interface words { [index: string]: ReactElement }
  const [words, setWords] = useState<words>({})

  useEffect(() => {
    window.addEventListener("keydown", typing, true)
    return window.removeEventListener("keydown", typing)
  },[])

  useEffect(() => {
    if (firstTime.current){
      createWord()
      firstTime.current = false;
    }
  }, [])
  function createWord() { 
    console.log(Object.keys(keys))
    let newIndex = Math.floor(Math.random() * (allWords.length - 1))
    while (allWords[newIndex].charAt(0) in keys){
      newIndex += 1
      if (newIndex === allWords.length) newIndex = 0;
    }
    const newWord:string = allWords[newIndex]
    key.current = newWord.charAt(0)
    let newKeys = keys
    newKeys[key.current] = {key: uuid(), right: newWord, left: "", top: Math.random() * 90 + 5}
    setKeys(newKeys)
    rerender([])
    setTimeout(() => createWord(), 2000); // new word every 2 seconds
    ((a:string) => { // destroy word after 4 seconds if it still exists, this will move into Word as a self-destruct
      setTimeout(function(){
        if (a in keys) {
          delete keys[a]
          if (target === a) target = null
        }
      }, 6000);
    })(newWord.charAt(0));
  }
  // useEffect(() => {
  //   if (!key.current) return
  //   let newWords = words
  //   console.log(keys[key.current])
  //   newWords[key.current] = <Word key={keys[key.current].key} right={keys[key.current].right} left={keys[key.current].left}/>
  //   setWords(newWords);
  //   key.current = ""
  // }, [r])

  function typing(e:any){
    if(e.keyCode === 32) { //spacebar - this prevents page scroll when space is pressed
      e.preventDefault();
    }
    let key:string = (() => {
        return e.key.length === 1 && e.key.match(/[a-z 0-9A-Z_-]/i) ? e.key.toLowerCase() : ''
    })()
    if (!key) return //if non-letter typed, exit function.
    if (target == null && key in keys) {  // check if any word is already targeted
      target = key
    }
    // ------- if there is still not a target word, subtract score ----------(note this is a sequential if, not an else)
    if (target == null) {
        // scoreDown() // I'll just leave this here for now
    }
    else { // --------- or if it didn't fail, start doing things
      if (key === keys[target].right.charAt(0)){
        console.log(key, keys[target])
        let newKeys = keys
        newKeys[target].left += newKeys[target].right.charAt(0)
        newKeys[target].right = keys[target].right.slice(1)
        newKeys[target].key = uuid()
        setKeys(newKeys)
        rerender([])
      }
      else {
          // scoreDown();
      }
      //-----------
      if (keys[target].right === "") { //word is fully typed
        setTimeout((target) => {
          delete keys[target]
        }, 2000, target)
        target = null
        rerender([])
      }
    }
  }

  return <div className="typebg">
    {/* {Object.keys(words).map(k => <div key={k} className="words move" style={{top:`${keys[k].top}%`}}>{words[k]}</div>)} */}
    {Object.keys(keys).map(k => <div key={k} className="words move" style={{top:`${keys[k].top}%`}}>
      <Word key = {keys[k].key} right = {keys[k].right} left = {keys[k].left} />
    </div>)}
  </div>
}