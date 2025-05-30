// pages/dashboard.js
import withAuth from '../lib/withAuth';
import { auth } from '@/firebase/config';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import {Button} from "@/components/ui/button";
import Roadmap from "@/components/RoadMap";

function Dashboard({ user }) {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/sign-in'); // Redirect to login page
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    return (
        <div>
            <h1>Welcome, {user.email}</h1>
            <Button onClick={handleLogout}>Sign Out</Button>
            <Roadmap></Roadmap>
        </div>
    );
}

export default withAuth(Dashboard);
