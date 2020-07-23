const TextArea = ({ label, name, onChange, value }) => {
  const updateValue = e => {
    onChange(e.currentTarget.value);
  };
  return (
    <div className="govuk-form-group" data-testid={name}>
      <label className="govuk-label govuk-grid-column-full" htmlFor={`${name}`}>
        {label}
      </label>
      <textarea
        className="govuk-textarea"
        id={name}
        name={name}
        rows="5"
        onChange={updateValue}
        value={value}
      ></textarea>
    </div>
  );
};

export default TextArea;
