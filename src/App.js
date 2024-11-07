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
import RedirectToExternal from './components/pages/RedirectPage';
import "./assets/scss/layout.scss";
import * as serviceWorker from "./serviceWorker";
import reportWebVitals from "./reportWebVitals";

function Layout({ children }) {
  const blue_logo = [Privacy, ClaimProcedure, MarriageTerms, Terms, ReviewView, Result].includes(children.type);

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
      <Footer topPath={location} />
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
        {/* 리다이렉트 페이지들 */}
        <Route path="/purchase/:id?/:uuid?" element={<Layout><RedirectToExternal /></Layout>} />
        <Route path="/purchasewait" element={<Layout><RedirectToExternal /></Layout>} />
        <Route path="/privacy/detail" element={<Layout><RedirectToExternal /></Layout>} />
        <Route path="/marketing/detail" element={<Layout><RedirectToExternal /></Layout>} />
        <Route path="/my/profile/:id?" element={<Layout><RedirectToExternal /></Layout>} />
        <Route path="/my/profile/detail/:id/:birth?" element={<Layout><RedirectToExternal /></Layout>} />
        <Route path="/introduce/user/:id?" element={<Layout><RedirectToExternal /></Layout>} />
        <Route path="/introduce/detail/:id/:birth?" element={<Layout><RedirectToExternal /></Layout>} />
        <Route path="/like/user/:id?" element={<Layout><RedirectToExternal /></Layout>} />
        <Route path="/like/detail/:id/:birth?" element={<Layout><RedirectToExternal /></Layout>} />
        <Route path="/like/user/profile/:id/:birth?" element={<Layout><RedirectToExternal /></Layout>} />
        <Route path="/like/user/profile/:id?" element={<Layout><RedirectToExternal /></Layout>} />
        <Route path="/image" element={<Layout><RedirectToExternal /></Layout>} />
        <Route path="/register" element={<Layout><RedirectToExternal /></Layout>} />

        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}


serviceWorker.unregister();
reportWebVitals();

export default App;
