import { useState } from 'react';
import style from './cell.module.scss';
import { ReactComponent as Flag } from '../../icons/copy.svg';
import store from '../../redux/store';


type ActiveType = 'empty' | 'bomb' | 'bum';
type Props = {
    status: string | number,
    num: number
}

export function Cell(props: Props) {
    const [flag, setFlag] = useState(false);
    const [init, setInit] = useState(true);
    const [opened, setOpened] = useState(false);

    const handleClick: React.MouseEventHandler<HTMLDivElement> | undefined = (e) => {
        // console.log(e);
        if (e.button === 2) {
            store.dispatch({type: 'setFlag', payload: props.num })
            // setFlag((prevState) => !prevState);
        } else {
            setOpened(true)
            setInit(false);
            console.log('open cell');
            
        }
        
    }
    // if (props.status === 'init' || props.status === 'flag') {
               
        return (
            <div className={style.cell} onMouseUp={handleClick}>
                {props.status === 'flag'? <Flag/> : null}
                {/* {props.status === 'flag'? 'flag' : `${props.status}`}   */}
          </div>
    
        )
    // } 
    // else

    // if (typeof props.activeState === 'number') {
    //     return (
    //         <div className={style.cellOpened}>{props.activeState}</div>
    
    //     ) 
    // } 
    // else return <div className={style.cellOpened}></div> ;
    
}