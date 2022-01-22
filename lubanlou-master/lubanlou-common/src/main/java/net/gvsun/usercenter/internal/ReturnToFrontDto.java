package net.gvsun.usercenter.internal;



/**
 * 返回给前端code_url,orderId
 *
 * @author 付博文
 * @since 2020年10月19日
 */
public class ReturnToFrontDto {

    private String codeUrl;

    private String orderId;

    public String getCodeUrl() {
        return codeUrl;
    }

    public void setCodeUrl(String code_url) {
        this.codeUrl = code_url;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }
}
