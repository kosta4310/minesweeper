import { useState } from 'react';
import style from './cell.module.scss';
import { ReactComponent as Flag } from '../../icons/flag.svg';
import { ReactComponent as Bomb } from '../../icons/bomb2.svg';
import {store} from '../../redux/store';
import { useDispatch } from 'react-redux';
import { CELL_MARKER, CELL_STATUS } from '../../redux/constants';


type ActiveType = 'empty' | 'bomb' | 'bum';
type Props = {
    status: string | number,
    marker: string | null,
    num: number
}

export function Cell(props: Props) {
    // const [flag, setFlag] = useState(false);
    // const [init, setInit] = useState(true);
    // const [opened, setOpened] = useState(false);
    const dispatch = useDispatch();

    const handleClick: React.MouseEventHandler<HTMLDivElement> | undefined = (e) => {
        // console.log(e);
        if (e.button === 2) {
            // if (props.status === 'init') {
            //     dispatch({type: 'cell/setFlag', payload: props.num })
            // }
            // if (props.status === 'flag') {
            //     dispatch({type: 'cell/delFlag', payload: props.num })
            // }
            dispatch({type: 'cell/checkFlag', payload: props.num })
            // setFlag((prevState) => !prevState);
        } else {
            dispatch({type: 'cell/checkClick', payload: props.num })
            // setOpened(true)
            // setInit(false);
            console.log('open cell');
            
        }
        
    }
    if (props.status === CELL_STATUS.INIT ) {
               
        return (
            <div className={style.cellInit} onMouseUp={handleClick}>
                {props.marker === 'flag' && <Flag/>}
                {/* {props.status === 'empty' ? <div className='cellEmpty'></div>: null} */}
                {/* {props.status === 'flag'? 'flag' : `${props.status}`}   */}
            </div>
    
        )
    } 
    // else

    // if (typeof props.activeState === 'number') {
    //     return (
    //         <div className={style.cellOpened}>{props.activeState}</div>
    
    //     ) 
    // } 
    else return <div className={style.cellOpened}>
        {props.marker === CELL_MARKER.BOMB && <Bomb></Bomb>}
    </div> ;
    
}