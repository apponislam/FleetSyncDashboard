import { Link } from "react-router-dom";

const Logo = ({ sm }) => {
  if (sm) {
    return (
  <Link to="/" className="flex md:hidden flex-col items-center gap-2 mx-6">
      <div className="text-center flex gap-x-2 items-center">
        <img src="/logo.png" className="w-10 h-10" alt="" />

        <h2 className="text-xl font-bold text-white leading-5">
          FleetSync
        </h2>
      </div>
      {/* Glowing horizontal line */}
      <div className="w-52 h-[4px] bg-gradient-to-r from-transparent via-white to-transparent" />
    </Link>
    );
  }

  return (
    <Link to="/" className=" hidden md:flex flex-col items-center gap-2 mx-6">
      <div className="text-center flex gap-x-2 items-center">
        <img src="/logo.png" className="w-22 h-22" alt="" />

        <h2 className="text-3xl font-bold text-white leading-5">
          FleetSync
        </h2>
      </div>
      {/* Glowing horizontal line */}
      <div className="w-52 h-[4px] bg-gradient-to-r from-transparent via-white to-transparent" />
    </Link>
  );
};

export default Logo;
