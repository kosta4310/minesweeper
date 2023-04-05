import { useState } from 'react';
import style from './cell.module.scss';
import { ReactComponent as Flag } from '../../icons/copy.svg';


type ActiveType = 'empty' | 'bomb' | 'bum';
type Props = {
    activeState: ActiveType | number
}

export function Cell(props: {activeState: string | number}) {
    const [flag, setFlag] = useState(false);
    const [init, setInit] = useState(true);
    const [opened, setOpened] = useState(false);

    const handleClick: React.MouseEventHandler<HTMLDivElement> | undefined = (e) => {
        // console.log(e);
        if (e.button === 2) {
            setFlag((prevState) => !prevState);
        } else {
            setOpened(true)
            setInit(false);
            console.log('open cell');
            
        }
        
    }
    if (init) {
        return (
            <div className={style.cell} onMouseUp={handleClick}>{flag && <Flag/>}</div>
    
        )
    } 
    // else

    // if (typeof props.activeState === 'number') {
    //     return (
    //         <div className={style.cellOpened}>{props.activeState}</div>
    
    //     ) 
    // } 
    else return <div className={style.cellOpened}></div> ;
    
}