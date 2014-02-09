package de.dhbw.utils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;

import com.sun.jersey.api.core.InjectParam;

import de.dhbw.db.DatabaseManager;
import de.dhbw.exc.StudiduellRuntimeException;
import de.dhbw.hash.PasswordHash;
import de.dhbw.props.StudiduellProps;

/**
 * Provides utils for user management.
 * 
 * @author D@rk M@gic
 *
 */

public class UserUtils {
	@InjectParam
	private DatabaseManager dbManager;
	@InjectParam
	private StudiduellProps props;
	@InjectParam
	private PasswordHash pwHash;
	
	/**
	 * Tests whether a nick and password is set
	 * and whether the password matches to the
	 * nick. This functionality has several use
	 * cases (e. g. login).
	 * 
	 * @param nick the nick
	 * @param password the password
	 * @return whether the nick uses that
	 * password
	 */
	public boolean authenticate(String nick, String password) {
		if((nick == null || nick.isEmpty())
				|| password == null || password.isEmpty())
			return false;
		
		boolean authenticateOK = false;
		try(Connection conn = dbManager.connect();) {
			PreparedStatement stmt = conn.prepareStatement(props.get("sql.selectPassword"));
			stmt.setString(1, nick);
			ResultSet result = stmt.executeQuery();
			if(result.next()) {
				// user found
				byte[] db_pw = result.getBytes(1);
				byte[] input_pw = pwHash.hash(password.getBytes());
				authenticateOK = Arrays.equals(db_pw, input_pw);
			}
		} catch(SQLException ex) {
			throw new StudiduellRuntimeException(ex);
		}
		
		return authenticateOK;
	}
}
