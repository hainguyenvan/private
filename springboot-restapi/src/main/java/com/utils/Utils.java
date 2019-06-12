package com.utils;

import com.google.gson.Gson;

public class Utils {

    public static String buildResponse(int statusCode, String msg, Object data) {
        String res = "{\"status\":" + statusCode + ", \"msg\":\"" + msg + "\"";
        if (data == null) {
            res += "}";
        }
        Gson gson = new Gson();
        String dataStr = gson.toJson(data);
        res += ",\"data\":" + dataStr + "}";
        return res;
    }
}
