import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/HomePage'));
const Login = lazy(() => import('./pages/Login'));
const Home2 = lazy(() => import('./pages/HomePage2'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));
const Create = lazy(() => import('./pages/Create'));
const Upload = lazy(() => import('./pages/Upload'));
const PodcastDetails = lazy(() => import('./pages/PodcastDetails'));
const Explore = lazy(() => import('./pages/Explore'));

function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-green-500 font-bold text-xl">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home2 />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Dashboard" element={<Dashboard/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/create-podcast" element={<Create/>} />
          <Route path="/upload" element={<Upload/>} />
          <Route path="/podcast/:id" element={<PodcastDetails />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
