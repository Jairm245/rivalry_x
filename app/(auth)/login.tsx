import { router } from "expo-router";
import { useState } from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import { supabase } from "../../lib/supabase";


export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
const handleLogIn = async() => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error){
        setError(error.message);
        return;
    }
    console.log("Login successful:", !!data.session);
    router.replace("/(tabs)");
};

return (
    <View>
        <Text>Login</Text>
        <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        />
        <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        />
        {error && <Text style={{ color: "red" }}>{error}</Text>}
        <Button title="Log In" onPress={handleLogIn} />
        <Pressable onPress={() => router.push("/(auth)/signup")}>
            <Text>Don't have an account? Sign Up</Text>
        </Pressable>
    </View>
)
}