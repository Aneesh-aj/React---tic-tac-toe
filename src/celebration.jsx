import React,{useEffect,useState} from "react";
import ReactConfetti from "react-confetti";

const Confetti = ()=>{

    const [windowDimension,setDimension] = useState({width:window.innerWidth ,height:window.innerHeight})
    


    const detectSize = ()=>{
        setDimension({width:window.innerWidth,height:window.innerHeight})
    }

    useEffect(()=>{
        window.addEventListener('resize',detectSize)
        return()=>{
            window.removeEventListener('resize',detectSize)
        }
    },[windowDimension])
    const confettiWidth = 1500

    return (
       <>
       <ReactConfetti
        width={Math.min(windowDimension.width, confettiWidth)}
        height={windowDimension.height}
        tweenDuration={100}
      />
       </>
    )
}



export default Confetti