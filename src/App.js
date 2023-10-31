// Import Components
import React, {lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Page Components
const SignInPage = lazy(() => import('./Pages/SignInPage'));

function App() {
  return (
    <Router>
      {/* TODO: Loading Page */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<SignInPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
