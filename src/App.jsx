import { useEffect, useCallback, useMemo, useState } from 'react'
import './App.css'

function App() {

  const regexp = useMemo(() => new RegExp(".mp3$", "g"),[]);
  const [lastKeyPressed, setLastKeyPressed] = useState("")
  const [volume, setVolume] = useState("50")
  const [power, setPower] = useState(true)

  let keyCodes = useMemo(() => [65,67,68,69,81,83,87,88,90], []); 

  const handleClick = useCallback(
    (key) => {
      const audio = document.getElementById(key);
      audio.currentTime = 0;  
      if (power === true) {
        audio.play();
      
        let srcName = audio.src;
        srcName = srcName.substring(44)
        srcName = srcName.replace(regexp, "");
        setLastKeyPressed(srcName);

        let button = document.getElementById("button-"+key);
        button.style.backgroundColor = 'red';
        setTimeout(() => {
          button.style.backgroundColor = ''
        }, 100);
      }
    },
    [regexp, power]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (keyCodes.includes(e.keyCode)) {
        handleClick(e.key);
      }
    },
    [handleClick, keyCodes] 
  );

  const handleRange = useCallback(
    () => {
      let audios = document.querySelectorAll('audio');
      let range = document.getElementById('volume-slider');
      let newVolume = range.value / 100;
      setVolume(`${newVolume*100}`);

      audios.forEach(function(audio){
        audio.volume = newVolume;
      })
    },
    []
  );

  const handlePower = useCallback(
    () => {
      setPower(
        prevP => !prevP
      )
    }, []
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
  
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown])

  useEffect(() => {
    document.addEventListener('change', handleRange)
  
    return () => {
      document.removeEventListener('change', handleRange)
    }
  }, [handleRange])
  
  

  return (
    <div id='drum-machine' className='center'>
      <div id='display' onKeyDown={handleKeyDown} tabIndex={0}>

        <div className='drum-pad'>
          <button type='button' onClick={() => handleClick('q')} id='button-q'>Q</button>
          <audio src='https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' className='clip' id='q'></audio>
        </div>

        <div className='drum-pad'>
          <button type='button' onClick={() => handleClick('w')} id='button-w'>W</button>
          <audio src='https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' className='clip' id='w'></audio>
        </div>

        <div className='drum-pad'>
          <button type='button' onClick={() => handleClick('e')} id='button-e'>E</button>
          <audio src='https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' className='clip' id='e'></audio>
        </div>

        <div className='drum-pad'>
          <button type='button' onClick={() => handleClick('a')} id='button-a'>A</button>
          <audio src='https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' className='clip' id='a'></audio>
        </div>

        <div className='drum-pad'>
          <button type='button' onClick={() => handleClick('s')} id='button-s'>S</button>
          <audio src='https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' className='clip' id='s'></audio>
        </div>

        <div className='drum-pad'>
          <button type='button' onClick={() => handleClick('d')} id='button-d'>D</button>
          <audio src='https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' className='clip' id='d'></audio>
        </div>

        <div className='drum-pad'>
          <button type='button' onClick={() => handleClick('z')} id='button-z'>Z</button>
          <audio src='https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' className='clip' id='z'></audio>
        </div>

        <div className='drum-pad'>
          <button type='button' onClick={() => handleClick('x')} id='button-x'>X</button>
          <audio src='https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' className='clip' id='x'></audio>
        </div>

        <div className='drum-pad'>
          <button type='button' onClick={() => handleClick('c')} id='button-c'>C</button>
          <audio src='https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' className='clip' id='c'></audio>
        </div>

      </div>
      <div id='settings'>
        <h3>Power</h3>
        <button id='power-button' onClick={handlePower}>{power === true ? "ON" : "OFF"}</button>
        <div>
          <h3 id='latest-sound'>{power === true ? lastKeyPressed : ""}</h3>
        </div>
        <input type='range' onChange={handleRange} id='volume-slider' min={0} max={100}/>
        <div>
          <h3>{volume}</h3>
        </div>
      </div>
    </div>
  )
}

export default App
