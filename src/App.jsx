import styles from './App.module.css';
import Todo from './components/todo/Todo'

function App() {
  return (
    <div class={styles.App}>
      <h1>TODO Items: </h1>
      <Todo/>
    </div>
  );
}

export default App;
