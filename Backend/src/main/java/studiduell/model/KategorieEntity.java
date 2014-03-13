package studiduell.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Kategorie")
public class KategorieEntity {
	@Id
	@Column(name = "name", unique = true, nullable = false)
	private String name;

	public KategorieEntity() {
	}

	public KategorieEntity(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	@Override
	public String toString() {
		return name; //XXX
	}
}
