package de.dhbw.studiduell.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.json.JSONObject;

@Path("/user")
public class UserService {
	@Path("/search")
	@POST
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public String search(@QueryParam("searched_nick_part") String nick) {
		
		//TODO implement and remove mock
		return new JSONObject("{users:[User1,User2,User3]}").toString();
	}
	
	@Path("/statistics")
	@POST
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public String search(
			@QueryParam("nick") String nick,
			@QueryParam("password") String password) {
		
		//TODO Authentifizierung
		
		//TODO implement and remove mock
		JSONObject json = new JSONObject("{game:{lost:23,won:31,draft:2,total:56},questions:{perc_right:-,total:1008}}");
		
		return json.toString();
	}
}
