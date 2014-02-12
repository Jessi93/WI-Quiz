package de.dhbw.studiduell.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.sun.jersey.api.core.InjectParam;

import de.dhbw.studiduell.utils.UserUtils;

@Path("/sync")
public class Sync {
	@InjectParam
	private UserUtils userUtils;
	
	
	@POST
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public String sync(
			@QueryParam("nick") String nick,
			@QueryParam("password") String password,
			@QueryParam("pushRegid") String pushRegid) {
		
		if(!userUtils.authenticate(nick, password))
			return Boolean.FALSE.toString();
		
		//TODO
		return "TO BE IMPLEMENTED!";
	}
}
