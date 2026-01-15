"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "shared/lib/utils";
import { AuthModal, CartButton, Container, ProfileButton, SearchInput } from ".";
import { toastSuccess } from "shared/lib";

type Props = {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
};

export const Header = ({ className, hasSearch = true, hasCart = true }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpenSignInModal, setIsOpenSignInModal] = useState(false);

  const openSignInModal = () => {
    setIsOpenSignInModal(true);
  };

  const closeSignInModal = () => {
    setIsOpenSignInModal(false);
  };
  ("");

  useEffect(() => {
    let toastMessage = "";
    if (searchParams.has("verified")) {
      toastMessage = "Регистрация успешно подтверждена!";
    }
    console.log(searchParams);
    if (toastMessage) {
      toastSuccess(toastMessage);
      router.replace("/");
    }
  }, []);

  return (
    <header className={cn("border-b", className)}>
      <Container className={"flex items-center justify-between py-8"}>
        <Link href={"/"}>
          <div className="flex items-center gap-4">
            <Image src={"/logo.png"} alt={"Logo"} width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Tasty Shop</h1>
              <p className="text-sm text-gray-400 leading-3">Самая вкусная еда в мире</p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className={"mx-10 flex-1"}>
            <SearchInput />
          </div>
        )}
        <div className="flex items-center gap-3">
          <AuthModal open={isOpenSignInModal} onClose={closeSignInModal} />
          <ProfileButton openSignInModal={openSignInModal} />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
