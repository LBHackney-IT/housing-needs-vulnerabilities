import css from './index.module.scss';
import geoDistance from 'lib/api/utils/geoDistance';
import geoCoordinates from 'lib/api/utils/geoCoordinates';
import { useState } from 'react';
import SummaryList from 'components/Form/SummaryList';

const DISTRIBUTION_ARRAY = ['Delivery', 'Collection']

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
  const trimLength = (s, length) => s.length > length ? s.substring(0, length) + "..." : s

  const selfReferralElement = (selfReferral == 'No') ? 'Referral required' : 'Self referral'
  const websiteElement = websites && websites.length > 0 &&  websites.map(website => (<a href={websites[0]} target="_blank" rel="noopener noreferrer">{websites[0]}</a>))
  const distributionElement =  tags.filter(t => DISTRIBUTION_ARRAY.includes(t)).join(", ")
  const tagsElement = tags.filter(t => !DISTRIBUTION_ARRAY.includes(t)).map(item=> (<span key={"tags-"+item} className={css.tags}>{trimLength(item, 20)}</span>))

  return (
    <div className={`${css.resource}`} {...others}>
      <div className={css.tags__container}>
        {tagsElement}
      </div>
      <h3>{name}</h3>
        <>
        <SummaryList key="resourceInfo" name={['resourceInfo']} entries={{ 'Distance': (postcodeDistance) ? postcodeDistance + ' miles' : null ,
      'Availability': currentProvision, 'Days / Times' : openingTimes, 'Distribution' : distributionElement, 'Telephone' : telephone}} customStyle="small" />

        </>
      
      <details className="govuk-details" data-module="govuk-details">
        <summary className="">View more information</summary>

        <SummaryList key="moreResourceInfo" name={'moreResourceInfo'} entries={{ 'How to contact': selfReferralElement,
      'Address': address, 'Description' : description, 'Website' : websiteElement, 'Additional notes' : notes }} customStyle="small" />

      </details>
    </div>
  );
};

export default ResourceCard;
