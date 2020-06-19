const TextArea = ({ label, name, onChange, value }) => {
  const updateValue = e => {
    onChange(e.currentTarget.value);
  };
  return (
    <div className="govuk-form-group">
      <label className="govuk-label" htmlFor={`${name}`}>
        {label}
      </label>
      <textarea
        className="govuk-textarea"
        id={name}
        name={name}
        data-testid={name}
        rows="5"
        onChange={updateValue}
        value={value}
      ></textarea>
    </div>
  );
};

export default TextArea;
