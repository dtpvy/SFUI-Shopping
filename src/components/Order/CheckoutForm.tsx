import { SfInput } from "@storefront-ui/react";

import { type CheckoutFormType } from "./useCheckoutForm";

type Props = {
  error: Record<string, string>;
  formState: Partial<CheckoutFormType>;
  onChangeField: (field: keyof CheckoutFormType, value: string) => void;
};

const CheckoutForm = ({ error, formState, onChangeField }: Props) => {
  return (
    <div className="p-4 flex gap-4 flex-wrap text-neutral-900">
      <h2 className="w-full typography-headline-4 md:typography-headline-3 font-bold">
        Billing address
      </h2>
      <label className="w-full md:w-auto flex-grow flex flex-col gap-0.5 mt-4 md:mt-0">
        <span className="typography-text-sm font-medium">First Name</span>
        <SfInput
          name="firstName"
          placeholder="First Name"
          autoComplete="given-name"
          value={formState.firstName}
          invalid={!!error.firstName}
          onChange={(event) => onChangeField("firstName", event.target.value)}
          required
        />
        {error.firstName && (
          <div className="text-red-400">{error.firstName}</div>
        )}
      </label>
      <label className="w-full md:w-auto flex-grow flex flex-col gap-0.5">
        <span className="typography-text-sm font-medium">Last Name</span>
        <SfInput
          name="lastName"
          placeholder="Last Name"
          autoComplete="family-name"
          value={formState.lastName}
          invalid={!!error.lastName}
          onChange={(event) => onChangeField("lastName", event.target.value)}
          required
        />
        {error.lastName && <div className="text-red-400">{error.lastName}</div>}
      </label>
      <label className="w-full flex flex-col gap-0.5">
        <span className="typography-text-sm font-medium">Phone</span>
        <SfInput
          name="phone"
          placeholder="Phone number"
          type="tel"
          autoComplete="tel"
          value={formState.phone}
          invalid={!!error.phone}
          onChange={(event) => onChangeField("phone", event.target.value)}
          required
        />
        {error.phone && <div className="text-red-400">{error.phone}</div>}
      </label>
      <label className="w-full flex flex-col gap-0.5">
        <span className="typography-text-sm font-medium">Country</span>
        <SfInput
          name="country"
          autoComplete="address-line1"
          className="mt-0.5"
          placeholder="Country"
          value={formState.country}
          invalid={!!error.country}
          onChange={(event) => onChangeField("country", event.target.value)}
          required
        />
        {error.country && <div className="text-red-400">{error.country}</div>}
      </label>
      <div className="w-full md:w-auto flex-grow flex flex-col gap-0.5">
        <label>
          <span className="typography-text-sm font-medium">Street</span>
          <SfInput
            name="street"
            placeholder="Street"
            autoComplete="address-line1"
            className="mt-0.5"
            value={formState.street}
            invalid={!!error.street}
            onChange={(event) => onChangeField("street", event.target.value)}
            required
          />
          {error.street && <div className="text-red-400">{error.street}</div>}
        </label>
      </div>
      <label className="w-full flex flex-col gap-0.5">
        <span className="typography-text-sm font-medium">City</span>
        <SfInput
          name="city"
          placeholder="City"
          autoComplete="address-level2"
          value={formState.city}
          invalid={!!error.city}
          onChange={(event) => onChangeField("city", event.target.value)}
          required
        />
        {error.city && <div className="text-red-400">{error.city}</div>}
      </label>

      <label className="w-full flex flex-col gap-0.5">
        <span className="typography-text-sm font-medium">ZIP Code</span>
        <SfInput
          name="zipCode"
          placeholder="eg. 12345"
          autoComplete="postal-code"
          value={formState.zip}
          invalid={!!error.zip}
          onChange={(event) => onChangeField("zip", event.target.value)}
          required
        />
        {error.zip && <div className="text-red-400">{error.zip}</div>}
      </label>
    </div>
  );
};

export default CheckoutForm;
