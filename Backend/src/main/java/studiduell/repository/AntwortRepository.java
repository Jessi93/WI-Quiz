package studiduell.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import studiduell.model.AntwortEntity;
import studiduell.model.FrageEntity;
import studiduell.model.RundeEntity;
import studiduell.model.id.AntwortEntityPk;

public interface AntwortRepository extends JpaRepository<AntwortEntity, AntwortEntityPk> {
	// no new methods here
}
