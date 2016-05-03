package me.titanburg.band_uniform;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;

import com.google.gson.Gson;

import me.titanburg.band_uniform.JSON.User;

public class UserActivity extends AppCompatActivity {

    User user;
    EditText firstName;
    EditText lastName;
    EditText email;
    CheckBox admin;
    Button saveChangesButton;
    Gson gson;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_user);

        gson = new Gson();
        String userStr = getIntent().getStringExtra("User");
        user = gson.fromJson(userStr,User.class);


        firstName = (EditText)findViewById(R.id.firstName);
        lastName = (EditText)findViewById(R.id.lastName);
        email = (EditText)findViewById(R.id.email);
        admin = (CheckBox)findViewById(R.id.adminCheckBox);
        saveChangesButton = (Button)findViewById(R.id.saveChangesButton);

        firstName.setText(user.local.firstName);
        lastName.setText(user.local.lastName);
        email.setText(user.local.email);
        admin.setChecked(user.local.admin);
    }

    public void saveChanges(View v){
        user.local.firstName = firstName.getText().toString();
        user.local.lastName = lastName.getText().toString();
        user.local.email = email.getText().toString();
        user.local.admin = admin.isChecked();

        HttpsConnectionBuilder post = new HttpsConnectionBuilder("https://titanburg.me/api/user/" + user._id);
        post.addData("id",user._id);
        post.addData("local",user.local.toString());
        post.sendPost();
        finish();
    }
}
