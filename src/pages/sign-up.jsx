'use client';
import { useState } from 'react';
import { auth } from '@/firebase/config'; // Adjust path based on your project structure
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const signUp = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setSuccess(`User created: ${user.email}`);
            sessionStorage.setItem('user', 'true')
            setEmail('');
            setPassword('');
        } catch (error) {
            setError(`Error: ${error.message} (Code: ${error.code})`);
        }
    };

    return (
        <div className={'w-full h-screen flex justify-center items-center flex-col'}>
            <form onSubmit={signUp} className={'flex justify-center items-center flex-col gap-2'}>
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
                <Button type="submit">Sign Up</Button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
}
