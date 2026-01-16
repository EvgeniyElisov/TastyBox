"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "shared/lib/utils";
import { AuthModal, CartButton, Container, ProfileButton, SearchInput } from ".";

type Props = {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
};

export const Header = ({ className, hasSearch = true, hasCart = true }: Props) => {
 
  const [isOpenSignInModal, setIsOpenSignInModal] = useState(false);

  const openSignInModal = () => {
    setIsOpenSignInModal(true);
  };

  const closeSignInModal = () => {
    setIsOpenSignInModal(false);
  };

  return (
    <header className={cn("border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm", className)}>
      <Container className={"flex items-center justify-between py-3 md:py-4 lg:py-5 gap-2 md:gap-4"}>
        <Link href={"/"} className="group shrink-0" aria-label="Главная страница">
          <div className="flex items-center gap-2 md:gap-3 lg:gap-4 transition-transform group-hover:scale-105">
            <figure className="relative">
              <Image 
                src={"/logo.png"} 
                alt={"Логотип Tasty Shop"} 
                width={56} 
                height={56} 
                className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-xl md:rounded-2xl lg:rounded-2xl shadow-lg ring-2 ring-primary/20" 
              />
              <div className="absolute inset-0 rounded-xl md:rounded-2xl lg:rounded-2xl bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
            </figure>
            <div className="block">
              <h1 className="text-lg md:text-2xl lg:text-3xl uppercase font-black tracking-tight bg-linear-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Tasty Shop
              </h1>
              <p className="text-xs md:text-sm lg:text-sm text-gray-500 leading-4 mt-0.5 font-medium hidden md:block">Самая вкусная еда в мире</p>
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-2 md:gap-3 lg:gap-3 flex-1 justify-end">
          {hasSearch && (
            <div className={"hidden md:flex mx-4 lg:mx-16 flex-1 max-w-2xl"}>
              <SearchInput />
            </div>
          )}
          <div className="flex items-center gap-2 md:gap-3 lg:gap-3 shrink-0">
            <AuthModal open={isOpenSignInModal} onClose={closeSignInModal} />
            <ProfileButton openSignInModal={openSignInModal} />
            {hasCart && <CartButton />}
          </div>
        </nav>
      </Container>
      {hasSearch && (
        <Container className="md:hidden pb-3">
          <SearchInput />
        </Container>
      )}
    </header>
  );
};
