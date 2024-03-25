import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);

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