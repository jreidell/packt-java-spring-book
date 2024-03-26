import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Link 
} from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import PageNotFound from './PageNotFound';
import './App.css';
import ContactLondon from './ContactLondon';
import ContactParis from './ContactParis';

function App() {
  return (
    <>
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>{' | '}
        <Link to="/contact">Contact</Link>{' | '}
        <Link to="/contact/london">Contact London</Link>{' | '}
        <Link to="/contact/paris">Contact Paris</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="contact">
          <Route index={true} element={<Contact />} />
          <Route path="london" element={<ContactLondon />} />
          <Route path="paris" element={<ContactParis />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
