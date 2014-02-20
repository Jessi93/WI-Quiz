package studiduell.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import studiduell.model.FreundeslisteEntity;
import studiduell.model.UserEntity;
import studiduell.model.id.FreundeslisteEntityPk;

public interface FreundeslisteRepository extends JpaRepository<FreundeslisteEntity, FreundeslisteEntityPk> {
	List<FreundeslisteEntity> findByBenutzername(UserEntity user);
}
