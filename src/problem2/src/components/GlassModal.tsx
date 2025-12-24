import { createPortal } from "react-dom";

interface GlassModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function GlassModal({ isOpen, onClose, children }: GlassModalProps) {
    if (!isOpen) return null;

    return createPortal(
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={onClose}
        >
            <div 
                className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">Select Token</h3>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {children}
            </div>
        </div>,
        document.body
    );
}
