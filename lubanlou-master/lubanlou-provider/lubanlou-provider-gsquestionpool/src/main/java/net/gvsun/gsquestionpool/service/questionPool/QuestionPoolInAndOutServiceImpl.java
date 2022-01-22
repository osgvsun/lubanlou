package net.gvsun.gsquestionpool.service.questionPool;

import net.gvsun.gsquestionpool.domain.TAssignmentAnswer;
import net.gvsun.gsquestionpool.domain.TAssignmentItem;
import net.gvsun.gsquestionpool.domain.TAssignmentQuestionpool;
import net.gvsun.gsquestionpool.jpa.TAssignmentAnswerJPA;
import net.gvsun.gsquestionpool.jpa.TAssignmentItemJPA;
import net.gvsun.gsquestionpool.jpa.TAssignmentQuestionpoolJPA;
import net.gvsun.gsquestionpool.jpa.UserJPA;
import net.gvsun.gsquestionpool.util.HTMLUtils;
import net.gvsun.resource.dto.ResourceFileDto;
import net.gvsun.resource.service.ResourceContainerService;
import org.apache.poi.hssf.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**************************************************************************
 * Description:题库导入导出service impl
 *
 * @author:lixueteng
 * @date:2017/12/6 0006
 **************************************************************************/
@Service("questionPoolInAndOutService")
public class QuestionPoolInAndOutServiceImpl implements QuestionPoolInAndOutService {
    @Autowired
    private TAssignmentQuestionpoolJPA tAssignmentQuestionpoolJPA;
    @Autowired
    private UserJPA userJPA;
    @Autowired
    private TAssignmentItemJPA tAssignmentItemJPA;
    @Autowired
    private TAssignmentAnswerJPA tAssignmentAnswerJPA;
    @Autowired
    private ResourceContainerService resourceContainerService;

    /**************************************************************************
     * Description: 题库excel导出
     *
     * @author:lixueteng
     * @date:2017/12/6 0006
     * @param questionPoolId 题库的id
     **************************************************************************/
    @Override
    public byte[] exportExcelQuestionPoolById(Integer questionPoolId){
        List<TAssignmentItem> tAssignmentItemList = new ArrayList<TAssignmentItem>();
        //根据id获取题库
        TAssignmentQuestionpool tAssignmentQuestionpool = tAssignmentQuestionpoolJPA.findOne(questionPoolId);
        //获取题库标题
        String title =  "Questionpool-"+tAssignmentQuestionpool.getTitle();
        String filePath =null;
        //获取题目集合
        for(TAssignmentItem tAssignmentItem:tAssignmentQuestionpool.getTAssignmentItems()){
            if(tAssignmentItem.getType()==8&&tAssignmentItem.getIsOrder()!=null) {
                tAssignmentItem.setType(tAssignmentItem.getIsOrder()==1?8:7);
            }
            tAssignmentItemList.add(tAssignmentItem);
        }
        //创建HSSFWorkbook对象(excel的文档对象)
        HSSFWorkbook wb = new HSSFWorkbook();
        //建立新的sheet对象（excel的表单）
        title = title.replaceAll("\\/", "_");
        HSSFSheet sheet= wb.createSheet(title);
        HSSFSheet sheet1= wb.createSheet("题干图片");
        HSSFSheet sheet2= wb.createSheet("选择题答案图片");
        HSSFRow row = sheet.createRow((int) 0);
        int i=0;
        for(TAssignmentItem tAssignmentItem:tAssignmentItemList) //遍历题目
        {
            int j=2;
            //题目类型：1多选，2对错，4单选，5简答题，8填空，9匹配
            int type=tAssignmentItem.getType();
            row = sheet.createRow((int) i );
            row.createCell(0).setCellValue(type);
            String description = tAssignmentItem.getDescription();
            if(description.contains("<img")){
                String[] desArr = description.split("<img");
                description = desArr[0];
                for (int p=1;p<desArr.length;p++){
                    String url = "";
                    //截取图片在资源容器里的id
                    if(desArr[p].contains("data=")){
                        String[] split = desArr[p].split("'");
                        String picId = split[1];
                        ResourceFileDto pic = resourceContainerService.getFileById(Long.parseLong(picId));
                        //获取图片url
                        url = pic.getUrl();
                    }else{
                        url = desArr[p].substring(desArr[p].indexOf("\"")+1,desArr[p].indexOf("\"",desArr[p].indexOf("\"")+1));
                    }
                    try {
                        URL url1 = new URL(url);
                        ByteArrayOutputStream out = new ByteArrayOutputStream();
                        BufferedImage bufferImg = ImageIO.read(url1);
                        ImageIO.write(bufferImg,"jpg",out);
                        HSSFPatriarch drawingPatriarch = sheet1.createDrawingPatriarch();
                        HSSFClientAnchor anchor = new HSSFClientAnchor(0,0,0,0,(short)(p-1),i,(short)p,i+1);
                        int pictureIndex= wb.addPicture(out.toByteArray(),HSSFWorkbook.PICTURE_TYPE_PNG);
                        drawingPatriarch.createPicture(anchor,pictureIndex);
                        out.close();
                    } catch (MalformedURLException e) {
                        e.printStackTrace();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }

            row.createCell(1).setCellValue(HTMLUtils.HTMLTagSpirit(description));
            if(type==2){//判断
                for(TAssignmentAnswer tAssignmentAnswer:tAssignmentItem.getTAssignmentAnswers()){
                    if(tAssignmentAnswer.getIscorrect().equals(1)){
                        if(tAssignmentAnswer.getText().equals("对")){
                            row.createCell(2).setCellValue(1);
                        }
                        else{
                            row.createCell(2).setCellValue(0);
                        }
                    }
                }
            }
            if(type == 1||type == 4){//多选题,单选题
                int as = 0;//记录是第几个选项
                for(TAssignmentAnswer tAssignmentAnswer:tAssignmentItem.getTAssignmentAnswers()){
                    String text = tAssignmentAnswer.getText();
                    if(text.indexOf("<img")>=0){
                        String[] ansArr = text.split("<img");
                        text = ansArr[0];
                        String[] split = ansArr[1].split("'");
                        String picId = split[1];
                        ResourceFileDto pic = resourceContainerService.getFileById(Long.parseLong(picId));
                        //获取图片url
                        String url = pic.getUrl();
                        try {
                            URL url1 = new URL(url);
                            ByteArrayOutputStream out = new ByteArrayOutputStream();
                            BufferedImage bufferImg = ImageIO.read(url1);
                            ImageIO.write(bufferImg,"jpg",out);
                            HSSFPatriarch drawingPatriarch = sheet2.createDrawingPatriarch();
                            HSSFClientAnchor anchor = new HSSFClientAnchor(0,0,0,0,(short)as,i,(short)(as+1),i+1);
                            int pictureIndex= wb.addPicture(out.toByteArray(),HSSFWorkbook.PICTURE_TYPE_PNG);
                            drawingPatriarch.createPicture(anchor,pictureIndex);
                            out.close();
                        } catch (MalformedURLException e) {
                            e.printStackTrace();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                    if(tAssignmentAnswer.getIscorrect().equals(1)){
                        row.createCell(j).setCellValue(HTMLUtils.HTMLTagSpirit(text));
                        row.createCell(j+1).setCellValue(1);
                        j=j+2;//列标
                    }
                    else{
                        row.createCell(j).setCellValue(HTMLUtils.HTMLTagSpirit(text));
                        row.createCell(j+1).setCellValue(0);
                        j=j+2;
                    }
                    as++;
                }
            }
//            if(type == 8){//填空
//                for(TAssignmentAnswer tAssignmentAnswer:tAssignmentItem.getTAssignmentAnswers()){
//                    if(tAssignmentAnswer.getIscorrect().equals(1)){
//                        System.out.println(tAssignmentAnswer.getText()+"===="+j);
//                        row.createCell(j).setCellValue(tAssignmentAnswer.getText());
//                        j=j+1;//列标
//                    }
//                }
//            }
            if(type==5) {//简答
                StringBuilder sText = new StringBuilder();
                StringBuilder sWeight = new StringBuilder();
                Map<String,String> mapText = new HashMap<>();
                Map<String,Double> mapWeight = new HashMap<>();
                for (TAssignmentAnswer tAssignmentAnswer : tAssignmentItem.getTAssignmentAnswers()) {
                    if (tAssignmentAnswer.getIscorrect().equals(1)) {
                        if (("标准答案").equals(tAssignmentAnswer.getLabel())) {
                            row.createCell(2).setCellValue(tAssignmentAnswer.getText());//标准答案
                            row.createCell(3).setCellValue(tAssignmentAnswer.getWeight());//标准答案权重
                        }
                    }else if(tAssignmentAnswer.getIscorrect().equals(0)){
                        mapText.put(tAssignmentAnswer.getLabel(),tAssignmentAnswer.getText());
                        mapWeight.put(tAssignmentAnswer.getLabel(),tAssignmentAnswer.getWeight());
                    }
                }
                for (int p=1;p<=mapText.size();p++){
                    sText.append(mapText.get("关键词"+p)+"&&");
                    sWeight.append(mapWeight.get("关键词"+p)+"&&");
                }
                if(sText.length()>0) {
                    sText.delete(sText.length() - 2, sText.length());
                    sWeight.delete(sWeight.length() - 2, sWeight.length());
                    row.createCell(4).setCellValue(sText.toString());//关键词
                    row.createCell(5).setCellValue(sWeight.toString());//关键词权重
                    row.createCell(6).setCellValue(tAssignmentItem.getIsOrder()==null?"1":tAssignmentItem.getIsOrder().toString());//1为系统判题，0为手动判题
                }
            }
            i++;//行标
        }

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try {
            wb.write(byteArrayOutputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
        byte[] bytes = byteArrayOutputStream.toByteArray();
        return bytes;
        /*try
        {
            String fileName = title;
            File file = new File(fileName+".xls");
            FileOutputStream fout = new FileOutputStream(file);
            wb.write(fout);
            fout.close();
            return fileName+".xls";
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return "";
        }*/
    }
}
