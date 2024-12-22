import { useMemo } from "react";

import {
  SfBadge,
  SfButton,
  SfDropdown,
  SfIconShoppingCart,
  useDisclosure,
} from "@storefront-ui/react";
import { IconUser } from "@tabler/icons-react";
import { Link } from "react-router-dom";

import reactLogo from "@/assets/react.svg";
import useCartStore from "@/store/cart";

import { CartReview } from "../Cart";

function Header() {
  const cart = useCartStore.use.cart();
  const { isOpen, toggle, close } = useDisclosure();

  const total = useMemo(() => {
    return cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }, [cart]);

  return (
    <div className="flex flex-row py-8 px-10 border-b">
      <Link to="/" className="flex gap-3 items-center flex-1">
        <img src={reactLogo} className="logo react" alt="React logo" />
        <h3 className="font-bold text-xl">SFUI Shopping</h3>
      </Link>
      <div className="flex gap-8 flex-1 justify-center items-center">
        <Link to="/">
          <h3>Home</h3>
        </Link>
        <Link to="/search">
          <h3>Shop</h3>
        </Link>
      </div>
      <div className="flex gap-8 items-center flex-1 justify-end">
        <IconUser />
        <SfDropdown
          trigger={
            <SfButton
              onClick={toggle}
              className="relative"
              square
              variant="tertiary"
            >
              <SfIconShoppingCart />
              <SfBadge content={total} />
            </SfButton>
          }
          className="z-[100]"
          open={isOpen}
          onClose={close}
        >
          <CartReview />
        </SfDropdown>
      </div>
    </div>
  );
}

export default Header;
