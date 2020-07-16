import styles from './index.module.scss';

const AccordionItem = ({
  children,
  heading,
  id,
  hasSelectedVulnerabilities,
  hasSelectedAssets
}) => (
  <div className="govuk-accordion__section" data-testid="accordion-item">
    <div
      className={`govuk-accordion__section-header ${styles['lbh-accordion__section-header']}`}
    >
      <h3 className="govuk-accordion__section-heading">
        <span className="govuk-accordion__section-button" id={id}>
          {heading}
        </span>
        {hasSelectedAssets && (
          <span className={`${styles['assets-dot']}`}></span>
        )}
        {hasSelectedVulnerabilities && (
          <span
            hidden={true}
            className={`${styles['vulnerabilities-dot']}`}
          ></span>
        )}
      </h3>
    </div>
    <div className="govuk-accordion__section-content" aria-labelledby={id}>
      {children}
    </div>
  </div>
);

export default AccordionItem;
