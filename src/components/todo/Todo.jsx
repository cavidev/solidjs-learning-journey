import { createSignal, batch, For  } from "solid-js";
import { createLocalStore, removeIndex } from "../locaStorage/localStorage";
import { DeleteIcon } from "~/icons/DeleteIcon";
import './todo.css'
import clsx from "clsx";

const Todo = () => {
  const [newTitle, setTitle] = createSignal("");
  const [todos, setTodos] = createLocalStore("todos", []);

  const addTodo = (e) => {
    e.preventDefault();
    batch(() => {
      setTodos(todos.length, {
        title: newTitle(),
        done: false,
        deleteTimeout: undefined
      });
      setTitle("");
    });
  };

  /**
   * If the item is ready, we take 24h for delete it, 
   * if the user change the statuas as pendding the delete accion will be delete
   * @param {*} e Event 
   * @param {*} index The position of the item in the list
   */
  const readyItem = (e, index) => {
    const secondInHour = 3600;
    const timeToDelete = 24 * secondInHour;

    if(e.currentTarget.checked) {
        const id = setTimeout(() => setTodos((prev) => removeIndex(prev, index())), timeToDelete);
        setTodos(index(), "deleteTimeout", id)
    } else {
        clearTimeout(todos[index()].deleteTimeout);
    }
    setTodos(index(), "done", e.currentTarget.checked)
  }

  return (
    <div class="todoApp flex flex-col items-center text-cyan-50 gap-3" >
        <h1 class="text-5xl" >TODO LIST</h1>
        <div class="flex flex-col" >
            <form class="input-group" onSubmit={addTodo}>
                <label class="input-group__label">Press enter to save:</label>
                <input
                    class="input-group__input" 
                    placeholder="What do you need to do?"
                    required
                    value={newTitle()}
                    onInput={(e) => setTitle(e.currentTarget.value)}
                />
            </form>
        </div>
        <div class="flex flex-col gap-1 divide-y overflow-y-auto max-h-full" >
            <For each={todos}>
                {(todo, index) => (
                    <div class="flex h-10 flex-row flex-auto gap-1" >
                        <input
                            type="checkbox"
                            checked={todo.done}
                            onChange={(e) => readyItem(e, index)}
                        />
                        <input
                            class={clsx('text-xl flex-auto bg-transparent focus-visible:outline-0', todo.done && "line-through" )}
                            type="text"
                            value={todo.title}
                            onChange={(e) => setTodos(index(), "title", e.currentTarget.value)}
                        />
                        <button class="delete" onClick={() => setTodos((t) => removeIndex(t, index()))}>
                            <DeleteIcon />
                        </button>
                    </div>
                )}
            </For>
        </div>
    </div>
  );
};

export default Todo;