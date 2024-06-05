"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const Header = () => {
  const { data } = useSession();
  const handleSignOutClick = () => signOut();
  return (
    <div className="flex justify-between px-5 pt-6">
      <div className="relative h-[30px] w-[100px]">
        <Link href="/">
          <Image src="/logo.png" alt="FSW Foods" fill />
        </Link>
      </div>
      <Sheet>
        <SheetTrigger>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
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
              <div className="pt-10">
                <h2 className="font-semibold">Olá. Faça seu login!</h2>
              </div>
            </>
          )}

          <div className="py-6">
            <Separator />
          </div>

          <div className="space-y-3">
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
            >
              <HomeIcon size={16} />
              <span>Início</span>
            </Button>

            {!!data?.user && (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 text-sm font-normal"
                  rounded-full
                >
                  <ScrollTextIcon size={16} />
                  <span>Meus Pedidos</span>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 text-sm font-normal"
                  rounded-full
                >
                  <HeartIcon size={16} />
                  <span>Restaurantes Favoritos</span>
                </Button>
              </>
            )}
          </div>
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
