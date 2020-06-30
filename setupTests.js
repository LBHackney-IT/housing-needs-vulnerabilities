import '@testing-library/jest-dom/extend-expect';

global.console = {
  log: jest.fn(), // console.log are ignored in tests
  error: console.error,
  warn: console.warn,
  info: console.info,
  debug: console.debug
};

process.env = Object.assign(process.env, {
  NEXT_PUBLIC_SINGLEVIEW_URL: 'https://staging-singleview.hackney.gov.uk'
});