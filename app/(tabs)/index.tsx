import { useEffect } from "react";
import { Text, View } from "react-native";
import { supabase } from "../../lib/supabase";

export default function Index() {
  const testSupabase = async () => {
    const { data, error } = await supabase
      .from("teams")
      .select("*");
      console.log("Supabase data:", data);
      console.log("Supabase error:", error);
  };
  useEffect(() => {
    testSupabase();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen. Hey there, Jair!</Text>
    </View>
  );
}
