'use client';
import { useState } from 'react';
import { auth } from '@/firebase/config'; // Adjust path based on your project structure
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {useRouter} from "next/router";

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const router = useRouter();
    const login = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const res = await signInWithEmailAndPassword(email, password);
            setSuccess('yes');
            console.log({res})
            // if(res){
            sessionStorage.setItem('user', 'true')
            router.push('/dashboard');
            // }
            setEmail('');
            setPassword('');
        } catch (error) {
            setError(`Error: ${error.message} (Code: ${error.code})`);
        }
    };

    return (
        <div className={'w-full bg-black h-screen flex justify-center items-center flex-col'}>
            <form onSubmit={login} className={'flex justify-center items-center flex-col gap-2'}>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    required
                />
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                />
                <Button type="submit">Sign In</Button>
            </form>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {success && <p style={{color: 'green'}}>{success}</p>}
        </div>
    );
}
