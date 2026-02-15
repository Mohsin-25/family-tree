import LoginForm from "../logIn/components/LoginForm";

const Signin = ({ setIsLogin }: { setIsLogin: any }) => {
  return (
    <div className="flex flex-col h-full w-1/2 ml-auto">
      <p className="font-bold text-[32px] py-5 text-primary-foreground bg-primary/50 h-min w-full text-center">
        Sign in
      </p>
      <LoginForm isLogin={false} setIsLogin={setIsLogin} />
    </div>
  );
};

export default Signin;
