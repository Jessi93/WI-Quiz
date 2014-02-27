package studiduell.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "Spieltyp")
public class SpieltypEntity {
	@Id
	@JoinColumn(name = "name", unique = true, nullable = false)
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
	
	@Transient
	@OneToOne(mappedBy = "spieltyp_name")
	private SpielEntity spielEntity;
}
