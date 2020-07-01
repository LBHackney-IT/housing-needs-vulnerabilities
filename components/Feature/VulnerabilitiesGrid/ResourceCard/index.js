import css from './index.module.scss';

const ResourceCard = ({ name, description, websites, address }) => (
  <div className={`govuk-details__text ${css.resource}`}>
    <h3>{name}</h3>
    <p>{description}</p>
    {websites && websites.length > 0 && (
      <>
        <h4>Links</h4>
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
    {address && (
      <>
        <h4>Address</h4>
        <p>{address}</p>
      </>
    )}
  </div>
);

export default ResourceCard;
