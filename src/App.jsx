import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ErrorPage from './components/ErrorPage';
import SEO from './components/SEO';
import './styles/main.css';

function HomePage() {
  return (
    <>
      <SEO
        title="Learning AI | A Developer's Journey"
        description="A blog about learning AI, machine learning, and the journey of a developer exploring artificial intelligence."
      />
      <main>
        <div className="container">
          <Hero />
          <PostList />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:slug" element={<PostDetail />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
