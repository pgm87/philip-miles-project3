
import './App.css';
import Header from './Header';
import LabelSearch from './LabelSearch';
import Footer from './Footer';

function App() {
  return (
    <div >
      {/* simple header */}
      <Header className="wrapper" />
      {/* label search component */}
      <LabelSearch className="wrapper" />

      <Footer />
    </div>
  );
}

export default App;
