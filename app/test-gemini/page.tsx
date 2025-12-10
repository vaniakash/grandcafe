'use client';

import { useState } from 'react';

export default function TestGeminiPage() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const testGemini = async () => {
        setLoading(true);
        setError('');
        setResponse('');

        try {
            const res = await fetch('/api/test-gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
            });

            const data = await res.json();

            if (data.error) {
                setError(data.error);
            } else {
                setResponse(data.response);
            }
        } catch (err: any) {
            setError(`Request failed: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        🧪 Gemini AI Test Page
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Test the Gemini 2.5 Flash integration
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Test Message
                            </label>
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="e.g., 'Hello, tell me a joke'"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                onKeyPress={(e) => e.key === 'Enter' && testGemini()}
                            />
                        </div>

                        <button
                            onClick={testGemini}
                            disabled={loading || !message.trim()}
                            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? '⏳ Testing...' : '🚀 Test Gemini'}
                        </button>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-800 font-semibold">❌ Error:</p>
                                <p className="text-red-600 text-sm mt-1">{error}</p>
                            </div>
                        )}

                        {response && (
                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-green-800 font-semibold mb-2">
                                    ✅ Gemini Response:
                                </p>
                                <p className="text-gray-700 whitespace-pre-wrap">{response}</p>
                            </div>
                        )}

                        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                            <p className="text-sm font-semibold text-blue-900 mb-2">
                                💡 Quick Tests:
                            </p>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setMessage('Hello! Can you introduce yourself?')}
                                    className="w-full text-left px-3 py-2 text-sm bg-white hover:bg-blue-100 rounded transition-colors"
                                >
                                    Test basic response
                                </button>
                                <button
                                    onClick={() => setMessage('What is 25 * 37?')}
                                    className="w-full text-left px-3 py-2 text-sm bg-white hover:bg-blue-100 rounded transition-colors"
                                >
                                    Test math calculation
                                </button>
                                <button
                                    onClick={() =>
                                        setMessage('Tell me a short joke about programming')
                                    }
                                    className="w-full text-left px-3 py-2 text-sm bg-white hover:bg-blue-100 rounded transition-colors"
                                >
                                    Test creative response
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <a
                        href="/"
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                    >
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
}
