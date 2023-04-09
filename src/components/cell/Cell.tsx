import { useState } from 'react';
import style from './cell.module.scss';
import { ReactComponent as Flag } from '../../icons/copy.svg';
import {store} from '../../redux/store';
import { useDispatch } from 'react-redux';


type ActiveType = 'empty' | 'bomb' | 'bum';
type Props = {
    status: string | number,
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
    // if (props.status === 'init' || props.status === 'flag') {
               
        return (
            <div className={props.status === 'opened' ? style.cellEmpty: style.cellInit} onMouseUp={handleClick}>
                {props.status === 'flag'? <Flag/> : null}
                {/* {props.status === 'empty' ? <div className='cellEmpty'></div>: null} */}
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