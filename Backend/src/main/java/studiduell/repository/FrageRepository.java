package studiduell.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import studiduell.model.FrageEntity;
import studiduell.model.KategorieEntity;

public interface FrageRepository extends JpaRepository<FrageEntity, Integer> {
	//TODO does it do what it should do?
	//TODO used?
	@Deprecated
	Integer countFindByKategorieName(KategorieEntity category);
	
	//TODO used?
	//TODO nicht validierte rausfiltern
	Set<FrageEntity> findByKategorieName(KategorieEntity category);
}
