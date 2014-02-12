package de.dhbw.studiduell.utils;

import java.util.Arrays;

import javax.persistence.EntityManager;

import com.sun.jersey.api.core.InjectParam;

import de.dhbw.studiduell.db.PersistenceManager;
import de.dhbw.studiduell.db.entity.BenutzerEntity;
import de.dhbw.studiduell.props.StudiduellProps;
import de.dhbw.studiduell.utils.hash.PasswordHash;

/**
 * Provides utils for user management.
 * 
 * @author D@rk M@gic
 *
 */

public class UserUtils {
	@InjectParam
	private PersistenceManager persistenceManager;
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
		
		EntityManager em = persistenceManager.getEntityManager();
		try {
			BenutzerEntity user = em.find(BenutzerEntity.class, nick);
			if(user != null) {
				return Arrays.equals(
						pwHash.hash(password.getBytes()), user.getPasswort_hash());
			}
			return false;
		} finally {
			em.close();
		}
	}
}
