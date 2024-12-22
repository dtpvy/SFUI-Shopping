import { useMemo } from "react";

import { SfIconHome, SfLink } from "@storefront-ui/react";
import { useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = useMemo(() => {
    const paths = location.pathname.split("/").filter((x) => x);
    return ["/", ...paths];
  }, [location.pathname]);

  return (
    <nav className="inline-flex text-sm font-normal font-body">
      <ol className="flex items-center w-auto leading-none group md:flex-wrap">
        {pathnames.map((path, index) => (
          <li
            className="peer capitalize hidden sm:flex items-center before:content-['/'] [&:first-child]:before:content-[''] before:px-2 [&:first-child]:before:px-0 before:leading-5 last-of-type:flex last-of-type:before:font-normal last-of-type:before:text-neutral-500 last-of-type:text-neutral-900 last-of-type:font-medium"
            key={`${path}_${index}`}
          >
            {index === 0 ? (
              <SfLink
                href={path}
                variant="secondary"
                className="inline-flex leading-5 no-underline hover:underline active:underline whitespace-nowrap outline-secondary-600 text-neutral-500"
              >
                <SfIconHome size="sm" />
              </SfLink>
            ) : (
              <SfLink
                href={path}
                variant="secondary"
                className="leading-5 no-underline hover:underline active:underline whitespace-nowrap outline-secondary-600"
              >
                {path === "search" ? "Shop" : path}
              </SfLink>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
