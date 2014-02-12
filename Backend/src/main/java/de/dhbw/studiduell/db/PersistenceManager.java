package de.dhbw.studiduell.db;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import com.sun.jersey.api.core.InjectParam;
import com.sun.jersey.spi.resource.Singleton;

import de.dhbw.studiduell.props.StudiduellProps;

@Singleton
public class PersistenceManager {
	@InjectParam
	private StudiduellProps props;
	
	private EntityManagerFactory entityManagerFactory;
	
	@PostConstruct
	public void init() {
		entityManagerFactory = Persistence.createEntityManagerFactory(props.get("project.name"));
	}
	
	/**
	 * Returns a new opened entity manager.<br>
	 * It has to be closed by the invoker.
	 * 
	 * @return entity manager
	 */
	public EntityManager getEntityManager() {
		return entityManagerFactory.createEntityManager();
	}
}
