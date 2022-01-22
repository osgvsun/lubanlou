package net.gvsun.oauth2.internal;

import java.util.List;
import java.util.Objects;

public class FastDFS {
    private List<Node> fastDFS;

    public List<Node> getFastDFS() {
        return fastDFS;
    }

    public void setFastDFS(List<Node> fastDFS) {
        this.fastDFS = fastDFS;
    }

    @Override
    public String toString() {
        return "FastDFS{" +
                "fastDFS=" + fastDFS +
                '}';
    }

    public static class Node {
        private String schoolName;
        private String schoolCname;
        private Boolean defaultFastDFS;
        private String secretKey;
        private String storageServer;
        private List<String> trackerServers;
        private Long totalSize;
        private String resourceContainerHost;

        public String getResourceContainerHost() {
            return resourceContainerHost;
        }

        public void setResourceContainerHost(String resourceContainerHost) {
            this.resourceContainerHost = resourceContainerHost;
        }

        public String getStorageServer() {
            return storageServer;
        }

        public void setStorageServer(String storageServer) {
            this.storageServer = storageServer;
        }

        public String getSchoolName() {
            return schoolName;
        }

        public void setSchoolName(String schoolName) {
            this.schoolName = schoolName;
        }

        public String getSchoolCname() {
            return schoolCname;
        }

        public void setSchoolCname(String schoolCname) {
            this.schoolCname = schoolCname;
        }

        public Boolean getDefaultFastDFS() {
            return defaultFastDFS;
        }

        public void setDefaultFastDFS(Boolean defaultFastDFS) {
            this.defaultFastDFS = defaultFastDFS;
        }

        public String getSecretKey() {
            return secretKey;
        }

        public void setSecretKey(String secretKey) {
            this.secretKey = secretKey;
        }

        public List<String> getTrackerServers() {
            return trackerServers;
        }

        public void setTrackerServers(List<String> trackerServers) {
            this.trackerServers = trackerServers;
        }

        public Long getTotalSize() {
            return totalSize;
        }

        public void setTotalSize(Long totalSize) {
            this.totalSize = totalSize;
        }

        @Override
        public String toString() {
            return "Node{" +
                    "schoolName='" + schoolName + '\'' +
                    ", schoolCname='" + schoolCname + '\'' +
                    ", defaultFastDFS=" + defaultFastDFS +
                    ", secretKey='" + secretKey + '\'' +
                    ", storageServer='" + storageServer + '\'' +
                    ", trackerServers=" + trackerServers +
                    ", totalSize=" + totalSize +
                    ", resourceContainerHost='" + resourceContainerHost + '\'' +
                    '}';
        }
    }
    
    /**
     * @description 由于返回所有数据存在安全问题，所以这里只返回部分参数
     * @author  Smark Lee
     * @date  2021/11/29
     * @return
     **/
    public static FastDFS getFastDFS(FastDFS fastDFS){
        if (Objects.isNull(fastDFS)){
            return null;
        }
        // 设置以下信息为null
        fastDFS.getFastDFS().forEach(node -> {
                    node.setSchoolCname(null);
                    node.setSecretKey(null);
                    node.setStorageServer(null);
                    node.setTotalSize(null);
                    node.setTrackerServers(null);
                });
        return fastDFS;
    }
}
