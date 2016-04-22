package me.titanburg.band_uniform;

import java.net.URL;

import me.titanburg.band_uniform.JSON.User;

/**
 * Created by kyle on 4/19/16.
 */
public class TitanburgAPI extends HttpsConnectionBuilder {

    User[] users;

    public TitanburgAPI(String type,String httpsString){
        super(httpsString);
    }

}
