import {useState, useEffect} from 'react';

function useWindowSize() {
    const [screenWidth, setWindowSize] = useState([0]);
    useEffect(()=>{
        function handleResize() {
            setWindowSize([window.innerWidth]);
        }
        //add event listener
        window.addEventListener('resize', handleResize);
        //call handler so state gets updated with initial size
        handleResize();
        //remove listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []); //to make sure useEffect runs only on mount
    return screenWidth;
}

export default useWindowSize;