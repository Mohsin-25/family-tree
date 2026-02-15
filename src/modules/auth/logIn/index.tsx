import LoginForm from "./components/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col h-full w-1/2">
      <p className="font-bold text-[32px] py-5 text-primary-foreground bg-primary/50 h-min w-full text-center">
        Login
      </p>
      <LoginForm isLogin={true} />
    </div>
  );
};

export default Login;
