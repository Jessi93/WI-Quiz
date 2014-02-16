package de.dhbw.studiduell.rest;

import java.util.Random;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.json.JSONObject;

@Path("/game")
public class GameService {
	
	@Path("/create_game_random_opponent")
	@POST
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.APPLICATION_JSON)
	public String createGameRandomOpponent(
			@QueryParam("nick") String nick,
			@QueryParam("password") String password) {
		
		//TODO Authentifizierung
		
		//TODO implement and remove mock
		String tmp = (new Random().nextBoolean()) ? "Hans_Wurst" : null;
		return new JSONObject("{user:" + tmp + "}").toString();
	}
	
	@Path("/create_game")
	@POST
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.TEXT_PLAIN)
	public String createGame(
			@QueryParam("nick") String nick,
			@QueryParam("password") String password,
			@QueryParam("username_opponent") String opponent) {
		
		//TODO Authentifizierung
		
		//TODO implement and remove mock
		return Boolean.FALSE.toString();
	}
}
