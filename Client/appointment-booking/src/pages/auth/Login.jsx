import React,{useState, useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Link as RouterLink } from "react-router-dom";

// LOGIN PAGE   
const Login = () => {
    const {user, login} = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);``
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

        const handleSubmit= async (e)=>{
            e.preventDefault();
            setError(null);
            setLoading(true);   

            const res = await login(email, password);
            setLoading(false);

            if(res?.success ===false)
                setError(res.message);
            else{
                // Use user from context
                const roles = res.user?.roles || [];

                if (roles.includes("Admin")) {
                    navigate("/admin");
                } else if (roles.includes("ServiceProvider")) {
                    navigate("/ServiceOwner");
                } else if (roles.includes("User")) {
                    navigate("/");
                }else navigate("/");
            }
        };

    

    return(
    <>
    <div className="min-h-screen bg-white flex">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
            {/* Logo Section */}
            <div className="mb-8">
            <RouterLink to="/" className="flex items-center cursor-pointer">
            <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg mr-3 flex items-center justify-center">
                    <div className="w-5 h-5 bg-white rounded opacity-90"></div>
                </div>
                <span className="text-2xl font-bold text-gray-900">BookEase</span>
            </div>
            </RouterLink>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
            <p className="text-gray-600">Sign in to your account to continue managing appointments</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
            
                {/* Error Display */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

            {/* Email Input */}
            <div>
                <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                placeholder="Email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                required
                />
            </div>

            {/* Password Input */}
            <div className="relative">
                <input
                type={showPassword ? "text" : "password"}  // toggle here
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white pr-12"
                placeholder="Password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required
                />
                <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)} // toggle visibility
                >
                {showPassword ? (
                    // Eye Off Icon
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.873-4.419M9.88 9.88a3 3 0 104.24 4.24" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6.1 6.1l11.8 11.8" />
                    </svg>
                ) : (
                    // Eye Icon
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                )}
                </button>
            </div>
            {/* Forgot Password */}
            <div className="flex justify-end">
                <button type="button" className="text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors">
                Forgot password?
                </button>
            </div>

            {/* Login Button */}
            <button
                type="submit"
                disabled={loading} // button become unclickable
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            > {/* If loading === true, show "Signing in...". Else (loading === false), show "Sign In". */}
                {loading? "Signing In... ": "Sign In"}
            </button>

            {/* Google Sign In */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">or</span>
                </div>
            </div>

            <button
                type="button"
                className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2"
            >
                <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-orange-500 rounded"></div>
                <span>Continue with Google</span>
            </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <Link to="/signup">
                <button className="text-purple-600 hover:text-purple-800 font-semibold transition-colors">
                Create Account
                </button>
                </Link>
            </p>
            </div>
        </div>
        </div>

        {/* Right Side - Testimonials & Branding */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 items-center justify-center p-12">
        <div className="max-w-lg text-center">
            <h2 className="text-4xl font-bold text-white mb-8">
            Join 200,000+ businesses<br />running with BookEase
            </h2>
            
            {/* Brand Logos Grid */}
            <div className="grid grid-cols-3 gap-8 opacity-80">
            {/* Row 1 */}
            <div className="flex items-center justify-center h-12">
                <div className="text-white font-bold text-lg opacity-60">SALON SPA</div>
            </div>
            <div className="flex items-center justify-center h-12">
                <div className="text-white font-bold text-lg opacity-60">FITNESS+</div>
            </div>
            <div className="flex items-center justify-center h-12">
                <div className="text-white font-bold text-lg opacity-60">BEAUTY</div>
            </div>
            
            {/* Row 2 */}
            <div className="flex items-center justify-center h-12">
                <div className="text-white font-semibold opacity-60">Wellness Center</div>
            </div>
            <div className="flex items-center justify-center h-12">
                <div className="text-white font-semibold opacity-60">CLINIC</div>
            </div>
            <div className="flex items-center justify-center h-12">
                <div className="text-white font-semibold opacity-60">THERAPY</div>
            </div>
            
            {/* Row 3 */}
            <div className="flex items-center justify-center h-12">
                <div className="text-white font-semibold opacity-60">BARBER SHOP</div>
            </div>
            <div className="flex items-center justify-center h-12">
                <div className="text-white font-semibold opacity-60">YOGA</div>
            </div>
            <div className="flex items-center justify-center h-12">
                <div className="text-white font-semibold opacity-60">MASSAGE</div>
            </div>
            
            {/* Row 4 */}
            <div className="flex items-center justify-center h-12">
                <div className="text-white font-semibold opacity-60">DENTAL</div>
            </div>
            <div className="flex items-center justify-center h-12">
                <div className="text-white font-semibold opacity-60">CONSULTING</div>
            </div>
            <div className="flex items-center justify-center h-12">
                <div className="text-white font-semibold opacity-60">TUTORING</div>
            </div>
            </div>

            {/* Testimonial */}
            <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <p className="text-white/90 italic mb-4">
                "BookEase transformed our appointment scheduling. Our clients love the convenience and we've reduced no-shows by 40%."
            </p>
            <div className="text-white/70 font-semibold">- Sarah M., Spa Owner</div>
            </div>
        </div>
        </div>
    </div>
  </>
)};

export default Login;