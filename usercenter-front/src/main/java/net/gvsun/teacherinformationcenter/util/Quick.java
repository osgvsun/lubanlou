package net.gvsun.teacherinformationcenter.util;

public class Quick {
    public static boolean isNotNullAndEmpty(String... s) {
        for (String i : s)
            if (i == null || "".equals(i))
                return false;
        return true;
    }
}
