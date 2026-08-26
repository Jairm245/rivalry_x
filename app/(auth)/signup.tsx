import { router } from "expo-router";
import { useState } from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import { supabase } from "../../lib/supabase";

export default function SignupScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    
    const handleSignup = async () => {
        setError(null);
        setMessage(null);

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: "rilvaryx://login",
            }
        });

        if (error) {
            setError(error.message);
            return;
        } 
        
        if(!data.session) {
            setMessage("Check your email to confirm your account.")
        }
        
    };

    return (
        <View>
            <Text>
                Sign Up
            </Text>
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
            {message && <Text style={{ color: "green" }}>{message}</Text>}


            <Button title="Create Account"
             onPress={handleSignup} />
             <Pressable onPress={() => router.replace("/(auth)/login")}>
                <Text>Already have an account? Log In</Text>
             </Pressable>
        </View>
    );
}