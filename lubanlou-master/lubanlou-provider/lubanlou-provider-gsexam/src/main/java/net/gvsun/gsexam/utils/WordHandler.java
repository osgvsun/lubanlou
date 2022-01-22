package net.gvsun.gsexam.utils;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

import java.io.*;
import java.util.Map;

/*
 * 生成word
 * 作者：彭文玉
 */
public class WordHandler {
    //私有化变量configuration设置为null
    private Configuration configuration = null;
    //新建一个构造方法
    public WordHandler() {
        //新建configuration对象
        configuration = new Configuration();
        //设置编码格式为utf-8
        configuration.setDefaultEncoding("utf-8");
    }
    //生成一个doc文档
    public File createDoc(String templatePath, String templateName, Map dataMap,String fileName) {

	/*	// 要填入模本的数据文件
		Map dataMap = new HashMap();
		getData(dataMap);*/

        // 设置模本装置方法和路径,FreeMarker支持多种模板装载方法。可以重servlet，classpath，数据库装载，
        // ftl文件存放路径
        configuration.setClassForTemplateLoading(this.getClass(), templatePath);
        //设置一个freemarker模板为null
        Template t = null;
        try {
            // test.ftl为要装载的模板
            t = configuration.getTemplate(templateName);
            //设置模板的编码为utf-8
            t.setEncoding("utf-8");
        }
        //否则打印错误
        catch (IOException e) {
            e.printStackTrace();
        }

        // 获取类加载的根路径，tomcat中是WEB-INF/classes/
        String root = this.getClass().getResource("/").getPath();
        //声明文档的名称
        String upLoad=root+"upload"+File.separator;  //File.separator文件分隔符（在 UNIX和Linux系统中是“/”）

//根据输出文档的名称和路径新建一个文档
        File file = new File(upLoad);
        //如果文件不存在的话
        if(!file.exists()){
            //新建file文档
            file.mkdirs();
        }//根据输出文档的名称和路径新建一个word文档
        File outFile = new File(upLoad+fileName+".doc");
        //新建输入流对象为空
        Writer out = null;
        try {
            //将文件通过文件输出流来写入word并设置编码格式
            out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(outFile), "utf-8"));
        }
        //否则打印错误
        catch (Exception e1) {
            e1.printStackTrace();
        }

        try {
            //将数据写入流中
            t.process(dataMap, out);
            /*out.close();*/
        }
        //否则报模板错误
        catch (TemplateException e) {
            e.printStackTrace();
        } //否则报模板错误
        catch (IOException e) {
            e.printStackTrace();
        }
        //返回生成的文档
        return outFile;
    }
    /*
     * 主方法
     * @RequestParam templatePath 模板路径
     * @RequestParam templateName 模板名称
     * @RequestParam dataMap  数据来源
     *  @RequestParam fileName  文件名称
     */
    public static void main(String templatePath, String templateName, Map dataMap,String fileName) {
        //新建一个wordHandler生成word
        new WordHandler().createDoc(templatePath,templateName,dataMap,fileName);
    }

}

