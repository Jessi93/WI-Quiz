package studiduell.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import studiduell.model.AntwortEntity;
import studiduell.model.id.AntwortEntityPk;

public interface AntwortRepository extends JpaRepository<AntwortEntity, AntwortEntityPk> {
	// no new methods here
}
