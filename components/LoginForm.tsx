import React, { useState } from 'react';
import { supabase } from '../services/supabase';
import { Mail, Lock, User, Loader2 } from 'lucide-react';

export const LoginForm: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            name,
                        },
                    },
                });
                if (error) throw error;
                alert('Check your email for the confirmation link!');
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-white">
            <div className="w-full max-w-sm space-y-8">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 mb-4">
                        <User size={32} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        {isSignUp ? 'Create your account' : 'Welcome back'}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {isSignUp
                            ? 'Join Gennova to unlock your genetic potential'
                            : 'Sign in to access your DNA insights'}
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleAuth}>
                    {error && (
                        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4 rounded-md shadow-sm">
                        {isSignUp && (
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Full Name"
                                />
                            </div>
                        )}

                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                placeholder="Email address"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : (isSignUp ? 'Sign up' : 'Sign in')}
                        </button>
                    </div>
                </form>

                <div className="text-center">
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-sm font-medium text-teal-600 hover:text-teal-500 transition-colors"
                    >
                        {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                    </button>
                </div>
            </div>
        </div>
    );
};
