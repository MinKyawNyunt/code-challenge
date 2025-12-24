import CryptoSelector from "./CryptoSelector";
import type { PriceData } from "../../../interfaces/ApiInterface";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";

interface TokenInputProps<TFieldValues extends FieldValues> {
	id: string;
	label: string;
	name: Path<TFieldValues>;
	control: Control<TFieldValues>;
	selectedToken: PriceData | null;
	onTokenSelect: (token: PriceData) => void;
	balance: number;
	disabled?: boolean;
	error?: string;
	onValueChange: (value: string) => void;
	autoFocus?: boolean;
}

const TokenInput = <TFieldValues extends FieldValues>({
	id,
	label,
	name,
	control,
	selectedToken = null,
	onTokenSelect,
	balance = 0,
	disabled = false,
	error,
	onValueChange,
	autoFocus = false,
}: TokenInputProps<TFieldValues>) => {

	return (
		<>
			<div className="mb-4">
				<div className="flex justify-between items-center mb-2">
					<label htmlFor={id} className={`text-sm font-medium ${error ? 'text-orange-400' : 'text-white/70'}`}>
						{label}
					</label>
					<span className="text-xs text-white/50">Balance: {balance}</span>
				</div>
				<div className={`bg-white/5 backdrop-blur-sm rounded-lg border ${error ? 'border-orange-400' : 'border-white/10'} p-2.5 sm:p-4 hover:border-white/20 transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
					<div className="flex items-center gap-2">
						<Controller
							name={name}
							control={control}
							render={({ field }) => (
								<input
									id={id}
									type="number"
									inputMode="decimal"
									value={field.value || ""}
									onChange={(e) => {
										field.onChange(e);
										onValueChange(e.target.value);
									}}
									className="flex-1 min-w-0 bg-transparent text-white text-2xl font-semibold outline-none placeholder:text-white/30 disabled:cursor-not-allowed [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
									// style={{
									// 	fontSize: field.value.length > 10 ? `${Math.max(1, 2 - (field.value.length - 10) * 0.1)}rem` : '1.5rem'
									// }}
									autoFocus={autoFocus}
								/>
							)}
						/>

						<CryptoSelector disabled={disabled} selectedToken={selectedToken} onTokenSelect={onTokenSelect} />
					</div>
				</div>
				{error && <p className="text-orange-400 text-sm mt-1 text-left">{error}</p>}
			</div>
		</>
	);
};

export default TokenInput;
