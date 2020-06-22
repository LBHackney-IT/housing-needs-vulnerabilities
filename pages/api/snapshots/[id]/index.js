import createEndpoint from 'lib/api/utils/createEndpoint';
import Response from 'lib/api/domain/Response';
import { getSnapshot, updateSnapshot } from 'lib/dependencies';

export const endpoint = ({ getSnapshot, updateSnapshot }) =>
  createEndpoint(
    {
      allowedMethods: ['GET', 'PATCH']
    },
    async ({ method, params: { id }, body: snapshot }) => {
      if (method === 'PATCH') {
        await updateSnapshot.execute({ snapshot });
        return Response.noContent();
      }

      const result = await getSnapshot.execute({ id });
      return Response.ok(result);
    }
  );

export default endpoint({ getSnapshot, updateSnapshot });
