package net.gvsun.oauth2.internal;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

public class Quick {
    public static <T> Map<String, Object> entity2Map(T entity) throws IllegalAccessException {
        Map<String, Object> map = new HashMap<>();
        Field[] entityFields = entity.getClass().getDeclaredFields();
        for (Field ef : entityFields) {
            ef.setAccessible(true);
            map.put(ef.getName(), ef.get(entity));

        }
        return map;
    }
}
