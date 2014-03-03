package studiduell.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import studiduell.model.id.FreundeslisteEntityPk;

@Entity
@IdClass(FreundeslisteEntityPk.class)
@Table(name = "Freundesliste")
public class FreundeslisteEntity {
	
	@Id
	@ManyToOne
	@JoinColumn(name = "benutzername", unique = true, nullable = false)
	private UserEntity benutzername;
	
	@Id
	@ManyToOne
	@JoinColumn(name = "befreundetMit", unique = true, nullable = false)
	private UserEntity befreundetMit;
	
	public FreundeslisteEntity() {
	}

	public FreundeslisteEntity(UserEntity benutzername, UserEntity befreundetMit) {
		this.benutzername = benutzername;
		this.befreundetMit = befreundetMit;
	}

	public UserEntity getBenutzername() {
		return benutzername;
	}

	public void setBenutzername(UserEntity benutzername) {
		this.benutzername = benutzername;
	}

	public UserEntity getBefreundetMit() {
		return befreundetMit;
	}

	public void setBefreundetMit(UserEntity befreundetMit) {
		this.befreundetMit = befreundetMit;
	}
}
