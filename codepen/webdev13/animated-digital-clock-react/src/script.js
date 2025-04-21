import React from "https://esm.sh/react@18.3.1";
import ReactDOM from "https://esm.sh/react-dom@18.3.1";

import gsap from "https://esm.sh/gsap";
import { useGSAP } from "https://esm.sh/@gsap/react?deps=react@18.3.1";
gsap.registerPlugin(MorphSVGPlugin);
const { useRef, useState } = React;
const style = window.getComputedStyle(document.body);

const Divider = (props) => {
	const { contextSafe } = useGSAP({ scope: props.scope.current}); 
	const colon = useRef();
	
	useGSAP((context, contextSafe) => {
		gsap.to(colon.current, {
			opacity: 0,
			repeat: -1,
			yoyo: true,
			duration: 0.5,
			ease: 'none'
		})
	})
	
	 return (
		 <>
<svg xmlns="http://www.w3.org/2000/svg" width="360"   viewBox="0 0 800 800"
	className="dividerSVG"
	
	>
			<defs>
        <linearGradient
          id="a"
          x1={400}
          y1={0}
          x2={400}
          y2={800}
          gradientUnits="userSpaceOnUse"
        >
           <stop offset={0} stopColor={style.getPropertyValue('--grad')}   /> 
          <stop offset={0.5} stopColor="#fff" stopOpacity={0} />      
          <stop offset={1} stopColor={style.getPropertyValue('--grad')} />
        </linearGradient>
			</defs>	
  
  <path ref={colon} d="M555.56,800H244.44v-311.11h311.11v311.11ZM555.56,311.11H244.44S244.44,0,244.44,0h311.11v311.11Z" fill={style.getPropertyValue('--grad')} opacity={0.5}/>


</svg>
			 </>
		 )
}
const TimeNumber = (props) => {

	const [delay, setDelay] = useState(0.1);
	const [time, setTime] = useState(new Date());
	const { contextSafe } = useGSAP({scope: props.scope.current}); 
	const pathArr = [
		{path1: "M640 400H150V160h490v240z",
		 path2: "M640 640H150V400h490v240z"},
		{path2: "M320 640H0V160h320v480z",
		 path1: "M800 640H480V0h320v640z"},
		{path1: "M640 320H0V160h640v160z",
		 path2: "M800 640H160V480h640v160z"},
		{path1: "M640 320H0V160h640v160z",
		 path2: "M640 640H0V480h640v160z"},
		{path1: "M640 320H160V0h480v320z",
		 path2: "M640 800H0V480h640v320z"},
		{path1: "M800 320H160V160h640v160z",
		 path2: "M640 640H0V480h640v160z"},
		{path1: "M800 320H160V160h640v160z",
		 path2: "M640 640H160V480h480v160z"},
		{path1: "M640 480H0V160h640v320z",
		 path2: "M640 800H0V480h640v320z"},
		{path1: "M640 320H160V160h480v160z",
			path2: "M640 640H160V480h480v160z"},
		{path1: "M640 320H160V160h480v160z",
			path2: "M640 640H0V480h640v160z"}		
	]
 
	const barPath1 = useRef();
	const barPath2 = useRef();
	
	const timer = gsap.delayedCall(1, () => setTime(new Date()));
 		
  useGSAP((context, contextSafe) => {
		
		let h1 = time.getHours().toString().length < 2 ? 0 : time.getHours().toString()[0];
		let h2 = time.getHours().toString().length < 2 ? time.getHours() : time.getHours().toString()[1];
		let m1 = time.getMinutes().toString().length < 2 ? 0 : time.getMinutes().toString()[0];
		let m2 = time.getMinutes().toString().length < 2 ? time.getMinutes() : time.getMinutes().toString()[1];
		//console.log(h1, h2, m1, m2);
		let timeNow = `${h1}${h2}${m1}${m2}`;
 		let target1 = pathArr[timeNow[props.id]].path1;
		let target2 = pathArr[timeNow[props.id]].path2;
 
		
	
	gsap.to(barPath1.current, {
		morphSVG: {
			shape: target1
		},
		delay: props.id * delay,
		duration: 1,
		ease: 'expo.inOut'
	})
	gsap.to(barPath2.current, {
		morphSVG: {
			shape: target2
		},
		delay: props.id * delay,
		duration: 1,
		ease: 'expo.inOut'
	})
 		
    },  {dependencies: [time], scope: props.scope.current}   ); 		

  return (
  	 <svg
							 className="mainSVG"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 800"      
    >
			<defs>
        <linearGradient
          id="a"
          x1={400}
          y1={0}
          x2={400}
          y2={800}
          gradientUnits="userSpaceOnUse"
        >
           <stop offset={0} stopColor={style.getPropertyValue('--grad')}   /> 
          <stop offset={0.5} stopColor="#fff" stopOpacity={0} />      
          <stop offset={1} stopColor={style.getPropertyValue('--grad')} />
        </linearGradient>
			</defs>
			
				<path d="M800 800H0V0h800v800z" fill={style.getPropertyValue('--grad')}  />
  <path d="M800 800H0V0h800v800z" fill="url(#a)"  />		 
				<path ref={barPath1}	d="M800 800H0V0h800v800z" fill={style.getPropertyValue('--bg')} />  
				<path ref={barPath2}	d="M800 800H0V0h800v800z" fill={style.getPropertyValue('--bg')} />  
				<path d="M800 800H0V0h800v800z" fill="transparent" stroke={style.getPropertyValue('--bg')} strokeWidth="42" />
    
				</svg>)
}

const MainTime = (props) => {
	//console.log(props)
	let list = [];
	for(let i = 0; i < 4; i++) {
		if(i == 2) {
			list.push(<Divider  {...props}/>)
		}
		list.push(<TimeNumber id={i} key={i} {...props} /> )
	}
	  return (  
				<>
	        {list}
				</>   
  )	
}
function App() {

	const container = useRef();

  return (
    <div className="App" >
    <div className="container"
			 ref={container}
			>
		<MainTime scope={container} />
    </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
