import { useEffect, useState } from 'react';
import { selectStartTimer } from '../../redux/cellSlice';
import style from './timer.module.scss';
import { useSelector } from 'react-redux';

export function Timer() {
    const startTimer = useSelector(selectStartTimer);
    const [tick, setTick] = useState(0);

    useEffect(() => {
        console.log(startTimer);
        
        let timerId: NodeJS.Timeout | undefined;
        if (startTimer) {

            timerId = setTimeout(function tickTak () {

                setTick((prev) => prev + 1);

                timerId = setTimeout(tickTak, 1000);
            }, 1000);
            
        } else clearTimeout(timerId);
        
        return () => {clearTimeout(timerId)};
    }, [startTimer])

    return (
        <div className={style.timer}>
            {tick}
        </div>
    )
}