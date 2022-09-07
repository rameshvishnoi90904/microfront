import React, { useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(0);
    const handleIncrement = () => setCount(count + 1);
    const handleDecrement = () => setCount(count - 1);
    return (
        <div className='counter'>
            <h3>This is Counter App Module</h3>
            <p><strong>{count}</strong></p>
            <div>
                <button onClick={handleIncrement} className='counter-btn'>+</button>
                <button onClick={handleDecrement} className='counter-btn'>-</button> 
            </div>
            
        </div>
    )
}
export default Counter;