import React from 'react';
import style from './app.module.scss';
import { Field } from './components/field/Field';
import { Counter } from './components/counter/Counter';
import { Timer } from './components/timer/Timer';
import { ButtonStart } from './components/button/ButtonStart';

function App() {
  return (
    <div className={style.app}>
      <div className={style.app_panel}>    
        <Counter></Counter>
        <ButtonStart></ButtonStart>
        <Timer></Timer>
      </div>
      <div className={style.app_main}>
        <Field></Field>
      </div>
    </div>
  );
}

export default App;
