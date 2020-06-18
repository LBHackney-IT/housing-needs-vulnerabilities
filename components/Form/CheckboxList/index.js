const CheckboxList = ({ children, className }) => {
  return (
    <div className="govuk-form-group">
      <div
        className={`govuk-checkboxes ${className ? `${className}-group` : ''}`}
      >
        {children}
      </div>
    </div>
  );
};

export default CheckboxList;
