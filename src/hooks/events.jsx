import React, {useState, useEffect} from 'react'
import styled from 'styled-components';

const EventBubble = styled.span`
	border-radius: 10px;
	padding: 4px;
	font-weight: 500;
	text-align: center;
	font-size: 12px;
	@media (max-width: 700px) {
		font-size: 8px;
	}
`;
function Events({event}){
    const [name, setName] = useState(null)
    const [color, setColor] = useState(null)
    useEffect(()=>{
        switch(event) {
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
    }, [event])
    return (
        <EventBubble>
            {name}
        </EventBubble>
    )
}

export default Events;