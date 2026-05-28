import logoblack from "../../assets/logoblack.svg";
import logowhite from "../../assets/logowhite.svg";

const Logo = () => {
  return (
    <div>
      {/* Logo modo claro */}
      <img
        src={logoblack}
        alt="Logo claro"
        className="w-full block dark:hidden"
      />

      {/* Logo modo oscuro */}
      <img
        src={logowhite}
        alt="Logo oscuro"
        className="w-full hidden dark:block"
      />
    </div>
  );
};

export default Logo;
