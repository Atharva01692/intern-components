import CardGrid from './components/CardGrid';
import './App.css';

function App() {
  return (
    <div className="App" style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: 'linear-gradient(135deg, #1e1e2e, #2d1b69, #1a1a2e)',
      minHeight: '100vh',
      padding: '2rem',
      overflowX: 'hidden'
    }}>
      <CardGrid />
    </div>
  );
}

export default App;