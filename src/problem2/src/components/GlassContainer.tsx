interface GlassContainerProps {
    children: React.ReactNode;
}


export default function GlassContainer({children}: GlassContainerProps) {
    return (
        <div className="min-w-0 max-w-md w-full p-4 sm:p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 relative">
            {children}
        </div>
    )
}