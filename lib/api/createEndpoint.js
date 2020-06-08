import Response from './response';
import { logger } from 'lib/infrastructure/logging';

export function createEndpoint({ allowedMethods, validators }, endpoint) {
  return async (req, res) => {
    function send(response) {
      Object.entries(response.headers).forEach(([key, value]) =>
        res.setHeader(key, value)
      );
      res.status(response.statusCode);
      return res.send(response.body);
    }

    const request = { params: req.query, body: req.body };

    if (!allowedMethods.includes(req.method)) {
      return send(Response.notAllowed());
    }

    const errors = validators
      ?.filter(rule => !rule.validate(request))
      .map(({ failureMessage }) => failureMessage);

    if (errors.length > 0) {
      return send(Response.badRequest({ errors }));
    }

    try {
      const response = await endpoint({
        logger,
        ...request
      });

      return send(response);
    } catch (err) {
      logger.error(err.message, { error: err });
      return send(Response.internalServerError());
    }
  };
}
