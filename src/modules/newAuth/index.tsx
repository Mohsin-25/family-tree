import { TreePalm } from "lucide-react";
import bgImage from "../../assets/fam-tree.jpg";
// import bgImage from "../../assets/fam-tree-removed-bg.png";
import { useState } from "react";
import NewLoginForm from "../auth/logIn/components/NewLoginForm";

const NewAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex">
      <div className="w-full h-screen overflow-hidden relative bg-green-100">
        <img
          src={bgImage}
          className="w-full h-full object-cover object-center"
          alt="family-bg"
        />
      </div>
      <div className=" bg-white/40 rounded-xl flex fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 backdrop-filter backdrop-blur-[2px] bg-opacity-10">
        <div className="flex flex-col gap-5 items-center justify-center w-[400px] rounded-2xl shadow-xl p-4">
          {/* HEADER */}
          <div className="flex flex-col items-center justify-center">
            <span className="bg-primary size-10 flex items-center justify-center rounded-full cursor-pointer">
              <TreePalm className="text-white" />
            </span>
            <span className="text-2xl font-semibold mb-2">Shajra</span>
            <span className="text-gray-700">
              Discover and preserve your family heritage
            </span>
          </div>
          {/* FORM */}
          <div className="flex flex-col gap-5 border border-black/10 bg-white/70 p-4 rounded-md w-full">
            {isLogin ? (
              <div className="flex flex-col">
                <span className="text-xl font-semibold mb-2">Welcome Back</span>
                <span className="text-sm text-gray-700">
                  Sign in to continue your family tree
                </span>
              </div>
            ) : (
              <div className="flex flex-col">
                <span className="text-xl font-semibold mb-2">
                  Create Account
                </span>
                <span className="text-sm text-gray-700">
                  Start your family tree journey today
                </span>
              </div>
            )}
            <NewLoginForm isLogin={isLogin} setIsLogin={setIsLogin} />

            {isLogin ? (
              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  Don't have an account?{" "}
                </span>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-gray-700 hover:underline font-medium"
                >
                  Sign In
                </button>
              </div>
            ) : (
              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  Already have an account?{" "}
                </span>
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-gray-700 hover:underline font-medium"
                >
                  Log In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAuth;
