package net.gvsun.gsquestionpool.service.questionPool;

import net.gvsun.datasource.ClientDatabaseContextHolder;
import net.gvsun.gsquestionpool.domain.TAssignmentAnswer;
import net.gvsun.gsquestionpool.domain.TAssignmentItem;
import net.gvsun.gsquestionpool.domain.TAssignmentQuestionpool;
import net.gvsun.gsquestionpool.dto.UserVo;
import net.gvsun.gsquestionpool.jpa.TAssignmentAnswerJPA;
import net.gvsun.gsquestionpool.jpa.TAssignmentItemJPA;
import net.gvsun.gsquestionpool.jpa.TAssignmentQuestionpoolJPA;
import net.gvsun.gsquestionpool.jpa.UserJPA;
import net.gvsun.gsquestionpool.service.common.ShareService;
import net.gvsun.resource.dto.DirectoryDto;
import net.gvsun.resource.dto.ResourceFileDto;
import net.gvsun.resource.service.ResourceContainerService;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.poi.POIXMLDocumentPart;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.*;
import org.openxmlformats.schemas.drawingml.x2006.spreadsheetDrawing.CTMarker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.*;

/**************************************************************************
 * Description:
 *
 * @author:lixueteng
 * @date:2017/12/15 0015
 **************************************************************************/
@Service("questionPoolUpLoadService")
public class QuestionPoolUpLoadServiceImpl implements QuestionPoolUpLoadService {
    @Autowired
    private TAssignmentQuestionpoolJPA tAssignmentQuestionpoolJPA;
    @Autowired
    private UserJPA userJPA;
    @Autowired
    private TAssignmentItemJPA tAssignmentItemJPA;
    @Autowired
    private TAssignmentAnswerJPA tAssignmentAnswerJPA;
    @Autowired
    private ShareService shareService;
    @Autowired
    private ResourceContainerService resourceContainerService;


    /**************************************************************************
     * Description: excel?????????
     *
     * @author:lixueteng
     * @date:2017/12/6 0006
     * @param questionPoolId ?????????id
     **************************************************************************/
    @Override
    public Map<String, String> resolveExcelWithQUestionPool(byte[] bytes, String filename, Integer questionPoolId, UserVo userVo, String filePath, String datasource) {
        ClientDatabaseContextHolder.set(datasource);
        //???byte??????inputstream
        ByteArrayInputStream input = new ByteArrayInputStream(bytes);
        //??????????????????
        Map<String, String> result = new HashMap<String, String>();
        // ???????????????excel2007??????
        boolean isE2007 = false;
        if (filename.endsWith("xlsx")) {
            isE2007 = true;
        }
        try {

            // ???????????????
            Workbook wb = null;
            // ??????????????????(2003??????2007)????????????
            if (isE2007) {
                wb = WorkbookFactory.create(input);
//                wb = new XSSFWorkbook(input);
            } else {
                wb = WorkbookFactory.create(input);
//               wb = new HSSFWorkbook(input);
            }
            // ?????????????????????
            Sheet sheet = wb.getSheetAt(0);
            //????????????????????????????????????????????????????????????????????????
            result = checkExcelWithQuestionPool(sheet);
            // map??????????????????
            Map<String, PictureData> sheetIndexPicMap = null;
            //map???????????????????????????
            Map<String, PictureData> answerPicMap = null;
            //????????????????????????
            String path = filePath + "questionPool" + questionPoolId + "/";
            if (result.get("message").equals("ok")) {
                //????????????
                // ??????????????????(2003??????2007)????????????
                //????????????????????????0???????????????
                Integer sheetSize = wb.getNumberOfSheets();
                if (sheetSize > 1) {
                    //sheet1?????????????????????
                    Sheet sheet1 = wb.getSheetAt(1);
                    if (isE2007) {
                        sheetIndexPicMap = getSheetPictrues07(1, (XSSFSheet) sheet1, (XSSFWorkbook) wb);
                    } else {
                        sheetIndexPicMap = getSheetPictrues03(1, (HSSFSheet) sheet1, (HSSFWorkbook) wb);
                    }
                }
                if(sheetSize>2){
                    //sheet2????????????????????????
                    Sheet sheet2 = wb.getSheetAt(2);
                    if (isE2007){
                        answerPicMap = getSheetPictrues07(2, (XSSFSheet) sheet2, (XSSFWorkbook) wb);
                    }else{
                        answerPicMap = getSheetPictrues03(2, (HSSFSheet) sheet2, (HSSFWorkbook) wb);
                    }
                }


                // ?????????????????????????????????
                Iterator<Row> rows = sheet.rowIterator();
                TAssignmentQuestionpool tAssignmentQuestionpool = tAssignmentQuestionpoolJPA.findOne(questionPoolId);
                Set<TAssignmentItem> tAssignmentItems = new HashSet<>();
                String[] labelStrings = new String[]{"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"};
                int num = 0;
                while (rows.hasNext()) {
                    Row row = rows.next(); // ???????????????
                    //?????????????????????????????????????????????????????????????????????
                    StringBuilder rowText = new StringBuilder();
                    for (int i = 0; row.getCell(i) != null; i++) {
                        row.getCell(i).setCellType(Cell.CELL_TYPE_STRING);
                        rowText.append(row.getCell(i).getStringCellValue());
                    }
                    if (rowText.toString().trim().equals("")) {
                        continue;
                    }
                    String fileIdStr = "";
                    if (sheetSize > 1&&sheetIndexPicMap!=null) {

                        //????????????????????????????????????????????????????????????????????????
                        String cellKey = "";

                        //??????Map key:????????????????????????1_1_1???String???value:?????????PictureData??????0_1_1?????????sheet???row,cell;
                        for (String key : sheetIndexPicMap.keySet()) {
                            String rowArr[] = key.split("_");
                            if (Integer.valueOf(rowArr[1]) == num) {
                                cellKey += rowArr[2] + ",";
                            }
                        }
                        if (cellKey != "") {
                            //??????????????????
                            Integer[] cellArr = (Integer[]) ConvertUtils.convert(cellKey.split(","), Integer.class);
                            int[] intCellArr = Arrays.stream(cellArr).mapToInt(Integer::valueOf).toArray();
                            //????????????
                            shareService.quickSort(intCellArr, 0, cellArr.length - 1);
                            for (int cell : intCellArr) {
                                //???????????????????????????????????????????????????id
                                fileIdStr += savePic(1 + "_" + num + "_" + cell, sheetIndexPicMap.get(1 + "_" + num + "_" + cell), path, datasource).getId() + ",";
                            }
                            //??????????????????
//                            shareService.deleteDir(new File(path));
                        }
                    }
                    row.getCell(0).setCellType(Cell.CELL_TYPE_STRING);
                    String type = row.getCell(0).getStringCellValue();// ????????????
                    row.getCell(1).setCellType(Cell.CELL_TYPE_STRING);
                    String description = row.getCell(1).getStringCellValue();// ??????
                    //????????????
                    if (fileIdStr != "") {
                        fileIdStr = fileIdStr.substring(0, fileIdStr.length() - 1);
                        String[] fileIdArr = fileIdStr.split(",");
                        if (fileIdArr.length > 0) {
                            for (String fileId : fileIdArr) {
                                description += "<img data='" + Integer.valueOf(fileId) + "' class='course-banner' state='1' style='max-width: 100%;'/>";
                            }
                        }
                    }
                    TAssignmentItem tAssignmentItem = new TAssignmentItem();
                    tAssignmentItem.setDescription(description);

                    if (type.equals("7")) {
                        tAssignmentItem.setType(8);
                        tAssignmentItem.setIsOrder(1);
                    }else if(type.equals("8")){
                        tAssignmentItem.setType(8);
                        tAssignmentItem.setIsOrder(0);
                    }else{
                        tAssignmentItem.setType(Integer.valueOf(type));
                    }
                    tAssignmentItem.setCreatedTime(new Date());
                    tAssignmentItem.setUser(userJPA.findOne(userVo.getUsername()));
                    tAssignmentItem = tAssignmentItemJPA.save(tAssignmentItem);
                    tAssignmentItems.add(tAssignmentItem);

                    int labelCount = 0;
                    if (type.equals("1")) {//?????????
                        int i = 2;
                        if (row.getCell(2) != null) {
                            row.getCell(2).setCellType(Cell.CELL_TYPE_STRING);
                        }
                        while (row.getCell(i) != null && !row.getCell(i).getStringCellValue().trim().equals("")) {
                            TAssignmentAnswer answer = new TAssignmentAnswer();
                            answer.setLabel(labelStrings[labelCount]);
                            answer.setTAssignmentItem(tAssignmentItem);
                            String text = row.getCell(i).getStringCellValue().trim();
                            if(answerPicMap!=null){
                                for (String key:answerPicMap.keySet()){
                                    String[] s = key.split("_");
                                    if(Integer.parseInt(s[1])==num && Integer.parseInt(s[2])==(i/2-1)){
                                        Long picId = savePic(2 + "_" + num + "_" + (i / 2 - 1), answerPicMap.get(2 + "_" + num + "_" + (i / 2 - 1)), path,datasource).getId();
                                        text += "<img data='" + picId + "' class='course-banner' state='1' style='max-width: 100%;'/>";
                                    }
                                }
                            }
                            //??????????????????
//                            shareService.deleteDir(new File(path));
                            answer.setText(text);
                            i++;
                            row.getCell(i).setCellType(Cell.CELL_TYPE_STRING);
                            answer.setIscorrect(Integer.valueOf(row.getCell(i).getStringCellValue().trim()));
                            i++;
                            tAssignmentAnswerJPA.save(answer);
                            if (row.getCell(i) != null) {
                                row.getCell(i).setCellType(Cell.CELL_TYPE_STRING);
                            }
                            labelCount++;
                        }
                    }
                    if (type.equals("2")) {//?????????
                        row.getCell(2).setCellType(Cell.CELL_TYPE_STRING);
                        String isCorrect = row.getCell(2).getStringCellValue();// ??????
                        if (isCorrect.equals("1")) {
                            TAssignmentAnswer answer = new TAssignmentAnswer();
                            answer.setLabel("???");
                            answer.setText("???");
                            answer.setIscorrect(1);
                            answer.setTAssignmentItem(tAssignmentItem);
                            tAssignmentAnswerJPA.save(answer);
                            tAssignmentAnswerJPA.flush();
                            TAssignmentAnswer answer2 = new TAssignmentAnswer();
                            answer2.setLabel("???");
                            answer2.setText("???");
                            answer2.setIscorrect(0);
                            answer2.setTAssignmentItem(tAssignmentItem);
                            tAssignmentAnswerJPA.save(answer2);

                        } else {
                            TAssignmentAnswer answer = new TAssignmentAnswer();
                            answer.setLabel("???");
                            answer.setText("???");
                            answer.setIscorrect(1);
                            answer.setTAssignmentItem(tAssignmentItem);
                            tAssignmentAnswerJPA.save(answer);
                            tAssignmentAnswerJPA.flush();
                            TAssignmentAnswer answer2 = new TAssignmentAnswer();
                            answer2.setLabel("???");
                            answer2.setText("???");
                            answer2.setIscorrect(0);
                            answer2.setTAssignmentItem(tAssignmentItem);
                            tAssignmentAnswerJPA.save(answer2);
                        }
                    }
                    if (type.equals("4")) {//?????????
                        int i = 2;
                        if (row.getCell(2) != null) {
                            row.getCell(2).setCellType(Cell.CELL_TYPE_STRING);
                        }
                        while (row.getCell(i) != null && !row.getCell(i).getStringCellValue().trim().equals("")) {
                            TAssignmentAnswer answer = new TAssignmentAnswer();
                            answer.setLabel(labelStrings[labelCount]);
                            answer.setTAssignmentItem(tAssignmentItem);
                            String text = row.getCell(i).getStringCellValue().trim();
                            if(answerPicMap!=null){
                                for (String key:answerPicMap.keySet()){
                                    String[] s = key.split("_");
                                    if(Integer.parseInt(s[1])==num && Integer.parseInt(s[2])==(i/2-1)){
                                        Long picId = savePic(2 + "_" + num + "_" + (i / 2 - 1), answerPicMap.get(2 + "_" + num + "_" + (i / 2 - 1)), path, datasource).getId();
                                        text += "<img data='" + picId + "' class='course-banner' state='1' style='max-width: 100%;'/>";
                                    }
                                }
                            }
                            //??????????????????
//                            shareService.deleteDir(new File(path));
                            answer.setText(text);
                            i++;
                            row.getCell(i).setCellType(Cell.CELL_TYPE_STRING);
                            answer.setIscorrect(Integer.valueOf(row.getCell(i).getStringCellValue().trim()));
                            i++;
                            tAssignmentAnswerJPA.save(answer);
                            if (row.getCell(i) != null) {
                                row.getCell(i).setCellType(Cell.CELL_TYPE_STRING);
                            }
                            labelCount++;
                        }
                        //??????????????????????????????????????????????????????????????????????????????????????????
                        /*List<TAssignmentAnswer> tAssignmentAnswerList=tAssignmentAnswerJPA.findAnswersByTAssignmentId(tAssignmentItem.getId());
                        Integer a=0;
                        for (TAssignmentAnswer tAssignmentAnswer:tAssignmentAnswerList){
                            if (tAssignmentAnswer.getIscorrect()==1){
                                a++;
                            }
                        }
                        if (a!=1){
                            for (TAssignmentAnswer tAssignmentAnswer:tAssignmentAnswerList){
                                tAssignmentAnswerJPA.delete(tAssignmentAnswer);
                            }
                            tAssignmentItemJPA.delete(tAssignmentItem);
                        }*/
                    }
                    //?????????type???7?????????????????????8?????????????????????
                    if (type.equals("7") || type.equals("8")) {
                        String stem = description;//???????????????
                        //???????????????{?????????
                        String[] ss = stem.split("\\{");
                        //????????????
                        description = stem;
                        for (int i = 1;i<ss.length; i++) {
                            String substring = ss[i].substring(0, ss[i].indexOf("}"));
                            if(substring.equals("")){
                                //????????????????????????"_________"??????
                                description = description.replace("{}", "_________");
                                continue;
                            }
                            if(substring.contains("|")){
                                String[] split = substring.split("\\|");
                                for (int j=0;j<split.length;j++){
                                    TAssignmentAnswer tAssignmentAnswer = new TAssignmentAnswer();
                                    tAssignmentAnswer.setText(split[j]);
                                    tAssignmentAnswer.setIscorrect(1);
                                    tAssignmentAnswer.setTAssignmentItem(tAssignmentItem);
                                    tAssignmentAnswerJPA.save(tAssignmentAnswer);
                                }
                                //????????????????????????"_________"??????
                                description = description.replace("{"+substring+"}", "_________");
                            }else{
                                //????????????
                                TAssignmentAnswer tAssignmentAnswer = new TAssignmentAnswer();
                                tAssignmentAnswer.setText(substring);
                                tAssignmentAnswer.setIscorrect(1);
                                tAssignmentAnswer.setTAssignmentItem(tAssignmentItem);
                                tAssignmentAnswerJPA.save(tAssignmentAnswer);
                                //????????????????????????"_________"??????
                                description = description.replace("{"+tAssignmentAnswer.getText()+"}", "_________");
                            }
                        }
                        tAssignmentItem.setGapsNumber(ss.length-1);
                        if(type.equals("7")){
                            tAssignmentItem.setIsOrder(0);
                        }else if(type.equals("8")){
                            tAssignmentItem.setIsOrder(1);
                        }
                        tAssignmentItem.setDescriptionTemp(description);
                        tAssignmentItem = tAssignmentItemJPA.save(tAssignmentItem);
                    }
                    if (type.equals("5")) {//??????
                        TAssignmentAnswer answer = new TAssignmentAnswer();
                        answer.setText(row.getCell(2).getStringCellValue().trim());
                        answer.setIscorrect(1);
                        answer.setTAssignmentItem(tAssignmentItem);
                        answer.setLabel("????????????");
                        answer.setWeight(Double.parseDouble(row.getCell(3).getStringCellValue()));
                        tAssignmentAnswerJPA.save(answer);
                        String keyWord = row.getCell(4).getStringCellValue().trim();
                        String weight = row.getCell(5).getStringCellValue().trim();
                        String[] keyWordArr = keyWord.split("&&");
                        String[] weightArr = weight.split("&&");
                        for (int i=0;i<keyWordArr.length;i++){
                            TAssignmentAnswer taa = new TAssignmentAnswer();
                            taa.setText(keyWordArr[i]);
                            taa.setLabel("?????????"+(i+1));
                            taa.setIscorrect(0);
                            taa.setWeight(Double.parseDouble(weightArr[i]));
                            taa.setTAssignmentItem(tAssignmentItem);
                            tAssignmentAnswerJPA.save(taa);
                        }
                        tAssignmentItem.setIsOrder(Integer.parseInt(row.getCell(6).getStringCellValue().trim()));//1??????????????????0???????????????
                        tAssignmentItemJPA.save(tAssignmentItem);
                        tAssignmentItems.add(tAssignmentItem);
                    }
                    num++;
                }

                tAssignmentQuestionpool.getTAssignmentItems().addAll(tAssignmentItems);
                tAssignmentQuestionpoolJPA.save(tAssignmentQuestionpool);
            }
            //?????????????????????
            shareService.deleteDir(new File(path));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    /**************************************************************************
     * Description: excel????????? ?????????????????????excel?????????
     *
     * @author:lixueteng
     * @date:2017/12/6 0006
     **************************************************************************/
    @Override
    public Set<Integer> resolveExcelWithExamPool(byte[] bytes, String filename, UserVo userVo) {
        //???byte??????inputstream
        ByteArrayInputStream input = new ByteArrayInputStream(bytes);
        //??????????????????
        int result = 0;
        // ???????????????excel2007??????
        boolean isE2007 = false;
        if (filename.endsWith("xlsx")) {
            isE2007 = true;
        }
        try {
            // ???????????????
            Workbook wb = null;
            // ??????????????????(2003??????2007)????????????
            if (isE2007) {
                wb = new XSSFWorkbook(input);
            } else {
                wb = new HSSFWorkbook(input);
            }
            // ?????????????????????
            Sheet sheet = wb.getSheetAt(0);
            // ?????????????????????????????????
            Iterator<Row> rows = sheet.rowIterator();
            Set<TAssignmentItem> tAssignmentItems = new HashSet<>();
            Set<Integer> itemIds = new HashSet<>();
            String[] labelStrings = new String[]{"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"};
            while (rows.hasNext()) {
                Row row = rows.next(); // ???????????????
                row.getCell(0).setCellType(Cell.CELL_TYPE_STRING);
                String type = row.getCell(0).getStringCellValue();// ????????????
                row.getCell(1).setCellType(Cell.CELL_TYPE_STRING);
                String description = row.getCell(1).getStringCellValue();// ??????
                TAssignmentItem tAssignmentItem = new TAssignmentItem();
                tAssignmentItem.setDescription(description);
                tAssignmentItem.setType(Integer.valueOf(type));
                tAssignmentItem.setCreatedTime(new Date());
                tAssignmentItem.setUser(userJPA.findOne(userVo.getUsername()));
                tAssignmentItem = tAssignmentItemJPA.save(tAssignmentItem);
                tAssignmentItems.add(tAssignmentItem);
                itemIds.add(tAssignmentItem.getId());

                int labelCount = 0;
                if (type.equals("1")) {//?????????
                    int i = 2;
                    if (row.getCell(2) != null) {
                        row.getCell(2).setCellType(Cell.CELL_TYPE_STRING);
                    }
                    while (row.getCell(i) != null && !row.getCell(i).getStringCellValue().trim().equals("")) {
                        TAssignmentAnswer answer = new TAssignmentAnswer();
                        answer.setLabel(labelStrings[labelCount]);
                        answer.setTAssignmentItem(tAssignmentItem);
                        answer.setText(row.getCell(i).getStringCellValue().trim());
                        i++;
                        row.getCell(i).setCellType(Cell.CELL_TYPE_STRING);
                        answer.setIscorrect(Integer.valueOf(row.getCell(i).getStringCellValue().trim()));
                        i++;
                        tAssignmentAnswerJPA.save(answer);
                        if (row.getCell(i) != null) {
                            row.getCell(i).setCellType(Cell.CELL_TYPE_STRING);
                        }
                        labelCount++;
                    }
                }
                if (type.equals("2")) {//?????????
                    row.getCell(2).setCellType(Cell.CELL_TYPE_STRING);
                    String isCorrect = row.getCell(2).getStringCellValue();// ??????
                    if (isCorrect.equals("1")) {
                        TAssignmentAnswer answer = new TAssignmentAnswer();
                        answer.setLabel("???");
                        answer.setText("???");
                        answer.setIscorrect(1);
                        answer.setTAssignmentItem(tAssignmentItem);
                        tAssignmentAnswerJPA.save(answer);
                        tAssignmentAnswerJPA.flush();
                        TAssignmentAnswer answer2 = new TAssignmentAnswer();
                        answer2.setLabel("???");
                        answer2.setText("???");
                        answer2.setIscorrect(0);
                        answer2.setTAssignmentItem(tAssignmentItem);
                        tAssignmentAnswerJPA.save(answer2);

                    } else {
                        TAssignmentAnswer answer = new TAssignmentAnswer();
                        answer.setLabel("???");
                        answer.setText("???");
                        answer.setIscorrect(0);
                        answer.setTAssignmentItem(tAssignmentItem);
                        tAssignmentAnswerJPA.save(answer);
                        tAssignmentAnswerJPA.flush();
                        TAssignmentAnswer answer2 = new TAssignmentAnswer();
                        answer2.setLabel("???");
                        answer2.setText("???");
                        answer2.setIscorrect(1);
                        answer2.setTAssignmentItem(tAssignmentItem);
                        tAssignmentAnswerJPA.save(answer2);
                    }
                }
                if (type.equals("4")) {//?????????
                    int i = 2;
                    if (row.getCell(2) != null) {
                        row.getCell(2).setCellType(Cell.CELL_TYPE_STRING);
                    }
                    while (row.getCell(i) != null && !row.getCell(i).getStringCellValue().trim().equals("")) {
                        TAssignmentAnswer answer = new TAssignmentAnswer();
                        answer.setLabel(labelStrings[labelCount]);
                        answer.setTAssignmentItem(tAssignmentItem);
                        answer.setText(row.getCell(i).getStringCellValue().trim());
                        i++;
                        row.getCell(i).setCellType(Cell.CELL_TYPE_STRING);
                        answer.setIscorrect(Integer.valueOf(row.getCell(i).getStringCellValue().trim()));
                        i++;
                        tAssignmentAnswerJPA.save(answer);
                        if (row.getCell(i) != null) {
                            row.getCell(i).setCellType(Cell.CELL_TYPE_STRING);
                        }
                        labelCount++;
                    }
                }
                //??????
                if (type.equals("8")) {
                    description = row.getCell(1).getStringCellValue().trim();
                    int i = 2;
                    while (row.getCell(i) != null && !row.getCell(i).getStringCellValue().trim().equals("")) {
                        TAssignmentAnswer answer = new TAssignmentAnswer();
                        answer.setText(row.getCell(i).getStringCellValue().trim());
                        answer.setIscorrect(1);
                        answer.setTAssignmentItem(tAssignmentItem);
                        tAssignmentAnswerJPA.save(answer);
                        i++;
                    }
                    tAssignmentItem.setDescriptionTemp(description);
                    tAssignmentItemJPA.save(tAssignmentItem);
                    tAssignmentItems.add(tAssignmentItem);
                }
                if (type.equals("5")) {//??????
                    description = row.getCell(1).getStringCellValue().trim();
                    int i = 2;
                    while (row.getCell(i) != null && !row.getCell(i).getStringCellValue().trim().equals("")) {
                        TAssignmentAnswer answer = new TAssignmentAnswer();
                        answer.setText(row.getCell(i).getStringCellValue().trim());
                        answer.setIscorrect(1);
                        answer.setTAssignmentItem(tAssignmentItem);
                        tAssignmentAnswerJPA.save(answer);
                        i++;
                    }

                    tAssignmentItem.setDescriptionTemp(description);
                    tAssignmentItemJPA.save(tAssignmentItem);
                    tAssignmentItems.add(tAssignmentItem);
                }

            }
            return itemIds;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return new HashSet<>();
    }

    /**************************************************************************
     * Description: excel??????
     *
     * @author:??????
     * @date:2018???10???29???
     * @return [x, y]??????Excel??????????????????
     **************************************************************************/
    @Override
    public Map<String, String> checkExcelWithQuestionPool(Sheet sheet) {
        Map<String, String> result = new HashMap<String, String>();
        String[] labelStrings = new String[]{"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"};
        result.put("message", "ok");
        try {
            // ????????????????????????
            Iterator<Row> rows = sheet.rowIterator();
            Set<String> typeSet = new HashSet<String>();
            typeSet.add("1");
            typeSet.add("2");
            typeSet.add("4");
            typeSet.add("5");
            typeSet.add("7");
            typeSet.add("8");
            Integer rowCount = 0;//?????????
            while (rows.hasNext()) {
                Row row = rows.next();                                             //???????????????
                //?????????????????????????????????????????????????????????????????????
                StringBuilder rowText = new StringBuilder();
                for (int i = 0; row.getCell(i) != null; i++) {
                    row.getCell(i).setCellType(Cell.CELL_TYPE_STRING);
                    rowText.append(row.getCell(i).getStringCellValue());
                }
                if (rowText.toString().trim().equals("")) {
                    rowCount++;
                    continue;
                }

                if (row.getCell(0) == null || row.getCell(0).getStringCellValue().trim().equals("")) {
                    result.put("x", (rowCount).toString());
                    result.put("y", labelStrings[0]);
                    result.put("message", "????????????????????????");
                    break;
                }
                if (row.getCell(1) == null || row.getCell(1).getStringCellValue().trim().equals("")) {
                    result.put("x", (rowCount).toString());
                    result.put("y", labelStrings[1]);
                    result.put("message", "???????????????");
                    break;
                }
                String type = row.getCell(0).getStringCellValue().trim();              //????????????
                String description = row.getCell(1).getStringCellValue().trim();       // ??????
                //???????????????1?????????2?????????4?????????5????????????8??????
                //????????????????????????????????????
                if (!typeSet.contains(type)) {
                    result.put("x", (rowCount).toString());
                    result.put("y", labelStrings[0]);
                    result.put("message", "????????????????????????");
                    break;
                } else {
                    if (description.equals("")) {
                        result.put("x", (rowCount).toString());
                        result.put("y", labelStrings[1]);
                        result.put("message", "???????????????");
                        break;
                    }
                    if (type.equals("1") || type.equals("4")) {                   //??????????????????????????????
                        Integer i = 2;
                        while (row.getCell(i) != null) {
                            /*row.getCell(i).setCellType(Cell.CELL_TYPE_STRING);*/
                            if (i % 2 == 0) {//????????????Cell
                                if (row.getCell(i).getStringCellValue().trim().equals("")) {
                                    if (row.getCell(i + 1) == null || row.getCell(i + 1).getStringCellValue().trim().equals("")) {
                                        i++;
                                    } else {
                                        result.put("x", (rowCount).toString());
                                        result.put("y", labelStrings[i]);
                                        result.put("message", "????????????????????????????????????");
                                        break;
                                    }
                                }
                            } else {//????????????Cell
                                if (!row.getCell(i).getStringCellValue().trim().equals("1") && !row.getCell(i).getStringCellValue().trim().equals("0")) {
                                    result.put("x", (rowCount).toString());
                                    result.put("y", labelStrings[i]);
                                    result.put("message", "????????????????????????????????????");
                                    break;
                                }
                            }
                            i++;
                        }
                        //?????????????????????????????????
                        Integer a = 0;
                        i = 2;
                        while (row.getCell(i) != null) {
                            /*row.getCell(i).setCellType(Cell.CELL_TYPE_STRING);*/
                            if (i % 2 != 0) {//????????????Cell
                                if (row.getCell(i).getStringCellValue().trim().equals("1")) {
                                    a++;
                                }
                            }
                            i++;
                        }
                        if (a == 0) {
                            result.put("x", (rowCount).toString());
                            result.put("y", labelStrings[i]);
                            result.put("message", "??????????????????????????????????????????");
                            break;
                        } else if (type.equals("1") && a == 1) {
                            result.put("x", (rowCount).toString());
                            result.put("y", labelStrings[i]);
                            result.put("message", "????????????????????????????????????????????????");
                            break;
                        } else if (type.equals("4") && a != 1) {
                            result.put("x", (rowCount).toString());
                            result.put("y", labelStrings[i]);
                            result.put("message", "????????????????????????????????????????????????");
                            break;
                        }
                        if (i == 2) {
                            result.put("x", (rowCount).toString());
                            result.put("y", labelStrings[i]);
                            result.put("message", "?????????????????????????????????????????????");
                            break;
                        } else if (i % 2 == 1) {
                            result.put("x", (rowCount).toString());
                            result.put("y", labelStrings[i]);
                            result.put("message", "????????????????????????????????????");
                        }
                    } else if (type.equals("2")) {//?????????
                        if (row.getCell(2) != null) {
                            row.getCell(2).setCellType(Cell.CELL_TYPE_STRING);
                            if (!row.getCell(2).getStringCellValue().trim().equals("1") && !row.getCell(2).getStringCellValue().trim().equals("0")) {
                                result.put("x", (rowCount).toString());
                                result.put("y", labelStrings[2]);
                                result.put("message", "??????????????????????????????????????????");
                                break;
                            }
                        }
                    } else if (type.equals("8")) {//?????????
                        if (row.getCell(1) != null) {
                            row.getCell(1).setCellType(Cell.CELL_TYPE_STRING);
                        } else {
                            result.put("x", rowCount.toString());
                            result.put("y", labelStrings[1]);
                            result.put("message", "??????????????????????????????");
                        }
                        if (row.getCell(1).getStringCellValue().trim().equals("")) {
                            result.put("x", rowCount.toString());
                            result.put("y", labelStrings[1]);
                            result.put("message", "??????????????????????????????");
                        }
                        //???????????????????????????
                        Stack<String> stack = new Stack<String>();
                        Integer count = 0;
                        boolean flag = true;
                        String text = row.getCell(1).getStringCellValue();
                        //text=text.replace("{}", "[]");
                        //???????????????{}????????????????????????????????????????????????
                        for (int i = 0; i < text.length(); i++) {
                            if (text.charAt(i) == '{' && text.charAt(i + 1) == '}') {
                                stack.push("{");
                                count++;
                            }
                            if (text.charAt(i) == '}' && text.charAt(i - 1) == '{') {
                                if (stack.empty()) {
                                    flag = false;
                                    break;
                                } else if (stack.peek().equals("}")) {
                                    flag = false;
                                    break;
                                } else {
                                    stack.pop();
                                }
                            }
                        }
                        if (!flag) {
                            result.put("x", rowCount.toString());
                            result.put("y", labelStrings[1]);
                            result.put("message", "?????????????????????????????????????????????????????????????????????");
                        } else {
                            //count??????????????????????????????????????????
                            Integer i;
                            for (i = 2; row.getCell(i) != null; i++) {
                                ;
                            }
                            if (i - 2 != count) {
                                result.put("x", rowCount.toString());
                                result.put("y", labelStrings[i]);
                                result.put("message", "????????????????????????????????????????????????");
                            }
                        }
                    }
                }
                rowCount++;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (!result.get("message").equals("ok")) {
            Integer x = Integer.parseInt(result.get("x"));
            x++;
            result.put("x", x.toString());
        }
        return result;
    }

    /**
     * ??????Excel2003??????
     *
     * @param sheetNum ??????sheet??????
     * @param sheet    ??????sheet??????
     * @param workbook ???????????????
     * @return Map key:????????????????????????0_1_1???String???value:?????????PictureData
     * @throws IOException
     */
    public static Map<String, PictureData> getSheetPictrues03(int sheetNum,
                                                              HSSFSheet sheet, HSSFWorkbook workbook) {

        Map<String, PictureData> sheetIndexPicMap = new HashMap<String, PictureData>();
        List<HSSFPictureData> pictures = workbook.getAllPictures();
        if (pictures.size() != 0) {
            for (HSSFShape shape : sheet.getDrawingPatriarch().getChildren()) {
                HSSFClientAnchor anchor = (HSSFClientAnchor) shape.getAnchor();
                if (shape instanceof HSSFPicture) {
                    HSSFPicture pic = (HSSFPicture) shape;
                    int pictureIndex = pic.getPictureIndex() - 1;
                    HSSFPictureData picData = pictures.get(pictureIndex);
                    String picIndex = String.valueOf(sheetNum) + "_"
                            + String.valueOf(anchor.getRow1()) + "_"
                            + String.valueOf(anchor.getCol1());
                    sheetIndexPicMap.put(picIndex, picData);
                }
            }
            return sheetIndexPicMap;
        } else {
            return null;
        }
    }

    /**
     * ??????Excel2007??????
     *
     * @param sheetNum ??????sheet??????
     * @param sheet    ??????sheet??????
     * @param workbook ???????????????
     * @return Map key:????????????????????????0_1_1???String???value:?????????PictureData
     */
    public static Map<String, PictureData> getSheetPictrues07(int sheetNum,
                                                              XSSFSheet sheet, XSSFWorkbook workbook) {
        Map<String, PictureData> sheetIndexPicMap = new HashMap<String, PictureData>();

        for (POIXMLDocumentPart dr : sheet.getRelations()) {
            if (dr instanceof XSSFDrawing) {
                XSSFDrawing drawing = (XSSFDrawing) dr;
                List<XSSFShape> shapes = drawing.getShapes();
                for (XSSFShape shape : shapes) {
                    XSSFPicture pic = (XSSFPicture) shape;
                    XSSFClientAnchor anchor = pic.getPreferredSize();
                    CTMarker ctMarker = anchor.getFrom();
                    String picIndex = String.valueOf(sheetNum) + "_"
                            + ctMarker.getRow() + "_" + ctMarker.getCol();
                    sheetIndexPicMap.put(picIndex, pic.getPictureData());
                }
            }
        }

        return sheetIndexPicMap;
    }

    public ResourceFileDto savePic(String row_cell, PictureData pic, String path, String datasource) throws Exception {
        ClientDatabaseContextHolder.set(datasource);
        String ext = pic.suggestFileExtension();
        String filePath = "";
        File file = new File(path);
        if (!file.exists())//???????????????????????????
        {
            file.mkdirs();
        }
        byte[] data = pic.getData();
        if (ext.equals("jpg")) {
            FileOutputStream out = new FileOutputStream(
                    path + row_cell + ".jpg");
            out.write(data);
            out.close();
            filePath = path + row_cell + ".jpg";
        }
        if (ext.equals("png")) {
            FileOutputStream out = new FileOutputStream(
                    path + row_cell + ".png");
            out.write(data);
            out.close();
            filePath = path + row_cell + ".png";
        }
        //????????????
        DirectoryDto directoryDto = resourceContainerService.getDirectoryByPath("????????????/??????/??????");
        if (directoryDto == null) {
            //????????????
            long directoryId = resourceContainerService.createDirectory("????????????/??????/??????");
            directoryDto.setId(directoryId);
        }
        //????????????????????????
        File file1 = new File(filePath);
        if(file1.exists() && file1.length() > 0) {
            return resourceContainerService.uploadFileToDirectory(file1, directoryDto.getId());
        }else {
            System.out.println("???????????????" + file1);
            return null;
        }
    }
}
