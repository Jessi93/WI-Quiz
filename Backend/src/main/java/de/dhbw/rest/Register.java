package de.dhbw.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.sun.jersey.api.core.InjectParam;

import de.dhbw.db.DatabaseManager;

@Path("/register")
public class Register {
	@InjectParam
	private DatabaseManager dbManager;
	
	@GET //TODO POST
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.TEXT_PLAIN)
	public String register(
			@QueryParam("nick") String nick,
			@QueryParam("password") String password) {
		String res = dbManager.sayHello();
		
		if(res != null)
			return res;
		return Boolean.FALSE.toString();
	}
}
