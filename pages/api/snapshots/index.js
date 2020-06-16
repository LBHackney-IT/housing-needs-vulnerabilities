import Response from 'lib/api/response';
import { createEndpoint } from 'lib/api/createEndpoint';
import { createSnapshot } from 'lib/dependencies';

export const endpoint = ({ createSnapshot }) =>
  createEndpoint(
    {
      allowedMethods: ['POST'],
      validators: [
        {
          name: 'firstName',
          failureMessage: 'first name is required',
          validate: ({ body }) => body.firstName?.length > 0
        },
        {
          name: 'lastName',
          failureMessage: 'last name is required',
          validate: ({ body }) => body.lastName?.length > 0
        },
        {
          name: 'systemIds',
          failureMessage: 'at least one system id is required',
          validate: ({ body }) =>
            Array.isArray(body.systemIds) && body.systemIds?.length > 0
        }
      ]
    },
    async ({ body: { firstName, lastName, systemIds } }) => {
      const snapshot = await createSnapshot.execute({
        firstName,
        lastName,
        systemIds
      });
      return Response.created(snapshot);
    }
  );

export default endpoint({ createSnapshot });
