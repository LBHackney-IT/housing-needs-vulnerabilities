import styles from './index.module.scss';

const AccordionItem = ({ children, heading, id }) => (
  <div className="govuk-accordion__section" data-testid="accordion-item">
    <div
      className={`govuk-accordion__section-header ${styles['lbh-accordion__section-header']}`}
    >
      <h3 className="govuk-accordion__section-heading">
        <span className="govuk-accordion__section-button" id={id}>
          {heading}
        </span>
        <img
          src="https://i.ytimg.com/vi/Bor5lkRyeGo/hqdefault.jpg"
          alt="dot"
          width="20"
          className={`${styles['dis']}`}
        />
      </h3>
    </div>
    <div className="govuk-accordion__section-content" aria-labelledby={id}>
      {children}
    </div>
  </div>
);

export default AccordionItem;
