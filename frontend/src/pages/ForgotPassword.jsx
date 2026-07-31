import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <div className="mb-8">
          <h1 className="text-white text-5xl font-bold tracking-tight">
            Behind The Odds
          </h1>

          <p className="text-zinc-500 mt-2">
            Reset your password
          </p>
        </div>

        <form className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="
              w-full
              bg-[#141414]
              border
              border-[#222]
              rounded-xl
              px-4
              py-3
              text-zinc-300
              placeholder:text-zinc-500
              outline-none
              transition-all
              duration-200
              focus:border-[#fa233b]
            "
          />

          <button
            type="submit"
            className="
              w-full
              bg-[#fa233b]
              hover:bg-[#ff3b54]
              text-white
              font-medium
              py-3
              rounded-xl
              transition-all
              duration-200
            "
          >
            Send Reset Link
          </button>

        </form>

        <div className="mt-6 text-center">
          <p className="text-zinc-500 text-sm">
            Remember your password?
            <Link
              to="/login"
              className="
                text-white
                ml-2
                hover:text-[#fa233b]
                transition-colors
              "
            >
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;