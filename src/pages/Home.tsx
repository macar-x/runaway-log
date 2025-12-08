import { Dashboard } from '../components/Dashboard';
import { Layout } from '../components/Layout';

interface HomeProps {
  username: string;
  onLogout: () => void;
}

export const Home = ({ username, onLogout }: HomeProps) => {
  return (
    <Layout username={username} onLogout={onLogout}>
      <Dashboard username={username} onLogout={onLogout} showHeader={false} />
    </Layout>
  );
};
