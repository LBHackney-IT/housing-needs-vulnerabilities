import styles from './index.module.scss';

const Accordion = ({ children, title }) => (
  <div className="govuk-accordion" data-module="govuk-accordion">
    <div
      className={`govuk-accordion__controls ${styles['lbh-accordion__controls']}`}
    >
      <div>{title && <h2>{title}</h2>}</div>
    </div>
    {children}
  </div>
);

export default Accordion;
