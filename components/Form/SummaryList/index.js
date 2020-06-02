const SummaryList = ({ name, entries }) => (
  <div className="govuk-form-group">
    <dl className="govuk-summary-list" id={name}>
      {Object.entries(entries).map(([key, value], index) => {
        return (
          <div className="govuk-summary-list__row" key={index}>
            <dt className="govuk-summary-list__key">{key}</dt>
            <dd className="govuk-summary-list__value">{value}</dd>
          </div>
        );
      })}
    </dl>
  </div>
);

export default SummaryList;
