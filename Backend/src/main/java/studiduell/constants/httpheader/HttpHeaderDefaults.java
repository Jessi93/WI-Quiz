package studiduell.constants.httpheader;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

@Component
public class HttpHeaderDefaults {
	@Value("${ajax.accessControlAllowOriginKey}")
	private String accessControlAllowOriginKey;
	@Value("${ajax.accessControlAllowOriginValue}")
	private String accessControlAllowOriginValue;
	
	
	private HttpHeaders accessControlAllowOriginHeader;
	
	
	@PostConstruct
	public void init() {
		accessControlAllowOriginHeader = new HttpHeaders();
		accessControlAllowOriginHeader.add(accessControlAllowOriginKey, accessControlAllowOriginValue);
	}


	public HttpHeaders getAccessControlAllowOriginHeader() {
		return accessControlAllowOriginHeader;
	}
}

//TODO limit allow origin to specific server.