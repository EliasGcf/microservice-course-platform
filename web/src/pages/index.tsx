import { getSession } from '@auth0/nextjs-auth0';
import type { GetServerSideProps, NextPage } from 'next';

const Home: NextPage = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = getSession(ctx.req, ctx.res);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/login',
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: '/app',
      permanent: false,
    },
  };
};

export default Home;
