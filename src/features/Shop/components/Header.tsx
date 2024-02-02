"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartContext } from "./CartContext";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ADMIN_URL, SHOP_PROFILE_URL, SHOP_URL } from "@/constants/urls";
import { LoginLink } from "../../Auth/components/LoginLink";
import { CartButton } from "./CartButton";
import type { Session } from "next-auth";
import { ProfileButton } from "./ProfileButton";

const navigation = [
  { name: "Product", href: SHOP_URL },
  { name: "Profile", href: SHOP_PROFILE_URL },
  { name: "Dashboard", href: ADMIN_URL },
];

type Props = {
  session: Session | null;
};

export const Header = ({ session }: Props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [optimisticCart] = useCartContext();
  const totalItems = optimisticCart.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link
            href={SHOP_URL}
            className="-m-1.5 flex items-center space-x-4 p-1.5"
          >
            <span className="text-lg font-semibold">Ecofast</span>
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-6">
          <div className="flex">
            <ProfileButton className="hidden lg:flex" />
            <CartButton cartCount={totalItems} />
          </div>
          <LoginLink session={session} />
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between gap-x-6">
            <Link href={SHOP_URL} className="-m-1.5 p-1.5">
              <Image
                className="h-8 w-auto"
                width={32}
                height={32}
                src="/icons/tailwind.svg"
                alt="Your Company"
              />
            </Link>
            <div className=" flex gap-4">
              <CartButton cartCount={totalItems} />
              <LoginLink session={session} />
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6"></div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};
