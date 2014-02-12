package de.dhbw.studiduell.rest;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.json.JSONObject;

import com.sun.jersey.api.core.InjectParam;

import de.dhbw.studiduell.db.entity.SpielEntity;
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
		
		//TODO implement and remove mock
		JSONObject json = new JSONObject();
		Collection<SpielEntity> games = new ArrayList<SpielEntity>();
		SpielEntity spiel1 = new SpielEntity(123, 'M', "Spieler1", "Spieler2", "Sieger", "Verlierer", "wartenAuf", 4, 'A', new Timestamp(System.currentTimeMillis()));
		SpielEntity spiel2 = new SpielEntity(456, 'S', "Spieler1", null, null, null, null, 0, ' ', null);
		SpielEntity spiel3 = new SpielEntity(789, 'M', "Spieler3", "Spieler4", "Sieger", "Verlierer", "wartenAuf", 2, 'P', new Timestamp(System.currentTimeMillis()));
		
		games.add(spiel1);
		games.add(spiel2);
		games.add(spiel3);
		
		json.put("games", games);
		
		return json.toString();
	}
}
