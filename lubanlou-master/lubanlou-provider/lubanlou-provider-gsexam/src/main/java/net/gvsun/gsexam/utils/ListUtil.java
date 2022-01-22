package net.gvsun.gsexam.utils;

import java.util.ArrayList;
import java.util.List;

/**************************************************************************
 * Description:list集合操作的工具包
 *
 * @author:lixueteng
 * @date:2017/11/20 0020
 **************************************************************************/
public class ListUtil {
    public static <T> List<List<T>> averageAssign(List<T> source, int n) {
        List<List<T>> result = new ArrayList<List<T>>();
        // 10条记录分四份结果为：
        // 10 -> 3.3.2.2
        int remaider = source.size() % n;  //(先计算出余数)
        int number = source.size() / n;  //然后是商
        int offset = 0;//偏移量
        for (int i = 0; i < number+1; i++) {
            List<T> value = null;
            if (i < number) {
                value = source.subList(i * n , (i + 1) * n);

                offset++;
            } else {
                value = source.subList(i * n , source.size());
            }
            result.add(value);
        }
        return result;
    }
}
