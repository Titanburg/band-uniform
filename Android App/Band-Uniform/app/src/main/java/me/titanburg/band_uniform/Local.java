package me.titanburg.band_uniform;

/**
 * Created by kyle on 4/4/16.
 */
public class Local {

    String email;
    String firstName;
    String lastName;
    String admin;
    String password;
    String hasRequested;
    String active;

    public String toString(){
        return "{email:"+email+",firstName:"+firstName+",lastName:"+lastName+",admin:"+admin+",password:"+password+",hasRequested:,"+hasRequested+",active:"+active+"}";
    }

}
