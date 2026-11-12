"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  CreditCard,
  Landmark,
  Smartphone,
  Wallet,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type FieldPath } from "react-hook-form";
import z from "zod";

const addPaymentMethodSchema = z.object({
  type: z.enum(["upi", "card", "netbanking", "wallet"], {
    error: "Please select a valid type",
  }),
  upiId: z.string(),
  cardHolderName: z.string(),
  cardNumber: z.string(),
  expiry: z.string(),
  cvv: z.string(),
  bank: z.string(),
  wallet: z.string(),
  isDefault: z.boolean(),
}).superRefine((values, ctx) => {
  const validateText = (
    field: FieldPath<PaymentMethodFormValues>,
    value: string,
    minimum: number,
    message: string,
  ) => {
    if (value.trim().length < minimum) {
      ctx.addIssue({ code: "custom", path: [field], message });
    }
  };

  switch (values.type) {
    case "upi":
      validateText("upiId", values.upiId, 8, "Enter at least 8 characters");
      break;
    case "card":
      validateText("cardHolderName", values.cardHolderName, 3, "Enter at least 3 characters");
      validateText("cardNumber", values.cardNumber, 12, "Enter at least 12 characters");
      validateText("expiry", values.expiry, 5, "Enter at least 5 characters");
      validateText("cvv", values.cvv, 3, "Enter a valid CVV");
      if (values.cvv.length > 3) {
        ctx.addIssue({ code: "custom", path: ["cvv"], message: "Enter a valid CVV" });
      }
      break;
    case "netbanking":
      validateText("bank", values.bank, 3, "Choose a valid option");
      break;
    case "wallet":
      validateText("wallet", values.wallet, 3, "Choose a valid option");
      break;
  }
});

type PaymentMethodFormValues = z.infer<typeof addPaymentMethodSchema>;

const methods = [
  { value: "upi", label: "UPI", icon: Smartphone },
  { value: "card", label: "Card", icon: CreditCard },
  { value: "netbanking", label: "NetBanking", icon: Landmark },
  { value: "wallet", label: "Wallet", icon: Wallet },
] satisfies { value: PaymentMethodFormValues["type"]; label: string; icon: typeof Smartphone }[];

export default function AddPaymentMethod() {
  const router = useRouter();
  const [showCardDetails, setShowCardDetails] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<PaymentMethodFormValues>({
    resolver: zodResolver(addPaymentMethodSchema),
    defaultValues: {
      type: "upi",
      upiId: "",
      cardHolderName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
      bank: "",
      wallet: "",
      isDefault: false,
    },
  });

  const selectType = watch("type");

  const onSubmit = (data: PaymentMethodFormValues) => {};

  const changeMethod = (type: PaymentMethodFormValues["type"]) => {
    clearErrors();
    setValue("type", type);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-xl">
      <div>
        <Button
          variant="secondary"
          onClick={() => router.push(`/customer/payments`)}
        >
          <ArrowLeft size={20} />
          Back
        </Button>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-xl text-gray-800">Add Payment Method</h1>
          <p className="text-sm text-gray-400 font-bold">
            Choose a payment method to add to your account
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="space-y-2">
          <h2 className="font-bold text-sm text-gray-700">Select Payment Method</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {methods.map((method) => {
              const Icon = method.icon;
              const active = selectType === method.value;

              return (
                <Button
                  key={method.value}
                  type="button"
                  variant="secondary"
                  className={`h-11 flex flex-col items-center gap-2 rounded-lg border p-4 text-sm font-medium transition ${active ? "border-orange-500 bg-orange-50 text-orange-600" : "border-gray-200 text-gray-600 hover:border-gray-400"}`}
                  onClick={() => changeMethod(method.value)}
                >
                  <Icon />
                  {method.label}
                </Button>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-center mt-2 text-sm text-gray-500 font-bold">
            {selectType === "upi" && "UPI Details"}
          </h2>
          <h2 className="text-center mt-2 text-sm text-gray-500 font-bold">
            {selectType === "card" && "Card Details"}
          </h2>
          <h2 className="text-center mt-2 text-sm text-gray-500 font-bold">
            {selectType === "netbanking" && "NetBanking Details"}
          </h2>
          <h2 className="text-center mt-2 text-sm text-gray-500 font-bold">
            {selectType === "wallet" && "Wallet Details"}
          </h2>

          {selectType === "upi" && (
            <div className="flex flex-col items-center justify-center gap-3">
              <Label className="mb-2 block text-sm font-medium text-gray-700">
                UPI ID
              </Label>
              <input
                {...register("upiId")}
                placeholder="***@upi"
                className="w-1/4 rounded-lg border border-gray-400 px-4 py-3 text-sm outline-none"
              />
              {errors.upiId && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.upiId.message}
                </p>
              )}
            </div>
          )}

          {selectType === "card" && (
            <div className="space-y-4">
              <div className="flex gap-2 items-center justify-center w-full">
                <Label className="w-36 mb-2 block text-sm font-bold text-gray-700">
                  CardHolder Name
                </Label>
                <input
                  {...register("cardHolderName")}
                  placeholder="Name on card"
                  className="rounded-lg border brder-gray-400 px-4 py-3 text-sm outline-none"
                />
              </div>
              {errors.cardHolderName && (
                <p className="mt-1 pl-40 text-sm text-center text-red-500">
                  {errors.cardHolderName.message}
                </p>
              )}
              <div className="flex gap-2 items-center justify-center w-full">
                <Label className="w-36 mb-2 block text-sm font-medium text-gray-700">
                  Card Number
                </Label>
                <input
                  {...register("cardNumber")}
                  placeholder="Number on card"
                  className="rounded-lg border brder-gray-400 px-4 py-3 text-sm outline-none"
                />
              </div>
              {errors.cardNumber && (
                <p className="mt-1 pl-40 text-sm text-center text-red-500">
                  {errors.cardNumber.message}
                </p>
              )}
              <div className="space-y-4">
                <div className="flex gap-2 items-center justify-center w-full">
                  <Label className="w-36 mb-2 block text-sm font-medium text-gray-700">
                    Expiry Date
                  </Label>
                  <input
                    {...register("expiry")}
                    placeholder="MM/YY"
                    className="rounded-lg border brder-gray-400 px-4 py-3 text-sm outline-none"
                  />
                </div>
                {errors.expiry && (
                  <p className="mt-1 pl-40 text-center text-sm text-red-500">
                    {errors.expiry.message}
                  </p>
                )}
                <div className="flex gap-2 items-center justify-center w-full">
                  <Label className="w-36 mb-2 block text-sm font-medium text-gray-700">
                    CVV
                  </Label>
                  <input
                    {...register("cvv")}
                    placeholder="CVV"
                    type={showCardDetails ? "text" : "password"}
                    inputMode="numeric"
                    maxLength={3}
                    className="rounded-lg border brder-gray-400 px-4 py-3 text-sm outline-none"
                  />
                </div>
                <div className="flex justify-center ml-30">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCardDetails(!showCardDetails)}
                    className="mt-1 text-xs text-gray-500 transition hover:text-gray-800"
                  >
                    {showCardDetails ? "Hide CVV" : "Show CVV"}
                  </Button>
                </div>
                {errors.cvv && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.cvv.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {selectType === "netbanking" && (
            <div className="flex flex-col items-center justify-items-center">
              <Label className="mb-2 block text-sm font-medium text-gray-700">
                Select Bank
              </Label>
              <select
                {...register("bank")}
                className="w-1/4 rounded-lg border border-gray-400 px-4 py-3 text-sm outline-none"
              >
                <option value="">Choose Bank</option>
                <option value="SBI">SBI</option>
                <option value="Indian">Indian</option>
                <option value="HDFC">HDFC</option>
                <option value="Axis">Axis</option>
                <option value="Other">Other</option>
              </select>
              {errors.bank && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.bank.message}
                </p>
              )}
            </div>
          )}

          {selectType === "wallet" && (
            <div className="flex flex-col items-center justify-items-center">
              <Label className="mb-2 block text-sm font-medium text-gray-700">
                Select Wallet
              </Label>
              <select
                {...register("wallet")}
                className="w-1/4 rounded-lg border brder-gray-400 px-4 py-3 text-sm outline-none"
              >
                <option value="">Choose Wallet</option>
                <option value="Paytm">Paytm</option>
                <option value="Amazon">Amazon</option>
                <option value="Other">Other</option>
              </select>
              {errors.wallet && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.wallet.message}
                </p>
              )}
            </div>
          )}

          <div className="border-t border-gray-100 pt-1 w-50">
            <Label className="flex cursor-pointer items-center gap-3 text-sm text-gray-700">
              <input
                type="checkbox"
                {...register("isDefault")}
                className="size-4 accent-orange-500"
              />
              Set as my default Payment
            </Label>
          </div>
        </section>
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            className="rounded-lg border border-gray-400 transition hover:cursor-pointer"
            onClick={() => router.push(`/customer/payments`)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="outline"
            className="rounded-lg border border-gray-400 transition hover:cursor-pointer"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
