import { Show, createEffect  } from "solid-js";
import { removeIndex } from "../utils";

const Input = (props) => {
    createEffect(() => console.log(props))

    return (
        <Show when={!!props?.done} >
            <div>
                <input
                    type="checkbox"
                    checked={props.done}
                    onChange={(e) => props.setTodos(props.index(), "done", e.currentTarget.checked)}
                />

            </div>
        </Show>
        )
};

export default Input;
/*
            <input
                type="text"
                value={props.title()}
                onChange={(e) => props.setTodos(props.index(), "title", e.currentTarget.value)}
            />
            <button class="delete" onClick={() => props.setTodos((t) => removeIndex(t, props.index()))}>
                Delete
            </button>

*/