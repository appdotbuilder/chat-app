import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { MessageCircle, Phone, Users, Shield, Zap, Globe, Smartphone, Camera, Mic } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const features = [
        {
            icon: <MessageCircle className="w-6 h-6" />,
            title: "💬 Instant Messaging",
            description: "Send text, emojis, stickers, and GIFs with real-time delivery"
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: "📞 HD Voice & Video Calls",
            description: "Crystal clear voice and video calls with your contacts"
        },
        {
            icon: <Camera className="w-6 h-6" />,
            title: "📸 Status Stories",
            description: "Share photos, videos, and text that disappear after 24 hours"
        },
        {
            icon: <Shield className="w-6 h-6" />,
            title: "🔐 End-to-End Encrypted",
            description: "Your messages are secured with military-grade encryption"
        },
        {
            icon: <Zap className="w-6 h-6" />,
            title: "⚡ Lightning Fast",
            description: "Optimized for speed and minimal data usage"
        },
        {
            icon: <Globe className="w-6 h-6" />,
            title: "🌍 Cross-Platform Sync",
            description: "Seamlessly switch between Android, iOS, and Web"
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "👥 Group Chats",
            description: "Create groups with up to 256 participants"
        },
        {
            icon: <Mic className="w-6 h-6" />,
            title: "🎵 Voice Messages",
            description: "Send voice notes with animated waveform visualization"
        }
    ];

    return (
        <>
            <Head title="ChatApp - Modern Messaging">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-[#25D366] via-[#20B858] to-[#1DA851] text-white">
                {/* Header */}
                <header className="relative z-10 px-6 py-4">
                    <nav className="flex items-center justify-between max-w-6xl mx-auto">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                <MessageCircle className="w-6 h-6 text-[#25D366]" />
                            </div>
                            <span className="text-xl font-bold">ChatApp</span>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="bg-white text-[#25D366] px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors"
                                >
                                    Open Chat 💬
                                </Link>
                            ) : (
                                <div className="flex space-x-3">
                                    <Link
                                        href={route('login')}
                                        className="text-white border border-white/30 px-6 py-2 rounded-full font-medium hover:bg-white/10 transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-white text-[#25D366] px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors"
                                    >
                                        Get Started Free
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="px-6 py-16 text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-8">
                            <div className="inline-flex items-center space-x-3 bg-white/10 rounded-full px-6 py-3 mb-6">
                                <span className="text-sm font-medium">🚀 Modern messaging reimagined</span>
                            </div>
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Chat Smarter,<br />
                            Connect <span className="text-yellow-300">Better</span>
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                            Experience the future of messaging with our WhatsApp-inspired platform. 
                            End-to-end encryption, crystal-clear calls, and seamless syncing across all devices.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                            {!auth.user && (
                                <>
                                    <Link
                                        href={route('register')}
                                        className="bg-white text-[#25D366] px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                                    >
                                        Start Chatting Free 🎉
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                </>
                            )}
                            {auth.user && (
                                <Link
                                    href={route('dashboard')}
                                    className="bg-white text-[#25D366] px-12 py-4 rounded-full font-semibold text-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                                >
                                    Continue Chatting 💬
                                </Link>
                            )}
                        </div>

                        {/* Mock Chat Interface Preview */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 max-w-md mx-auto shadow-2xl">
                            <div className="bg-white rounded-2xl p-4 space-y-3">
                                <div className="flex items-center space-x-3 border-b border-gray-100 pb-3">
                                    <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white font-semibold">
                                        A
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Alice Johnson</h3>
                                        <p className="text-sm text-gray-500">Online</p>
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-2 max-w-[70%]">
                                        <p className="text-sm text-gray-900">Hey! How are you doing? 😊</p>
                                    </div>
                                    <div className="bg-[#25D366] rounded-2xl rounded-tr-md px-4 py-2 max-w-[70%] ml-auto text-white">
                                        <p className="text-sm">Great! Just trying this new chat app 🚀</p>
                                    </div>
                                    <div className="bg-gray-100 rounded-2xl rounded-tl-md px-4 py-2 max-w-[70%]">
                                        <p className="text-sm text-gray-900">It looks amazing! 🤩</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="px-6 py-20 bg-white text-gray-900">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4">✨ Everything You Need</h2>
                            <p className="text-xl text-gray-600">Packed with features that make communication effortless</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, index) => (
                                <div key={index} className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="w-14 h-14 bg-[#25D366]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <div className="text-[#25D366]">{feature.icon}</div>
                                    </div>
                                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Platform Support */}
                <section className="px-6 py-20 bg-gray-50">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">🌐 Works Everywhere</h2>
                        <p className="text-lg text-gray-600 mb-12">
                            Seamlessly sync your conversations across all your devices
                        </p>
                        
                        <div className="flex justify-center items-center space-x-12 text-gray-400">
                            <div className="flex flex-col items-center space-y-2">
                                <Smartphone className="w-12 h-12" />
                                <span className="font-medium">Mobile Apps</span>
                            </div>
                            <div className="flex flex-col items-center space-y-2">
                                <Globe className="w-12 h-12" />
                                <span className="font-medium">Web App</span>
                            </div>
                            <div className="flex flex-col items-center space-y-2">
                                <div className="w-12 h-12 flex items-center justify-center">💻</div>
                                <span className="font-medium">Desktop</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="px-6 py-20 bg-[#25D366] text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold mb-6">Ready to Chat? 🎯</h2>
                        <p className="text-xl text-white/90 mb-10">
                            Join millions of users already enjoying secure, fast messaging
                        </p>
                        
                        {!auth.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route('register')}
                                    className="bg-white text-[#25D366] px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                                >
                                    Create Account - It's Free! 🎊
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="text-white border-2 border-white/30 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
                                >
                                    Already have an account?
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="px-6 py-8 bg-gray-900 text-white/70 text-center">
                    <p>Built with ❤️ for modern communication • ChatApp 2024</p>
                </footer>
            </div>
        </>
    );
}