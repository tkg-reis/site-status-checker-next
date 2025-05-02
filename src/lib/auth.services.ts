import { supabaseData } from "@/app/config/connection";
export const singUp = async(username : string ,email : string, password : string) : Promise<{data : any; error : any}> => {
    const { data, error } = await supabaseData.auth.signUp({
        email,
        password,
        options : {
            data : {
                username
            },
            emailRedirectTo : process.env.NEXT_PUBLIC_REDIRECT_URL
        }
    })

    if(error) throw new Error(`error message : ${error}`);

    return { data, error }
}

export const signIn = async(email : string, password : string) : Promise<{data : any; error : any}> => {
    const { data, error } = await supabaseData.auth.signInWithPassword({email, password});

    if(error) throw new Error(`error message ${error}`);

    return { data, error }
}