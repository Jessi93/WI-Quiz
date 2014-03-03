package studiduell.model;

import java.sql.Timestamp;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "benutzer")
public class UserEntity {
	@Id
	@JoinColumn(name = "benutzername", unique = true, nullable = false)
	private String benutzername;
	
	@Column(name = "passwort_hash", nullable = false)
	private String passwortHash;
	
	@Column(name = "push_id")
	private String pushId;
	
	@Column(name = "letzteAktivitaet", nullable = false)
	private Timestamp letzteAktivitaet;
	
	// relationships
	@OneToMany(mappedBy = "benutzername")
	private Set<FreundeslisteEntity> friendsSet;

	
	public UserEntity() {
	}
	
	public UserEntity(String benutzername) {
		this.benutzername = benutzername;
	}

	public String getBenutzername() {
		return benutzername;
	}

	public void setBenutzername(String benutzername) {
		this.benutzername = benutzername;
	}

	public String getPasswortHash() {
		return passwortHash;
	}

	public void setPasswortHash(String passwortHash) {
		this.passwortHash = passwortHash;
	}

	public String getPushId() {
		return pushId;
	}

	public void setPushId(String pushId) {
		this.pushId = pushId;
	}

	public Timestamp getLetzteAktivitaet() {
		return letzteAktivitaet;
	}

	public void setLetzteAktivitaet(Timestamp letzteAktivitaet) {
		this.letzteAktivitaet = letzteAktivitaet;
	}
	
	//XXX only for debugging purposes
	@Override
	public String toString() {
		return benutzername;
	}
}
