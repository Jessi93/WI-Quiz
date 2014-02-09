package de.dhbw.rest;

import java.sql.SQLException;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.sun.jersey.api.core.InjectParam;

import de.dhbw.db.DatabaseManager;

/**
 * Developer control page.
 * 
 * @author D@rk M@gic
 *
 */
@Path("/")
public class Check {
	@InjectParam
	DatabaseManager dbManager;
	
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String itWorks() {
		boolean dbAvail = checkDB();
		
		// don't refactor, as it is a never chaning component
		return "<!DOCTYPE html><html><h1>Studiduell Server Information!</h1>" +
				"<table border=\"1\"><tr><th>Service<th>Avail" +
				"<tr><td>ReST webservice<td><b>true</b>" +
				"<tr><td>Database connectivity<td><b>" + dbAvail + "</b>" +
				"<tr><td>Database JNDI context<td><b>" + (dbAvail ? true : "n/a" ) + "</b>" +
				"<tr><td>Spring dependency injection<td><b>" + (dbAvail ? true : "n/a") + "</b>" +
				"</table></html>";
	}
	
	private boolean checkDB() {
		boolean dbAvail = false;
		
		try {
			dbManager.connect().close();
			dbAvail = true;
			
		} catch(SQLException ex) {
			ex.printStackTrace();
		}
		
		return dbAvail;
	}
}
