package studiduell.servletFilter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;

public class CorsFilter extends OncePerRequestFilter {
	private String corsPreflightHttpMethod = "OPTIONS";
	private String accessControlAllowOriginKey = "Access-Control-Allow-Origin";
	private String accessControlAllowOriginValue = "*";
	private String accessControlRequestMethodKey = "Access-Control-Request-Method";
	private String accessControlAllowMethodsKey = "Access-Control-Allow-Methods";
	private String accessControlAllowMethodsValue = "GET, POST, PUT, DELETE, OPTIONS";
	private String accessControlAllowHeadersKey = "Access-Control-Allow-Headers";
	private String accessControlAllowHeadersValue = "authorization, origin, content-type, accept, x-requested-with, sid, mycustom, smuser";
	private String accessControlMaxAgeKey = "Access-Control-Max-Age";
	private String accessControlMaxAgeValue = "1800";
	
	@Override
	protected void doFilterInternal(HttpServletRequest request,
			HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		if (request.getHeader(accessControlRequestMethodKey) != null
				&& corsPreflightHttpMethod.equals(request.getMethod())) {
			// CORS "pre-flight" request
			response.addHeader(accessControlAllowOriginKey, accessControlAllowOriginValue);
			response.addHeader(accessControlAllowMethodsKey,
					accessControlAllowMethodsValue);
			response.addHeader(accessControlAllowHeadersKey,
					accessControlAllowHeadersValue);
			response.addHeader(accessControlMaxAgeKey, accessControlMaxAgeValue);
		}
		if(!corsPreflightHttpMethod.equals(request.getMethod())) {
			response.addHeader(accessControlAllowOriginKey, accessControlAllowOriginValue);
		}
		filterChain.doFilter(request, response);
	}
}