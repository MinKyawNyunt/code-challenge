import Particles from "../../components/Particles";
import Container from "../../components/Container";
import SwapForm from "../../components/SwapForm";
import Title from "../../components/Title";

export default function SwapCurrency() {


	return (
		<Container>

			<Particles />

			<div className="w-full flex flex-col items-center gap-6">
				<Title>CRYPTO SWAP</Title>


				<SwapForm />
			</div>

		</Container>
	);
}
