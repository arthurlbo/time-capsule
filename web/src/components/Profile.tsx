import Image from "next/image";

import { getUser } from "@/lib/auth";

export const Profile = () => {
    const { avatarUrl, name } = getUser();

    return (
        <div className="flex items-center gap-3 text-left">
            <Image src={avatarUrl} alt="user avatar" width={40} height={40} className="h-10 w-10 rounded-full" />
            <p className="max-w-[140px] text-sm leading-snug">
                {name}
                <a href="/api/auth/logout" className="block text-red-400 hover:text-red-300">Quero sair</a>
            </p>
        </div>
    );
};
