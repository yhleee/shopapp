package kr.co.oliveyoung.shopapp.common.utils;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class securityUtils {

    public static String digestSHA256(String data) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            digest.reset();
            byte[] bin = digest.digest(data.getBytes("ISO8859-1"));
            String mdData = "";
            byte[] arr$ = bin;
            int len$ = bin.length;

            for(int i$ = 0; i$ < len$; ++i$) {

                byte b = arr$[i$];
                String t = Integer.toHexString(b);
                if (t.length() < 2) {
                    mdData = mdData + "0" + t;
                } else {
                    mdData = mdData + t.substring(t.length() - 2);
                }
            }
            return mdData;

        } catch (NoSuchAlgorithmException var9) {
            System.out.println("Exception :: " + var9);
            var9.printStackTrace();

            return null;
        } catch (UnsupportedEncodingException var10) {
            System.out.println("Exception :: " + var10);
            var10.printStackTrace();

            return null;
        }
    }
}
