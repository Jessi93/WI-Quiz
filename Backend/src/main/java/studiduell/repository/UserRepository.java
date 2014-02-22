package studiduell.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import studiduell.model.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, String> {
	//JPQL does not support LIMIT, so use native SQL
	@Query(value = "SELECT benutzername FROM benutzer WHERE benutzername LIKE :pattern LIMIT 10",
			nativeQuery = true)
	List<String> roughSearch(@Param("pattern") String pattern);
}
