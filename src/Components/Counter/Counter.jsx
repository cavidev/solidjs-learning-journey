import { createSignal, onCleanup } from "solid-js";
import { render } from "solid-js/web";

const Counting = () => {
    const [count, setCount] = createSignal(0);
    const interval = setInterval(
        () => setCount(c => c + 1), 1000
    );
    onCleanup(() => clearInterval(interval));

    const reset = () => {
        setCount(0);
    };

    return (
    <div> 
        <div>
            Count value is: {count()}
        </div>
        <div>
            <button onClick={reset} >Reset</button>
        </div>
    </div>)
}

export default Counting;