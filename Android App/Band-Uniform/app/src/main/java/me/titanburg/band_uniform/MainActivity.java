package me.titanburg.band_uniform;

import android.content.DialogInterface;
import android.os.StrictMode;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.JsonReader;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;

import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import javax.net.ssl.HttpsURLConnection;

import org.json.*;

public class MainActivity extends AppCompatActivity {

    ListView usersListView;
    ArrayAdapter<User> listViewAdapter;
    Button refreshButton;
    User[] users;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        usersListView = (ListView)findViewById(R.id.listView);
        refreshButton = (Button)findViewById(R.id.refreshButton);

        getUsers();
        listViewAdapter = new ArrayAdapter<User>(this,R.layout.user_row,users);
        usersListView.setAdapter(listViewAdapter);
        refreshButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                getUsers();

                listViewAdapter.notifyDataSetChanged();
            }
        });

    }




    private void print_content(HttpsURLConnection con){
        String message = "";
        if(con!=null){
            try {

               System.out.println("****** Content of the URL ********");
               BufferedReader br =
                       new BufferedReader(
                               new InputStreamReader(con.getInputStream()));
               String input;

               while ((input = br.readLine()) != null){
                   message += (input);
               }
               br.close();

               Gson gson = new Gson();
               users = gson.fromJson(message,User[].class);

           } catch (IOException e) {
               e.printStackTrace();
           }
       };
    }

    private void getUsers(){

        String https_url = "https://titanburg.me/api/user";
        URL url;
        try {

            url = new URL(https_url);
            HttpsURLConnection con = (HttpsURLConnection)url.openConnection();

//               //dumpl all cert info
//               print_https_cert(con);

            //dump all the content
            print_content(con);

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
