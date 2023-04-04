import { useEffect, useState } from 'react';
import { Cell } from '../cell/Cell';
import style from './field.module.scss';

export function Field () {
    const [cells, setCells] = useState<Array<String>>();
    useEffect(() => {
        const arr = [];
        for (let i = 0; i < 9; i++) {
                // const row = [];
                for (let j = 0; j < 9; j++) {
                    const element = i + '' + j;   
                    arr.push(element);               
                }   
                   
        }
        setCells(arr);
        console.log(arr);
        
        
    }, [])
    
    return (
        <div className={style.board}>
            {cells?.map(e => <Cell key={Number(e)}></Cell>)}
        </div>
    )
}