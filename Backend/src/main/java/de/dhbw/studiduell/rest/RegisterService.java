package de.dhbw.studiduell.rest;

import java.sql.Timestamp;
import java.util.List;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.sun.jersey.api.core.InjectParam;

import de.dhbw.studiduell.db.PersistenceManager;
import de.dhbw.studiduell.db.entity.BenutzerEntity;
import de.dhbw.studiduell.db.entity.KategorieEntity;
import de.dhbw.studiduell.db.entity.KategorienfilterEntity;
import de.dhbw.studiduell.props.StudiduellProps;
import de.dhbw.studiduell.utils.hash.PasswordHash;

/**
 * The register page.
 * 
 * @author D@rk M@gic
 *
 */
@Path("/register")
public class RegisterService {
	@InjectParam
	private StudiduellProps props;
	@InjectParam
	private PersistenceManager persistenceManager;
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
		
		boolean returnVal;
		
		EntityManager em = persistenceManager.getEntityManager();
		
		try {
			// User exists already
			if(em.find(BenutzerEntity.class, nick) != null) {
				return Boolean.FALSE.toString();
			}
			
			em.getTransaction().begin();
			// Insert user
			BenutzerEntity user = new BenutzerEntity(
					nick, pwHash.hash(password.getBytes()),
					new Timestamp(System.currentTimeMillis()));
			em.persist(user);
			
			// Insert category filter settings for user
			TypedQuery<KategorieEntity> query = em.createQuery(props.get("sql.hql.selectCategory"), KategorieEntity.class);
			List<KategorieEntity> categories = query.getResultList();
			
			for(KategorieEntity cat : categories) {
				KategorienfilterEntity filter = new KategorienfilterEntity(
						nick, cat.getName());
				em.persist(filter);
			}
			
			em.getTransaction().commit();
			returnVal = true;
		} catch(EntityExistsException | IllegalArgumentException ex) {
			em.getTransaction().rollback();
			returnVal = false;
			ex.printStackTrace();
		} finally {
			em.close();
		}
		
		return Boolean.toString(returnVal);
	}
}