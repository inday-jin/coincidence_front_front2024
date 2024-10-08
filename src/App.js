import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import PageTop from './components/PageTop';

import Introduce from './components/pages/Introduce';
import Whypage from './components/pages/WhyPage';
import Process from './components/pages/Process';
import Product from './components/pages/Product';

import Contact from './components/pages/Contact';
import Request from './components/pages/Request';
import Result from './components/pages/Result';
import ReviewList from './components/pages/ReviewList';
import ReviewView from './components/pages/ReviewView';

import Terms from './components/pages/Terms';
import Privacy from './components/pages/Privacy';
import MarriageTerms from './components/pages/MarriageTerms';
import ClaimProcedure from './components/pages/ClaimProcedure';

import NotFound from './components/pages/NotFound';

import "./assets/scss/layout.scss";
import * as serviceWorker from "./serviceWorker";
import reportWebVitals from "./reportWebVitals";

function Layout({ children }) {
  const blue_logo = children.type.name === 'Privacy' || 
  children.type.name === 'ClaimProcedure' || 
  children.type.name === 'MarriageTerms' || 
  children.type.name === 'Terms' || 
  children.type.name === 'ReviewView' || 
  children.type.name === 'Result'

  const location = useLocation();

  return (
    <>
      <Header blue_logo={blue_logo} />
      <main>
        {children.type.name !== 'NotFound' ?
          <PageTop topPath={location}/>
          : <></>
        }
        {children}
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Navigate to="/dashboard" /></Layout>} />
        <Route path="/introduce" element={<Layout><Introduce /></Layout>} />
        <Route path="/dashboard" element={<Layout><Introduce /></Layout>} />
        <Route path="/whypage" element={<Layout><Whypage /></Layout>} />
        <Route path="/process" element={<Layout><Process /></Layout>} />
        <Route path="/products/list" element={<Layout><Product /></Layout>} />
        
        <Route path="/coupleReview/view/:id?" element={<Layout><ReviewView pathname="coupleReview" /></Layout>} />
        <Route path="/partyReview/view/:id?" element={<Layout><ReviewView pathname="partyReview" /></Layout>} />
        <Route path="/coupleReview/:id?" element={<Layout><ReviewList pathname="coupleReview" /></Layout>} />
        <Route path="/partyReview/:id?" element={<Layout><ReviewList pathname="partyReview" /></Layout>} />

        <Route path="/contact" element={<Layout><Contact /></Layout>} />

        <Route path="/consult/request" element={<Layout><Request /></Layout>} />
        <Route path="/result" element={<Layout><Result /></Layout>} />

        <Route path="/terms" element={<Layout><Terms /></Layout>} />
        <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
        <Route path="/marriageTerms" element={<Layout><MarriageTerms /></Layout>} />
        <Route path="/claimProcedure" element={<Layout><ClaimProcedure /></Layout>} />

        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}


serviceWorker.unregister();
reportWebVitals();

export default App;
