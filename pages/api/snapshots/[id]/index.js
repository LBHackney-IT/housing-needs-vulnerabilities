import createEndpoint from 'lib/api/utils/createEndpoint';
import Response from 'lib/api/domain/Response';
import { getSnapshot } from 'lib/dependencies';

export const endpoint = ({ getSnapshot }) =>
  createEndpoint(
    {
      allowedMethods: ['GET'],
      validators: [
        {
          name: 'id',
          failureMessage: 'id is required',
          validate: ({ params }) => params.id?.length > 0
        }
      ]
    },
    async ({ params: { id } }) => {
      const result = await getSnapshot.execute({ id });
      return Response.ok(result);
    }
  );

export default endpoint({ getSnapshot });
