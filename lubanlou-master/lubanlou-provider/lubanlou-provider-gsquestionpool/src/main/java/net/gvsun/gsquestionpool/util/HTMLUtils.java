package net.gvsun.gsquestionpool.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class HTMLUtils {

    public static String HTMLTagSpirit(String htmlStr) {
        String regEx_script = "<script[^>]*?>[\\s\\S]*?<\\/script>"; // 定义script正则表达式
        String regEx_style = "<style[^>]*?>[\\s\\S]*?<\\/style>"; // 定义style样式正则表达式
        String regEx_html = "<[^>]+>"; // 定义HTML标签正则表达式

        /*
         * 过滤script标签
         */
        Pattern pScript = Pattern.compile(regEx_script, Pattern.CASE_INSENSITIVE);
        Matcher mScript = pScript.matcher(htmlStr);
        htmlStr = mScript.replaceAll("");

        /*
         * 过滤style标签
         */
        Pattern pStyle = Pattern.compile(regEx_style, Pattern.CASE_INSENSITIVE);
        Matcher mStyle = pStyle.matcher(htmlStr);
        htmlStr = mStyle.replaceAll("");

        /*
         * 过滤html标签
         */
        Pattern pHtml = Pattern.compile(regEx_html, Pattern.CASE_INSENSITIVE);
        Matcher mH_html = pHtml.matcher(htmlStr);
        htmlStr = mH_html.replaceAll("");

        // 替换所有空格
        htmlStr = htmlStr.replaceAll("&nbsp;", "");
        //替换所有换行符号
        htmlStr = htmlStr.replaceAll("\n","");

        return htmlStr.trim();
    }

    public static void main(String[] args) {
        String htmlStr = "<div class=\"news_tag\"><a href=\"http://blog.yoodb.com/\">&nbps;素文宅博客</a></div>";
        System.out.println("文本内容：" + HTMLTagSpirit(htmlStr));
    }
}

