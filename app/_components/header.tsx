import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

export function Header() {
  return (
    <div className="flex justify-between px-5 pt-6">
      <Image src="/logo.png" alt="Foods" height={30} width={100} />
      <Button
        size="icon"
        variant="outline"
        className="border-none bg-transparent"
      >
        <MenuIcon />
      </Button>
    </div>
  );
}
