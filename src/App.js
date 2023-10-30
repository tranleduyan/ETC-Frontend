import React, {lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const DashboardPage = lazy(() => import('./Pages/DashboardPage'));

function App() {
  return (
    <Router>
      {/* TODO: Loading Page */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
