package de.dhbw.studiduell.rest;

import javax.persistence.Persistence;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.sun.jersey.api.core.InjectParam;

import de.dhbw.studiduell.db.PersistenceManager;
import de.dhbw.studiduell.props.StudiduellProps;

/**
 * Developer control page.
 * 
 * @author D@rk M@gic
 *
 */
@Path("/")
public class Check {
	@InjectParam
	private StudiduellProps props;
	@InjectParam
	private PersistenceManager persistenceManager;
	
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String itWorks() {
		checkDB();
		
		// Don't refactor, as it is a never chaning component
		return "<!DOCTYPE html><html><h1>Studiduell Server Information!</h1>" +
				"<table border=\"1\"><tr><th>Service<th>Avail" +
				"<tr><td>ReST webservice<td><b>true</b>" +
				"<tr><td>Database connectivity + Hibernate configuration<td><b>true</b>" +
				"<tr><td>Spring dependency injection<td><b>true</b>" +
				"</table></html>";
	}
	
	private void checkDB() {
		//fails anyhow if DB n/a (not catchable) TODO
		Persistence.createEntityManagerFactory(props.get("project.name"));
	}
}
