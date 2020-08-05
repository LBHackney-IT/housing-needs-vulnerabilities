import css from './index.module.scss';
import geoDistance from 'lib/api/utils/geoDistance';
import geoCoordinates from 'lib/api/utils/geoCoordinates';
import { useState } from 'react';
import SummaryList from 'components/Form/SummaryList';

const ResourceCard = ({
  name,
  description,
  websites,
  address,
  postcode,
  tags,
  telephone,
  openingTimes,
  currentProvision,
  email,
  referralContact,
  selfReferral,
  notes,
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
  const selfReferralElement = (selfReferral == 'No') ? 'Referral required' : 'Self referral'
  const websiteElement = (<a href={websites[0]} target="_blank" rel="noopener noreferrer">{websites[0]}</a>)

  return (
    <div className={`${css.resource}`} {...others}>
      <div className={css.tags__container}>
        {tags.map(item=> (<span key={"tags-"+item} className={css.tags}>{item}</span>))}
      </div>
      <h3>{name}</h3>
        <>
        <SummaryList name={['postcodeDistance', 'description']} entries={{ 'Distance': postcodeDistance + ' miles',
      'Availability': currentProvision, 'Days / Times' : openingTimes, 'Telephone' : telephone}} customStyle="small" />

        </>
      
      <details className="govuk-details" data-module="govuk-details">
        <summary className="">View more information</summary>

        <SummaryList name={['a', 'b']} entries={{ 'How to contact': selfReferralElement,
      'Address': address, 'Description' : description, 'Website' : websiteElement, 'Additional notes' : notes }} customStyle="small" />

      </details>
    </div>
  );
};

export default ResourceCard;
