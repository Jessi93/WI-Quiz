package studiduell.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import studiduell.model.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, String> {
	// no new methods here
}
