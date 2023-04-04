import { useState } from 'react';
import style from './cell.module.scss';

export function Cell() {
    const [flag, setFlag] = useState(false);
    const handleClick: React.MouseEventHandler<HTMLDivElement> | undefined = (e) => {
        // console.log(e);
        if (e.button === 2) {
            setFlag((prevState) => !prevState);
        } else {
            console.log('open cell');
            
        }
        
    }
    return (
        <div className={style.cell} onMouseUp={handleClick}>{flag && 'F'}</div>

    )
}