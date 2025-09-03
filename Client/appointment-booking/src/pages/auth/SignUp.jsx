import React,{useState, useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const {signup} = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit= async (e)=>{
      e.preventDefault();
      setError(null);
      setLoading(true);   

      // Validation
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            setLoading(false);
            return;
        }

        if (!role) {
            setError("Please select a role");
            setLoading(false);
            return;
        }

        if (!agreeTerms) {
            setError("Please agree to the terms and conditions");
            setLoading(false);
            return;
        }

      const res= await signup(name, email, password, role);
      setLoading(false);

      if(res?.success ===false)
        setError(res.message);
      else{
        navigate("/"); // 👈 redirect after login
      }
    }

  return(
  <>
  <div className="min-h-screen bg-white flex">
    {/* Left Side - Form */}
    <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg mr-3 flex items-center justify-center">
              <div className="w-5 h-5 bg-white rounded opacity-90"></div>
            </div>
            <span className="text-2xl font-bold text-gray-900">BookingPro</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Let's create your account</h1>
          <p className="text-gray-600">Signing up is fast and free—no commitments or long-term contracts.</p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Display */}
              {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      {error}
                  </div>
              )}
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Select Your Role</label>
            <div className="grid grid-cols-1 gap-3">
              {/* User Role */}
              <button
                type="button"
                className="relative p-3 rounded-lg border-2 border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 text-left group hover:scale-105"
                onClick={() => setRole("User")}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-purple-100">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 text-sm">User</div>
                    <div className="text-xs text-gray-600">Book appointments</div>
                  </div>
                </div>
              </button>

              {/* Service Provider Role - Selected */}
              <button
                type="button"
                className="relative p-3 rounded-lg border-2 border-purple-400 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transition-all duration-300 text-left group hover:scale-105"
                onClick={() => setRole("ServiceProvider")}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/20">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white text-sm">Service Provider</div>
                    <div className="text-xs text-white/80">Manage services</div>
                  </div>
                </div>
              </button>

              {/* Admin Role */}
              <button
                type="button"
                className="relative p-3 rounded-lg border-2 border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 text-left group hover:scale-105"
                onClick={() => setRole("Admin")}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-purple-100">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 text-sm">Admin</div>
                    <div className="text-xs text-gray-600">Full access</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Name Input */}
          <div>
            <input
              type="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
              placeholder="Name"
              onChange={(e)=> setName(e.target.value)}
                required
            />
          </div>
          {/* Email Input */}
          <div>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
              placeholder="Email"
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

          {/* Confirm Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}  // toggle here
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white pr-12"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e)=> setConfirmPassword(e.target.value)}
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

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2 mt-1"
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <div className="text-sm text-gray-600">
              I agree to BookingPro's{' '}
              <a href="#" className="text-purple-600 hover:text-purple-800 font-medium underline">Terms</a>
              {', '}
              <a href="#" className="text-purple-600 hover:text-purple-800 font-medium underline">Privacy Policy</a>
              {', and '}
              <a href="#" className="text-purple-600 hover:text-purple-800 font-medium underline">E-Sign Consent</a>
            </div>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Create account
          </button>

          {/* Google Sign Up */}
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

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Already have a BookingPro account?{' '}
            <button className="text-purple-600 hover:text-purple-800 font-semibold transition-colors">
              Sign in
            </button>
          </p>
        </div>

        {/* reCAPTCHA Notice */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">
            This site is protected by reCAPTCHA Enterprise and the Google{' '}
            <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>

    {/* Right Side - Success Stories & Branding */}
    <div className="hidden lg:flex flex-1 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 items-center justify-center p-12">
      <div className="max-w-lg text-center">
        <h2 className="text-4xl font-bold text-white mb-8">
          Join 200,000+ businesses<br />streamlining appointments
        </h2>
        
        {/* Success Stats */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-300 mb-2">98%</div>
            <div className="text-white/80 text-sm">Customer Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-300 mb-2">40%</div>
            <div className="text-white/80 text-sm">Less No-Shows</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-300 mb-2">24/7</div>
            <div className="text-white/80 text-sm">Online Booking</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-300 mb-2">5min</div>
            <div className="text-white/80 text-sm">Setup Time</div>
          </div>
        </div>

        {/* Industry Types */}
        <div className="grid grid-cols-3 gap-6 opacity-70 mb-8">
          <div className="text-white/70 text-xs font-semibold">SALONS</div>
          <div className="text-white/70 text-xs font-semibold">SPAS</div>
          <div className="text-white/70 text-xs font-semibold">FITNESS</div>
          <div className="text-white/70 text-xs font-semibold">CLINICS</div>
          <div className="text-white/70 text-xs font-semibold">THERAPY</div>
          <div className="text-white/70 text-xs font-semibold">TUTORING</div>
          <div className="text-white/70 text-xs font-semibold">WELLNESS</div>
          <div className="text-white/70 text-xs font-semibold">CONSULTING</div>
          <div className="text-white/70 text-xs font-semibold">BEAUTY</div>
        </div>

        {/* Feature Highlight */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-white font-semibold mb-3">Why BookingPro?</h3>
          <ul className="text-white/90 text-sm space-y-2 text-left">
            <li>• Free forever plan available</li>
            <li>• No setup fees or long-term contracts</li>
            <li>• Automated reminders & confirmations</li>
            <li>• Multi-platform integration</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  </>
)};

export default SignUpPage;