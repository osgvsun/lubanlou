package net.gvsun.gsexam.utils;

import org.apache.commons.lang3.StringUtils;

import java.io.*;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Random;

/**************************************************************************
 * Description:
 *
 * @author:lixueteng
 * @date:2018/2/4 0004
 **************************************************************************/
public class NetFileDiskUtils {

    public static boolean mkDirectory(String path) {
        File file = null;

        boolean e;
        try {
            file = new File(path);
            if(file.exists()) {
                return false;
            }

            e = file.mkdirs();
        } catch (RuntimeException var6) {
            var6.printStackTrace();
            return false;
        } finally {
            file = null;
        }

        return e;
    }

    public static String checkFileName(String fileName, String dir) {
        boolean isDirectory = (new File(dir + fileName)).isDirectory();
        if(!isFileExist(fileName, dir)) {
            return fileName;
        } else {
            int index = fileName.lastIndexOf(".");
            StringBuffer newFileName = new StringBuffer();
            String name = isDirectory?fileName:fileName.substring(0, index);
            String extendName = isDirectory?"":fileName.substring(index);
            int nameNum = 1;

            while(true) {
                newFileName.append(name).append("(").append(nameNum).append(")");
                if(!isDirectory) {
                    newFileName.append(extendName);
                }

                if(!isFileExist(newFileName.toString(), dir)) {
                    return newFileName.toString();
                }

                ++nameNum;
                newFileName = new StringBuffer();
            }
        }
    }

    public static boolean upload(String uploadFileName, String savePath, File uploadFile) {
        boolean flag = false;

        try {
            uploadForName(uploadFileName, savePath, uploadFile);
            flag = true;
        } catch (IOException var5) {
            flag = false;
            var5.printStackTrace();
        }

        return flag;
    }

    public static void getFilePath(String filePath, List strs) {
        File root = new File(filePath);
        File[] files = root.listFiles();
        File[] arr$ = files;
        int len$ = files.length;

        for(int i$ = 0; i$ < len$; ++i$) {
            File file = arr$[i$];
            if(file.isDirectory()) {
                getFilePath(file.getAbsolutePath(), strs);
            } else {
                strs.add(file.getAbsolutePath());
            }
        }

    }

    public static boolean delFile(String filePathAndName) {
        File myDelFile = new File(filePathAndName);
        return !myDelFile.exists()?true:myDelFile.delete();
    }

    public static boolean delFiles(File file) {
        boolean flag = false;

        try {
            if(!file.exists()) {
                throw new RuntimeException("File not exist!");
            }

            if(file.isDirectory()) {
                String[] e = file.list();

                for(int i = 0; i < e.length; ++i) {
                    File file2X = new File(file.getAbsolutePath() + "/" + e[i]);
                    if(!file2X.exists()) {
                        throw new RuntimeException("File not exist!");
                    }

                    if(file2X.isFile()) {
                        flag = file2X.delete();
                    } else if(file2X.isDirectory()) {
                        delFiles(file2X);
                    }
                }
            }

            flag = file.delete();
        } catch (Exception var5) {
            flag = false;
            var5.printStackTrace();
        }

        return flag;
    }

    public static String uploadForName(String uploadFileName, String savePath, File uploadFile) throws IOException {
        String newFileName = checkFileName(uploadFileName, savePath);
        FileOutputStream fos = null;
        FileInputStream fis = null;

        try {
            fos = new FileOutputStream(savePath + newFileName);
            fis = new FileInputStream(uploadFile);
            byte[] e = new byte[1024];
            boolean len = false;

            int len1;
            while((len1 = fis.read(e)) > 0) {
                fos.write(e, 0, len1);
            }
        } catch (FileNotFoundException var16) {
        } catch (IOException var17) {
            throw var17;
        } finally {
            try {
                if(fos != null) {
                    fos.close();
                }

                if(fis != null) {
                    fis.close();
                }
            } catch (IOException var15) {
                throw var15;
            }

        }

        return newFileName;
    }

//    public static void addToCollection(Collection collection, Object[] arr) {
//        if(null != collection && null != arr) {
//            CollectionUtils.addAll(collection, arr);
//        }
//
//    }

    public static String[] split(String str, String separatorChars) {
        return StringUtils.split(str, separatorChars);
    }

    public static boolean invokeSetMethod(String fieldName, Object invokeObj, Object[] args) {
        boolean flag = false;
        Field[] fields = invokeObj.getClass().getDeclaredFields();
        Method[] methods = invokeObj.getClass().getDeclaredMethods();
        Field[] arr$ = fields;
        int len$ = fields.length;

        for(int i$ = 0; i$ < len$; ++i$) {
            Field f = arr$[i$];
            String fname = f.getName();
            if(fname.equals(fieldName)) {
                String mname = "set" + fname.substring(0, 1).toUpperCase() + fname.substring(1);
                Method[] arr$1 = methods;
                int len$1 = methods.length;

                for(int i$1 = 0; i$1 < len$1; ++i$1) {
                    Method m = arr$1[i$1];
                    String name = m.getName();
                    if(mname.equals(name)) {
                        if(f.getType().getSimpleName().equalsIgnoreCase("integer") && args.length > 0) {
                            args[0] = Integer.valueOf(args[0].toString());
                        }

                        if(f.getType().getSimpleName().equalsIgnoreCase("boolean") && args.length > 0) {
                            args[0] = Boolean.valueOf(args[0].toString());
                        }

                        try {
                            m.invoke(invokeObj, args);
                            flag = true;
                        } catch (IllegalArgumentException var18) {
                            flag = false;
                            var18.printStackTrace();
                        } catch (IllegalAccessException var19) {
                            flag = false;
                            var19.printStackTrace();
                        } catch (InvocationTargetException var20) {
                            flag = false;
                            var20.printStackTrace();
                        }
                    }
                }
            }
        }

        return flag;
    }

    public static boolean isFileExist(String fileName, String dir) {
        File files = new File(dir + fileName);
        return files.exists();
    }

    public static String getRandomName(String fileName, String dir) {
        String[] split = fileName.split("\\.");
        String extendFile = "." + split[split.length - 1].toLowerCase();
        Random random = new Random();
        int add = random.nextInt(1000000);

        String ret;
        for(ret = add + extendFile; isFileExist(ret, dir); ret = fileName + add + extendFile) {
            add = random.nextInt(1000000);
        }

        return ret;
    }

    public static boolean isValid(String contentType, String[] allowTypes) {
        if(null != contentType && !"".equals(contentType)) {
            String[] arr$ = allowTypes;
            int len$ = allowTypes.length;

            for(int i$ = 0; i$ < len$; ++i$) {
                String type = arr$[i$];
                if(contentType.equals(type)) {
                    return true;
                }
            }

            return false;
        } else {
            return false;
        }
    }

    private static void getDir(String directory, String subDirectory) {
        File fileDir = new File(directory);

        try {
            if(subDirectory == "" && !fileDir.exists()) {
                fileDir.mkdir();
            } else if(subDirectory != "") {
                String[] dir = subDirectory.replace('\\', '/').split("/");

                for(int ex = 0; ex < dir.length; ++ex) {
                    File subFile = new File(directory + File.separator + dir[ex]);
                    if(!subFile.exists()) {
                        subFile.mkdir();
                    }

                    directory = directory + File.separator + dir[ex];
                }
            }
        } catch (Exception var6) {
            System.out.println(var6.getMessage());
        }

    }
}
