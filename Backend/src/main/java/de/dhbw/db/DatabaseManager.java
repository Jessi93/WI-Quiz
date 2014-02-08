package de.dhbw.db;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import com.sun.jersey.spi.resource.Singleton;

@Singleton
public class DatabaseManager {
	private DataSource dataSource;
	
	public DatabaseManager() {
		try {
			Context initContext = new InitialContext();
			Context envContext  = (Context)initContext.lookup("java:/comp/env");
			dataSource = (DataSource)envContext.lookup("jdbc/studiduellDB");
		} catch(NamingException ex) {
			ex.printStackTrace();
		}
	}
	
	public String sayHello() {
		/* TODO
		try {
			Connection conn = dataSource.getConnection();
			Statement statement = conn.createStatement();
			ResultSet rs = statement.executeQuery("SELECT * FROM Spielstatus");
			rs.next();
			String tmp = rs.getString(1);
			conn.close();
			return tmp;
		} catch(SQLException ex) {
			ex.printStackTrace();
		}
		return null;
		*/
		return "hello (no DB!)";
	}
	
}
