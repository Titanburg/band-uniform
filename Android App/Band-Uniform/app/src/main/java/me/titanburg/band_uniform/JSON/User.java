package me.titanburg.band_uniform.JSON;

import me.titanburg.band_uniform.JSON.Local;

/**
 * Created by kyle on 4/4/16.
 */
public class User {

    Local local;
//    private Sizes sizes;
//    private Other other;

//    public String toString(){
//        return "{local:"+local.toString()+"}";
//    }

    public String toString(){
        return local.firstName + " " + local.lastName;
    }

}

class Local {

    protected String email;
    protected String firstName;
    protected String lastName;
    protected String admin;
    protected String password;
//    String hasRequested;
//    String state;

    public String toString(){
        return "{email:"+email+",firstName:"+firstName+",lastName:"+lastName+",admin:"+admin+",password:"+password /* +",hasRequested:,"+hasRequested+",active:"+state+"}"*/;
    }

}
