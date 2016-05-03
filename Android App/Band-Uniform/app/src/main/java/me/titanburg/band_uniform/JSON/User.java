package me.titanburg.band_uniform.JSON;



/**
 * Created by kyle on 4/4/16.
 */
public class User{

    public Local local;
    public String _id;
//    private Sizes sizes;
//    private Other other;

//    public String toString(){
//        return "{local:"+local.toString()+"}";
//    }

    public String toString(){
        return local.firstName + " " + local.lastName;
    }

}


