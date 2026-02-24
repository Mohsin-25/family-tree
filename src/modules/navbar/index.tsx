import { Power, TreePalm } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex justify-between border border-b-extraLightGray p-5">
      <div className="flex gap-2 items-center justify-center">
        <span className="bg-primary size-10 flex items-center justify-center rounded-full">
          <TreePalm className="text-white" />
        </span>
        <div className="flex flex-col text-sm">
          <span className="font-bold text-primary">SHAJRA</span>
          <span>Discover Your Roots</span>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <span
          className="bg-whote border border-primary size-10 flex items-center justify-center rounded-full cursor-pointer"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/signIn";
          }}
        >
          <Power className="text-primary" />
        </span>
      </div>
    </div>
  );
};

export default Navbar;
