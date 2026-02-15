import { useRef, useState } from "react";
import Login from "./logIn";
import Signin from "./signIn";
import Background from "../../assets/tree-branches-background.png";
import { Button } from "../../components/ui/button";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="relative flex items-center justify-center w-full h-screen overflow-clip">
      <img
        src={Background}
        alt="tree branches background"
        className="absolute top-0 right-0 -z-1"
      />
      <div className="relative h-[500px] w-[800px] rounded-xl overflow-hidden border backdrop-filter backdrop-blur-sm bg-opacity-10">
        <Separator isLogin={isLogin} setIsLogin={setIsLogin} />
        {isLogin ? <Login /> : <Signin />}
      </div>
    </div>
  );
};

export default AuthPage;

export const Separator = ({
  isLogin,
  setIsLogin,
}: {
  isLogin: Boolean;
  setIsLogin: any;
}) => {
  const separatorRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={separatorRef}
      className={`absolute flex flex-col items-center justify-between top-0 h-full w-1/2 bg-primary/50 transition-all duration-500 ${
        isLogin ? "left-1/2 rounded-r-xl" : "left-0 rounded-l-xl"
      }`}
    >
      <p className="font-bold text-[32px] py-5 text-primary-foreground bg-primary/50 h-min w-full text-center">
        <span>Welcome to Shajra</span>
      </p>
      <div className="flex flex-col gap-5 p-8 items-center justify-end">
        <p className="text-primary text-[20px] font-semibold">
          {isLogin ? (
            <span>Don't have an account?</span>
          ) : (
            <span>Already have an account?</span>
          )}
        </p>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            // const el = separatorRef.current;

            setIsLogin((prev: Boolean) => !prev);

            // if (el) {
            //   setTimeout(() => {
            //     el.style.width = "50%";
            //   }, 500);
            //   if (isLogin) {
            //     el.style.width = "100%";
            //   }
            // }
          }}
        >
          {isLogin ? <span>Register</span> : <span>login</span>}
        </Button>
      </div>
    </div>
  );
};
