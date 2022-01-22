package cn.com.pubtoinfo.service;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;
import javax.xml.ws.WebEndpoint;
import javax.xml.ws.WebServiceClient;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.logging.Logger;

/**
 * This class was generated by the JAX-WS RI. JAX-WS RI 2.1.3-hudson-390-
 * Generated source version: 2.0
 * <p>
 * An example of how this class may be used:
 * 
 * <pre>
 * SendMsgTo service = new SendMsgTo();
 * SendMsgToPortType portType = service.getSendMsgToHttpPort();
 * portType.sendMsgTo(...);
 * </pre>
 * 
 * </p>
 * 
 */
// http://{阿里云消息服务}:8080/gxtMsgService/services/SendMsg?wsdl
@WebServiceClient(name = "SendMsgTo", targetNamespace = "http://service.pubinfo.com.cn", wsdlLocation = "http://localhost:8080/gxtMsgService/services/SendMsgTo?wsdl")
public class SendMsgTo_Service extends Service {

	private final static URL SENDMSGTO_WSDL_LOCATION;
	private final static Logger logger = Logger
			.getLogger(cn.com.pubtoinfo.service.SendMsgTo_Service.class
					.getName());

	static {
		URL url = null;
		try {
			URL baseUrl;
			baseUrl = cn.com.pubtoinfo.service.SendMsgTo_Service.class
					.getResource(".");
			url = new URL(baseUrl,
					"http://localhost:8080/gxtMsgService/services/SendMsgTo?wsdl");
		} catch (MalformedURLException e) {
			logger.warning("Failed to create URL for the wsdl Location: 'http://localhost:8080/gxtMsgService/services/SendMsgTo?wsdl', retrying as a local file");
			logger.warning(e.getMessage());
		}
		SENDMSGTO_WSDL_LOCATION = url;
	}

	public SendMsgTo_Service(URL wsdlLocation, QName serviceName) {
		super(wsdlLocation, serviceName);
	}

	public SendMsgTo_Service() {
		super(SENDMSGTO_WSDL_LOCATION, new QName(
				"http://service.pubinfo.com.cn", "SendMsgTo"));
	}

	/**
	 * 
	 * @return returns SendMsgToPortType
	 */
	@WebEndpoint(name = "SendMsgToHttpPort")
	public SendMsgToPortType getSendMsgToHttpPort() {
		return super.getPort(new QName("http://service.pubinfo.com.cn",
				"SendMsgToHttpPort"), SendMsgToPortType.class);
	}

}
