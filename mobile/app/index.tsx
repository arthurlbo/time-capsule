import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

import { api } from "../src/lib/api";

import NlwLogo from "../src/assets/logo.svg";

const discovery = {
    authorizationEndpoint: "https://github.com/login/oauth/authorize",
    tokenEndpoint: "https://github.com/login/oauth/access_token",
    revocationEndpoint: `https://github.com/settings/connections/applications/${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}`,
};

export default function App() {
    const router = useRouter();

    const [, response, signInWithGithub] = useAuthRequest(
        {
            clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID,
            scopes: ["identity"],
            redirectUri: makeRedirectUri({
                scheme: "spacetime",
            }),
        },
        discovery,
    );

    const handleGithubOAuthCode = async (code: string) => {
        const response = await api.post("/register", { code });

        const { token } = response.data;

        await SecureStore.setItemAsync("token", token);

        router.push("/memories");
    };

    useEffect(() => {
        // Verifica qual é a uri redirect para rodar a aplicação
        // console.log(
        //     makeRedirectUri({
        //         scheme: "spacetime",
        //     }),
        // );

        if (response?.type === "success") {
            const { code } = response.params;
            handleGithubOAuthCode(code);
        }
    }, [response]);

    return (
        <View className="flex-1 items-center px-8 py-10">
            <View className="flex-1 items-center justify-center gap-6">
                <NlwLogo />
                <View className="space-y-2">
                    <Text className="text-center font-title text-2xl leading-tight text-gray-50">
                        Sua cápsula do tempo
                    </Text>
                    <Text className="text-center font-body text-base leading-relaxed text-gray-100">
                        Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!
                    </Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="rounded-full bg-green-500 px-5 py-2"
                    onPress={() => signInWithGithub()}
                >
                    <Text className="font-alt text-sm uppercase text-black">Cadastrar lembrança</Text>
                </TouchableOpacity>
            </View>
            <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
                Made with 💜 by Arthur Lobo
            </Text>
        </View>
    );
}
