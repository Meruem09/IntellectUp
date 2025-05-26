const Form = () => {
  return (
    <div style={{overscrollBehavior: 'none'}} className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md bg-[#121212] p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-1">Welcome to IntellectUP</h2>
        <br/>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 ">Username</label>
            <input
              type="text"
              placeholder="Tyler"
              className="w-full px-4 py-2 bg-gray-950 text-white rounded-lg border border-gray-600 hover:bg-gray-900 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email address</label>
            <input
              type="email"
              placeholder="username@gmail.com"
              className="w-full px-4 py-2 bg-gray-950 text-white rounded-lg border border-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-2 bg-gray-950 text-white rounded-lg border border-gray-600  hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-gray-950  hover:bg-blue-900 border border-gray-600 transition-colors text-white font-semibold py-2 rounded-lg"
          >
            Sign Up →
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">Or sign up with</div>
        <div className="flex space-x-3 mt-4">
          <button className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded-lg text-white">GitHub</button>
          <button className="flex-1 bg-red-600 hover:bg-red-500 py-2 rounded-lg text-white">Google</button>
          <button className="flex-1 bg-pink-600 hover:bg-pink-500 py-2 rounded-lg text-white">OnlyFans</button>
        </div>
        <div className="mt-6 text-center text-sm text-gray-400">Already have an account? <span href="">Sign In</span></div>
      </div>
    </div>

  );
};

export default Form;
