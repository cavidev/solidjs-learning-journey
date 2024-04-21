import styles from './App.module.css';
import Todo from './components/todo/Todo'

function App() {
  return (
    <div class={styles.App}>
      <h1>TODO Items: </h1>
      {/** Change it for the aplication that you need. */}
      <Todo/>
    </div>
  );
}

export default App;
