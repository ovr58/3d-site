import React from 'react';
import PropTypes from 'prop-types';
import './PageShell.css';
import { PageContextProvider } from './usePageContext';
import { childrenPropType } from './PropTypeValues';

export { PageShell };

function PageShell({ pageContext, children }) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <Layout>
          <Content>{children}</Content>
        </Layout>
      </PageContextProvider>
    </React.StrictMode>
  );
}
PageShell.propTypes = {
  pageContext: PropTypes.any,
  children: childrenPropType,
};

function Layout({ children }) {
  return <div className="relative z-0 bg-primary">{children}</div>;
}
Layout.propTypes = {
  children: childrenPropType,
};

function Content({ children }) {
  return <div>{children}</div>;
}
Content.propTypes = {
  children: childrenPropType,
};
