package de.dhbw.db;

import java.sql.Connection;
import java.sql.SQLException;

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
			Context envContext  = (Context) initContext.lookup("java:/comp/env");
			dataSource = (DataSource) envContext.lookup("jdbc/studiduellDB");
		} catch(NamingException ex) {
			ex.printStackTrace();
		}
	}
	
	/**
	 * Returns a database connection with auto commit
	 * set to <code>false</code>.<br>
	 * The connection has to be closed by the invoker.
	 * 
	 * @return database connection
	 * @throws SQLException
	 */
	public Connection connect() throws SQLException {
		Connection conn = dataSource.getConnection();
		conn.setAutoCommit(false);
		return conn;
	}
}
