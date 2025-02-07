import { signOut } from "next-auth/react";
import { Button } from "./button";

const ButtonSignOut = () => {
  return (
    <Button
      variant="ghost"
      className="w-full text-left"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign Out
    </Button>
  );
};

export default ButtonSignOut; 