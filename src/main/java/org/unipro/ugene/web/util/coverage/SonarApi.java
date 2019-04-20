package org.unipro.ugene.web.util.coverage;

import javafx.util.Pair;
import org.unipro.ugene.web.model.AppSettings;
import org.unipro.ugene.web.model.UserSettings;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Base64;
import java.util.Map;
import java.util.stream.Collectors;

public class SonarApi {

    private static final String USER_AGENT = "Mozilla/5.0";

    public static Pair<Integer, String> httpRequest(UserSettings settings,
                                                    AppSettings app,
                                                    String method,
                                                    String targetPath,
                                                    Map<String, String> params) throws IOException {
        String urlParameters = params.keySet().stream()
                .map(key -> key + "=" + params.get(key))
                .collect(Collectors.joining("&"));

        String url = "http://"
                + settings.getSonarhost() + ":" + settings.getSonarport()
                + targetPath
                + (method.equals("GET") ? "?" + urlParameters : "");

        URL obj = new URL(url);
        HttpURLConnection connection = (HttpURLConnection) obj.openConnection();

        //add request header
        connection.setRequestMethod(method);
        connection.setRequestProperty("User-Agent", USER_AGENT);
        connection.setRequestProperty("Accept-Language", "en-US,en;q=0.5");

        // authentication
        String username=settings.getSonarlogin();
        String password=settings.getSonarpassword();
        String userCredentials = username+":"+password;
        String basicAuth = "Basic " + new String(Base64.getEncoder().encode(userCredentials.getBytes()));
        connection.setRequestProperty ("Authorization", basicAuth);

        // Send post request
        if (method.equals("POST")) {
            connection.setDoOutput(true);
            DataOutputStream wr = new DataOutputStream(connection.getOutputStream());
            wr.writeBytes(urlParameters);
            wr.flush();
            wr.close();
        }

        int responseCode = connection.getResponseCode();
        String responseString = getResponseString(connection);
        return new Pair<>(responseCode, responseString);
    }


    private static String getResponseString(HttpURLConnection connection) throws IOException {
        BufferedReader in = new BufferedReader(
                new InputStreamReader(connection.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        return response.toString();
    }
}
