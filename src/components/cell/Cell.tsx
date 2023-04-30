import style from './cell.module.scss';
import { ReactComponent as Flag } from '../../icons/flag.svg';
import { ReactComponent as Bomb } from '../../icons/bomb2.svg';
import { useDispatch } from 'react-redux';
import { CELL_MARKER, CELL_STATUS } from '../../redux/constants';
import { useSelector } from 'react-redux';
import { selectStartTimer } from '../../redux/cellSlice';


type Props = {
    status: string | number,
    marker: string | null,
    num: number,
    number: number | undefined
}

export function Cell(props: Props) {
    const startTimer = useSelector(selectStartTimer);
    const dispatch = useDispatch();

    const handleClick: React.MouseEventHandler<HTMLDivElement> | undefined = (e) => {
        if (!startTimer) {
            dispatch({type: 'cell/setStartTimer'});
        }
        if (e.button === 2) {
           
            dispatch({type: 'cell/checkFlag', payload: props.num })
        } else {
            dispatch({type: 'cell/checkClick', payload: props.num })
            
            
        }
        
    }

    if (props.status === CELL_STATUS.INIT ) {
               
        return (
            <div className={style.cellInit} onMouseUp={handleClick}>
                {props.marker === 'flag' && <Flag/>}
            </div>
    
        )
    } else if (props.status === CELL_STATUS.BUM) {
        return (
            <div className={style.cellBum}>
                <Bomb/>
            </div>
    
        )
    } else if (props.status === CELL_STATUS.FLAG_FALSY) {
        return (
            <div className={style.cellFlagFalsy}>
                <Flag/>
            </div>
        )
    }
     
    else return <div className={style.cellOpened}>
        {props.marker === CELL_MARKER.BOMB && <Bomb></Bomb>}
        {props.marker === CELL_MARKER.NUMBER && <span>{props.number}</span>}
    </div> ;
    
}