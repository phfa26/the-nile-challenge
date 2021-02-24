import './App.css';
import Shop from './Shop';

let App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <p>
            This App was built using React :)
        </p>
      </header>
      <h1 className="page-title">THE NILE</h1>
        {Shop()}
    </div>
  );
}

export default App;
