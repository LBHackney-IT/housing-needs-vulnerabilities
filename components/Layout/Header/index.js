import HackneyLogo from './HackneyLogo';
import css from './index.module.scss';

const Header = ({ serviceName }) => (
  <header className="govuk-header" role="banner" data-module="govuk-header">
    <a
      href="/"
      className={`govuk-header__container govuk-width-container ${css['lbh-header__container']}`}
    >
      <div className="govuk-header__logo">
        <div className="govuk-header__link govuk-header__link--homepage">
          <span
            className={`govuk-header__logotype ${css['lbh-header__logotype']}`}
          >
            <HackneyLogo />
          </span>
        </div>
      </div>
      <div className="govuk-header__content">
        <div className="govuk-header__link govuk-header__link--service-name">
          {serviceName}
        </div>
      </div>
    </a>
  </header>
);

export default Header;
