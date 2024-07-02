import { useRouter } from 'next/router';

const SettingsPage = () => {
  const router = useRouter();
  const { rest } = router.query;

  const dynamicSegments = Array.isArray(rest) ? rest.join('/') : rest;

  return (
    <div>
      <h1>Settings Page</h1>
      <p>Dynamic segments: {dynamicSegments || 'none'}</p>
    </div>
  );
};

export default SettingsPage;