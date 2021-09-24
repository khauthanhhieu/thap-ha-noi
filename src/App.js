import Board from "./components/Board";

function App() {
  const nDisk = 6
  return (
    <div className="App">
      <Board nDisk={nDisk} />
    </div>
  );
}

export default App;
