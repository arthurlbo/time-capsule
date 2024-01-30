import { useState } from "react";
import { ArrowLeft, Image as IconImage } from "lucide-react-native";
import { Image, ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";

import { api } from "../src/lib/api";

import NlwLogo from "../src/assets/logo.svg";

const NewMemory = () => {
    const { bottom, top } = useSafeAreaInsets();
    const router = useRouter();

    const [preview, setPreview] = useState<string | null>(null);
    const [isPublic, setIsPublic] = useState(false);
    const [content, setContent] = useState("");

    const openImagePicker = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });

            if (result.assets[0]) {
                setPreview(result.assets[0].uri);
            }
        } catch (err) {
            // Erro não tratado
        }
    };

    const handleCreateMemory = async () => {
        const token = await SecureStore.getItemAsync("token");

        if (!preview) {
            return alert("Você precisa adicionar uma foto ou video de capa para criar uma memória");
        }

        let coverUrl = "";

        if (preview) {
            const uploadFormData = new FormData();

            uploadFormData.append("file", {
                uri: preview,
                name: "image.jpg",
                type: "image/jpeg",
            } as any);

            const uploadResponse = await api.post("/upload", uploadFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            coverUrl = uploadResponse.data.fileUrl;
        }

        await api.post(
            "/memories",
            {
                content,
                isPublic,
                coverUrl,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        router.push("/memories");
    };

    return (
        <ScrollView className="flex-1 px-8" contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}>
            <View className="mt-4 flex-row items-center justify-between">
                <NlwLogo />
                <Link href="/memories" asChild>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        className="h-10 w-10 items-center justify-center rounded-full bg-purple-500"
                    >
                        <ArrowLeft size={16} color="#fff" />
                    </TouchableOpacity>
                </Link>
            </View>
            <View className="mt-6 space-y-6">
                <View className="flex-row items-center gap-2">
                    <Switch
                        value={isPublic}
                        onValueChange={setIsPublic}
                        trackColor={{ false: "#767577", true: "#372560" }}
                        thumbColor={isPublic ? "#9b79ea" : "#9e9ea0"}
                    />
                    <Text className="font-body text-base text-gray-200">Tornar memória pública</Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={openImagePicker}
                    className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
                >
                    {preview ? (
                        <Image source={{ uri: preview }} className="h-full w-full rounded-lg object-cover" />
                    ) : (
                        <View className="flex-row items-center gap-2">
                            <IconImage color="#fff" />
                            <Text className="font-body text-sm text-gray-200">Adicionar foto ou video de capa</Text>
                        </View>
                    )}
                </TouchableOpacity>
                <TextInput
                    multiline
                    className="p-0 font-body text-lg text-gray-50"
                    textAlignVertical="top"
                    placeholderTextColor="#56565a"
                    placeholder="Fique livre para adicionar fotos, videos e relatos sobre essa experiência que você quer lembrar para sempre"
                    value={content}
                    onChangeText={setContent}
                />
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={handleCreateMemory}
                    className="items-center self-end rounded-full bg-green-500 px-5 py-2"
                >
                    <Text className="font-alt text-sm uppercase text-black">Salvar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default NewMemory;
