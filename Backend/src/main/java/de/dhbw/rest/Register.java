package de.dhbw.rest;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.sun.jersey.api.core.InjectParam;

import de.dhbw.db.DatabaseManager;
import de.dhbw.hash.PasswordHash;
import de.dhbw.props.StudiduellProps;

/**
 * The register page.
 * 
 * @author D@rk M@gic
 *
 */
@Path("/register")
public class Register {
	@InjectParam
	private StudiduellProps props;
	@InjectParam
	private DatabaseManager dbManager;
	@InjectParam
	private PasswordHash pwHash;
	
	@POST
	@Consumes(MediaType.TEXT_PLAIN)
	@Produces(MediaType.TEXT_PLAIN)
	public String register(
			@QueryParam("nick") String nick,
			@QueryParam("password") String password) {
		
		//TODO validate password (length / token)
		if((nick == null || nick.isEmpty())
				|| (password == null || password.isEmpty()))
			return Boolean.FALSE.toString();
		
		try(Connection conn = dbManager.connect();) {
			// Create user
			PreparedStatement stmt = conn.prepareStatement(props.get("sql.insertUser"));
			stmt.setString(1, nick);
			stmt.setBytes(2, pwHash.hash(password.getBytes()));
			stmt.setTimestamp(3, new Timestamp(System.currentTimeMillis()));
			
			if(stmt.executeUpdate() != 1) {
				// User could not be created - abort registration
				conn.rollback();
				throw new SQLException("Creating user failed.");
			}
			
			// Create his category filter defaults
			Statement stmt2 = conn.createStatement();
			ResultSet categoriesResultSet = stmt2.executeQuery(props.get("sql.selectCategory"));
			while(categoriesResultSet.next()) {
				PreparedStatement stmt3 = conn.prepareStatement(props.get("sql.insertCategoryFilter"));
				stmt3.setString(1, nick);
				stmt3.setString(2, categoriesResultSet.getString(1));
				
				if(stmt3.executeUpdate() != 1) {
					// one category could not be set - abort registration
					conn.rollback();
					throw new SQLException("User categories could not be set.");
				}
			}
			
			conn.commit();
			return Boolean.TRUE.toString();
		} catch(SQLException ex) {
			ex.printStackTrace(); //XXX
			return Boolean.FALSE.toString();
		}
	}
}
