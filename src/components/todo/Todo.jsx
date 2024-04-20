import { createSignal, createMemo, createEffect,batch, For, Show  } from "solid-js";
import { createLocalStore, removeIndex } from "../utils";
import Input from '../input/Input';

import './todo.css'

const Todo = () => {
  const [newTitle, setTitle] = createSignal("");
  const [todos, setTodos] = createLocalStore("todos", []);
  const isPendingItemsClear = createMemo(() => !todos.some((todo) => !todo.done));

  const addTodo = (e) => {
    e.preventDefault();
    batch(() => {
      setTodos(todos.length, {
        title: newTitle(),
        done: false,
      });
      setTitle("");
    });
  };

  return (
    <div class="body" >
        <div>
            <form class="input-group" onSubmit={addTodo}>
                <label class="input-group__label">Write the Todo:</label>
                <input
                    class="input-group__input" 
                    placeholder="press enter to add"
                    required
                    value={newTitle()}
                    onInput={(e) => setTitle(e.currentTarget.value)}
                ><button class="add">Add</button></input>
                
            </form>
        </div>
        <div>
            <h3>Pending Items: </h3>
            <For each={todos}>
                {(todo, i) => (
                   <Input data-index={i()} done={todo.done} title={todo.title} index={i} setTodos={setTodos}/>
                )}
            </For>
            <Show when={isPendingItemsClear()} >
                <h4>You do not have more items pending to show.</h4>
            </Show>
        </div>
        <div>
            <h3>Done Items: </h3>
            <For each={todos}>
                {(todo, i) => (
                    <Show when={todo.done} >
                        <div>
                            <input
                                type="checkbox"
                                checked={todo.done}
                                onChange={(e) => setTodos(i(), "done", e.currentTarget.checked)}
                            />
                            <input
                                type="text"
                                value={todo.title}
                                onChange={(e) => setTodos(i(), "title", e.currentTarget.value)}
                            />
                            <button class="delete" onClick={() => setTodos((t) => removeIndex(t, i()))}>
                                Delete
                            </button>
                        </div>
                    </Show>
                )}
            </For>
        </div>
    </div>
  );
};

export default Todo;