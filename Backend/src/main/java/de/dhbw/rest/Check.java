package de.dhbw.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Developer control page.
 * 
 * @author D@rk M@gic
 *
 */
@Path("/")
public class Check {
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String itWorks() {
		return "<html><h1>The Studiduell ReST webservice is available!</h1>"
				+ "Everything is OK!</html>";
	}
}
