package studiduell.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import studiduell.model.FrageEntity;

public interface FrageRepository extends JpaRepository<FrageEntity, Integer> {
	// no new methods here
}
