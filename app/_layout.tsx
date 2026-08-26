import type { Session } from "@supabase/supabase-js";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    //check wether a user is already logged in
    supabase.auth.getSession().then(({data}) => {
      
      setSession(data.session);
      setLoading(false);
    });
    //listen for login/ logout changes
    const {
      data: {subscription},
    } = supabase.auth.onAuthStateChange((_event,session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  },[]);

  useEffect(() => {
      if(loading){
        return;
      }
      const inAuthGroup = segments[0] === "(auth)";

      if(!session && !inAuthGroup) {
        router.replace("/(auth)/login");
      }
      if(session && inAuthGroup) {
        router.replace("/(tabs)");
      }
    }, [session,loading, segments]);
    
  

  return <Stack />;
}
