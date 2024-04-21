import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";

export function createLocalStore(name, init) {
    const localState = localStorage.getItem(name);
    
    const [state, setState] = createStore(
        localState ? JSON.parse(localState) : init
    );

    // Runs after the render phase
    createEffect(() => localStorage.setItem(name, JSON.stringify(state)));
    return [state, setState];
}

export function removeIndex(array, index) {
    return [...array.slice(0, index), ...array.slice(index + 1)];
};
