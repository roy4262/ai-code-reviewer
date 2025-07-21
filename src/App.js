import Home from './Components/Home';
import ErrorBoundary from './Components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <div className="">
        <Home />
      </div>
    </ErrorBoundary>
  );
}

export default App;
