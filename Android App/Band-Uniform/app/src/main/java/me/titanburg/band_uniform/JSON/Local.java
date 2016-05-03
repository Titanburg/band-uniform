package me.titanburg.band_uniform.JSON;

/**
 * Created by kyle on 5/2/16.
 */
public class Local {

    public String email;
    public String firstName;
    public String lastName;
    public boolean admin;
    public String password;
//    String hasRequested;
//    String state;

    public String toString(){
        return "{email:"+email+",firstName:"+firstName+",lastName:"+lastName+",admin:"+admin+",password:"+password /* +",hasRequested:,"+hasRequested+",active:"+state*/+"}";
    }

}
