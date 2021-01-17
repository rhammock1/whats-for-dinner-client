import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import NotFound from '../Components/404/404';

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <Redirect to="/404" />
      <Route path="/404" component={NotFound} />
    </section>

  );
}

export default NotFoundPage;
