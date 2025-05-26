import { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";

const SignIn = () => {
  const { signIn, setActive } = useSignIn();
  const [emailAddress, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        alert("Signed in successfully!");
        // Redirect if needed, e.g., navigate("/dashboard")
      }
    } catch (err) {
      console.error("SignIn error:", err);
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleOAuth = (strategy) => {
    signIn.authenticateWithRedirect({ strategy });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md bg-[#121212] p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-1">Welcome Back 👋</h2>
        <br />

        <form onSubmit={handleSignIn} className="space-y-4">
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

          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}

          <button
            type="submit"
            className="w-full mt-4 bg-gray-950 hover:bg-blue-900 border border-gray-600 transition-colors text-white font-semibold py-2 rounded-lg"
          >
            Sign In →
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">Or sign in with</div>
        <div className="flex space-x-3 mt-4">
          <button onClick={() => handleOAuth("oauth_github")} className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded-lg text-white">GitHub</button>
          <button onClick={() => handleOAuth("oauth_google")} className="flex-1 bg-red-600 hover:bg-red-500 py-2 rounded-lg text-white">Google</button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account? <a href="/sign-up" className="text-blue-400 hover:underline">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
