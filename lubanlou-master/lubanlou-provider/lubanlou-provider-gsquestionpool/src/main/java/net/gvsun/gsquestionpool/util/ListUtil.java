package net.gvsun.gsquestionpool.util;

import java.util.ArrayList;
import java.util.List;

/**************************************************************************
 * Description:list集合操作的工具包
 *
 * @author:lixueteng
 * @date:2017/11/20 0020
 **************************************************************************/
public class ListUtil {
    public static  <T> List<List<T>> averageAssign(List<T> source, int n){
        List<List<T>> result=new ArrayList<List<T>>();
        int remaider=source.size()%n;  //(先计算出余数)
        int number=source.size()/n;  //然后是商
        int offset=0;//偏移量
        for(int i=0;i<n;i++){
            List<T> value=null;
            if(remaider>0){
                value=source.subList(i*number+offset, (i+1)*number+offset+1);
                remaider--;
                offset++;
            }else{
                value=source.subList(i*number+offset, (i+1)*number+offset);
            }
            result.add(value);
        }
        return result;
    }
}
