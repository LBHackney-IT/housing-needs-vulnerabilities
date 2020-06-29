import createEndpoint from 'lib/api/utils/createEndpoint';
import Response from 'lib/api/domain/Response';
import { findResources } from 'lib/dependencies';

export const endpoint = ({ findResources }) =>
  createEndpoint({ allowedMethods: ['GET'] }, async () => {
    const resources = await findResources.execute();
    return Response.ok(resources);
  });

export default endpoint({ findResources });
