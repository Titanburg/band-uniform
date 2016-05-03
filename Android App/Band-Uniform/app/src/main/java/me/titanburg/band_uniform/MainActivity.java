package me.titanburg.band_uniform;

import android.content.Intent;
import android.os.StrictMode;
import android.provider.SyncStateContract;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;

import javax.net.ssl.HttpsURLConnection;

import me.titanburg.band_uniform.JSON.User;

public class MainActivity extends AppCompatActivity {

    ListView usersListView;
    ArrayAdapter<User> listViewAdapter;
    Button refreshButton;
    User[] users;
    Gson gson = new Gson();


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
        usersListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position,
                                    long id) {

//                Toast.makeText(getBaseContext(), item, Toast.LENGTH_LONG).show();

                Intent i = new Intent(view.getContext(), UserActivity.class);
                i.putExtra("User",gson.toJson(users[position]));
                startActivity(i);
            }
        });
    }



    public void refreshButton(View v){
        getUsers();
    }

    private void getUsers(){
        HttpsConnectionBuilder getUsers = new HttpsConnectionBuilder("https://titanburg.me/api/user");
        String response = getUsers.sendGet();
        System.out.println("Get users" + response);
        users = gson.fromJson(response,User[].class);
        listViewAdapter = new ArrayAdapter<User>(this,R.layout.user_row,users);
        usersListView.setAdapter(listViewAdapter);
    }
}
