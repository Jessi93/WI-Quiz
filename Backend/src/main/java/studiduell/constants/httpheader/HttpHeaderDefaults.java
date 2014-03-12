package studiduell.constants.httpheader;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

@Component
public final class HttpHeaderDefaults {
	@Value("${ajax.cors.accessControlAllowOriginKey}")
	private String accessControlAllowOriginKey;
	@Value("${ajax.cors.accessControlAllowOriginValue}")
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