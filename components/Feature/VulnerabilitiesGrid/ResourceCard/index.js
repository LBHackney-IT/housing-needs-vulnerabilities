import css from './index.module.scss';

const ResourceCard = ({ name, description, websites, address, ...others }) => (
  <div className={`govuk-details__text ${css.resource}`} {...others}>
    <h3>{name}</h3>
    {websites && websites.length > 0 && (
      <>
        <ul className={css.websites}>
          {websites.map(website => (
            <li key={website}>
              <a href={website} target="_blank" rel="noopener noreferrer">
                {website}
              </a>
            </li>
          ))}
        </ul>
      </>
    )}
    <details className="govuk-details" data-module="govuk-details">
      <summary className="">View more</summary>
      <div className={css.details}>
        <p>{description}</p>
        {address && (
          <>
            <h4>Address</h4>
            <p>{address}</p>
          </>
        )}
      </div>
    </details>
  </div>
);

export default ResourceCard;
