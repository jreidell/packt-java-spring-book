import { useEffect, useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);

    // called after each render
    useEffect(() => {
        console.log(`Counter value is now ${count}`);
        return () => {
            console.log("Clean up function");
        };
    }, [count]);

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