import * as yup from "yup";
import type { PriceData } from "../../interfaces/ApiInterface";

export interface SwapFormValues {
  fromAmount: string;
  toAmount: string;
  fromToken: PriceData | null;
  toToken: PriceData | null;
}

export const schema: yup.ObjectSchema<SwapFormValues> = yup.object().shape({
  fromAmount: yup
    .string()
    .required("Amount is required")
    .test("is-positive", "Amount must be greater than 0", (value) => {
      const num = parseFloat(value || "");
      return !isNaN(num) && num > 0;
    })
    .test("has-sufficient-balance", "Insufficient balance", function(value) {
      const { fromToken } = this.options.context as any;
      if (!fromToken || !value) return true;
      const amount = parseFloat(value);
      const balance = parseFloat(fromToken.balance || "0");
      return !isNaN(amount) && !isNaN(balance) && amount <= balance;
    }),
  toAmount: yup.string().defined().default(""),
  fromToken: yup.mixed<PriceData>().nullable().required("Please select a token to pay"),
  toToken: yup.mixed<PriceData>().nullable().required("Please select a token to receive"),
});