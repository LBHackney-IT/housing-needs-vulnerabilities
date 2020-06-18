const Checkbox = ({ checked, label, name, onClick, ...others }) => {
  return (
    <div className="govuk-checkboxes__item">
      <input
        className="govuk-checkboxes__input"
        id={name}
        name={name}
        type="checkbox"
        onClick={onClick}
        defaultChecked={checked}
        {...others}
      />
      <label className="govuk-label govuk-checkboxes__label" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
