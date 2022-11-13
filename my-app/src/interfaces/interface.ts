import { ReactNode } from "react";
import { ImageProps } from "react-bootstrap";


export interface Posts {
    nome?: string;
    menssage?: string;
    urlimg?: ImageProps["src"]; 
}

export interface AuthProviderProps{
    children: ReactNode;
}

export interface Datadefault{
    iconupload?:boolean;
    icontrash?:string;
    secondary?:string;
    disabled?:boolean;
    btcolor?:string;

}


