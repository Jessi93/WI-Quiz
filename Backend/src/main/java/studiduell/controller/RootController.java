package studiduell.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Provides basic information about this web application.
 * 
 * It is mapped to the context root.
 * 
 * @author kevin.strobel
 *
 */
@Controller
public class RootController {
	@Value("${project.name}")
	private String projectName;

	@RequestMapping(method = RequestMethod.GET, produces = MediaType.TEXT_HTML_VALUE, value = "/")
	public ResponseEntity<String> sayHello() {
		String pageContent = "<!DOCTYPE html>"
				+ "<html><h1>" + projectName + " Sersgver Information!</h1>"
				+ "The services of " + projectName + " are available.</html>";
		return new ResponseEntity<>(pageContent, HttpStatus.OK);
	}
}
