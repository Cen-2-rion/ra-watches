import React, { useState, useEffect } from 'react';
import { ClockProps } from './types';

const Clock: React.FC<ClockProps> = ({ id, name, timezone, onRemove }) => {
  // храним текущее время в локальном часовом поясе в стейте компонента
  const [time, setTime] = useState(new Date());

  // запускаем таймер с интервалом 1 секунда и обновляем текущее время при каждом промежутке
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId); // очищаем таймер при размонтировании
  }, []);

  // находим текущее время в локальном часовом поясе
  const localTime = new Date(time.getTime() + timezone * 60 * 60 * 1000);
  const hours = localTime.getUTCHours();
  const minutes = localTime.getUTCMinutes();
  const seconds = localTime.getUTCSeconds();

  // вычисляем угол поворота стрелок в градусах
  const hourAngle = 30 * (hours + (1/60) * minutes);
  const minuteAngle = 6 * (minutes + (1/60) * seconds);
  const secondAngle = 6 * seconds;

  return (
    <div className='clock'>
      <div className='clock-header'>
        <span className='clock-name'>{name}</span>
        <button className='clock-remove-btn' onClick={() => onRemove(id)}>x</button>
      </div>
      <div className='clock-face'>
        <div className='hour-hand' style={{ transform: `rotate(${hourAngle}deg)` }} />
        <div className='minute-hand' style={{ transform: `rotate(${minuteAngle}deg)` }} />
        <div className='second-hand' style={{ transform: `rotate(${secondAngle}deg)` }} />
      </div>
    </div>
  );
}

export default Clock;
