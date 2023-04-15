import { Cell } from '../cell/Cell';
import style from './field.module.scss';
import { useSelector } from 'react-redux';
import { selectCells } from '../../redux/cellSlice';

export function Field () {
    const cells = useSelector(selectCells);
    
    return (
        <div className={style.board}>
            {cells.map((e, index) => <Cell key={index} status={e.status} marker={e.marker} number={e.number} num={index}></Cell>)}
        </div>
    )
}