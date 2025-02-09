import React, { useState } from 'react';
import Clock from './Clock';
import { ClockData } from './types';

const ClockForm: React.FC = () => {
  const [clocks, setClocks] = useState<ClockData[]>([]); // массив часов
  const [name, setName] = useState('');
  const [timezone, setTimezone] = useState<number | ''>('');

  const addClock = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // проверяем, что поля не пустые
    if (name && timezone !== '') {
      // добавляем часы и очищаем поля ввода
      setClocks([...clocks, { id: Date.now(), name, timezone: Number(timezone) }]);
      setName('');
      setTimezone('');
    }
  }

  // удаляем часы из массива при нажатии на кнопку удаления
  const removeClock = (id: number) => {
    setClocks(clocks.filter((clock) => clock.id !== id));
  }

  // обработчик изменения полей ввода
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // проверяем, какое поле изменяется и соответственно меняем состояние
    if (name === 'name') {
      setName(value.trim());
    } else {
      setTimezone(value === '' ? '' : Number(value));
    }
  }

  return (
    <div className='container'>
      <form className='form' onSubmit={addClock}>
        <div className='form-wrapper'>
          <label htmlFor='name'>Название</label>
          <input
            id='name'
            name='name'
            type='text'
            value={name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='form-wrapper'>
          <label htmlFor='timezone'>Временная зона</label>
          <input
            id='timezone'
            name='timezone'
            type='number'
            min={-12}
            max={14}
            value={timezone}
            onChange={handleInputChange}
            required
          />
        </div>
        <button className='form-add-btn' type='submit'>Добавить</button>
      </form>
      <div className='clocks'>
        {clocks.map((clock) => (
          <Clock key={clock.id} {...clock} onRemove={removeClock} />
        ))}
      </div>
    </div>
  );
}

export default ClockForm;
