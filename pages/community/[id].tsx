import useRouter from '../../hooks/useRouter';
import Layout from '../../layouts/Main';
import { Community } from '../../components/Community/Community';

const CommunityPage = () => {
  const router = useRouter();
  const communityId = router.query.id;

  if (typeof communityId !== 'string') {
    return null;
  }

  return (
    <Layout>
      <Community id={communityId} />
    </Layout>
  );
};

export default CommunityPage;