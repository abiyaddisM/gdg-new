// lib/withAuth.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/config';

export default function withAuth(Component) {
    return function AuthenticatedComponent(props) {
        const router = useRouter();
        const [loading, setLoading] = useState(true);
        const [user, setUser] = useState(null);

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUser(user);
                } else {
                    router.replace('/sign-in');
                }
                setLoading(false);
            });

            return () => unsubscribe();
        }, []);

        if (loading) return <p>Loading...</p>;

        return user ? <Component {...props} user={user} /> : null;
    };
}
