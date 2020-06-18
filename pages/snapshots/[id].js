import useSnapshot from 'lib/api/utils/useSnapshot';
import { requestSnapshot } from 'lib/api';
import HttpStatusError from 'lib/api/domain/HttpStatusError';
import { getToken } from 'lib/utils/token';
import { Button, TextArea } from 'components/Form';
import VulnerabilitiesGrid from 'components/Feature/VulnerabilitiesGrid';

const SnapshotSummary = ({ initialSnapshot, token }) => {
  const { snapshot, loading } = useSnapshot(initialSnapshot.snapshotId, {
    initialSnapshot,
    token
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  const { firstName, lastName } = snapshot;
  return (
    <>
      <h1>
        {firstName} {lastName}
      </h1>
      <VulnerabilitiesGrid />
      <TextArea name="notes" label="Any other notes you'd like to add?" />
      <Button text="Finish &amp; save" />
    </>
  );
};

SnapshotSummary.getInitialProps = async ({ query: { id }, req, res }) => {
  try {
    const token = getToken(req);
    const initialSnapshot = await requestSnapshot(id, { token });
    return {
      initialSnapshot,
      token
    };
  } catch (err) {
    res.writeHead(err instanceof HttpStatusError ? err.statusCode : 500).end();
  }
};

export default SnapshotSummary;
