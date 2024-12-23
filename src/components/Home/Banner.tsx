import { SfButton } from "@storefront-ui/react";
import { useQuery } from "@tanstack/react-query";

import { getBannerInfo } from "@/apis/banner";
import { classNames } from "@/utils/classNames";

const Banner = () => {
  const { data } = useQuery({
    queryKey: ["banner"],
    queryFn: getBannerInfo,
  });

  const {
    title,
    reverse,
    subtitleClass,
    subtitle,
    titleClass,
    description,
    buttonText,
    image,
  } = data || {};

  return (
    <div
      key={title}
      className="relative flex w-full bg-gradient-to-bl from-cyan-400 to-green-200 "
    >
      <a
        className="absolute w-full h-full z-1 focus-visible:outline focus-visible:rounded-lg"
        aria-label={title}
        href="/search"
      />
      <div
        className={classNames("flex justify-between overflow-hidden grow", {
          "flex-row-reverse": reverse,
        })}
      >
        <div className="flex flex-col justify-center self-center items-start p-10 w-1/3 h-fit aspect-[3/2] bg-green-50/[0.3] mx-auto m-10 text-green-700 font-bold shadow">
          <p
            className={classNames(
              "uppercase typography-text-xs block font-bold tracking-widest text-2xl",
              subtitleClass,
            )}
          >
            {subtitle}
          </p>
          <h2
            className={classNames(
              "mb-4 mt-2 font-bold typography-display-3 text-2xl",
              titleClass,
            )}
          >
            {title}
          </h2>
          <p className="typography-text-base block mb-4">{description}</p>
          <SfButton className="!bg-black">{buttonText}</SfButton>
        </div>
        <img
          src={image}
          alt={title}
          className="w-1/2 aspect-square self-end object-contain"
        />
      </div>
    </div>
  );
};

export default Banner;
