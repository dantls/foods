"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { useState } from "react";

const Header = () => {
  const { data } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOutClick = () => signOut();
  const handleSignInClick = () => signIn();
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex justify-between px-5 pt-6">
      <div className="relative h-[30px] w-[100px]">
        <Link href="/">
          <Image src="/logo.png" alt="FSW Foods" fill />
        </Link>
      </div>
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <Button
          size="icon"
          variant="outline"
          className="border-none bg-transparent"
          onClick={handleMenuToggle}
        >
          <MenuIcon />
        </Button>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>
          {data?.user ? (
            <>
              <div className="flex items-center gap-3 pt-6">
                <Avatar>
                  <AvatarImage src={data.user.image as string | undefined} />
                  <AvatarFallback>
                    {data?.user?.name?.split(" ")[0][0]}
                    {data?.user?.name?.split(" ")[1][0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{data.user.name}</h3>
                  <span className="block text-xs text-muted-foreground">
                    {data.user.email}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between pt-10">
                <h2 className="font-semibold">Olá. Faça seu login!</h2>
                <Button size="icon" onClick={handleSignInClick}>
                  <LogInIcon />
                </Button>
              </div>
            </>
          )}

          <div className="py-6">
            <Separator />
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleMenuToggle}
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              asChild
            >
              <Link href="/">
                <HomeIcon size={16} />
                <span>Inicio</span>
              </Link>
            </Button>

            {!!data?.user && (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                  asChild
                >
                  <Link href="/my-orders">
                    <ScrollTextIcon size={16} />
                    <span className="block">Meus Pedidos</span>
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                  asChild
                >
                  <Link href="/my-favorite-restaurants">
                    <ScrollTextIcon size={16} />
                    <span>Restaurantes Favoritos</span>
                  </Link>
                </Button>

                <div className="py-6">
                  <Separator />
                </div>

                <Button
                  onClick={handleSignOutClick}
                  variant="ghost"
                  className="w-full justify-start space-x-3 text-sm font-normal"
                  rounded-full
                >
                  <LogOutIcon size={16} />
                  <span>Sair da Conta</span>
                </Button>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
