import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFirebaseAuth } from '@/firebase/useFirebaseAuth';
import { useAdminAccess } from '@/firebase/useAdminAccess';
import Loading from '../loading';

const AdminProtected = ({ children }) => {
  const { user, loading: authLoading } = useFirebaseAuth();
  const { isAdmin, loading: adminLoading } = useAdminAccess();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !adminLoading) {
      if (!user) {
        router.push('/login');
      } else if (!isAdmin) {
        router.push('/');
      }
    }
  }, [user, isAdmin, authLoading, adminLoading, router]);

  if (authLoading || adminLoading) {
    return <Loading/>;
  }

  if (!user || !isAdmin) {
    return null;
  }

  return <>{children}</>;
};

export default AdminProtected;