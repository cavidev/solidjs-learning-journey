import styles from './App.module.css';
import Counting from './Components/Counter/Counter';

function App() {
  return (
    <div class={styles.App}>
      <h1>Counting Component</h1>
      <Counting/>
    </div>
  );
}

export default App;
