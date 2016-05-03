package me.titanburg.band_uniform;

import android.content.Intent;
import android.os.StrictMode;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.CookieHandler;
import java.net.CookieManager;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;

import me.titanburg.band_uniform.JSON.Status;
import me.titanburg.band_uniform.JSON.User;

public class LoginActivity extends AppCompatActivity {

    private EditText email;
    private EditText password;
    private Gson gson;
    private Status status;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        CookieManager cookieManager = new CookieManager();
        CookieHandler.setDefault(cookieManager);

        email = (EditText)findViewById(R.id.emailEditText);
        password = (EditText)findViewById(R.id.passwordEditText);

        gson = new Gson();


    }

    public void loginButton(View view){

        String httpsString = "https://titanburg.me/auth/login";

        HttpsConnectionBuilder login = new HttpsConnectionBuilder(httpsString);
        login.addData("email",email.getText().toString());
        login.addData("password",password.getText().toString());
        login.addData("type","android");
        String response = login.sendPost();

        System.out.println(response);
        status = gson.fromJson(response,Status.class);

        switch (status.login){
            case "SUCCESS":
                Intent i = new Intent(view.getContext(), MenuActivity.class);
                startActivity(i);
                break;
            case "FAILURE":

                break;
        }

    }
}


