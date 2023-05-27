import Image from "next/image";
import Link from "next/link";

import nlwLogo from "@/assets/logo.svg";

export const Hero = () => {
    return (
        <div className="space-y-5">
            <Image src={nlwLogo} alt="Spacetime" />
            <div className="max-w-[420px] space-y-1">
                <h1 className="text-5xl font-bold leading-tight text-gray-50">Sua cápsula do tempo</h1>
                <p className="text-lg leading-relaxed">
                    Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!
                </p>
            </div>
            <Link
                href="/memories/new"
                className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
            >
                cadastrar lembrança
            </Link>
        </div>
    );
};
