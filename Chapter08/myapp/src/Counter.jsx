import { useState } from "react";
import useTitle from './useTitle';
import './App.css';

function Counter() {
    const [count, setCount] = useState(0);
    useTitle(`You clicked ${count} times`);

    return (
        <div>
            <p>Counter = {count}</p>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>
                Increment
            </button>
        </div>
    );
}

export default Counter