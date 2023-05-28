import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Link, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Icon from "@expo/vector-icons/Feather";
import dayjs from "dayjs";
import ptBr from "dayjs/locale/pt-br";

import { api } from "../src/lib/api";

import NlwLogo from "../src/assets/logo.svg";

interface Memory {
    id: string;
    coverUrl: string;
    excerpt: string;
    createdAt: string;
}

dayjs.locale(ptBr);

const Memories = () => {
    const { bottom, top } = useSafeAreaInsets();
    const router = useRouter();

    const [memories, setMemories] = useState<Memory[]>([]);

    const signOut = async () => {
        await SecureStore.deleteItemAsync("token");
        router.push("/");
    };

    const loadMemories = async () => {
        const token = await SecureStore.getItemAsync("token");
        const response = await api.get("/memories", { headers: { Authorization: `Bearer ${token}` } });
        setMemories(response.data);
    };

    useEffect(() => {
        loadMemories();
    }, []);

    return (
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}>
            <View className="mt-4 flex-row items-center justify-between px-8">
                <NlwLogo />
                <View className="flex-row items-center gap-2">
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={signOut}
                        className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
                    >
                        <Icon name="log-out" size={16} color="#fff" />
                    </TouchableOpacity>

                    <Link href="/new" asChild>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            className="h-10 w-10 items-center justify-center rounded-full bg-green-500"
                        >
                            <Icon name="plus" size={16} color="#000" />
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>

            <View className="mt-6 space-y-10">
                {memories.map((memory) => (
                    <View key={memory.id} className="space-y-4">
                        <View className="flex-row items-center gap-2">
                            <View className="h-px w-5 bg-gray-50" />
                            <Text className="font-body text-xs text-gray-100">
                                {dayjs(memory.createdAt).format("D[ de ]MMMM[, ]YYYY")}
                            </Text>
                        </View>
                        <View className="space-y-4 px-8">
                            <Image
                                source={{ uri: memory.coverUrl }}
                                className="aspect-video w-full rounded-lg"
                                alt=""
                            />
                            <Text className="font-body text-base leading-relaxed text-gray-100">{memory.excerpt}</Text>
                            <Link href={`/memories/${memory.id}`} asChild>
                                <TouchableOpacity activeOpacity={0.7} className="flex-row items-center gap-2">
                                    <Text className="font-body text-sm text-gray-200">Ler mais</Text>
                                    <Icon name="arrow-right" size={16} color="#9e9ea0" />
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default Memories;
