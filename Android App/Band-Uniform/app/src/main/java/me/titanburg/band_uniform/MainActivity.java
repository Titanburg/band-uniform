package me.titanburg.band_uniform;

import android.os.StrictMode;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;

import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

import me.titanburg.band_uniform.JSON.User;

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
//        listViewAdapter = new ArrayAdapter<User>(this,R.layout.user_row,users);
//        usersListView.setAdapter(listViewAdapter);


    }

    public void refreshButton(View v){
        getUsers();
        Log.i("Test",users[0].toString());
        listViewAdapter.notifyDataSetChanged();
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

               System.out.println(message);

               Gson gson = new Gson();
               users = gson.fromJson(message,User[].class);

           } catch (IOException e) {
               e.printStackTrace();
           }
       };
    }

    private void getUsers(){

        HttpsConnectionBuilder getUsers = new HttpsConnectionBuilder("https://titanburg.me/api/user");
        String response = getUsers.sendGet();
        System.out.println("Get users" + response);


    }
}
