package me.titanburg.band_uniform;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class MenuActivity extends AppCompatActivity {


    Button usersButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_menu);

        usersButton = (Button)findViewById(R.id.button);
    }

    public void changeToUsersButton(View v){
        Intent i = new Intent(v.getContext(), MainActivity.class);
        startActivity(i);
    }


}
