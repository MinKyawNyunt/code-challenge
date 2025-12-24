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

				{/* ...existing code... */}
			</div>

			{/* GitHub link in bottom right corner */}
			   <a
				   href="https://github.com/MinKyawNyunt/code-challenge/tree/main"
				   target="_blank"
				   rel="noopener noreferrer"
				   className="fixed bottom-4 right-4 z-50 px-2 py-2 rounded bg-transparent hover:bg-zinc-800 transition-colors"
				   title="Go to GitHub"
			   >
				   <img
					   src="/assets/images/github-logo.png"
					   alt="GitHub Logo"
					   className="w-8 h-8 object-contain"
				   />
			   </a>

		</Container>
	);
}
