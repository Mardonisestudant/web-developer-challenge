import { createContext, useEffect, useState } from "react";
import { Posts, 
    AuthProviderProps,
    Datadefault
 } from "../interfaces/interface";



type AuthContextData = {
    posts:Posts[],
    datadefault:Datadefault,
    handlesave: (posts:Posts[]) => void
    removePost: (i:number) => void
    setDatadefault: (data:Datadefault) => void
     
}

 export const AuthContext = createContext({} as AuthContextData);


export  function AuthProvider({ children }: AuthProviderProps){
    
    
    const [posts , setPosts] = useState<Posts[]>([])
    const [datadefault, setDatadefault] = useState<Datadefault>({
        btcolor:"#313131",
        disabled:true,
        icontrash:"hidden",
        iconupload:false,
        secondary:"secondary"
    })

    const handlesave = async (posts:any) => {
        setPosts(Prev => [...Prev, posts]) 
    }
    
    
    const removePost = async (i:number) => {
        let filteredArray = posts.filter((item, index) => index !== i);
        setPosts(filteredArray)      
    }

    useEffect(() => {
      console.log('UseEffet effected');
    },[posts])


    return(
        <AuthContext.Provider 
        value={{
            posts,
            datadefault,
            handlesave,
            removePost,
            setDatadefault,
            }}>
            {children}
        </AuthContext.Provider>
    )
}