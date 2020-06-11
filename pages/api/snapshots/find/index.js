import Response from 'lib/api/response';
import { createEndpoint } from 'lib/api/createEndpoint';
import { findSnapshots } from 'lib/dependencies';

export const endpoint = ({ findSnapshots }) =>
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
        }
      ]
    },
    async ({ body: { firstName, lastName, systemIds } }) => {
      const result = await findSnapshots.execute({
        firstName,
        lastName,
        systemIds
      });
      return Response.ok(result);
    }
  );

export default endpoint({ findSnapshots });
