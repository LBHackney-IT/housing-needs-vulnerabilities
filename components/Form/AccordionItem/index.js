import styles from './index.module.scss';

const AccordionItem = ({ children, heading, id, datatestid }) => (
  <div className="govuk-accordion__section" data-testid={datatestid}>
    <div
      className={`govuk-accordion__section-header ${styles['lbh-accordion__section-header']}`}
    >
      <h3 className="govuk-accordion__section-heading">
        <span className="govuk-accordion__section-button" id={id}>
          {heading}
        </span>
      </h3>
    </div>
    <div className="govuk-accordion__section-content" aria-labelledby={id}>
      {children}
    </div>
  </div>
);

export default AccordionItem;
