import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, ProjectsPage, NotFoundPage } from './pages';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}