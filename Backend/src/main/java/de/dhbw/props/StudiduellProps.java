package de.dhbw.props;

import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.core.Context;

import com.sun.jersey.spi.resource.Singleton;

import de.dhbw.exc.StudiduellRuntimeException;

@Singleton
public class StudiduellProps {
	@Context
	private ServletContext servletContext;
	
	/**
	 * The property map.
	 */
	private Properties props;
	
	/**
	 * Inits the properties.
	 * This cannot be done in the constructor since
	 * {@link #servletContext} is injected afterwards.
	 */
	@PostConstruct
	public void init() {
		try {
			props = new Properties();
			String pathToPropsFile = servletContext.getRealPath("WEB-INF/studiduell.properties");
			props.load(new FileReader(pathToPropsFile));
		} catch(IOException ex) {
			// also treats FileNotFoundException
			throw new StudiduellRuntimeException(ex);
		}
	}
	
	public String get(String key) {
		return props.getProperty(key);
	}
}
