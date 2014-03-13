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
	
	@Override
	public boolean equals(Object obj) {
		if (obj == null) {
			return false;
		}
		if (obj == this) {
			return true;
		}
		if (!(obj instanceof SpieltypEntity)) {
			return false;
		}
		SpieltypEntity pk = (SpieltypEntity) obj;
		return pk.name == name;
	}
	
	@Override
	public int hashCode() {
		return name;
	}
}
