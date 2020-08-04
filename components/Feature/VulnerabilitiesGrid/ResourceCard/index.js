import css from './index.module.scss';
import geoDistance from 'lib/api/utils/geoDistance';
import geoCoordinates from 'lib/api/utils/geoCoordinates';
import { useState } from 'react';

const ResourceCard = ({
  name,
  description,
  websites,
  address,
  postcode,
  tags,
  residentCoordinates,
  ...others
}) => {
  const [postcodeDistance, setPostcodeDistance] = useState(null);
  if (postcode && postcode.length > 2 && residentCoordinates) {
    residentCoordinates.then(resident => {
      if(resident){
        geoCoordinates(postcode).then(resource => {
          setPostcodeDistance(
            geoDistance(resident.lat, resident.long, resource.lat, resource.long)
          );
        })
      }
    });
  }

  return (
    <div className={`govuk-details__text ${css.resource}`} {...others}>
      <div className="tags-container">
        {tags.map(item=> (<span key={"tags-"+item} className={css.tags}>{item}</span>))}
      </div>
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
         
        <>
          <ul className={css.websites}>
            
            <li>
              {postcodeDistance && <>Distance: {postcodeDistance} miles</>}
            </li>
          </ul>
        </>
      
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
};

export default ResourceCard;
