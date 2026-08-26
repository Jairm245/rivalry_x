import { supabase } from "../lib/supabase";
import { FollowedTeam, Team } from "../types/sports";

export async function followTeam(team:Team) {
    const {
        data: {user},
    } = await supabase.auth.getUser();

    if(!user)
    {
        throw new Error("User is not logged in");
    }
    // Make sure the team exists in supabase
    let { data:teamRow, error: findError} = await supabase
    .from("teams")
    .select("id")
    .eq("sports_api_id",team.id)
    .maybeSingle();

    if(findError)
    {
        throw findError;
    }
    // Team doesn't exist so create it
    if(!teamRow)
    {
        const {data: newTeam, error: insertError} = await supabase
        .from("teams")
        .insert({
            sports_api_id: team.id,
            name: team.name,
            logo_url: team.logo,
            country: team.country
        })
        .select("id")
        .single();

        if(insertError)
        throw insertError;
    teamRow = newTeam;
    }
    
    // Create the follow relationship
    const { error: followError} = await supabase
    .from("user_teams")
    .insert({
        user_id: user.id,
        team_id: teamRow.id,
    })

    if(followError)
    {
        throw followError;
    }
    }
    
export async function isFollowingTeam(
    sportsApiId: number
): Promise<boolean> {
    const {
        data: {user},
    } = await supabase.auth.getUser();

    if(!user)
        return false;

    const {data: teamRow, error: teamError} = await supabase
    .from("teams")
    .select("id")
    .eq("sports_api_id", sportsApiId)
    .maybeSingle();

    if(teamError)
        throw teamError;

    if(!teamRow)
        return false;

    const {data, error} = await supabase
    .from("user_teams")
    .select("team_id")
    .eq("user_id", user.id)
    .eq("team_id", teamRow.id)
    .maybeSingle();

    if(error)
        throw error;

    return data !== null;
}

export async function unfollowTeam(
    sportsApiId: number
) {
    const { 
        data: {user},
    } = await supabase.auth.getUser();

    if(!user)
        throw new Error("User is not logged in");

    const {data: teamRow, error: teamError} = await supabase
    .from("teams")
    .select("id")
    .eq("sports_api_id", sportsApiId)
    .single();

    if(teamError)
        throw teamError

    const { error} = await supabase
    .from("user_teams")
    .delete()
    .eq("user_id", user.id)
    .eq("team_id", teamRow.id);

    if (error)
        throw error;
    
}

export async function getFollowedTeams(): 
Promise<FollowedTeam[]>
{
    const {
        data: {user},
    } = await supabase.auth.getUser();

    if(!user)
        throw new Error("User is not logged in!")

    const {data,error} = await supabase
    .from("user_teams")
    .select(`
        team_id, teams (
        id,
        sports_api_id,
        name,
        logo_url,
        country
    )`)
    .eq("user_id", user.id);

    if(error)
        throw error
    return data.map((item:any) => item.teams);
    }
