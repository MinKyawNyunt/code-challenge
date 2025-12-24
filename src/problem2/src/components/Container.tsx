interface ContainerProps {
    children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) 
{
    return (
        <div className="h-full flex items-center justify-center bg-gradient-to-tl from-neutral-900 via-zinc-900 to-gray-900 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] relative px-4 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-neutral-800 opacity-20 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[28rem] h-[28rem] bg-gray-800 opacity-10 rounded-full blur-2xl -z-10 animate-pulse delay-200" />
            {children}
        </div>
    );
}