import { useEffect, useState } from 'react';
import { Cell } from '../cell/Cell';
import style from './field.module.scss';
// import {store} from '../../redux/store';
import { useSelector } from 'react-redux';
import { selectCells } from '../../redux/cellSlice';

export function Field () {
    // const [cells, setCells] = useState<Array<String>>();
    const cells = useSelector(selectCells);
    // const myStore = store.getState();
    // useEffect(() => {
    //     const arr = [];
    //     for (let i = 0; i < 9; i++) {
    //             // const row = [];
    //             for (let j = 0; j < 9; j++) {
    //                 const element = i + '' + j;   
    //                 arr.push(element);               
    //             }   
                   
    //     }
    //     setCells(arr);
    //     console.log(store.getState());
        
        
    // }, [])
    // store.subscribe(() => console.log(store.getState()));
    
    return (
        <div className={style.board}>
            {cells.map((e, ind) => <Cell key={ind} status={e.status} num={ind}></Cell>)}
        </div>
    )
}