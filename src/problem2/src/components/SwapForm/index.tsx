import { useEffect, useState } from "react";
import TokenInput from "../form/TokenInput";
import Button from "../form/Button";
import SwapDirectionBtn from "./SwapDirectionBtn";
import ExchangeRate from "./ExchangeRate";
import SuccessToast from "../SuccessToast";
import { useStore } from "./store";
import GlassContainer from "../GlassContainer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, type SwapFormValues } from "./schema";

export default function SwapForm() {
	const {
		fromAmount,
		toAmount,
		fromToken,
		toToken,
		isProcessing,
		showSuccess,
		setFromAmount,
		setToAmount,
		setFromToken,
		setToToken,
		setShowSuccess,
		submitSwap,
	} = useStore();

	const {
		handleSubmit,
		control,
		formState: { errors },
		setValue,
		trigger,
	} = useForm<SwapFormValues>({
		resolver: yupResolver(schema),
		mode: "onChange",
		context: { fromToken },
		defaultValues: {
			fromAmount,
			toAmount,
			fromToken,
			toToken,
		},
	});

	const [shake, setShake] = useState(false);

	useEffect(() => {
		setValue("fromAmount", fromAmount);
	}, [fromAmount, setValue]);

	useEffect(() => {
		setValue("toAmount", toAmount);
		if(toAmount) {
			trigger("fromAmount");
		}
		
	}, [toAmount, setValue, trigger]);

	const onSubmit = async () => {
		await submitSwap();
	};

	const onButtonClick = async () => {
		const valid = await trigger();
		if (!valid) {
			setShake(true);
			setTimeout(() => setShake(false), 400);
		}
	};

	return (
		<GlassContainer>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TokenInput
					id="from-amount"
					label="You Pay"
					name="fromAmount"
					control={control}
					selectedToken={fromToken}
					onTokenSelect={(token) => {
						setFromToken(token);
						setValue("fromToken", token);
					}}
					balance={fromToken ? fromToken.balance : 0}
					disabled={isProcessing}
					error={errors.fromAmount?.message}
					onValueChange={setFromAmount}
					autoFocus={true}
				/>

				<SwapDirectionBtn />

				<TokenInput
					id="to-amount"
					label="You Receive"
					name="toAmount"
					control={control}
					selectedToken={toToken}
					onTokenSelect={(token) => {
						setToToken(token);
						setValue("toToken", token);
					}}
					balance={toToken ? toToken.balance : 0}
					disabled={isProcessing}
					error={errors.toAmount?.message}
					onValueChange={setToAmount}
				/>

				<ExchangeRate/>

				<Button
					type="submit"
					disabled={isProcessing}
					isLoading={isProcessing}
					className={shake ? "animate-shake" : ""}
					onClick={onButtonClick}
				>
					{isProcessing ? "PROCESSING..." : "CONFIRM SWAP"}
				</Button>
			</form>

			{showSuccess && (
				<SuccessToast 
					message="Swap completed successfully!" 
					onClose={() => setShowSuccess(false)} 
				/>
			)}
		</GlassContainer>
	)
}
