import App from 'next/app';
import cookie from 'cookie';
import Layout from 'components/Layout';
import './stylesheets/all.scss';

export default class MyApp extends App {
  componentDidMount = () => {
    window.GOVUKFrontend.initAll();
  };

  render() {
    const { Component, cookies, pageProps } = this.props;
    return (
      <>
        <Layout cookies={cookies}>
          <Component {...pageProps} />
        </Layout>
        <script src="/js/govuk.js"></script>
      </>
    );
  }
}

MyApp.getInitialProps = async context => {
  const baseProps = await App.getInitialProps(context);
  const cookies = cookie.parse(context.ctx.req.headers.cookie);
  return { cookies, ...baseProps };
};
