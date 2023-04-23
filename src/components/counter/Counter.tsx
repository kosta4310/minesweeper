import { useSelector } from 'react-redux';
import style from './counter.module.scss';
import { selectCount } from '../../redux/cellSlice';

export function Counter() {
    const count = useSelector(selectCount);

    return (
        <div className={style.counter}>{count}</div>
    )
}