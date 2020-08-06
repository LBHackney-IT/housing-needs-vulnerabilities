import App from 'next/app';
import TagManager from 'react-gtm-module';
import Layout from 'components/Layout';
import './stylesheets/all.scss';

export default class MyApp extends App {
  componentDidMount = () => {
    window.GOVUKFrontend.initAll();
    TagManager.initialize({
      gtmId: process.env.NEXT_PUBLIC_GTM_ID
    });
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <script src="/js/govuk.js"></script>
      </>
    );
  }
}
