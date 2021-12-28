import React, {useState, useEffect} from 'react'

function Events({e}){
    const [name, setName] = useState(null)
    const [color, setColor] = useState(null)
    useEffect(()=>{
        switch(e) {
            case 'protein treatment': 
				setName('Pr');
				setColor('#DDEBF1');
				break;
			case 'hair cut':
				setName('Cu');
				setColor('#F4DFEB');
				break;
			case 'hair color':
				setName('HC');
				setColor('#F4DFEB');
				break;
			case 'deep conditioning':
				setName('DC');
				setColor('#DDEBF1');
				break;
			default:
				setName('C');
				setColor('#F4DFEB');
				break;
        }
    }, [e])
    return (
        <span className='p-1 font-medium text-center border-10 text-sm sm:text-xs' style={{backgroundColor: color ? color : 'transparent'}}>
            {name}
        </span>
    )
}

export default Events;