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
        <div className="flex flex-col gap-8 p-8">
        {memories.map((memory: Memory) => {
          return (
            <div key={memory.id} className="flex flex-col w-full gap-6">
              <time className="flex items-center gap-2 text-sm text-gray-100 -ml-8 before:h-px before:w-4 before:bg-gray-50">
                {dayjs(memory.createdAt).format("DD[ de ]MMMM[, ]YYYY")}
              </time>
              <Image
                src={memory.coverUrl}
                alt=""
                width={600}
                height={600}
                className="w-full aspect-video object-cover rounded-lg"
              />
              <p className="text-lg leading-relaxed text-gray-100 text-justify">{memory.excerpt}</p>
              <Link href={`/memories/${memory.id}`}className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100">
                Ler mais
                <ArrowRight className="w-4 h-4"/>
              </Link>
            </div>
          );
        })}
      </div>
    );
}
