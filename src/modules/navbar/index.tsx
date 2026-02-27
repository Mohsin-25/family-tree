import { useNavigate } from "@tanstack/react-router";
import { Power, TreePalm } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between border-b border-extraLightGray px-5 py-3">
      <div className="flex gap-2 items-center justify-center">
        <span
          className="bg-primary size-10 flex items-center justify-center rounded-full cursor-pointer"
          onClick={() => navigate({ to: "/dashboard" })}
        >
          <TreePalm className="text-white" />
        </span>
        <div className="flex flex-col text-sm">
          <span className="font-bold text-primary">SHAJRA</span>
          <span>Discover Your Roots</span>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <span
          className="bg-whote border border-primary p-1.5 flex items-center justify-center rounded-full cursor-pointer"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/signIn";
          }}
        >
          <Power size={14} className="text-primary" />
        </span>
      </div>
    </div>
  );
};

export default Navbar;
