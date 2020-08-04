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
  telephone,
  residentCoordinates,
  coordinates,
  ...others
}) => {
  const [postcodeDistance, setPostcodeDistance] = useState(null);
  if (postcode && postcode.length > 2 && residentCoordinates) {
    residentCoordinates.then(resident => {
      if(resident){
        if(!coordinates){
          geoCoordinates(postcode).then(resource => {
            setPostcodeDistance(
              geoDistance(resident.lat, resident.long, resource.lat, resource.long)
            );
          })
        } else {
          let lat, long;
          [lat, long] = coordinates.split(",");
          setPostcodeDistance(
            geoDistance(resident.lat, resident.long, lat, long)
          );
        }
      }
    });
  }

  return (
    <div className={`${css.resource}`} {...others}>
      <div className={css.tags__container}>
        {tags.map(item=> (<span key={"tags-"+item} className={css.tags}>{item}</span>))}
      </div>
      <h3>{name}</h3>
        <>
          <ul className={css.websites}>            
            <li>
              {postcodeDistance && <><span className={css.label}>Distance:</span> {postcodeDistance} miles</>}
            </li> 
            <li>
             <span className={css.label}>Availability:</span>
            </li>
            <li>
             <span className={css.label}>Days / Times:</span>
            </li>
            <li>
             <span className={css.label}>Distribution:</span>
            </li>
            <li>
             <span className={css.label}>Telephone:</span> {telephone}
            </li>
          </ul>
        </>
      
      <details className="govuk-details" data-module="govuk-details">
        <summary className="">View more information</summary>
        <div className={css.details}>
          <p>{description}</p>
          {address && (
            <>
              <h4>Address</h4>
              <p>{address}</p>
            </>
          )}
        </div>
        {websites && websites.length > 0 && (
        <>
          <ul className={css.websites}>
            {websites.map(website => (
              <li key={website}> Website: <a href={website} target="_blank" rel="noopener noreferrer">
                  {website}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
      </details>
    </div>
  );
};

export default ResourceCard;
