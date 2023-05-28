import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { ArrowRight } from "lucide-react";

import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";

import { api } from "@/lib/api";

import { EmptyMemories } from "@/components/EmptyMemories";

interface Memory {
    id: string;
    coverUrl: string;
    excerpt: string;
    createdAt: string;
}

dayjs.locale(ptBr);

export default async function Home() {
    const token = cookies().get("token")?.value;

    if (!token) {
        return <EmptyMemories />;
    }

    const response = await api.get("/memories", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const memories: Memory[] = response.data;

    if (memories.length === 0) {
        return <EmptyMemories />;
    }

    return (
        <div className="flex flex-col gap-10 p-8">
            {memories.map((memory) => (
                <div key={memory.id} className="space-y-4">
                    <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
                        {dayjs(memory.createdAt).format("D[ de ]MMMM[, ]YYYY")}
                    </time>
                    <Image
                        src={memory.coverUrl}
                        alt=""
                        width={592}
                        height={280}
                        className="aspect-video h-full rounded-lg object-cover"
                    />
                    <p className="text-lg leading-relaxed text-gray-100">{memory.excerpt}</p>
                    <Link
                        className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
                        href={`/memories/${memory.id}`}
                    >
                        Ler mais <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            ))}
        </div>
    );
}
