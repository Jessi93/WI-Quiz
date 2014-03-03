package studiduell.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Spieltyp")
public class SpieltypEntity {
	@Id
	@Column(name = "name", unique = true, nullable = false)
	private char name;
	
	public SpieltypEntity() {
	}

	public SpieltypEntity(char name) {
		this.name = name;
	}

	public char getName() {
		return name;
	}

	public void setName(char name) {
		this.name = name;
	}
}
