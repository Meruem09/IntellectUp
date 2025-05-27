import { useSignUp, useSignIn  } from "@clerk/clerk-react";
import { useClerk } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const { signUp, isLoaded } = useSignUp();
  const { signOut } = useClerk();
  const { signIn } = useSignIn();
  const [username, setUsername] = useState("");
  const [emailAddress, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);

  const navigate_to = useNavigate();
  const handleSignIn = () => {
    navigate_to('/signIn');
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      await signOut();

      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setShowVerification(true);
      alert("Verification code sent to your email.")
    } catch (err) {
      console.error("SignUp error:", err);
      alert(err.errors?.[0]?.message || "Signup failed");
    }
  };

  const handleVerify = async () => {
    if (!isLoaded) return;

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (result.status === "complete") {
        alert("Signup successful! You can now sign in.")
      }
    } catch (err) {
      console.error("Verification error:", err);
      alert(err.errors?.[0]?.message || "Invalid verification code");
    }
  };

  const handleOAuth = async (provider) => {
    try {
      await signOut();
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/',
      });
    } catch (err) {
      alert(err.errors?.[0]?.message || 'OAuth failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md bg-[#121212] p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-1">Welcome to IntellectUP</h2>
        <br />

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              placeholder="Tyler"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-gray-950 text-white rounded-lg border border-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email address</label>
            <input
              type="email"
              placeholder="username@gmail.com"
              value={emailAddress}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-950 text-white rounded-lg border border-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-950 text-white rounded-lg border border-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {showVerification && (
            <div>
              <label className="block text-sm font-medium mb-1">Enter Verification Code</label>
              <input
                type="text"
                placeholder="123456"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full px-4 py-2 bg-gray-950 text-white rounded-lg border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={handleVerify}
                className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
              >
                Verify Email
              </button>
            </div>
          )}

          {!showVerification && (
            <button
              type="submit"
              className="w-full mt-4 bg-gray-950 hover:bg-blue-900 border border-gray-600 transition-colors text-white font-semibold py-2 rounded-lg"
            >
              Sign Up →
            </button>
          )}
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">Or sign up with</div>
        <div className="flex space-x-3 mt-4">
          <button onClick={() => handleOAuth("oauth_github")} className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded-lg text-white">GitHub</button>
          <button onClick={() => handleOAuth("oauth_google")} className="flex-1 bg-red-600 hover:bg-red-500 py-2 rounded-lg text-white">Google</button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account? <a onClick={handleSignIn} className="text-blue-400 hover:underline cursor-pointer">Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default Form;
