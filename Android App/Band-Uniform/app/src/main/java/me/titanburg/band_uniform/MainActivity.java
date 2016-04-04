package me.titanburg.band_uniform;

import android.content.DialogInterface;
import android.os.StrictMode;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.JsonReader;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

import org.json.*;

public class MainActivity extends AppCompatActivity {

    TextView usersTextView;
    Button getUsersButton;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        usersTextView = (TextView)findViewById(R.id.usersTextView);
        getUsersButton = (Button)findViewById(R.id.getUsersButton);
        getUsersButton.setOnClickListener(userButtonClick);

    }

   private View.OnClickListener userButtonClick = new View.OnClickListener() {
       @Override
       public void onClick(View v) {
            usersTextView.setText(getUsers());


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
                       message += (input + "\n");
                   }
                   br.close();



               } catch (IOException e) {
                   e.printStackTrace();
               }

//               try (InputStream is = con.getInputStream()){
//                        JsonReader rdr = Json {
//
//                        JSONObject obj = rdr.readObject();
//                        JsonArray results = obj.getJsonArray("data");
//                        for (JsonObject result : results.getValuesAs(JsonObject.class)) {
//                                System.out.print(result.getJsonObject("from").getString("name"));
//                                System.out.print(": ");
//                                System.out.println(result.getString("message", ""));
//                                System.out.println("-----------");
//                            }
//                    }
//               }catch(IOException e){
//                   e.printStackTrace();
//               }

           }

       }



   };

    private String getUsers(){
        return "Users";
    }
}
