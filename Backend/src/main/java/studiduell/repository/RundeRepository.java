package studiduell.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import studiduell.model.RundeEntity;
import studiduell.model.SpielEntity;

public interface RundeRepository extends JpaRepository<RundeEntity, Integer> {
	// no new methods here
	RundeEntity findBySpielAndRundenNr(SpielEntity spielID, int rundenNr);
}
