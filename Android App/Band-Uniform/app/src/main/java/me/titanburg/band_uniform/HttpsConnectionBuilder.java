package me.titanburg.band_uniform;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;

/**
 * Created by kyle on 4/21/16.
 */
public class HttpsConnectionBuilder {

    private String httpsString;
    private URL httpsUrl;
    private HashMap<String,String> data;
    private int readTimeout;
    private int connectTimeout;
    private boolean doInput;
    private boolean doOutput;
    private String type;
    private String response;

    public HttpsConnectionBuilder(String httpsString,int readTimeout,int connectTimeout,boolean doInput,boolean doOutput){
        this.httpsString = httpsString;
        this.readTimeout = readTimeout;
        this.connectTimeout = connectTimeout;
        this.doInput = doInput;
        this.doOutput = doOutput;
        this.data = new HashMap<>();
        this.response = "";
    }

    public HttpsConnectionBuilder(String httpsString){
        this(httpsString, 10000, 15000, true, true);
    }

    public void addData(String key,String value){
        data.put(key, value);
    }

    public void clearData(){
        data.clear();
    }

    public String sendPost(){
        type = "POST";
        sendHttps();
        return response;
    }

    public String sendGet(){
        type = "GET";
        doOutput = false;
        sendHttps();
        return response;
    }

    private void  sendHttps(){
        try {
            httpsUrl = new URL(httpsString);
            HttpsURLConnection conn = (HttpsURLConnection)httpsUrl.openConnection();
            conn.setReadTimeout(readTimeout);
            conn.setConnectTimeout(connectTimeout);
            conn.setRequestMethod(type);
            conn.setDoInput(doInput);
            conn.setDoOutput(doOutput);

            if(type.equals("POST")){
                OutputStream os = conn.getOutputStream();
                BufferedWriter writer = new BufferedWriter(
                        new OutputStreamWriter(os, "UTF-8"));
                writer.write(getPostDataString(data));

                writer.flush();
                writer.close();
                os.close();
            }

            int responseCode=conn.getResponseCode();
            System.out.println(responseCode + " " + type);

            if (responseCode == HttpsURLConnection.HTTP_OK) {
                System.out.println("Here");
                String line;
                BufferedReader br=new BufferedReader(new InputStreamReader(conn.getInputStream()));
                while ((line=br.readLine()) != null) {
                    response+=line;
                }

//                BufferedReader br =
//                        new BufferedReader(
//                                new InputStreamReader(conn.getInputStream()));
//                String input;
//
//                while ((input = br.readLine()) != null){
//                    response += (input);
//                }
//                br.close();
            }
            else {
                response="";
            }


        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    private String getPostDataString(HashMap<String, String> params) throws UnsupportedEncodingException {
        StringBuilder result = new StringBuilder();
        boolean first = true;
        for(Map.Entry<String, String> entry : params.entrySet()){
            if (first)
                first = false;
            else
                result.append("&");

            result.append(URLEncoder.encode(entry.getKey(), "UTF-8"));
            result.append("=");
            result.append(URLEncoder.encode(entry.getValue(), "UTF-8"));
        }

        return result.toString();
    }
}
